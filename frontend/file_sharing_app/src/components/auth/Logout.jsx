import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Logout extends Component{
    render() {
        if (localStorage.getItem("access_token")) {
            localStorage.removeItem("access_token");
            window.location.reload();
        }
        return (
            <React.Fragment>
                <div className="text-center">
                    <h1>You are logged out</h1>
                    <Link to="/login">Login</Link>
                </div>
            </React.Fragment>
        );
    }
}

export default Logout;