import React, { Component } from 'react';
import { usersUrl, filesUrl } from '../settings';


class FileGiveAccess extends Component {
    state = {
        users: [],
    }
    componentDidMount() {
        this.fetchFileAccesses();
    }
    fetchFileAccesses = () => {
        fetch(usersUrl + 'users/', {
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
                    users: data,
                });
            }).catch(err => {
                throw new Error(err);
            }
            );
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            user: formData.get('user'),
            can_read: true,
            can_write_comment: formData.get('can_write_comment') === 'on' ? true : false,
        };
        fetch(filesUrl + this.props.id + '/access/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                return response.json();
            }).then(data => {
                this.setState({
                    success: data.success,
                    message: data.message,
                });
                if (data.success) {
                    window.location.reload();
                }
            }).catch(err => {
                console.log(err);
            }
            );
    }
    render() {
        return (
            <>
                <h3>Give Access</h3>
                <form onSubmit={this.handleSubmit}>
                    {this.state.success && this.state.message ? <div className="alert alert-success" role="alert">{this.state.message}</div> : null}
                    {!this.state.success && this.state.message ? <div className="alert alert-danger" role="alert">{this.state.message}</div> : null}
                    <input list="user" name="user" />
                    <datalist id="user">
                        {this.state.users.map(({ username }) => <option key={username} value={username} >{username}</option>)}
                    </datalist>
                    <br />
                    <input type="checkbox" id="can_write_comment" name="can_write_comment" />
                    <label htmlFor="can_write_comment">Can Comment?</label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </>

        );
    }
}

export default FileGiveAccess;