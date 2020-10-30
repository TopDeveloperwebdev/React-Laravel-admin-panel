/*
 *
 * Recent Chat Users
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { List, ListItem, Badge, Box, Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import clsx from 'clsx';

// helpers
import { textTruncate } from 'helpers';

// actions
import { chatWithSelectedUser, getRecentChatUsers, getDefaultSelectedUsers } from 'actions';

const StyledBadge = withStyles(theme => ({
	badge: {
		backgroundColor: theme.palette.success.main,
		color: theme.palette.success.main,
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		height: 15,
		minWidth: 15,
		borderRadius: '100%',
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: '$ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
		'@media (max-width:1560px)': {
			height: 9,
			minWidth: 9,
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}))(Badge);

const styles = theme => ({
	root: {
		paddingTop: 0
	},
	large: {
		width: theme.spacing(9),
		height: theme.spacing(9),
		'@media (max-width:1560px)': {
			width: theme.spacing(7),
			height: theme.spacing(7),
		},
	},
	badgeOffline: {
		'& >span': {
			height: 15,
			minWidth: 15,
			borderRadius: '100%',
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			'@media (max-width:1560px)': {
				height: 9,
				minWidth: 9,
			},
		}
	},
	chatList: {
		cursor: 'pointer',
		padding: '14px 16px',
		borderBottom: `1px solid ${theme.palette.divider}`,
		transition: 'all 0.3s ease-out',
		'&:hover': {
			backgroundColor: theme.palette.background.paper,
		},
		'&:last-child': {
			borderBottom: 0
		},
		'& .MuiBadge-colorPrimary': {
			backgroundColor: '#43a047'
		}
	},
	activeList: {
		backgroundColor: theme.palette.background.paper
	},
	contentWrap: {
		width: 'calc(100% - 90px)',
		'@media (max-width:1560px)': {
			width: 'calc(100% - 70px)'
		},
	},
	thumbWrap: {
		width: 90,
		'@media (max-width:1560px)': {
			width: 70,
		},
	}
});

class RecentChatUsers extends Component {

	// UNSAFE_componentWillMount() {
	// 	this.fetchRecentChatUsers();
	// }

	// /**
	//  * Fetch Recent User
	//  */
	// fetchRecentChatUsers() {
	// 	this.props.getRecentChatUsers();
	// 	this.props.getDefaultSelectedUsers();
	// }

	// /**
	//  * Swicth Chat With User
	//  * @param {*object} user
	//  */
	switchChatWithUser(user) {
		this.props.chatWithSelectedUser(user);
	}
	formate_date(dateString) {
		let data = '';
		if (dateString) {
			let str = dateString.split(" ");
			let date = str[0].split('-');
			let time = str[1].split(':');
			data = date[2] + '.' + date[1] + '.' + date[0] + "  um " + time[0] + ':' + time[1];
		}

		return data;
	}
	render() {
		const { recentChatUsers, selectedUser } = this.props;
		const { classes } = this.props
		if (recentChatUsers.length === 0) {
			return (
				<div className="no-found-user-wrap">
					<h4>No User Found</h4>
				</div>
			);
		}

		return (
			<List className={classes.root}>

				{recentChatUsers.map((user, key) => (
					<ListItem key={key}
						onClick={() => this.switchChatWithUser(user)}
						className={clsx(classes.chatList, {
							[classes.activeList]: (selectedUser && selectedUser.id === user.id),
						})}
					>
						<Box className={classes.thumbWrap}>
							{
								<StyledBadge
									overlap="circle"
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									variant="dot"
								>
									<Avatar className={classes.large} src={user.patient.picture ? user.picture : require(`assets/Images/patient.png`)} alt="user-profile" />
								</StyledBadge>

							}
						</Box>
						<Box className={classes.contentWrap}>
						
							<Box mb="4px" display="flex" justifyContent="space-between" alignItems="center">
								<Box fontWeight="500" fontSize="subtitle1.fontSize" color="text.primary">{user.patient.firstName}&nbsp;{user.patient.lastName}</Box>								
							</Box>
							<Box component="span" fontSize="subtitle2.fontSize" color="text.secondary">{user.patient.familyDoctor}</Box>
							
						</Box>
					</ListItem>
				))}
			</List>
		);
	}
}

const mapStateToProps = ({ chatAppReducer }) => {
	return chatAppReducer;
};

export default withRouter(connect(mapStateToProps, {
	chatWithSelectedUser,
	getRecentChatUsers,
	getDefaultSelectedUsers
})(withStyles(styles)(RecentChatUsers)));