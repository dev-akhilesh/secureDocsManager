import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token is missing');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            const headers = {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            };

            const response = await api.post('/files/upload', formData, { headers });

            alert(`File uploaded successfully. Code: ${response.data.code}`);
            navigate('/list');
        } catch (error) {
            console.error('File upload failed', error.response.data);
        }
    };

    return (
        <div style={containerStyle}>
            <h2>File Upload</h2>
            <input type="file" onChange={handleFileChange} style={inputStyle} />
            <button onClick={handleUpload} style={buttonStyle}>Upload</button>
        </div>
    );
};

const containerStyle = {
    textAlign: 'center',
    marginTop: '50px',
};

const inputStyle = {
    width:'30%',
    margin: '20px 20px',
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

export default FileUpload;
