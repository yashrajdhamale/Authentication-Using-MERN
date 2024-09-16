import React, { useEffect, useState } from 'react';
import './Profile.css'; // Make sure you link the CSS file
import { useNavigate } from 'react-router-dom';

const Profile = (props) => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:3001/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            const data = await res.json();
            console.log(data);
            if (!res.ok) {
                navigate('/login');
            }

            setProfile(data.profile);
        } catch (error) {
            window.alert(`Error: ${error.message}`);
        }
    };

    const loadDashboard = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch('http://localhost:3001/dashboard', {
                method: 'GET',
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            });
            const data = await res.json();
            if (!res.ok) {
                navigate('/login');
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/home');
        props.setlogin(false);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="profile-container">
            <h2 className="profile-heading">Profile</h2>
            {profile ? (
                <div className="profile-details">
                    <p>Username: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                </div>
            ) : (
                <p className="loading">Loading...</p>
            )}

            <button className="profile-button" onClick={handleLogout}>Logout</button>
            <button className="profile-button dashboard-button" onClick={loadDashboard}>Dashboard</button>
            
        </div>
    );
};

export default Profile;
