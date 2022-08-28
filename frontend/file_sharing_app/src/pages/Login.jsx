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
                if (!response.ok) {
                    this.setState({
                        error: true,
                        errorMessage: 'Invalid username or password'
                    });
                    throw new Error('Invalid username or password');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({
                    success: true,
                    successMessage: 'You are logged in successfully'
                });
                localStorage.setItem('access_token', data.access);
                window.location.href = '/';
            }).catch(err => {
                throw new Error(err);
            }
            );
    }

    render() {
        const { error, success } = this.state;
        return (
            <React.Fragment>
                <>
                    {/* Default form login */}
                    <form className="text-center border border-light p-5" action="#!">
                        <p className="h4 mb-4">Sign in</p>
                        {error &&
                            <h2>
                                {this.state.errorMessage}
                            </h2>
                        }
                        {success &&
                            <h2>
                                {this.state.successMessage}
                            </h2>
                        }
                        {/* Username */}
                        <input
                            type="text"
                            id="username"
                            className="form-control mb-4"
                            placeholder="Username"
                            onChange={this.handleOnChange}
                        />
                        {/* Password */}
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