import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import TodoList from "../components/Ui/TodoList.js";
import LoginForm from "../pages/Login.js";
import RegistrationForm from "../pages/Register.js";
const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<TodoList />} />

            <Route path="/login" element={<LoginForm  />} />
            <Route path="/register" element={<RegistrationForm />} />
        </Routes>
    );
};
export default Routers;
