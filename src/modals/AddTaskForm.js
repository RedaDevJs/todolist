import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AddTaskForm = ({ modal, toggle, save, update, taskObj }) => {
    console.log("AddTaskForm")

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState(
        new Date().toISOString().slice(0, 16)
    );
    const [status, setStatus] = useState('Todo');
    const [comments, setComments] = useState('');

    useEffect(() => {
        // Mettre à jour la date d'aujourd'hui chaque fois que le formulaire est ouvert
        // Formattez la date au format d'affichage souhaité pour l'affichage dans le formulaire
        setDeadline(new Date().toISOString().slice(0, 16));

        // Mettre à jour les champs en cas de modification
        if (taskObj) {
            setTaskName(taskObj.Name || '');
            setDescription(taskObj.Description || '');
            setPriority(taskObj.Priority || '');
            setDeadline(taskObj.Deadline || '');
            setStatus(taskObj.Status || 'Todo');
            setComments(taskObj.Comments || '');
        }
    }, [modal, taskObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'taskName':
                setTaskName(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'priority':
                setPriority(value);
                break;
            case 'status':
                setStatus(value);
                break;
            case 'comments':
                setComments(value);
                break;
            case 'deadline':
                setDeadline(value);
                break;
            default:
                break;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Todo':
                return "#5D93E1";
            case 'In Progress':
                return "#F9D288";
            case 'Done':
                return "#5DC250";
            default:
                return "#5D93E1"; // Default color, change as needed
        }
    };

    const handleSaveOrUpdate = () => {
        const isValidDeadline = !isNaN(new Date(deadline).getTime());

        if (isValidDeadline) {
            const taskData = {
                'Name': taskName,
                'Description': description,
                'Priority': priority,
                'Deadline': deadline,
                'Status': status,
                'Comments': comments,
            };

            if (taskObj) {
                // Si taskObj existe, c'est une modification
                update(taskData);
            } else {
                // Sinon, c'est une création
                save(taskData);
            }
            // Réinitialiser les champs après save ou update
            setTaskName('');
            setDescription('');
            setPriority('');
            setDeadline(new Date().toISOString().slice(0, 16));
            setStatus('Todo');
            setComments('');

        } else {
            console.error('Invalid deadline');
            // Gestion des erreurs si nécessaire
        }
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} style={{ backgroundColor: getStatusColor(status), color: 'white' }}>
                {taskObj ? 'Update Task' : 'Create Task'}
            </ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="3" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                </div>
                <div className="form-group">
                    <label>Priority</label>
                    <textarea rows="3" className="form-control" value={priority} onChange={handleChange} name="priority"></textarea>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select className="form-control" value={status} onChange={handleChange} name="status">
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Comments</label>
                    <textarea rows="3" className="form-control" value={comments} onChange={handleChange} name="comments"></textarea>
                </div>
                <div className="form-group">
                    <label>Deadline</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={deadline}
                        onChange={handleChange}
                        name="deadline"
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSaveOrUpdate}>
                    {taskObj ? 'Update' : 'Create'}
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddTaskForm;
