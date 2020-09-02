import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';                                                          
import { AppBar, Tabs, Tab, Typography, Box, Grid, Button } from '@material-ui/core';
import IntlMessages from 'util/IntlMessages';
import FirebaseLogin from './Components/FirebaseLogin';

function TabPanel(props) {
	const { children, value, index, dir, ...other } = props;
	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
			{...other}
			dir={dir}
			className="pad-12"
		>
			{value === index && <Box p={4}>{children}</Box>}
		</Typography>
	);
}

function a11yProps(index) {
	return {
		id: `scrollable-force-tab-${index}`,
		'aria-controls': `scrollable-force-tabpanel-${index}`,
	};
}


class Login extends Component {
	state = {
		value: 0
	};
	handleChange = (event, value) => {
		this.setState({ value });
	};
	render() {
		const { theme } = this.props;
		return (
			<div>
				<div className="session-wrapper">
					<Box width="65%" mx="auto" display="flex" justifyContent="center" alignItems="center">
						<Grid container justify="center" alignItems="center">
							<Grid item xs={12} sm={12} md={6} lg={6}>
							<div>
								<img className="img-fluid" alt="img" src={require(`assets/Images/session1bg.jpg`)} />
							</div>
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={6}>
								<Typography></Typography>
								<AppBar position="static">
									<Tabs value={this.state.value}
										onChange={this.handleChange}
										indicatorColor='primary'
										textColor="primary"
										variant="scrollable"
										scrollButtons="on"
										aria-label="scrollable auto tabs example"
									>
										<Tab label={<IntlMessages id="component.firebase" />} {...a11yProps(0)} />
										<Tab label={<IntlMessages id="component.auth0" />} {...a11yProps(1)} />
									</Tabs>
								</AppBar>
								<SwipeableViews
									axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
									index={this.state.value}
								>
									<TabPanel dir={theme.direction}>
										<FirebaseLogin history={this.props.history}/>
									</TabPanel>
									<TabPanel dir={theme.direction}>
										<Box>
											<Button
												color="primary"
												className="btn-block"
												variant="contained"
												size="large"
												//onClick={this.onUserLogin.bind(this)}
											>
												Auth 0
											</Button>
										</Box>
									</TabPanel>
								</SwipeableViews>
							</Grid>
						</Grid>
					</Box>
				</div>
			</div>
		);
	}
}

export default withTheme(Login);