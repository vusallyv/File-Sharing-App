import React, { Component } from 'react';
import { api_url } from '../settings'
import '../css/style.css';


class File extends Component {
    state = {
        files: [

        ],
    }

    deleteFile = (id) => {
        const files = this.state.files.filter(file => file.id !== id);
        this.setState({ files });
    }

    styles = {
        margin: '0 0 5rem 0'
    }

    render() {
        return (
            this.state.files.map(file => (
                <div key={file.id} style={this.styles}>
                    <h3>{file.name}</h3>
                    <p>{file.description}</p>
                    <img src={file.imageUrl} alt={file.name} />
                    <br />
                    <button onClick={() => this.deleteFile(file.id)}>Delete</button>
                </div>
            ))
        );
    }
}

export default File;