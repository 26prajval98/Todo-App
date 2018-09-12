import React from 'react';
import { NavLink } from "react-router-dom";

export default () => {
    return (
        <div>
            <div className="w3-container w3-black w3-bar">
                <NavLink activeClassName="w3-green" className="w3-bar-item w3-button w3-margin" to="/home" >List</NavLink>
                <NavLink activeClassName="w3-green" className="w3-bar-item w3-button w3-margin" to="/featured" >Featured</NavLink>
                <NavLink activeClassName="w3-green" className="w3-bar-item w3-button w3-margin" to="/settings" >Settings</NavLink>
            </div>
        </div>
    )
}
