import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from './logo.png'
const Home = (props) => {
    return (
        <div id='home'>

            <nav>

                <Link to="/"><img src={logo} alt="logo" /></Link>

                <ul>
                    {/* <li>
                        <Link to="/home" >Home</Link></li> */}
                    <li>
                        {!props.login ? <Link to="/login">Login</Link> : <Link to="profile">Profile</Link>}
                    </li>
                    <li>
                        {!props.login ? <Link to="/register">Register</Link> : ""}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;