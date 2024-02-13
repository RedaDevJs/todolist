//Routers.js

import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TodoList from "../pages/TodoList.js";
import LoginForm from "../pages/Login.js";
import RegistrationForm from "../pages/Register.js";
//import Tasks from "../pages/Tasks.js";
import Home from "../pages/Home.js";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/tasks" element={<TodoList />} />
    </Routes>
  );
};
export default Routers;
