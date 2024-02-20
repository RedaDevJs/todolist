// TaskActions.js

import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

// Constants for Action Types
const ADD_TASK = "tasks/addTask";
const API_BASE_URL = "http://localhost:6001";
const UPDATE_TASK = "tasks/updateTask";
const FETCH_USER_TASKS = "tasks/fetchUserTasks";
const DELETE_TASK = "tasks/deleteTask";
const getToken = () => {
    return localStorage.getItem("token");
};

// Définissez votre fonction fetchUserTasks
export const fetchUserTasks = createAsyncThunk(
    FETCH_USER_TASKS,
    async (userId, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("Token is null. Please authenticate first.");
                throw new Error("Token is null. Please authenticate first.");
            }

            const response = await axios.get(
                `${API_BASE_URL}/api/tasks/byUserId/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;
            return data;
        } catch (error) {
            console.error("Error fetching user tasks:", error);
            throw error;
        }
    }
);
export const getUserTasks = (userId) => (dispatch) => {
    dispatch(fetchUserTasks(userId));
};

// Async thunk function for adding a task
export const addTaskAsync = createAsyncThunk(
    ADD_TASK,
    async (taskData, thunkAPI) => {
        try {
            console.log("Task Data:", taskData);
            // Récupérez le token
            const token = getToken();

            // Assurez-vous que le token est disponible
            if (!token) {
                console.error("Token is null. Please authenticate first.");
                // Vous pouvez également gérer la redirection vers la page de connexion, etc.
                return thunkAPI.rejectWithValue({
                    message: "Token is null. Please authenticate first.",
                    status: 401,
                });
            }

            // Utilisez Axios pour envoyer une requête POST pour ajouter une tâche
            const response = await axios.post(`${API_BASE_URL}/api/tasks`, taskData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Response from server:", response.data);
            //thunkAPI.dispatch(fetchUserTasks(taskData.userId));
            return response.data;
        } catch (error) {
            console.error("Error adding task:", error);
            // Gérez l'erreur ou rejetez la promesse avec une erreur
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

// Async thunk function for updating a task
export const updateTaskAsync = createAsyncThunk(
    UPDATE_TASK,
    async (task, thunkAPI) => {
        try {
            const token = getToken();
            if (!token) {
                console.error("Token is null. Please authenticate first.");
                throw new Error("Token is null. Please authenticate first.");
            }

            const response = await axios.put(
                `${API_BASE_URL}/api/tasks/${task._id}`,
                {
                    titre: task.titre,
                    priorite: task.priorite,
                    statut: task.statut,
                    description: task.description,
                    deadline: task.deadline,
                    commentaires: task.commentaires,
                    UserId: task.UserId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error updating task:", error);

            // Provide a more specific error message and include the status if available
            const errorMessage =
                error.response?.data?.message || "Error updating task. Please try again.";

            return thunkAPI.rejectWithValue({
                message: errorMessage,
                status: error.response?.status || 500,
            });
        }
    },
);

// Async thunk function for deleting a task
export const deleteTaskAsync = createAsyncThunk(
    DELETE_TASK,
    async (taskId, thunkAPI) => {
        try {
            const token = getToken();
            if (!token) {
                console.error("Token is null. Please authenticate first.");
                throw new Error("Token is null. Please authenticate first.");
            }

            const response = await axios.delete(
                `${API_BASE_URL}/api/tasks/${taskId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Uncomment the line below if you need to dispatch a subsequent action after deleting the task
            // thunkAPI.dispatch(fetchUserTasks(userId));

            return response.data;
        } catch (error) {
            console.error("Error deleting task:", error);

            // Provide a more specific error message and include the status if available
            const errorMessage =
                error.response?.data?.message || "Error deleting task. Please try again.";

            return thunkAPI.rejectWithValue({
                message: errorMessage,
                status: error.response?.status || 500,
            });
        }
    },
);

/*import axios from "axios";
import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// Constants for Action Types
const ADD_TASK = "tasks/addTask";
const API_BASE_URL = "http://localhost:6001";
const UPDATE_TASK = "tasks/updateTask";
const FETCH_USER_TASKS = "tasks/fetchUserTasks";

// Async thunk function for adding a task
const getToken = () => {
  return localStorage.getItem("token");
};

export const addTaskAsync = createAsyncThunk(
  ADD_TASK,
  async (taskData, thunkAPI) => {
    try {
      // Récupérez le token
      const token = getToken();

      // Assurez-vous que le token est disponible
      if (!token) {
        console.error("Token is null. Please authenticate first.");
        // Vous pouvez également gérer la redirection vers la page de connexion, etc.
        return thunkAPI.rejectWithValue({
          message: "Token is null. Please authenticate first.",
          status: 401,
        });
      }

      // Utilisez Axios pour envoyer une requête POST pour ajouter une tâche
      const response = await axios.post(`${API_BASE_URL}/api/tasks`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Retournez les données de la tâche ajoutée pour qu'elles soient gérées par le réducteur
      return response.data;
    } catch (error) {
      // Gérez l'erreur ou rejetez la promesse avec une erreur
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
// Définissez votre fonction fetchUserTasks

export const fetchUserTasks = createAsyncThunk(
  "tasks/fetchUserTasks",
  async (userId, thunkAPI) => {
    try {
      const token = getToken();

      if (!token) {
        console.error("Token is null. Please authenticate first.");
        throw new Error("Token is null. Please authenticate first.");
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/tasks/byUserId/${currentUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data;
      console.log(response.data);

      // Return the data to be handled by the reducer
      return data;
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      throw error;
    }
  },
);
// Async thunk function for updating a task
export const updateTaskAsync = createAsyncThunk(
  UPDATE_TASK,
  async (updatedTask, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) {
        console.error("Token is null. Please authenticate first.");
        return thunkAPI.rejectWithValue({
          message: "Token is null. Please authenticate first.",
          status: 401,
        });
      }

      const response = await axios.put(
        `${API_BASE_URL}/api/tasks/${updatedTask.id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);*/
/*export const getAllTasksAsync = createAsyncThunk(
  GET_ALL_TASKS,
  async (userId, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is null. Please authenticate first.");
      return thunkAPI.rejectWithValue({
        message: "Token is null. Please authenticate first.",
        status: 401,
      });
    }

    return makeAuthorizedRequest(
      `${API_BASE_URL}/tasks/${userId}`,
      "get",
      null,
      token,
    );
  },
);*/
