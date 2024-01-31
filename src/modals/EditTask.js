import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [status, setStatus] = useState(''); // Include the status state
    const [comments, setComments] = useState('');

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update state based on the input name
        if (name === 'taskName') {
            setTaskName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'priority') {
            setPriority(value);
        } else if (name === 'status') {
            setStatus(value);
        } else if (name === 'comments') {
            setComments(value);
        }
    }

    // Effect to update state based on taskObj changes
    useEffect(() => {
        setTaskName(taskObj.Name)
        setDescription(taskObj.Description)
        setPriority(taskObj.Priority)
        setDeadline(new Date(taskObj.Deadline))
        setStatus(taskObj.Status); // Set the status from taskObj
        setComments(taskObj.Comments); // Set the comments from taskObj
    }, [taskObj.Description, taskObj.Name, taskObj.Priority, taskObj.Deadline, taskObj.Status, taskObj.Comments])

    // Function to get status color based on the status value
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

    // Function to handle the update button click
    const handleUpdate = (e) => {
        e.preventDefault();

        // Create a temporary task object with updated values
        let tempObj = {
            'Name': taskName,
            'Description': description,
            'Priority': priority,
            'Deadline': new Date(deadline).toLocaleDateString('fr-FR') + ' ' + new Date(deadline).toLocaleTimeString('fr-FR', { hour12: false, hour: '2-digit', minute: '2-digit' }),
            'Status': status,
            'Comments': comments,
        };

        // Call the updateTask function with the temporary object
        updateTask(tempObj);
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} style={{ backgroundColor: getStatusColor(status), color: 'white' }}>Update Task</ModalHeader>
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
                    <input type="text" className="form-control" value={priority} onChange={handleChange} name="priority" />
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
                    <DateTimePicker
                        onChange={(date) => setDeadline(date)}
                        value={deadline}
                        inputFormat={['DD-MM-YYYY', 'YYYY-MM-DD']}
                        dateFormat="DD-MM-YYYY"
                        timeFormat="HH:mm"
                        locale="fr"
                        inputProps={{ readOnly: true }}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTaskPopup;
