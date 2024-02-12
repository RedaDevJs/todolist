// ManageTaskForm.js

import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import React, {useState} from "react";
import axios from "axios";
import NotificationModal from "./NotificationModal.js";

const ManageTaskForm = ({ modal, toggle, taskObj }) => {
    const [titre, setTitre] = useState('');
    const [priorite, setPriorite] = useState('');
    const [statut, setStatut] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [commentaires, setCommentaires] = useState('');
    const [userId, setUserId] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [ManageTaskSuccess, setManageTaskSuccess] = useState(false);
    const [showManageTaskForm,SetshowManageTaskForm]= useState(true);

    const handleAddTask = async () => {
        setLoading(true);
        const data ={
            titre: titre,
            priorite: priorite,
            statut: statut,
            description: description,
            deadline: deadline,
            commentaires: commentaires,
            userId:  userId
        }
        // Validate form fields
        if (titre === ""){
            console.error('Please fill in all the required fields.');
            return;
        }
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token is null. Please authenticate first.');
                // Vous pouvez également gérer la redirection vers la page de connexion, etc.
                return;
            }
            // Log the token to the console
            console.log('Token:', token);
            // Assurez-vous que le token est correctement inclus dans l'en-tête de la requête
            const response = await axios.post('http://localhost:6001/api/tasks', {
                titre: titre,
                priorite: priorite,
                statut: statut,
                description: description,
                deadline: deadline,
                commentaires: commentaires,
                userId: userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle the response as needed
            console.log('Task added successfully:', response.data);
            setLoading(false);
            // Optionally, you can update the UI or fetch the updated task list
        } catch (error) {
            // Handle errors
            console.error('Error adding task:', error);
            console.error('Detailed response:', error.response);  // Log the detailed response object
            setLoading(false);
            // Set an error message to be displayed in the UI
            // setAddError('Error adding task. Please try again.');
        }
    };
   /* const handleAddTask = async () => {
        try {
            setLoading(true);

            // Validate form fields...
            if (titre === "") {
                console.error('Please fill in all the required fields.');
                return;
            }

            // Check if the task with the same ID already exists
            const existingTask = await axios.get(`http://localhost:6001/api/tasks/${encodeURIComponent(taskObj._id)}`);

            if (existingTask.data) {
                console.error('Task with the same ID already exists.');
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token is null. Please authenticate first.');
                return;
            }

            // Declare the data object
            const data = {
                titre: titre,
                priorite: priorite,
                statut: statut,
                description: description,
                deadline: deadline,
                commentaires: commentaires,
                userId: userId
            };

            const response = await axios.post(
                'http://localhost:6001/api/tasks',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('Task added successfully:', response.data);
            setLoading(false);
            setManageTaskSuccess(true);
            // Optionally, you can update the UI or fetch the updated task list
        } catch (error) {
            console.error('Error adding task:', error);
            console.error('Detailed response:', error.response);
            setLoading(false);
            setError('Error adding task. Please try again.');
        }
    };*/

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

    return (
        <>
            {showManageTaskForm && (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} style={{ backgroundColor: getStatusColor(statut), color: 'white' }}>
                {taskObj ? 'Update Task' : 'Create Task'}
            </ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Task Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        name="taskName"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        rows="3"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Priority</label>
                    <textarea
                        rows="3"
                        className="form-control"
                        value={priorite}
                        onChange={(e) => setPriorite(e.target.value)}
                        name="priority"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        className="form-control"
                        value={statut}
                        onChange={(e) => setStatut(e.target.value)}
                        name="status"
                    >
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Comments</label>
                    <textarea
                        rows="3"
                        className="form-control"
                        value={commentaires}
                        onChange={(e) => setCommentaires(e.target.value)}
                        name="comments"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Deadline</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        name="deadline"
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleAddTask}>
                    {taskObj ? 'Update' : 'Create'}
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
            {error && <div className="error-message">{error}</div>}
        </Modal>
        )}

            {ManageTaskSuccess && (
        <NotificationModal
            isOpen={modal}
            toggle={toggle}
            //handleAction={handleSignIn}
            label="Registration"
            content="Task added successfully"
            buttonText="Ok"
        />
    )}
</>
);
};


export default ManageTaskForm
