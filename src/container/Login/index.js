import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, LinearProgress, Fab, Box, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

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

class Login extends Component {
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
		const { email, password } = this.props;
		let fieldValidationErrors = this.state.formErrors;
		if (email === "") { fieldValidationErrors.blankEmail = true; }
		if (password === "") { fieldValidationErrors.blankPassword = true; }
		if (!this.validateEmail(email)) { fieldValidationErrors.invalidEmail = true; }
		await this.setState({
			formErrors: fieldValidationErrors
		})
		if (email !== '' && password !== '') {
			var userDetails = { email, password }
			this.props.signinUserWithFirebase(userDetails, this.props.history);
		}
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
		this.props.history.push('/register');
	}
	onForgotPassword() {
		this.props.history.push('/forgot-password2');
	}

	// main render function
	render() {
		const { blankEmail, blankPassword, invalidEmail } = this.state.formErrors;
		const { email, password, loading, error, isDarkModeActive } = this.props;
		return (
			<div>
				{loading &&
					<LinearProgress  style={{height:'4px'}} />
				}
				<div className="session-wrapper">
					<Grid container justify="center" alignItems="center">
						<Grid item  xs={12} sm={12} md={6} lg={4} className="login-wrap">
							<div className="login-wrapper text-center" >
								<div className="w-100">
									<div className="session-logo">
										{isDarkModeActive ?
											<img className="img-fluid" alt="img" width="100" src={require(`assets/Images/base-light.png`)} />
											:
											<img className="img-fluid" alt="img" width="100" src={require(`assets/Images/base.png`)} />
										}
									</div>
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
										<Box mb="40px" pt="20px">
											<Button
												color="primary"
												className="btn-block blockBtn w-100"
												variant="contained"
												size="large"
												onClick={this.onUserLogin.bind(this)}
											>
												Sign In
											</Button>
										</Box>
										<Box fontSize="subtitle2.fontSize">
											<Box style={{ cursor:'pointer'}} color="primary.main" onClick={() => this.onForgotPassword()}>Forgot password?</Box>
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
										<div className="or-sign-up">
											<Typography variant="body2">Not Having an Account</Typography>
											<Button variant="outlined" size="large" color="primary" onClick={() => this.onUserSignUp()}>Sign Up</Button>
										</div>
									</form>
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={8} style={{ backgroundImage: "url(" + require('assets/Images/session1bg.jpg') + ")", backgroundSize: 'cover', backgroundPosition: 'center right' }} className="img-session">
							<div className="login-content">
								<Box fontSize="h1.fontSize" fontWeight="h1.fontWeight" mb={4} color="common.white">
									Benefit Yourself With Our 100+ Designs
								</Box>
								<Button variant="contained" className="btn-block-md" onClick={() => this.onUserSignUp()}>Sign Up</Button>
							</div>
						</Grid>
					</Grid>
				</div>
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
})(Login);