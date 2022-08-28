import React, { useEffect, useState } from 'react';
import { filesUrl } from '../settings'
import '../css/style.css';
import { Link } from 'react-router-dom';

function FilesComponent() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFile();
    }, []);

    const fetchFile = () => {
        fetch(filesUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
        })
            .then((response) => {
                if (!response.ok && response.status === 400) {
                    throw new Error('Bad request');
                }
                return response.json();
            }).then(data => {
                setFiles(data);
            }).catch(err => {
                throw new Error(err);
            }
            );
    }
    return (
        <div>
            <h3>Files</h3>
            <ul>
                {files.map(file => (
                    <li key={file.id}>
                        <Link to={'/files/' + file.id}>{file.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default FilesComponent;