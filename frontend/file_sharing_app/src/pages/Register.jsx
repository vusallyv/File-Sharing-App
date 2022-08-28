import React, { Component } from 'react';
import { registerUrl } from '../settings';
import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.css';


class Register extends Component {
    state = {}

    handleOnChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    signUp = (e) => {
        e.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            // passwordConfirmation: this.state.passwordConfirmation,
            // phone_number: this.state.phone_number,
        }
        fetch(registerUrl, {
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
                        errorMessage: 'Something went wrong',
                    });
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    success: true,
                    successMessage: 'You are registered successfully'
                });
                window.location.href = '/';
            }).catch(err => {
                console.log(err);
            }
            );
    }

    render() {
        return (<>
            {/* Default form register */}
            {this.state.error ?
                <React.Fragment>
                    <div className="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                    </div>
                </React.Fragment>
                :
                null}
            {this.state.success ?

                <React.Fragment>
                    <div className="alert alert-success" role="alert">
                        {this.state.successMessage}
                    </div>
                </React.Fragment>
                :
                null}
            <form className="text-center border border-light p-5" action="#!">
                <p className="h4 mb-4">Sign up</p>
                {/* Username */}
                <input
                    onChange={this.handleOnChange}
                    type="text"
                    id="username"
                    className="form-control mb-4"
                    placeholder="Username"
                />
                {/* E-mail */}
                <input
                    onChange={this.handleOnChange}
                    type="email"
                    id="email"
                    className="form-control mb-4"
                    placeholder="E-mail"
                />
                {/* Password */}
                <input
                    onChange={this.handleOnChange}
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    aria-describedby="passwordHelpBlock"
                />
                <small
                    id="passwordHelpBlock"
                    className="form-text text-muted mb-4"
                >
                    At least 8 characters and 1 digit
                </small>
                {/* Password Confirmation */}
                {/* <input
                    onChange={this.handleOnChange}
                    type="password"
                    id="passwordConfirmation"
                    className="form-control"
                    placeholder="PasswordConfirmation"
                    aria-describedby="passwordConfirmationHelpBlock"
                /> */}
                {/* Phone number */}
                {/* <input
                onChange={this.handleOnChange}
                type="text"
                id="defaultRegisterPhonePassword"
                className="form-control"
                placeholder="Phone number"
                aria-describedby="defaultRegisterFormPhoneHelpBlock"
              />
              <small
                id="defaultRegisterFormPhoneHelpBlock"
                className="form-text text-muted mb-4"
              >
                Optional - for two step authentication
              </small> */}
                {/* Newsletter */}
                {/* <div className="custom-control custom-checkbox">
                    <input
                        onChange={this.handleOnChange}
                        type="checkbox"
                        className="custom-control-input"
                        id="defaultRegisterFormNewsletter"
                    />
                    <label
                        className="custom-control-label"
                        htmlFor="defaultRegisterFormNewsletter"
                    >
                        Subscribe to our newsletter
                    </label>
                </div> */}
                <br />
                {/* Sign up button */}
                <button onClick={this.signUp} className="btn btn-info my-4 btn-block" type="submit">
                    Sign in
                </button>
                {/* Social register */}
                {/* <p>or sign up with:</p>
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
              </a> */}
            </form>
            {/* Default form register */}
        </>

        );
    }
}



export default Register;