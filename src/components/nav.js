import React from 'react';
import { NavLink } from "react-router-dom";

export default () => {
    return (
        <div>
            <div className="w3-container w3-black" style={{ position: "relative" }}>
                <h1 className="w3-padding-large w3-center w3-hide-small" style={{ display: "inline-block" }}>ToDo App</h1>
                <h1 className="w3-padding-large w3-center w3-hide-large w3-hide-medium">ToDo App</h1>
                <NavLink activeClassName="w3-green" className="w3-button w3-margin w3-hide-small" style={{ margin: "auto" }} to="/home" >List</NavLink>
                <NavLink activeClassName="w3-green" className="w3-button w3-margin w3-hide-small" style={{ margin: "auto" }} to="/featured" >Featured</NavLink>
                <NavLink activeClassName="w3-green" className="w3-button w3-margin w3-hide-small" style={{ margin: "auto" }} to="/settings" >Settings</NavLink>
                <span style={{ bottom: "0px", right : "0px", position: "absolute", fontSize : "8px" }}><a href="https://github.com/26prajval98" className="w3-btn w3-hover-none">By Prajval M</a></span>
            </div>
        </div>
    )
}
