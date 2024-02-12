import React, { useState } from "react";
import { formatToCustomDateTimeString } from "../Utilities/DateUtils.js";
import AddTaskForm from "../Modals/ManageTaskForm.js";

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);

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
    <div className="flex flex-col border border-b-neutral-950 ">
      <div
        className="h-5"
        style={{ backgroundColor: getStatusColor(taskObj.Status) }}
      ></div>
      <div className="grid grid-cols-2 bg-white pl-3 pr-3 pt-3">
        <div className="font-semibold">
          <p>Name</p>
          <p>Description</p>
          <p>Priority</p>
          <p>Deadline</p>
          <p>Status</p>
          <p>Comments</p>
        </div>
        <div className="flex flex-col text-left">
          <p>: {taskObj.Name}</p>
          <p>: {taskObj.Description}</p>
          <p>: {taskObj.Priority}</p>
          <p>: {formatToCustomDateTimeString(taskObj.Deadline)}</p>
          <p>: {taskObj.Status}</p>
          <p>:</p>
        </div>
      </div>
      <div className="pl-3 pr-3">
        <textarea
          rows="4"
          className="form-control mt-0"
          value={taskObj.Comments}
          name="comments"
          readOnly
          style={{ resize: "none" }}
        ></textarea>
      </div>
      <div>
        <div className="flex justify-end items-end p-4">
          <i
            className="far fa-edit mr-3"
            style={{ color: getStatusColor(taskObj.Status), cursor: "pointer" }}
            onClick={() => setModal(true)}
          ></i>
          <i
            className="fas fa-trash-alt"
            style={{ color: getStatusColor(taskObj.Status), cursor: "pointer" }}
            onClick={handleDelete}
          ></i>
        </div>
      </div>
      <AddTaskForm
        modal={modal}
        toggle={toggle}
        update={updateTask}
        taskObj={taskObj}
      />
    </div>
  );
};

export default Card;
