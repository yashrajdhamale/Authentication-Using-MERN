import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const Home = (props) => {
    return (
        <div id='home'>
            <nav>
                <ul>
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