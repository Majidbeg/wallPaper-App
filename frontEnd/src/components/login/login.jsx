import React, { useState } from 'react';
import LoginApi from '../../utills/API/signupLoginApi'
import { useAlert } from "react-alert";

import './login.css'


export function Login(props) {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const alert = useAlert();

    const handleLoginForm = (event) => {
        event.preventDefault();
        const login = LoginApi.login(email, password);
        login
            .then((e) => {
                if (e.type === "account not found") {
                    alert.error("Account not found!");
                }
                if (e.userToken) {
                    localStorage.setItem('userToken', e.userToken)
                    window.location.href = '/home'
                }
            });
    };

    return (
        <div className="login-screen-container">
            <div className="login-form">
                <form onSubmit={handleLoginForm} className="login-form-body">
                    <h3 className="login-heading">Login</h3>
                    <div className="login-form-input-section">
                        <label htmlFor="email">
                            <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" required />
                        </label>
                        <label htmlFor="password">
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" required />
                        </label>
                    </div>
                    <div className="login-form-submit-section">
                        <button type="submit" className="login-submit-btn">
                            Login in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Login;