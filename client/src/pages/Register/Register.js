// Include React
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { userAPI } from "../../utils/API";

require('./register.css');

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            username: '',
            password: '',
            passwordRepeat: '',
            email: '',
            emailRepeat: '',
            admin: ''
        };

        this.handleUsernameValidation = this.handleUsernameValidation.bind(this);
        this.handlePasswordValidation = this.handlePasswordValidation.bind(this);
        this.handlePasswordRepeat = this.handlePasswordRepeat.bind(this);
        this.handleEmailValidation = this.handleEmailValidation.bind(this);
        this.handleEmailRepeat = this.handleEmailRepeat.bind(this);
        this.signUpUser = this.signUpUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdminValidation = this.handleAdminValidation.bind(this);
    }

    handleUsernameValidation(event) {
        // username is passed in
        const usernameVal = this.refs.username.value,
            usernameForm = this.refs.usernameForm,
            usernameFeedback = this.refs.usernameFeedback;
        // username is updated in state
        this.setState({
            'username': usernameVal
        });

        // username is checked to see if it matches certain length. If not, the screen will indicate it as such.
        if (usernameVal.length < 6) {
            usernameForm.classList.remove("has-success");
            usernameForm.classList.add("has-error");
            usernameFeedback.textContent = "username must be at least 6 characters long";
        } else {
            usernameForm.classList.remove("has-error");

            usernameForm.classList.add("has-success");
            usernameFeedback.textContent = "Username valid!";
        }
    }

    handleAdminValidation(event) {
        // username is passed in
        const adminVal = this.refs.admin.value,
            adminForm = this.refs.adminForm,
            adminFeedback = this.refs.adminFeedback;
        // admin is updated in state
        this.setState({
            'admin': adminVal
        });

        // admin is checked to see if it matches certain length. If not, the screen will indicate it as such.
        if (adminVal.length < 6) {
            adminForm.classList.remove("has-success");
            adminForm.classList.add("has-error");
            adminFeedback.textContent = "please enter only the teacher's lastname!";
        } else {
            adminForm.classList.remove("has-error");

            adminForm.classList.add("has-success");
            adminFeedback.textContent = "Username valid!";
        }
    }

    handlePasswordValidation(event) {

        // password is passed in
        const passwordVal = this.refs.password.value;
        const passwordForm = this.refs.passwordForm;
        const passwordFeedback = this.refs.passwordFeedback;

        this.setState({
            'password': passwordVal
        });

        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
        if (!passwordRegEx.test(passwordVal)) {
            passwordForm.classList.remove("has-success");
            passwordForm.classList.add("has-error");
            passwordFeedback.textContent = "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and must be at least 8 characters long.";
        } else {
            passwordForm.classList.remove("has-error");

            passwordForm.classList.add("has-success");
            passwordFeedback.textContent = "Password set correctly!";
        }
    }

    handlePasswordRepeat(event) {
        const passwordVal = this.state.password;
        const passwordRepeat = this.refs.repeatPassword.value;
        const repeatPasswordForm = this.refs.repeatPasswordForm;
        const repeatPasswordFeedback = this.refs.repeatPasswordFeedback;

        this.setState({
            'passwordRepeat': passwordRepeat
        });

        if (passwordVal !== passwordRepeat) {
            repeatPasswordForm.classList.remove("has-success");

            repeatPasswordForm.classList.add("has-error");
            repeatPasswordFeedback.textContent = "Passwords Don't Match";
        } else {
            repeatPasswordForm.classList.remove("has-error");

            repeatPasswordForm.classList.add("has-success");
            repeatPasswordFeedback.textContent = "Passwords Match!";
        }
    }

    handleEmailValidation(event) {

        const emailVal = this.refs.email.value;
        const emailForm = this.refs.emailForm;
        const emailFeedback = this.refs.emailFeedback;
        const emailAdditionalFeedback = this.refs.emailAdditionalFeedback;
        const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        this.setState({
            'email': emailVal
        });

        if (!emailRegEx.test(emailVal)) {
            emailForm.classList.remove("has-success");

            emailForm.classList.add("has-error");
            emailFeedback.textContent = "Invalid Email";
            emailAdditionalFeedback.textContent = "Ex: someone@example.com";

        } else {
            emailForm.classList.remove("has-error");

            emailForm.classList.add("has-success");
            emailFeedback.textContent = "Valid Email!";
            emailAdditionalFeedback.textContent = "";
        }
    }

    handleEmailRepeat(event) {

        const emailVal = this.refs.emailRepeat.value;
        const emailForm = this.refs.emailRepeatForm;
        const emailFeedback = this.refs.emailRepeatFeedback;
        const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        this.setState({
            'emailRepeat': emailVal
        });

        if (!emailRegEx.test(emailVal)) {
            emailForm.classList.remove("has-success");

            emailForm.classList.add("has-error");
            emailFeedback.textContent = "Emails Don't Match";

        } else {
            emailForm.classList.remove("has-error");

            emailForm.classList.add("has-success");
            emailFeedback.textContent = "Emails Match!";
        }
    }

    signUpUser(userData) {
        
        userAPI.saveUser(userData.username, userData.password, userData.email, userData.admin)
        .then(function (data) {
            console.log(data);
            var message = data.data ? data.data.message : '';

            if (message.includes("duplicate")) {
                alert("Sorry, that username has been taken");
            } else if (data.statusText === "OK") {
                console.log("yay!")
                this.props.authenticate();
                this.setState({
                    redirectToReferrer: true
                });
            }
        }.bind(this)).catch(function (err) {
            console.log(err);
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const username = this.state.username;
        const email = this.state.email;
        const password = this.state.password;
        const admin = this.state.admin;

        let userData = {
            username: username,
            email: email,
            password: password,
            admin: admin
        };

        if (!userData.username || !userData.email || !userData.password || !userData.admin) {
            return alert("Please don't leave fields blank");
        }

        // If we have an email and password, run the signUpUser function
        this.signUpUser(userData);

        this.setState({
            value: '',
            username: '',
            password: '',
            passwordRepeat: '',
            email: '',
            emailRepeat: '',
            admin: '',
            redirectToReferrer: false
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            )
        }

        return (
            <div>
                <div id="registration-container" className="container-fluid">
                    <section className="container">
                        <div className="container-page">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="col-md-6">
                                    <h3 className="dark-grey">Registration</h3>

                                    <div id="username-form" ref="usernameForm" className="form-group col-lg-12">
                                        <label>Username</label>
                                        <input type="" name="" ref="username" className="form-control" id="username-input" value={this.state.username} onChange={this.handleUsernameValidation} />
                                        <small id="username-feedback" ref="usernameFeedback" className=""></small>
                                    </div>

                                    <div id="password-form" className="form-group col-lg-12" ref="passwordForm">
                                        <label>Password</label>
                                        <input type="password" name="" ref="password" className="form-control" id="password-input" value={this.state.password} onChange={this.handlePasswordValidation} />
                                        <small id="password-feedback" ref="passwordFeedback" className=""></small>
                                    </div>

                                    <div id="repeat-password-form" className="form-group col-lg-12" ref="repeatPasswordForm">
                                        <label>Repeat Password</label>
                                        <input type="password" name="" ref="repeatPassword" className="form-control" id="repeat-password-input" value={this.state.passwordRepeat} onChange={this.handlePasswordRepeat} />
                                        <small id="repeat-password-feedback" className="" ref="repeatPasswordFeedback"></small>
                                    </div>

                                    <div id="email-form" className="form-group col-lg-12" ref="emailForm">
                                        <label>Email Address</label>
                                        <input type="email" name="" ref="email" className="form-control" id="email-input" value={this.state.email} onChange={this.handleEmailValidation} />

                                        <p id="email-feedback" className="" ref="emailFeedback"></p>
                                        <small id="email-additional-feedback" ref="emailAdditionalFeedback" className="form-text text-muted"></small>
                                    </div>

                                    <div id="email-repeat-form" className="form-group col-lg-12" ref="emailRepeatForm">
                                        <label>Repeat Email Address</label>
                                        <input type="email" name="" ref="emailRepeat" className="form-control" id="repeat-email-input" value={this.state.emailRepeat} onChange={this.handleEmailRepeat} />
                                        <small id="email-repeat-feedback" className="" ref="emailRepeatFeedback"></small>
                                    </div>
                                    <div id="admin-form" ref="adminForm" className="form-group col-lg-12">
                                        <label>Teacher Name</label>
                                        <input type="" name="" ref="admin" className="form-control" id="admin-input" value={this.state.admin} onChange={this.handleAdminValidation} />
                                        <small id="admin-feedback" ref="adminFeedback" className=""></small>
                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <button type="submit" className="btn btn-primary register">Register</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}