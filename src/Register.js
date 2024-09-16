import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        otp: "",
        password: "",
    });
    const [generatedOTP, setGeneratedOTP] = useState(false);
    const [OTPVerified, setOTPVerified] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = formData;
        try {
            const res = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username, email, password
                }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error);
            }
            const resdata = await res.json();
            window.alert(resdata.message);
            setFormData({
                username: "",
                email: "",
                otp: "",
                password: "",
            });
            navigate('/login');
            // window.alert("Registration Successful");

        } catch (error) {
            window.alert(`Error: ${error.message}`);
        }

        
    };
    const verifyOTP = async () => {
        const { email, otp } = formData;
        const res = await fetch('http://localhost:3001/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }), // Send the email and OTP to the server
        });
        const data = await res.json();
        if (data.success) {
            alert('OTP verified');
            setOTPVerified(true);
        } else {
            alert('Invalid OTP');
        }
    };
    

    const generateOTP = async () => {
        setGeneratedOTP(true);
        const res = await fetch('http://localhost:3001/sendOTP', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email }),
        });
        const data = await res.json();
        if (data.success) {
            alert('OTP sent to your email');
        } else {
            alert('Error generating OTP');
        }
    }

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}  className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="button" onClick={generateOTP} >Generate Otp</button>

                {generatedOTP && <div className="form-group">
                    <label htmlFor="otp">OTP:</label>
                    <input
                        type="otp"
                        id="otp"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        required
                    />
                </div>}

                {generatedOTP && <button onClick={verifyOTP} type="button" >Verify OTP</button>}
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={!OTPVerified}>Register</button>
            </form>
        </div>
    );
};

export default Register;
