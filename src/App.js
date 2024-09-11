import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import Edit from './Edit';
import { useState } from 'react';
function App() {
  const [login, setlogin] = useState(false);

  return (
    <Router>
      <Home login={login}/>
      <Routes>

        <Route path="/login" element={<Login setlogin={setlogin}/>} />
        <Route path="/register" element={<Register />} />
        <Route path='/profile' element={<Profile setlogin={setlogin}/>} />
        <Route path='/edit' element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
