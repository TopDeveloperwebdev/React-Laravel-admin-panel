import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Checkbox, Fab, Box, Typography } from "@material-ui/core";

// redux action
import {
	signinUserWithFirebase,
	onEmailChanged,
	onPasswordChanged,
	signinUserWithGoogle,
	signinUserWithFacebook,
	signinUserWithTwitter,
	signinUserWithGithub
} from 'actions';

class FirebaseLogin extends Component {
	//constructor
	constructor(props) {
		super(props);
		this.state = {
			formErrors: {
				blankEmail: false,
				invalidEmail: false,
				blankPassword: false
			}
		}
	}
	/**
	 * Function to login user using Firebase
	*/
	async onUserLogin() {
		// const { email, password } = this.props;
		// let fieldValidationErrors = this.state.formErrors;
		// if (email === "") { fieldValidationErrors.blankEmail = true; }
		// if (password === "") { fieldValidationErrors.blankPassword = true; }
		// if (!this.validateEmail(email)) { fieldValidationErrors.invalidEmail = true; }
		// await this.setState({
		// 	formErrors: fieldValidationErrors
		// })
		// if (email !== '' && password !== '') {
		// 	var userDetails = { email, password }
		// 	this.props.signinUserWithFirebase(userDetails, this.props.history);
		// }
	}

	/**
	 * Function to detect email changes
	 */
	onEmailChanged(e) {
		let fieldValidationErrors = this.state.formErrors;
		fieldValidationErrors.blankEmail = false;
		// fieldValidationErrors.invalidEmail = false;
		this.setState({ formErrors: fieldValidationErrors })
		this.props.onEmailChanged(e.target.value);
	}

	/**
	 * Function to detect login password changes
	 */
	onPasswordChanged(e) {
		let fieldValidationErrors = this.state.formErrors;
		fieldValidationErrors.blankPassword = false;
		this.setState({ formErrors: fieldValidationErrors });
		this.props.onPasswordChanged(e.target.value);
	}

	/**
	* Function is use for check the email validation.
	*/
	validateEmail(email) {
		let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
		return emailValid;
	}

	/**
	 * Function to show error
	 */
	renderError() {
		if (this.props.error) {
			return (
				<div style={{ backgroundColor: 'white' }}>
					<TextField>{this.props.error}</TextField>
				</div>
			);
		}
	}

	/**
	 * On User Sign Up
	 */
	onUserSignUp() {
		this.props.history.push('/signup');
	}
	onForgotPassword() {
		this.props.history.push('/forgot-password');
	}

	// handleChange = (event) => {
	// 	setState({ ...state, [event.target.name]: event.target.checked });
	// };
	// main render function
	render() {
		const { blankEmail, blankPassword, invalidEmail } = this.state.formErrors;
		const { email, password, error } = this.props;

		return (
			<div>
				<form className="login-form">
					<Box mb={3}>
						<TextField
							required
							fullWidth
							id="username"
							type="email"
							name="email"
							label="Email Address"
							placeholder="Please enter your email address."
							className=""
							value={email}
							onChange={(email) => this.onEmailChanged(email)}
							error={blankEmail || invalidEmail || error ? true : false}
						/>
						{blankEmail &&
							<Box component="span" color="error.main" textAlign="left" display="block" fontSize="subtitle2.fontSize" pt={1}>Email cannot be empty.</Box>
						}
						{!blankEmail && invalidEmail &&
							<Box component="span" color="error.main" textAlign="left" display="block" fontSize="subtitle2.fontSize" pt={1}>The email address is badly formatted.</Box>
						}
					</Box>
					<Box mb={3}>
						<TextField
							required
							fullWidth
							id="login-password"
							label="Password"
							placeholder="Please enter your login password."
							className=""
							type="password"
							value={password}
							error={blankPassword || error ? true : false}
							onChange={this.onPasswordChanged.bind(this)}
						/>
						{blankPassword &&
							<Box component="span" color="error.main" textAlign="left" display="block" fontSize="subtitle2.fontSize" pt={1}>Password cannot be empty</Box>
						}
					</Box>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Box display="flex" alignItems="center">
							<Checkbox color="primary" value="uncontrolled" inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
							<Box component="span" fontSize="subtitle2.fontSize">Remember me</Box>
						</Box>
						<Box fontSize="subtitle2.fontSize">
							<Box style={{ cursor: 'pointer' }} color="primary.main" onClick={() => this.onForgotPassword()}>Forgot password?</Box>
						</Box>
					</Box>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Box mb="40px" pt="20px">
							<Button
								color="primary"
								className="btn-block"
								variant="contained"
								size="large"
								onClick={this.onUserLogin.bind(this)}
							>
								Sign Up
							</Button>
						</Box>
						<Box mb="40px" pt="20px">
							<Button
								color="primary"
								className="btn-block"
								variant="contained"
								size="large"
								onClick={this.onUserLogin.bind(this)}
							>
								Sign In
							</Button>
						</Box>
					</Box>
					<div className="social-login-wrapper">
						<Typography variant="body2">Sign in with</Typography>
						<div className="social-list">
							<Fab size="small" variant="round" className="text-white facebook-color"
								onClick={() => this.props.signinUserWithFacebook(this.props.history)}
							>
								<i className="fab fa-facebook-f"></i>
							</Fab>
							<Fab size="small" variant="round" className="text-white google-color"
								onClick={() => this.props.signinUserWithGoogle(this.props.history)}
							>
								<i className="fab fa-google-plus-g"></i>
							</Fab>
							<Fab size="small" variant="round" className="text-white twitter-color"
								onClick={() => this.props.signinUserWithTwitter(this.props.history)}
							>
								<i className="fab fa-twitter"></i>
							</Fab>
							<Fab size="small" className="text-white github-color"
								onClick={() => this.props.signinUserWithGithub(this.props.history)}
							>
								<i className="fab fa-github-alt"></i>
							</Fab>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = ({ authUser, settings }) => {
	const { loading, email, password, error } = authUser;
	const { isDarkModeActive } = settings;
	return { loading, email, password, error, isDarkModeActive };
};

export default connect(mapStateToProps, {
	signinUserWithFirebase,
	onEmailChanged,
	onPasswordChanged,
	signinUserWithGoogle,
	signinUserWithFacebook,
	signinUserWithTwitter,
	signinUserWithGithub
})(FirebaseLogin);