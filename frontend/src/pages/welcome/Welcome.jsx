import "./welcome.scss";
import React from "react";
import {Link} from "react-router-dom";

const Welcome = () => {
    return(
        <div className="welcomebg">
            <div className="welcome">
                <div className="top">
                    <h1 className="h1">Welcome to GB</h1>
                    <p> This is a blockchain application for construction industry.</p>                
                    <p>The aim is to automaze the payment system with smart contracts.</p>                 
                    <p>Please login. If you have not account yet, please register.</p>
                </div>
                <div className="bottom">
                    <Link to="/login" style={{textDecoration:"none"}} className="linkDisplay">
                        <button className="buttonDisplay">Login</button>
                    </Link>
                    <Link to="/register" style={{textDecoration:"none"}} className="linkDisplay">
                        <button className="buttonDisplay">Register</button>
                    </Link>
                </div>
            </div>            
        </div>
    )
}
export default Welcome;