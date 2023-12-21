import React, { useState } from 'react';
import "./userApplicationForm.scss";

const RegistrationForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://api.shield-dev51.quest/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=&username=${login}&password=${password}&scope=&client_id=&client_secret=`,
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("accessToken", data.access_token);
                window.location.href = '/wallet';
            } else {
                console.error('Failed to login:', response.statusText);
            }
        } catch (error) {
            console.error('Error', error.message);
        }
    };

    return (
        <div className="userApplicationForm">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="userBox">
                    <input
                        type="login"
                        onChange={handleLoginChange}
                        required
                    />
                    <label>
                        Login
                    </label>
                </div>
                <div className="userBox">
                    <input
                        type="password"
                        onChange={handlePasswordChange}
                        required
                    />
                    <label>
                        Password:
                    </label>
                </div>
                <button>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                </button>
            </form >

        </div >
    );
};

export default RegistrationForm;
