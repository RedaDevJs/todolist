import React from 'react';
import {Recipe} from "../components/Ui/Recipe";
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
