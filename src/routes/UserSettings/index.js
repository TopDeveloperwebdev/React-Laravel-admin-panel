/**
 * User Settings
 */
import React from 'react'
import { withStyles } from '@material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import { Box, Typography, AppBar, Tabs, Tab, Container } from '@material-ui/core';
import { CustomCard } from 'components/GlobalComponents';

import IntlMessages from 'util/IntlMessages';

//tab content components
import GeneralSettings from './Components/GeneralSettings';
import AccountSettings from './Components/AccountSettings';
import EmailSettings from './Components/EmailSettings';
import { PageTitleBarWithImage } from 'components/GlobalComponents';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
		>
			{value === index && <Box p={{ xs: '12px', sm: 2 }}>{children}</Box>}
		</Typography>
	);
}

function a11yProps(index) {
	return {
		id: `scrollable-force-tab-${index}`,
		'aria-controls': `scrollable-force-tabpanel-${index}`,
	};
}

const styles = theme => ({
	root: {
		marginLeft: -9,
		marginRight: -9,
		'& div:nth-child(3)': {
			borderBottom: `1px solid ${theme.palette.divider}`,
		},
		[theme.breakpoints.down('xs')]: {
			marginLeft: -10,
			marginRight: -10,
		},
	},
	titleBar: {
		'& .MuiContainer-root': {
			'& >div': {
				'& >div:last-child': {
					'& .title-image': {
						minHeight: 320,
						paddingTop: 20
					}
				}
			}
		}
	}
});

class UserSettings extends React.Component {

	state = {
		tabIndex: 0
	}

	// Function to detect event changes 
	handleChange = (event, value) => {
		this.setState({ tabIndex: value });
	}

	// Function to handle change on swipe view
	handleChangeIndex = index => {
		this.setState({ tabIndex: index });
	}

	render() {
		const { theme, classes } = this.props;
		const { tabIndex } = this.state;
		return (
			<div className="hk-user-settings">
				<Box className={`${classes.titleBar} white-btn-color`}>
					<PageTitleBarWithImage
						title={<IntlMessages id="component.settings" />}
						desc="Manage all your basic, privacy and email account settings at an ease."
						image="settings.png"
						buttonText={<IntlMessages id="component.home" />}
						buttonLink="/app/dashboard/dashboard1"
					/>
				</Box>
				<Container maxWidth="lg">
					<Box className="page-space" px={{ xs: '12px', lg: 0 }} mb={4}>
						<CustomCard >
							<Box mt={1}>
								<AppBar position="static" color="default" style={{ boxShadow: 'none' }}>
									<Tabs
										className={classes.root}
										value={tabIndex}
										onChange={this.handleChange}
										indicatorColor="primary"
										textColor="primary"
										variant="scrollable"
										scrollButtons="on"
										aria-label="scrollable auto tabs example"
									>
										<Tab label={<><SettingsOutlinedIcon /><IntlMessages id="component.general" /></>} {...a11yProps(0)} />
										<Tab label={<><LockOutlinedIcon /><IntlMessages ml={5} id="component.account" /></>} {...a11yProps(1)} />
									</Tabs>
								</AppBar>
								<SwipeableViews
									axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
									index={tabIndex}
									onChangeIndex={this.handleChangeIndex}
								>
									<TabPanel dir={theme.direction}>
										<Box pt={3}>
											<GeneralSettings />
										</Box>
									</TabPanel>
									<TabPanel dir={theme.direction}>
										<Box pt={3}>
											<AccountSettings />
										</Box>
									</TabPanel>
									<TabPanel dir={theme.direction}>
										<Box pt={3}>
											<EmailSettings />
										</Box>
									</TabPanel>
								</SwipeableViews>
							</Box>
						</CustomCard>
					</Box>
				</Container>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(UserSettings);