/**
 * Contacts tab section
*/
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import {
	AppBar, Tabs, Tab, Typography, Button, Icon, IconButton, Box, Input, FormControl, InputAdornment, Container
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import IntlMessages from 'util/IntlMessages';

//Components
import UpdateContact from './Components/UpdateContact';

import ConfirmationDialog from './Components/ConfirmationDialog';

//Global component
import { SmallTitleBar } from 'components/GlobalComponents';

// Redux actions
import { deleteContact , onShowContacts } from "actions";
import ContactList from './Components/ContactList';
import ContactGridItem from './Components/ContactGridItem';
import { userService } from '../../../_services';
const styles = theme => ({
	tabsWrap: {
		boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
	},
	appWrap: {
		boxShadow: "none",
	},
	toolbar: {
		padding: '0',
		marginLeft: -12,
		marginRight: -12,
		'& button': {
			minHeight: 50,
		},
		'& .MuiTab-wrapper': {
			fontSize: '1rem',
		},
		'& .Mui-selected': {
			backgroundColor: `rgba(0,0,0,0.1)`,
		}
	},
	searchBarWrap: {
		'& .MuiInput-underline::before': {
			borderBottom: `1px solid ${theme.palette.common.white}`,
		},
		'& .MuiInputBase-input::placeholder': {
			color: theme.palette.common.white,
		},
		'& .MuiInput-underline:hover:not(.Mui-disabled)::before': {
			borderColor: theme.palette.common.white,
		},
		'& .MuiInput-underline::after': {
			borderBottom: `1px solid ${theme.palette.common.white}`,
		},
		'& .MuiInputBase-root': {
			width: 360,
			'& input': {
				color: theme.palette.common.white,
			},
			[theme.breakpoints.down('xs')]: {
				width: '100%',
				marginBottom: 20,
			},
		},
		'& .MuiSvgIcon-root': {
			fill: theme.palette.common.white,
		}
	},
	visibleHidden: {
		visibility: 'hidden'
	}
});

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
			{value === index && <Box pb={4}>{children}</Box>}
		</Typography>
	);
}

function a11yProps(index) {
	return {
		id: `scrollable-force-tab-${index}`,
		'aria-controls': `scrollable-force-tabpanel-${index}`,
	};
}

class ContactGrid extends Component {

	constructor(props) {
		super(props);
		this.confirmationDialog = React.createRef();
	}

	state = {
		message: '',
		value: 0,
		favContacts: [],
		recentContacts: null,
		data: null,
		isUpdated: false,
		gridView: true,
	};

	componentDidMount() {

		userService.showInstances().then(res => {
             
			this.props.onShowContacts(res);
		})
		
	}

	

	// // Get favourite contact data
	// getFavContact() {
	// 	let newArray = [];
	// 	let data = this.props.contactsData;
	// 	if (data !== null) {
	// 		for (let Item of data) {
	// 			if (Item.type === 'favourite') {
	// 				newArray.push(Item)
	// 			}
	// 		}
	// 		this.setState({
	// 			favContacts: newArray,
	// 			isUpdated: false
	// 		})
	// 	}
	// }

	// // Get recent contact data
	// getRecentContact() {
	// 	let newArray = [];
	// 	let data = this.props.contactsData;
	// 	if (data !== null) {
	// 		for (let Item of data) {
	// 			if (Item.type === 'recently_added') {
	// 				newArray.push(Item)
	// 			}
	// 		}
	// 		this.setState({
	// 			recentContacts: newArray,
	// 			isUpdated: false
	// 		})
	// 	}
	// }

	handleChange = (event, value) => {
		this.setState({ value });
	};

	ondeleteContact(data) {
		this.data = data;
		this.confirmationDialog.current.openDialog();
	}

	deleteContactPermanent(popupResponse) {
		if (popupResponse) {
			this.props.deleteContact(this.data);
			this.data = ""
		}
	}

	handleClickEdit(data) {
		this.setState({
			data: data,
			isUpdated: true
		})
	}

	onCloseDialog = (popupResponse) => {
		this.setState({
			data: null,
			isUpdated: false
		})
	}

	render() {
		const { theme, contactsData, classes } = this.props;
		const { recentContacts, favContacts, isUpdated, data, message, gridView } = this.state;
		return (
			<div className="contact-grid">
				<SmallTitleBar title={<IntlMessages id="component.contactGrid" />} />
				<Box className={`title-contact-block ${classes.searchBarWrap}`} pt={0} bgcolor="background.paper" px={{ xs: '12px', md: 0 }} pb={3} >
					<Container>
						<Box textAlign={{ xs: 'center', sm: 'right' }} display={{ xs: 'block', sm: 'flex' }} alignItems="center" justifyContent="space-between">
							<Button variant="outlined" color="default"><IntlMessages id="component.addContact" /></Button>
							<Box>
								<FormControl fullWidth >
									<Input
										type="text"
										name="search"
										placeholder="Search Contact"
										onChange={(event) => this.setState({ message: event.target.value })}
										value={message}
										endAdornment={
											<InputAdornment position="end">
												<SearchIcon />
											</InputAdornment>
										}
									/>
								</FormControl>
							</Box>
						</Box>
					</Container>
				</Box>

				<Container>
					<Box textAlign={{ xs: 'center', sm: 'right' }} display={{ xs: 'block', sm: 'flex' }} alignItems="center" justifyContent="space-between">
						<div className="contact-tab-wrap Tab-wrap">
							{(isUpdated && data) &&
								<UpdateContact data={data} onCloseDialog={this.onCloseDialog} />
							}
							<div>

								<div className="contact-grid-wrap">
									<ContactGridItem
										parentEditMethod={(e) => this.handleClickEdit(e)}
										parentMethod={(e) => this.ondeleteContact(e)}
										contacts={contactsData}
									/>
								</div>

							</div>
							<ConfirmationDialog
								ref={this.confirmationDialog}
								onConfirm={(res) => this.deleteContactPermanent(res)}
							/>
						</div>
					</Box>
				</Container>
			</div>

		);
	}
}

const mapStateToProps = ({ ContactReducer }) => {
	const { contactsData } = ContactReducer;
	return {
		contactsData
	};
}
export default withRouter(connect(mapStateToProps, {
	deleteContact,
	onShowContacts
})(withStyles(styles, { withTheme: true })(ContactGrid)))