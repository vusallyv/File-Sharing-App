import React, { useEffect, useState } from 'react';
import { filesUrl } from '../../settings'
import '../../css/style.css';
import { Link } from 'react-router-dom';
import Error from "../../pages/NoPage";
import Spinners from '../bootstrap-components/spinners';

function FileList() {
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
            <h3 className='text-center my-3'>Files</h3>
            <div className='list-group'>
                {files.length === 0 && <Spinners spinner={'muted'} />}
                {files.map(file => (
                    <Link to={'/files/' + file.id} key={file.id} className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{file.name}</h5>
                            <small>{file.created_at}</small>
                        </div>
                        <p className="mb-1">{file.description}</p>
                        <small>Created by {file.user.username}</small>
                    </Link>
                ))}
            </div>
        </div>
    );
}


export default FileList;