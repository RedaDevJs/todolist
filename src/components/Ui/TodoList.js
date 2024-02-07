import React, {useEffect, useState} from 'react';
import Card from './Card.js';
import AddTaskForm from '../modals/AddTaskForm.js';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        let storedTasks = localStorage.getItem("taskList");

        if (storedTasks) {
            let parsedTasks = JSON.parse(storedTasks);
            setTaskList(parsedTasks);
        }
    }, []);

    const saveTask = (taskObj) => {
        let updatedTasks = [...taskList, taskObj];
        localStorage.setItem("taskList", JSON.stringify(updatedTasks));
        setTaskList(updatedTasks);
        setModal(false);
    }


    const deleteTask = (index) => {
        let updatedTasks = [...taskList];
        updatedTasks.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(updatedTasks));
        setTaskList(updatedTasks);
    }

    const updateListArray = (obj, index) => {
        let updatedTasks = [...taskList];
        updatedTasks[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(updatedTasks));
        setTaskList(updatedTasks);
    }

    const toggle = () => {
        setModal(!modal);
    }



    return (
        <>
            <div className = "bg-fuchsia-200 h-32 text-center">
                <h3>Todo List</h3>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>
            </div>
            <div className = " grid grid-cols-4 gap-4  p-4 mt-10 mb-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div>
            <AddTaskForm toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default TodoList;