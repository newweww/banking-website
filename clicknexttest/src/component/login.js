import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (value) => {
    setUserName(value);
  }

  const handlePasswordChange = (value) => {
    setPassword(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password
    }

    axios.post('https://localhost:7186/api/Logins/request', data)
      .then((response) => {
        const token = response.data.token;
        console.log('JWT Token:', token);
        localStorage.setItem('token', token);
        navigate('/home');
      })
      .catch((error) => {
        console.error('Login Error:', error);
        alert('Login failed. Please try again.');
      });
  }

  return (
    <div style={{ backgroundColor: 'whitesmoke', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='shadow border p-5'style={{ backgroundColor: 'white'}}>
        <div>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <input
              type="text"
              className="form-control m-2"
              id="username"
              placeholder="Enter username"
              onChange={(e) => handleNameChange(e.target.value)}
              name="username"
            />
            <input
              type="password"
              className="form-control m-2"
              id="password"
              placeholder="Enter password"
              onChange={(e) => handlePasswordChange(e.target.value)}
              name="password"
            />
          </div>
          <div>
            <button className='btn btn-success'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
