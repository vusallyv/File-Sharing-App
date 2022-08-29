import React, { Component } from 'react';
import { loginUrl } from '../settings';
import { Link } from 'react-router-dom';


class Login extends Component {
    state = {}

    handleOnChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
        }
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                this.setState({
                    success: false,
                    error: false,
                });
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    this.setState({
                        success: data.success,
                        successMessage: data.message,
                    });
                    localStorage.setItem('access_token', data.access);
                    window.location.href = '/';
                } else {
                    this.setState({
                        success: data.success,
                        successMessage: data.message,
                    });
                }
            }).catch(err => {
                throw new Error(err);
            }
            );
    }

    handleError = (field) => {
        if (!this.state.status && this.state.successMessage && Object.keys(this.state.successMessage)) {
            return (
                <React.Fragment>
                    <span>
                        <small className="text-danger">{this.state.successMessage[field]}</small>
                    </span>
                </React.Fragment>
            );
        } else {
            return null;
        }
    }

    render() {
        const { error, success } = this.state;
        return (
            <React.Fragment>
                <>
                    {!this.state.success && this.state.successMessage ?
                        <React.Fragment>
                            <div className="alert alert-danger text-center" role="alert">
                                {this.state.successMessage}
                            </div>
                        </React.Fragment>
                        :
                        null}
                    {/* Default form login */}
                    <form className="text-center border border-light p-5" action="#!">
                        <p className="h4 mb-4">Sign in</p>
                        {/* Username */}
                        {this.handleError('username')}
                        <input
                            type="text"
                            id="username"
                            className="form-control mb-4"
                            placeholder="Username"
                            onChange={this.handleOnChange}
                        />
                        {/* Password */}
                        {this.handleError('password')}
                        <input
                            type="password"
                            id="password"
                            className="form-control mb-4"
                            placeholder="Password"
                            onChange={this.handleOnChange}
                        />
                        <div className="d-flex justify-content-around">
                            <div>
                                {/* Remember me */}
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="defaultLoginFormRemember"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="defaultLoginFormRemember"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div>
                                {/* Forgot password */}
                                <a href="">Forgot password?</a>
                            </div>
                        </div>
                        {/* Sign in button */}
                        <button onClick={this.handleOnSubmit} className="btn btn-info btn-block my-4" type="submit">
                            Sign in
                        </button>
                        {/* Register */}
                        <p>
                            Not a member?
                            <Link to="/register">Register</Link>
                        </p>
                        {/* Social login */}
                        <p>or sign in with:</p>
                        <a href="#" className="mx-2" role="button">
                            <i className="fab fa-facebook-f light-blue-text" />
                        </a>
                        <a href="#" className="mx-2" role="button">
                            <i className="fab fa-twitter light-blue-text" />
                        </a>
                        <a href="#" className="mx-2" role="button">
                            <i className="fab fa-linkedin-in light-blue-text" />
                        </a>
                        <a href="#" className="mx-2" role="button">
                            <i className="fab fa-github light-blue-text" />
                        </a>
                    </form>
                    {/* Default form login */}
                </>
            </React.Fragment>
        );
    }
}

export default Login;