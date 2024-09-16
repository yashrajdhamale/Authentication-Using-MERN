import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Nav from './Nav';
import Profile from './Profile';
import Edit from './Edit';
import Home from './Home';
import { useState } from 'react';
import Dashboard from './Dashboard';
function App() {
  const [login, setlogin] = useState(false);

  return (
    <Router>
      <Nav login={login}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login setlogin={setlogin}/>} />
        <Route path="/register" element={<Register />} />
        <Route path='/profile' element={<Profile setlogin={setlogin}/>} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
