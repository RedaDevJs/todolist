import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import TodoList from "../components/Ui/TodoList";
import SignInModal from "../modals/SignIn";
import SignUpModal from "../modals/SignUp";
const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<TodoList />} />
            <Route path="/SignIn" element={<SignInModal />} />
            <Route path="/SignUp" element={<SignUpModal />} />
        </Routes>
    );
};
export default Routers;
