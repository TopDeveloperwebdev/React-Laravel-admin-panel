import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, LinearProgress, Typography, Grid, Box, Checkbox } from "@material-ui/core";

// redux action
import {
	signupUserWithFirebase,
	onEmailChanged,
	onPasswordChanged
} from 'actions';

class Register extends Component {
	//constructor
	constructor(props) {
		super(props);
		this.state = {
			formErrors: {
				blankEmail: false,
				validEmail: false,
				blankPassword: false
			}
		}
	}
	/**
	 * Signup user using firebase
	 */
	async onUserSignup() {
		const { email, password } = this.props;
		let fieldValidationErrors = this.state.formErrors;
		if (email === "") { fieldValidationErrors.blankEmail = true; }
		if (password === "") { fieldValidationErrors.blankPassword = true; }
		if (!this.validateEmail(email)) { fieldValidationErrors.validEmail = true; }
		await this.setState({
			formErrors: fieldValidationErrors
		})
		if (email !== '' && password !== '') {
			var userDetails = { email, password }
			this.props.signupUserWithFirebase(userDetails, this.props.history);
		}
	}

	/**
	 * Function to detect email changes
	 */
	onEmailChanged(e) {
		let fieldValidationErrors = this.state.formErrors;
		fieldValidationErrors.blankEmail = false;
		fieldValidationErrors.validEmail = false;
		this.setState({ formErrors: fieldValidationErrors })
		this.props.onEmailChanged(e.target.value);
	}

	/**
	 * Function to detect password changes
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
	 * On User Sign Up
	 */
	onUserSignIn() {
		this.props.history.push('/login');
	}

	// main render function
	render() {
		const { blankEmail, blankPassword, validEmail } = this.state.formErrors;
		const { email, password, loading, isDarkModeActive } = this.props;
		return (
			<div>
				{loading &&
					<LinearProgress style={{height:'4px'}} />
				}
				<div className="session-wrapper">
					<Grid container justify="center" alignItems="center">
						<Grid item xs={12} sm={12} md={6} lg={4} className="login-wrap">
							<div className="login-wrapper text-center">
								<div className="w-100">
									<div className="session-logo">
										{isDarkModeActive ?
											<img className="img-fluid" alt="img" width="100" src={require(`assets/Images/base-light.png`)} />
											:
											<img className="img-fluid" alt="img" width="100" src={require(`assets/Images/base.png`)} />
										}
									</div>
									<form className="signup-form">
										<Box mb={3}>
											<TextField
												required
												fullWidth
												id="fname"
												type="text"
												name="email"
												label="Full Name"
												placeholder="John Doe"
												className=""
											/>
										</Box>
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
												error={blankEmail && validEmail ? true : false}
											/>
											{blankEmail &&
												<Box component="span" color="error.main" textAlign="left" display="block" fontSize="subtitle2.fontSize" pt={1}>Email cannot be empty.</Box>
											}
											{!blankEmail && validEmail &&
												<Box component="span" color="error.main" textAlign="left" display="block" fontSize="subtitle2.fontSize" pt={1}>Invalid email format</Box>
											}
										</Box>
										<Box mb={3}>
											<TextField
												required
												fullWidth
												id="signup-password"
												label="Password"
												placeholder="Please enter your password."
												className=""
												type="password"
												value={password}
												error={blankPassword ? true : false}
												onChange={this.onPasswordChanged.bind(this)}
											/>
										</Box>
										
										<Box display="flex" alignItems="center">
											<Checkbox color="primary" value="uncontrolled" inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
											<Box component="span" fontSize="subtitle2.fontSize">I agree to all statements with
												&nbsp;<Box component="span" color="primary.main">terms of services</Box>
											</Box>
										</Box>
										<Box mb="30px" pt="20px">
											<Button
												variant="contained" color="primary"
												className="btn-block blockBtn w-100"
												size="large"
												onClick={this.onUserSignup.bind(this)}
											>
												Sign Up
											</Button>
										</Box>	
										<Box mb={1}>
											<Typography variant="body2">Already have an account?</Typography>
										</Box>
										<Button variant="outlined" color="primary" onClick={() => this.onUserSignIn()}>Sign In</Button>
									</form>
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={8} className="img-session" style={{ backgroundImage: "url(" + require('assets/Images/session-signup.jpg') + ")", backgroundSize: 'cover', backgroundPosition: 'center right' }}>
							<div className="login-content">
								<Box fontSize="h1.fontSize" fontWeight="h1.fontWeight" mb={4} color="common.white">Already Have An Account?</Box>
								<Button variant="contained" className="btn-block-md" onClick={() => this.onUserSignIn()}>Sign In</Button>
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

export default connect(mapStateToProps, { signupUserWithFirebase, onEmailChanged, onPasswordChanged })(Register);