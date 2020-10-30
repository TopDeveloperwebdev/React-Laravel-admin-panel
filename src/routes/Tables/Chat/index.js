/*eslint-disable*/
/**
 * Chat Page
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { List, Box, ListItem, ListItemText, Collapse, Menu, MenuItem, Button, Hidden } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { userService } from '../../../_services';
// Redux action
import { chatConversationType, updateUsers } from 'actions';
import ChatLayout from './components/ChatLayout';

const styles = theme => ({
	root: {
		display: "flex",
		[theme.breakpoints.down('md')]: {
			display: "block",
		}
	},
	chatLayout: {
		width: 'calc(100% - 200px)',
		[theme.breakpoints.down('md')]: {
			width: '100%',
		}
	},
	list: {
		width: 200,
		zIndex: 2,
		boxShadow: 'rgba(0, 0, 0, 0.09) 1px 1px 8px',
		[theme.breakpoints.down('md')]: {
			width: '100%',
		}
	},
	navWrap: {
		[theme.breakpoints.down('md')]: {
			display: 'inline-flex',
			'& >div >div:nth-child(1)': {
				whiteSpace: 'nowrap',
			}
		}
	},
	nested: {
		paddingLeft: theme.spacing(4),
		color: theme.palette.text.secondary,
	},
	countBadge: {
		height: 20,
		fontSize: 11,
		lineHeight: 1.6,
		minWidth: 20,
		textAlign: "center",
		padding: 2,
		borderRadius: '100%',
		marginLeft: 10,
	},
	btn: {
		'& svg': {
			fontSize: '1.3rem',
			marginLeft: 5,
		}
	},
	active: {
		color: theme.palette.primary.main,
		'& .MuiListItemText-primary': {
			color: theme.palette.primary.main
		}
	},
	activeNested: {
		color: theme.palette.primary.main,
		'& .MuiListItemText-primary': {
			color: theme.palette.primary.main
		}
	}
});

class ChatList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			btnType: 'all',
			open: true,
			anchorEl: null,
			mentions: '',
			recent: '',
			unread: '',
			favourite: '',
			Offen: '',
			Erledigt: ''
		}
	}


	componentWillMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		this.user_id = user.id;
		let self = this;
		userService.getOrdersByUserId({ user_id: this.user_id, instance_id: this.instance_id }).then(orders => {
			let INITIAL_STATE = {
				admin_photo_url: require('assets/Images/avatars/user-6.jpg'),
				recentChatUsers: orders,
				allRecentChatUsers: orders,
				allChatUsers: orders,
				selectedUser: orders[0],
				searchUsers: '',
				isSidebarShow: true,
				conversationType: 'all',
				['isupdated']: true
			};

			if (!self.props.isupdated) {

				self.props.updateUsers(INITIAL_STATE);
			}

		})



	}
	menuClick = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose(type) {
		this.setState({ anchorEl: null });
		this.setState({ btnType: type });
		this.setConverTypes(type);
	};

	handleClick() {
		this.setState({
			open: !this.state.open
		});
	}

	setConverTypes(btnType) {	
	
		this.props.chatConversationType(btnType);
		//this.setState({btnType : btnType});
	}

	render() {
		const { classes  , btnType} = this.props;
		const { open, anchorEl,  mentions, recent, unread, favourite } = this.state;
		
		return (
			<div className="hk-chat-wrap">
				<Box className={classes.root}>
					<Box className={classes.list}>
						<Box p={{ xs: '5px 15px', lg: 0 }}>
							<Hidden lgUp>
								<Button className={classes.btn} aria-controls="fade-menu" aria-haspopup="true" onClick={this.menuClick}>
									{btnType}
									{anchorEl ? <ExpandLess /> : <ExpandMore />}
								</Button>
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={() => this.handleClose()}
								>
									<MenuItem onClick={() => this.handleClose('all')}>All</MenuItem>
									<MenuItem onClick={() => this.handleClose('mentions')}>Offen</MenuItem>
									<MenuItem onClick={() => this.handleClose('recent')}>Erledigt</MenuItem>
									<MenuItem onClick={() => this.handleClose('favourite')}>Favoriten</MenuItem>
								</Menu>
							</Hidden>




							<Hidden mdDown>
								<List
									className={`nav-wrap ${classes.navWrap}`}
									component="nav"
									aria-labelledby="nested-list-subheader"
								>
									<ListItem
										className={clsx({
											[classes.active]: btnType == 'all' || btnType == 'Offen' || btnType == 'Erledigt',
										}, 'chat-type')}
										button onClick={() => this.handleClick()}>
										<ListItemText primary="Conversations" />
										{open ? <ExpandLess /> : <ExpandMore />}
									</ListItem>
									<Collapse in={open} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItem
												button
												onClick={() => this.setConverTypes('all')}
												className={clsx(classes.nested, {
													[classes.activeNested]: btnType == 'all',
												})}
											>
												{
													btnType == 'all' ?
														<Box pr={1} fontSize={18} className="icon fas fa-dot-circle"></Box>
														:
														<Box pr={1} fontSize={18} className="icon far fa-dot-circle"></Box>
												}
												<ListItemText primary="All" />
												<Box className={classes.countBadge} bgcolor="primary.main" color="primary.contrastText">{this.props.allChatUsers.length}</Box>
											</ListItem>
											<ListItem
												className={clsx(classes.nested, {
													[classes.activeNested]: btnType == 'Offen',
												})}
												button onClick={() => this.setConverTypes('Offen')}
											>
												{
													btnType == 'Offen' ?
														<Box pr={1} fontSize={18} className="icon fas fa-dot-circle"></Box>
														:
														<Box pr={1} fontSize={18} className="icon far fa-dot-circle"></Box>
												}
												<ListItemText primary="Offen" />
												<Box className={classes.countBadge} bgcolor="primary.main" color="primary.contrastText"></Box>
											</ListItem>
											<ListItem
												className={clsx(classes.nested, {
													[classes.activeNested]: btnType == 'Erledigt',
												})}
												button onClick={() => this.setConverTypes('Erledigt')}
											>
												{
													btnType == 'Erledigt' ?
														<Box pr={1} fontSize={18} className="icon fas fa-dot-circle"></Box>
														:
														<Box pr={1} fontSize={18} className="icon far fa-dot-circle"></Box>
												}
												<ListItemText primary="Erledigt" />
												<Box className={classes.countBadge} bgcolor="primary.main" color="primary.contrastText"></Box>
											</ListItem>
										</List>
									</Collapse>

									<ListItem
										className={clsx({
											[classes.active]: btnType == 'Favourite',
										})}
										button onClick={() => this.setConverTypes('Favourite')}>

										<ListItemText primary="Favourite" />
										<Box className={classes.countBadge} bgcolor="primary.main" color="primary.contrastText"></Box>
									</ListItem>
								</List>
							</Hidden>
						</Box>
					</Box>
					<Box className={classes.chatLayout}>
						<ChatLayout />
					</Box>
				</Box>
			</div>
		);
	}
}

// Map state to props
const mapStateToProps = ({ chatAppReducer }) => {

	return chatAppReducer;
};

export default withRouter(connect(mapStateToProps, {
	chatConversationType,
	updateUsers
})(withStyles(styles)(ChatList)));