import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use the useNavigate hook to get the navigate function

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { username, password });
            const token = response.data.token;
            // Store the token in localStorage
            localStorage.setItem('token', token);
            // Handle successful login
            console.log('Login successful', response.data);
            // Redirect to the upload page
            navigate('/upload');
        } catch (error) {
            console.error('Login failed', error.response.data);
        }
    };

    return (
        <div style={containerStyle}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
            />
            <button onClick={handleLogin} style={buttonStyle}>
                Login
            </button>
        </div>
    );
};

const containerStyle = {
    textAlign: 'center',
    marginTop: '50px',
};

const inputStyle = { 
    width: '20%',
    padding: '10px',
    margin: '10px 10px',
    boxSizing: 'border-box',
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
};

export default Login;
