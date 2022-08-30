import React, { useEffect, useState } from 'react';
import { filesUrl } from '../../settings'
import '../../css/style.css';
import Spinners from '../bootstrap-components/spinners';


function SingleFile(props) {
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
            {file.user ? 
                <>
                    <h3 className='text-center'>File</h3>
                    <div className="card text-center">
                        <div className="card-header">
                            {file.name}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{file.description}</h5>
                            {/* <p className="card-text">Created by {file.user.username}</p> */}
                        </div>
                        <div className="card-footer text-muted">
                            Created at: {file.created_at}
                        </div>
                    </div>
                </>
                : <Spinners spinner={'muted'} />}
        </div>
    );
}


export default SingleFile;