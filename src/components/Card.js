//card
import React, { useState } from 'react';
import EditTask from '../modals/EditTask.js';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);

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

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (updatedTask) => {
        updateListArray(updatedTask, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    return (
        <div className="card-wrapper mr-5">
            <div className="card-top" style={{ backgroundColor: getStatusColor(taskObj.Status) }}></div>

            <div className="grid grid-cols-2 gap-1 p-3 mb-1 bg-white">
                <div className="col-span-1 w-1/2">
                    <p className="font-semibold">Name</p>
                    <p className="font-semibold">Description</p>
                    <p className="font-semibold">Priority</p>
                    <p className="font-semibold">Deadline</p>
                    <p className="font-semibold">Status</p>
                    <p className="font-semibold">Comments</p>
                </div>
                <div className="col-span-1 -indent-10 text-left break-all">
                    <p>: {taskObj.Name}</p>
                    <p>: {taskObj.Description}</p>
                    <p>: {taskObj.Priority}</p>
                    <p>: {taskObj.Deadline}</p>
                    <p>: {taskObj.Status}</p>

                    <label className="text-left">: {taskObj.Comments}</label>
                </div>
                <div className="col-span-2 flex justify-end items-end p-4">
                    <i
                        className="far fa-edit mr-3"
                        style={{color: getStatusColor(taskObj.Status), cursor: "pointer" }}
                        onClick={() => setModal(true)}
                    ></i>
                    <i
                        className="fas fa-trash-alt"
                        style={{ color: getStatusColor(taskObj.Status), cursor: "pointer" }}
                        onClick={handleDelete}
                    ></i>
                </div>
            </div>

            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </div>
    );
};

export default Card;
