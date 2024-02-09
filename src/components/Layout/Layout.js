//Layout.js

import React, {Fragment, useState} from "react";
import Routers from "../../routers/Routers.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";

const Layout = () => {
    return (
        <Fragment>
            <Header/>
            <div>
                <Routers />
            </div>
            <Footer />
        </Fragment>
    );
};
export default Layout;
