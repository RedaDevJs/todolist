//CreateTask
import React, {useEffect, useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const CreateTaskPopup = ({ modal, toggle, save }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    useEffect(() => {
        // Obtenir la date d'aujourd'hui
        const today = new Date();
        const formattedToday = today.toLocaleDateString('fr-FR', { hour12: false, hour: '2-digit', minute: '2-digit' });

        // Mettre à jour l'état avec la date d'aujourd'hui
        setDeadline(formattedToday);
    }, []);
    //new Date().toLocaleDateString('fr-FR', { hour12: false, hour: '2-digit', minute: '2-digit' })// Set initial value to the current date and time
    const [status, setStatus] = useState('Todo'); // Default status is 'Todo'
    const [comments, setComments] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update state based on the input name
        name === 'taskName' ? setTaskName(value)
            : name === 'description' ? setDescription(value)
                : name === 'priority' ? setPriority(value)
                    : name === 'status' ? setStatus(value)
                        : name === 'comments' && setComments(value);
    };

    const handleDeadlineChange = (date) => {
        setDeadline(date);
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

    const handleSave = () => {
        // Ensure that deadline is initialized as a Date object
        const taskObj = {
            'Name': taskName,
            'Description': description,
            'Priority': priority,
            'Deadline': new Date(deadline).toLocaleDateString('fr-FR', { hour12: false, hour: '2-digit', minute: '2-digit' }),
            'Status': status,
            'Comments': comments,
        };

        save(taskObj);
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} style={{ backgroundColor: getStatusColor(status), color: 'white' }}>Create Task</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                </div>
                <div className="form-group">
                    <label>Priority</label>
                    <textarea rows="5" className="form-control" value={priority} onChange={handleChange} name="priority"></textarea>
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
                    <textarea rows="5" className="form-control" value={comments} onChange={handleChange} name="comments"></textarea>
                </div>
                <div className="form-group">
                    <label>Deadline</label>
                    <input
                        type="datetime-local"
                        value={deadline}
                        onChange={handleDeadlineChange}
                    />
                   {/* <DateTimePicker
                        onChange={handleDeadlineChange}
                        value={deadline}
                        inputFormat={['DD-MM-YYYY', 'YYYY-MM-DD']}
                        dateFormat="DD-MM-YYYY"
                        timeFormat="HH:mm"
                        locale="fr" // Set locale to French
                        inputProps={{readOnly: true}} // To control the input field format
                    />*/}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Create</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateTaskPopup;
