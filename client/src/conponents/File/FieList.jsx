import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token is missing');
                    return;
                }

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await api.get('/files/list', { headers });
                // Update the state with the fetched files
                setFiles(response.data.files);
            } catch (error) {
                console.error('Error fetching files', error.response.data);
            }
        };

        fetchFiles();
    }, []);

    const handleDelete = async (fileId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token is missing');
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await api.delete(`/files/${fileId}`, { headers });

            // Update the file list after deletion using the functional form of setFiles
            setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
        } catch (error) {
            console.error('Error deleting file', error.response.data);
        }
    };

    const handleDownload = async (fileId, code) => {
        const enteredCode = prompt('Enter the 6-digit code:');
        if (enteredCode && enteredCode.length === 6) {
            const token = localStorage.getItem('token');
            console.log('Authorization Header:', `Bearer ${token}`);

            try {
                const response = await api.post(`/files/generate-download-url/${fileId}`, { code: enteredCode }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Download URL Response:', response);
                // Navigate to the download URL
                window.location.href = response.data.downloadUrl;
            } catch (error) {
                console.error('Error generating download URL', error.response.data);
            }

        } else {
            alert('Please enter a valid 6-digit code.');
        }
    };

    return (
        <div style={containerStyle}>
            <h2>File List</h2>
            <ul style={listStyle}>
                {files.map((file) => (
                    <li key={file._id} style={listItemStyle}>
                        <div style={fileContainerStyle}>
                            {file.filename}{' '}
                            <button onClick={() => handleDelete(file._id)} style={buttonStyle}>Delete</button>
                            <button onClick={() => handleDownload(file._id, file.code)} style={buttonStyle}>Download</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const containerStyle = {
    textAlign: 'center',
    marginTop: '50px',
};

const listStyle = {
    itemAlign: 'center',
    listStyleType: 'none',
    padding: 0,
    
};

const listItemStyle = {
    margin: '10px 0',
};

const fileContainerStyle = {
    border: '1px solid #fff', // White border added
    padding: '10px',
    width: '50%',
    margin:'10px 300px'
};

const buttonStyle = {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginRight: '5px',
};

export default FileList;
