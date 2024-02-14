import React, { useEffect, useState } from "react";
import Card from "../components/Ui/Card.js";
import AddTaskForm from "../components/Modals/ManageTaskForm.js";
import { useDispatch, useSelector } from "react-redux";
import usePagination from "../components/Utilities/usePagination.js";
import {
  fetchUserTasks,
  getUserTasks,
} from "../reducers/tasks/tasksActions.js";

const API_BASE_URL = "http://localhost:6001";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const currentUser = useSelector((state) => state.reducer.users.currentUser);
  const taskList = useSelector((state) => state.reducer.tasks.list);
  const dispatch = useDispatch();
  const ITEMS_PER_PAGE = 12;

  // Pagination
  const { next, prev, jump, currentData, currentPage, totalPages } =
    usePagination(taskList, ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(getUserTasks(currentUser._id));
    }
  }, [currentUser, dispatch]);

  const saveTask = (taskObj) => {
    let updatedTasks = [...taskList, taskObj];
    localStorage.setItem(
      `taskList_${currentUser.id}`,
      JSON.stringify(updatedTasks),
    );
    setTaskList(updatedTasks);
    setModal(false);
  };

  const deleteTask = (index) => {
    let updatedTasks = [...taskList];
    updatedTasks.splice(index, 1);
    localStorage.setItem(
      `taskList_${currentUser.id}`,
      JSON.stringify(updatedTasks),
    );
    setTaskList(updatedTasks);
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="bg-fuchsia-200 h-32 text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={toggle}>
          Create Task
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 p-4 mt-10 mb-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {currentData().map((obj, index) => (
          <Card
            key={index}
            taskObj={obj}
            index={index}
            deleteTask={() => deleteTask(index)} // Ensure deleteTask is called with an index
          />
        ))}
      </div>
      <div className=" p-6 d-flex text-center ">
        <div>
          <button onClick={prev} disabled={currentPage === 1}>
            Previous
          </button>
        </div>

        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => jump(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
        <div>
          <button onClick={next} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <AddTaskForm toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;


/*import React, { useEffect, useState } from "react";
import Card from "./Card.js";
import AddTaskForm from "../Modals/ManageTaskForm.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTasks } from "../../reducers/tasks/tasksActions.js";
import axios from "axios";

const API_BASE_URL = "http://localhost:6001";

// Async thunk function for adding a task
const getToken = () => {
  return localStorage.getItem("token");
};
const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const currentUser = useSelector((state) => state.reducer.users.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(fetchUserTasks());
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      let storedTasks = localStorage.getItem(`taskList_${currentUser.id}`);

      if (storedTasks) {
        let parsedTasks = JSON.parse(storedTasks);
        setTaskList(parsedTasks);
      }
    }
  }, [currentUser]);

  const saveTask = (taskObj) => {
    let updatedTasks = [...taskList, taskObj];
    localStorage.setItem(
        `taskList_${currentUser.id}`,
        JSON.stringify(updatedTasks),
    );
    setTaskList(updatedTasks);
    setModal(false);
  };

  const deleteTask = (index) => {
    let updatedTasks = [...taskList];
    updatedTasks.splice(index, 1);
    localStorage.setItem(
        `taskList_${currentUser.id}`,
        JSON.stringify(updatedTasks),
    );
    setTaskList(updatedTasks);
  };

  const updateListArray = (obj, index) => {
    let updatedTasks = [...taskList];
    updatedTasks[index] = obj;
    localStorage.setItem(
        `taskList_${currentUser.id}`,
        JSON.stringify(updatedTasks),
    );
    setTaskList(updatedTasks);
  };

  const toggle = () => {
    setModal(!modal);
  };
   const handleFetchData = async () => {
    try {
      const token = getToken();

      if (!token) {
        console.error("Token is null. Please authenticate first.");
        throw new Error("Token is null. Please authenticate first.");
      }
      const response = await axios.get(
        `${API_BASE_URL}/api/tasks/byUserId/${currentUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data;
      setTaskList(data);
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };
  const handleData = async () => {
    try {
      const token = getToken();

      if (!token) {
        console.error("Token is null. Please authenticate first.");
        throw new Error("Token is null. Please authenticate first.");
      }

      const response = await axios.get(`${API_BASE_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      // Mettez à jour la liste des tâches dans l'état local
      setTaskList(data);

      // Retournez les données si nécessaire
      return data;
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      throw error;
    }
  };

  return (
      <>
        <div className="bg-fuchsia-200 h-32 text-center">
          <h3>Todo List</h3>
          <button className="btn btn-primary mt-2" onClick={toggle}>
            Create Task
          </button>
          <button className="btn btn-primary mt-2" onClick={handleData}>
            data
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 p-4 mt-10 mb-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {taskList.map((obj, index) => (
              <Card
                  key={index}
                  taskObj={obj}
                  index={index}
                  deleteTask={deleteTask}
                  updateListArray={updateListArray}
              />
          ))}
        </div>
        <AddTaskForm toggle={toggle} modal={modal} save={saveTask} />
      </>
  );
};

export default TodoList;*/
