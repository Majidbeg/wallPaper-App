import React from 'react';
import { NavLink } from 'react-router-dom'
import './landing.css'

export function landing(props) {

    return (
        <div className="landing-container">

            <div className="landing-wrapper">
                <div className="navlink-wrapper">
                    <NavLink className="navlink-auth" to="/register">Register</NavLink>
                    <NavLink className="navlink-auth" to="/login">login</NavLink>
                </div>
            </div>
            <div className="welcome-content">
                Welcome to wallpaper app
            </div>

        </div>
    );
}


export default landing;