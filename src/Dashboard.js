import React, { useEffect } from 'react';
import './Dashboard.css';
import { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        expertise: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            console.log(token);
            try {
                const res = await fetch("http://localhost:3001/dashboard", {
                    method: "GET",
                    headers: {
                        "authorization": `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    //if response is not ok, redirect to login page
                    navigate('/login');
                }
                const data = await res.json();
                setFormData(data.profile);

            } catch (error) {
                // Handle the error here

            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-heading">Dashboard</h1>
            <div className="dashboard-details">
                <p><strong>Username:</strong> {formData.username ? formData.username : "Empty"}</p>
                <p><strong>Email:</strong> {formData.email ? formData.username : "Empty"}</p>
                <p><strong>First Name:</strong> {formData.firstName ? formData.firstName : "Empty"}</p>
                <p><strong>Last Name:</strong> {formData.lastName ? formData.lastName : "Empty"}</p>
                <p><strong>Expertise:</strong> {formData.expertise ? formData.expertise : "Empty"}</p>
            </div>
            <Link to="/edit"> <button className="edit-button" >Edit Information</button> </Link>
        </div>
    );
};

export default Dashboard;
