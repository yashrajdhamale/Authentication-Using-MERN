import React, { useEffect, useState } from 'react';
import './Profile.css'; // Make sure you link the CSS file
import { Link, useNavigate } from 'react-router-dom';

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
                // throw new Error(data.error);
            }

            setProfile(data.profile);
        } catch (error) {
            window.alert(`Error: ${error.message}`);
        }
    };

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/login');

        props.setlogin(false);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {profile ? (
                <div className="profile-details">
                    <p>Username: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                </div>
            ) : (
                <p className="loading">Loading...</p>
            )}
            {/* <Link to="/edit">Edit Profile</Link> */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
