import React, { useState } from 'react';
import RegisterApi from '../../utills/API/signupLoginApi'
import { useAlert } from "react-alert";

import './register.css'


export function Register() {
    const [uniqueUsername, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const alert = useAlert();

    const handleRegisterForm = (event) => {
        event.preventDefault();
        const registerDetails = RegisterApi.register(uniqueUsername, email, password);
        registerDetails
            .then((e) => {
                if (e.type === "username already exists") {
                    alert.error("username already exists!");
                }
                if (e === "registered success") {
                    alert.success("Registered successfully!");
                    window.location.href = '/login'
                }
            });
    };

    return (
        <div className="register-screen-container">
            <div className="register-form">
                <form onSubmit={handleRegisterForm} className="register-form-body ">
                    <h3 className="register-heading">Register</h3>
                    <div className="register-form-input-section">
                        <label htmlFor="username">
                            <input type="username" onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Username" required />
                        </label>
                        <label htmlFor="email">
                            <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" required />
                        </label>
                        <label htmlFor="password">
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" required />
                        </label>
                    </div>
                    <div className="register-form-submit-section d-flex justify-flex-end align-center">
                        <button type="submit" className="register-submit-btn">
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;