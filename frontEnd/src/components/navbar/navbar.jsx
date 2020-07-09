import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import './navbar.css'
import jwt from 'jsonwebtoken';
import User from '../assets/user .png'

export function Home(props) {

    const [userName, setUserName] = useState('')

    useEffect(() => {
        const userToken = localStorage.getItem("userToken")
        const decodeUserToken = jwt.decode(userToken);
        setUserName(decodeUserToken.uniqueUsername)
    }, [])

    return (
        <div className="home-container">
            <div className="navbar">
                <div className="companyname">
                    WallPapers
                </div>
                <div className="nav-link-wrapper">
                    <NavLink className="navlink" to="/home">Home</NavLink>
                    <NavLink className="navlink" to="/favorite">Favorite</NavLink>
                </div>
                <div className="user-name">
                    <img src={User} alt="user" height="20px" width="20px" />
                    <div>
                        {userName}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Home;