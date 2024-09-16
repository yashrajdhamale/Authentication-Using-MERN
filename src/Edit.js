import React, { useState, useEffect } from 'react';
import './Edit.css';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        expertise: "",
    });

    // Redirect to login if there's no token
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, email, firstName, lastName, expertise } = formData;

        if (!username || !password || !email || !firstName || !lastName || !expertise) {
            window.alert("All fields must be filled out.");
            return;
        }
        
        try {
            const res = await fetch('http://localhost:3001/edit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username, password, email, firstName, lastName, expertise
                }),
            });

            if (!res.ok) {
                navigate('/login');
            } else {
                const data = await res.json();
                window.alert("Profile updated successfully");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            window.alert("An error occurred while updating your profile.");
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Edit Component</h2>
            <form onSubmit={handleSubmit}>
                <label className="form-label">
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>
                <br />
                <label className="form-label">
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>
                <br />
                <label className="form-label">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>
                <br />
                <label className="form-label">
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>
                <br />
                <label className="form-label">
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>
                <br />
                <label className="form-label">
                    Expertise:
                    <input
                        type="text"
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>
                <br />
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default Edit;
