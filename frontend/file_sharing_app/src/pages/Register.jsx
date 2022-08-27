import React, { Component } from 'react';
import { registerUrl } from '../settings';
import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.css';


class Register extends Component {
    state = {
        registerUrl: registerUrl,
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    signUp = (e) => {
        console.log(this);
        e.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            // passwordConfirmation: this.state.passwordConfirmation,
            // phone_number: this.state.phone_number,
        }
        fetch('http://localhost:8000/user/register/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })

            .then(res => res.json())
            .then(data => {
                console.log(data);
                // if (data.status) {
                //     alert('You are registered');
                //     // this.props.history.push('/login');
                // } else {
                //     alert(data.message);
                // }
            }).catch(err => {
                console.log(err);
            }
            );
    }

    render() {
        return (<>
            {/* Default form register */}
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
                <div className="form-row mb-4">
                    <div className="col">
                        {/* First name */}
                        <input
                            onChange={this.handleOnChange}
                            type="text"
                            id="first_name"
                            className="form-control"
                            placeholder="First name"
                        />
                    </div>
                    <div className="col">
                        {/* Last name */}
                        <input
                            onChange={this.handleOnChange}
                            type="text"
                            id="last_name"
                            className="form-control"
                            placeholder="Last name"
                        />
                    </div>
                </div>
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
                <div className="custom-control custom-checkbox">
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
                </div>
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
                <hr />
                {/* Terms of service */}
                <p>
                    By clicking
                    <em>Sign up</em> you agree to our
                    <a href="" target="_blank">
                        terms of service
                    </a>
                </p>
            </form>
            {/* Default form register */}
        </>

        );
    }
}



export default Register;