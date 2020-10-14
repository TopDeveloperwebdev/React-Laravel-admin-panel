/**
 * Forget Password
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Button, Box, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

class ForgotPassword2 extends Component {
	render() {
		return (
			<div>
				<div className="session-wrapper" >
					<Grid container justify="center" alignItems="center">
						<Grid item xs={12} sm={12} md={6} lg={4}  className="login-wrap">
							<div className="login-wrapper">
								<div className="w-100">
									<div className="session-logo text-center" >
										{this.props.isDarkModeActive ?
											<img className="img-fluid" alt="img" width="100" src={require(`assets/Images/base-light.png`)} />
											:
											<img className="img-fluid" alt="img" width="100" src={require(`assets/Images/base.png`)} />
										}
									</div>
									<div className="session-title">
										<Typography variant="h5">
											Forgot Your Password?
										</Typography>
										<Typography variant="subtitle2">
											Not to worry, we got you! let's get you a new password
										</Typography>
									</div>
									<form className="login-form">
										<Box mb={2}>
											<TextField
												required
												fullWidth
												id="username"
												type="email"
												name="email"
												label="Email Address"
												placeholder="Please enter your email address."
												className=""
											/>
										</Box>
										<Box py={3}>
											<Button
												color="primary"
												className="btn-block blockBtn w-100"
												variant="contained"
												size="large"
											>
												Reset My Password
											</Button>
										</Box>
									</form>
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={8} style={{ backgroundImage: "url(" + require('assets/Images/session-forgot.jpg') + ")", backgroundSize: 'cover', backgroundPosition: 'center left' }} className="img-session">
							<div className="login-content">
								<Box fontSize="h1.fontSize" fontWeight="h1.fontWeight" mb={4} color="common.white">Not To Worry, We Got You Covered</Box>
								<Button variant="contained" component={Link} to="/signin" className="btn-block-md" >Back To Sign In</Button>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ authUser, settings }) => {
	const { email, error } = authUser;
	const { isDarkModeActive } = settings;
	return { email, error, isDarkModeActive };
};

export default connect(mapStateToProps, { })(ForgotPassword2);