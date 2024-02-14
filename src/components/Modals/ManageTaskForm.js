// ManageTaskForm.js

import React, {useState, useEffect} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAsync, updateTaskAsync} from "../../reducers/tasks/tasksActions.js";
import {fetchUserTasks} from "../../reducers/tasks/tasksActions.js";
import NotificationModal from "./NotificationModal.js";
import {formatToCustomDateTimeString} from "../Utilities/DateUtils.js";

const ManageTaskForm = ({modal, toggle, taskObj}) => {
    const [titre, setTitre] = useState("");
    const [priorite, setPriorite] = useState("");
    const [statut, setStatut] = useState("Todo");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [commentaires, setCommentaires] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [manageTaskSuccess, setManageTaskSuccess] = useState(false);
    const [showManageTaskForm, setShowManageTaskForm] = useState(true);

    const dispatch = useDispatch();
    const {isAuthenticated, currentUser} = useSelector((state) => state.reducer.users);
    const [taskData, setTaskData] = useState(taskObj || {});
    useEffect(() => {
        setTaskData(taskObj || {});
        setTitre(taskObj?.titre || "");
        setPriorite(taskObj?.priorite || "");
        setStatut(taskObj?.statut || "");
        setDescription(taskObj?.description || "");
        setCommentaires(taskObj?.commentaires || "");
        setDeadline(taskObj?.deadline || "");

    }, [modal, taskObj]);
    /*  useEffect(() => {
          setTaskData(taskObj || {});
      }, [modal, taskObj]);*/
    useEffect(() => {
        if (isAuthenticated && currentUser && currentUser._id) {
            dispatch(fetchUserTasks(currentUser._id));
        } else {
            console.error("User not authenticated or missing ID");
        }
    }, [dispatch, isAuthenticated, currentUser]);


    const handleAddTask = async () => {
        setLoading(true);

        try {
            if (!currentUser || !currentUser._id) {
                throw new Error("currentUser is undefined or does not have 'id' property");
            }

            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token is null. Please authenticate first.");
            }

            const taskDataToUpdate = {
                titre,
                priorite,
                statut,
                description,
                deadline,
                commentaires,
                userId: currentUser._id,
            };

            let updatedTask;

            if (taskObj) {
                // Update existing task
                updatedTask = await dispatch(updateTaskAsync(taskDataToUpdate));
            } else {
                // Add new task
                updatedTask = await dispatch(addTaskAsync(taskDataToUpdate));
            }

            console.log("Updated Task:", updatedTask.payload);

            // Clear form fields on successful task addition/update
            setTitre("");
            setPriorite("");
            setStatut("Todo");
            setDescription("");
            setDeadline("");
            setCommentaires("");

            // Close the modal
            toggle();

            // Set manageTaskSuccess to true to trigger success notification
            setManageTaskSuccess(true);

        } catch (error) {
            console.error("Error adding/updating task:", error);
            console.error("Detailed response:", error.response);

            if (error?.response?.data?.message) {
                setError(`Error adding/updating task: ${error.response.data.message}`);
            } else {
                setError("Error adding/updating task. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };


    /*const handleAddTask = async () => {
        setLoading(true);

        try {
            // Log the currentUser before proceeding
            console.log("Current User:", currentUser._id);

            // Vérifier que currentUser est défini et a la propriété 'id'
            if (!currentUser || !currentUser._id) {
                throw new Error("currentUser is undefined or does not have 'id' property");
            }

            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token is null. Please authenticate first.");
            }

            /!* const taskData = {
                 titre,
                 priorite,
                 statut,
                 description,
                 deadline,
                 commentaires,
                 userId: currentUser._id,
             };

             const addedTask = await dispatch(addTaskAsync(taskData));*!/

            const taskDataToUpdate = {
                titre,
                priorite,
                statut,
                description,
                deadline,
                commentaires,
                userId: currentUser._id,
            };

            // Use taskDataToUpdate instead of the original taskData
            const addedTask = await dispatch(addTaskAsync(taskDataToUpdate));

            // Vous pouvez accéder à la nouvelle tâche ajoutée via addedTask.payload
            console.log("Added Task:", addedTask.payload);
// Clear form fields on successful task addition
            setTitre("");
            setPriorite("");
            setStatut("Todo");
            setDescription("");
            setDeadline("");
            setCommentaires("");

            // Close the modal
            toggle();

            // Set manageTaskSuccess to true to trigger success notification
            setManageTaskSuccess(true);

        } catch (error) {
            console.error("Error adding task:", error);
            console.error("Detailed response:", error.response);

            if (error?.response?.data?.message) {
                setError(`Error adding task: ${error.response.data.message}`);
            } else {
                setError("Error adding task. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };
*/

    const getStatusColor = (status) => {
        switch (status) {
            case "Todo":
                return "#5D93E1";
            case "In Progress":
                return "#F9D288";
            case "Done":
                return "#5DC250";
            default:
                return "#5D93E1"; // Default color, change as needed
        }
    };

    return (
        <>
            {showManageTaskForm && (
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader
                        toggle={toggle}
                        style={{
                            backgroundColor: getStatusColor(statut),
                            color: "white",
                        }}
                    >
                        {taskObj ? "Update Task" : "Create Task"}
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
                            <select
                                className="form-control"
                                value={priorite}
                                onChange={(e) => setPriorite(e.target.value)}
                                name="priority"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
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
                                //value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                name="deadline"
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {loading ? (
                            <span>Loading...</span>
                        ) : (
                            <>
                                <Button color="primary" onClick={handleAddTask}>
                                    {taskObj ? "Update" : "Create"}
                                </Button>{" "}
                                <Button color="secondary" onClick={toggle}>
                                    Cancel
                                </Button>
                            </>
                        )}
                    </ModalFooter>
                    {error && <div className="error-message">{error}</div>}
                </Modal>
            )}

            {manageTaskSuccess && (
                <NotificationModal
                    isOpen={manageTaskSuccess}
                    toggle={() => setManageTaskSuccess(false)}
                    label="Manage Task"
                    content="Done successfully"
                    buttonText="Ok"
                />
            )}
        </>
    );
};

export default ManageTaskForm;


/*const handleAddTask = async () => {
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
         };*/
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
