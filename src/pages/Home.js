import React from 'react';
import {Container} from "reactstrap";
import { Carousel } from 'flowbite-react';
const Home = () => {

    return (
        <>
            <Container >
                <div className="h-screen p-5">
                    <Carousel pauseOnHover>
                        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                    </Carousel>
                </div>
            </Container>
        </>
    );
};
export default Home;
