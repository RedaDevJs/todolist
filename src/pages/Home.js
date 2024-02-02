import React from 'react';
import {Container} from "reactstrap";
import TodoList from "../components/Ui/TodoList";

const Home = () => {
    return (
        <>
            <Container >
                <TodoList/>
            </Container>
        </>
    );
};
export default Home;
