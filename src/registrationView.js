import React, { useState } from 'react';
import "./userApplicationForm.scss";

const RegistrationForm = () => {
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://api.shield-dev51.quest/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': "http://localhost:3001",
                },
                body: JSON.stringify({
                    username: login,
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
            } else {
                console.error('Failed to register:', response.statusText);
            }
        } catch (error) {
            console.error('Error', error.message);
        }
    };

    return (
        <div className="userApplicationForm">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="userBox">
                    <input
                        type="login"
                        onChange={handleLoginChange}
                        required
                    />
                    <label>
                        Login:
                    </label>
                </div>
                <div className="userBox">
                    <input
                        type="email"
                        onChange={handleEmailChange}
                        required
                    />
                    <label>
                        E-mail:
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
