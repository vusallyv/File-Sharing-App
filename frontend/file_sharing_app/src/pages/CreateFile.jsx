import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { filesUrl } from '../settings'


const CreateFile = () => {
    function handleOnSubmit(event) {
        console.log(event);
        event.preventDefault();
        const data = new FormData(document.getElementById("my-file"));
        fetch(filesUrl, {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(response => {
            if (!response.ok && response.status === 400) {
                throw new Error('Bad request');
            }
            return response.json();
        }).then(data => {
            console.log(data);
        }).catch(err => {
            throw new Error(err);
        }
        );
    }


    return (
        <form encType="multipart/form-data" action="" method="post" id="my-file">
            <label htmlFor="file">Select a file:</label>
            <input type="file" id="file" name="file" />
            <br />
            <br />
            <input onClick={handleOnSubmit} type="submit" />
        </form>
    );
};

export default CreateFile;