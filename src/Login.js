import React, { useState } from 'react';
import './Login.css';

const Login = (props) => {
    

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = formData;

        try {
            const res = await fetch('http://localhost:3001/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username, password
                }),
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error);
            }

            // Store the token in localStorage
            localStorage.setItem("token", data.token);
            props.setlogin(true);
            window.alert("Login Successful");
        } catch (error) {
            window.alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} method="POST" className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={formData.username}
                        name="username"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
