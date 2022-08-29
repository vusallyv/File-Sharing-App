import React, { Component } from 'react';
import { filesUrl } from '../settings';

class FileAccessTable extends Component {
    state = {
        fileAccesses: [],
    }

    componentDidMount() {
        this.fetchFileAccesses();
    }

    fetchFileAccesses = () => {
        fetch(filesUrl + this.props.id + '/access/', {
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
                this.setState({
                    fileAccesses: data,
                });
            }).catch(err => {
                throw new Error(err);
            }
            );
    }

    handleRemove = (id) => {
        fetch(filesUrl + this.props.id + '/access/' + id, {
            method: 'DELETE',
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
                window.location.reload();
            }).catch(err => {
                console.log(err);
            }
            );
    }

    render() {
        return (
            <div>
                <h3>File Accesses</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User</th>
                            <th scope="col">Can Read</th>
                            <th scope="col">Can Comment</th>
                            <th scope="col">Created</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.fileAccesses.map((fileAccess) => {
                            return (
                                <tr key={fileAccess.id}>
                                    <th scope="row">{fileAccess.id}</th>
                                    <td>{fileAccess.user.username}</td>
                                    {fileAccess.can_read ?
                                        <td>YES</td>
                                        :
                                        <td>NO</td>
                                    }
                                    {fileAccess.can_write_comment ?
                                        <td>YES</td>
                                        :
                                        <td>NO</td>
                                    }
                                    <td>{fileAccess.created_at}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => this.handleRemove(fileAccess.id)}>Remove</button>
                                    </td>
                                </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default FileAccessTable;