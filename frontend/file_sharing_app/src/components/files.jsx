import React, { useEffect, useState } from 'react';
import { filesUrl } from '../settings'
import '../css/style.css';
import { Link } from 'react-router-dom';
import Error from "../pages/NoPage";

function FilesComponent() {
    const [files, setFiles] = useState([]);
    const [httpStatusCode, setHttpStatusCode] = React.useState();

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
                setHttpStatusCode(response.status);
                return response.json();
            }).then(data => {
                setFiles(data);
            }).catch(err => {
                throw new Error(err);
            }
            );
    }
    if (httpStatusCode === 404) {
        return <Error />
      }

    return (
        <div>
            <h3>Files</h3>
            {files.length === 0 && <p>Loading...</p>}
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