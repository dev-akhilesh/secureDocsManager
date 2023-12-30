import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>SecureDocsManager</h1>
            <div style={{ marginTop: '20px' }}>
                <Link to="/register" style={buttonStyle}>Register</Link>
                <Link to="/login" style={buttonStyle}>Already Registered</Link>
            </div>
        </div>
    );
};

const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    margin: '0 10px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
};

export default Home;
