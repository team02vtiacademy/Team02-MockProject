import React, { Suspense } from "react";
import {Navbar} from "../component/Navbar";
import SliderComponent from "../component/SliderComponent";
import Footer from "../component/Footer";
const Layout = (props) => {

    return (
        <>
            <main>
                <Navbar />
                <SliderComponent/>
                <Suspense fallback={<div>Loading page</div>}>
                    {props.children}

                </Suspense>

                <Footer/>
            </main>
        </>
    )
    
}

export default Layout;