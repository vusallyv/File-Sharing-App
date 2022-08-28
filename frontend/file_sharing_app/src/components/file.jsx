import React, { useEffect, useState } from 'react';
import { filesUrl } from '../settings'
import '../css/style.css';


function FileComponent(props) {
    const [file, setFile] = useState({});

    useEffect(() => {
        fetchFile();
    }, []);

    const fetchFile = () => {
        fetch(filesUrl + props.id, {
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
                setFile(data);
            }).catch(err => {
                throw new Error(err);
            }
            );
    }
    return (
        <div>
            <h3>File</h3>
            <ul>
                <li>
                    This is the file {file.name}
                </li>
            </ul>
        </div>
    );
}


export default FileComponent;