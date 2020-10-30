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
		}
	}
	componentWillMount(){
		let mentionsCount = this.props.allChatUsers.filter((user)=>{
			return user.mentions == true
		})
		this.state.mentions = mentionsCount.length;

		let recentCount = this.props.allChatUsers.filter((user)=>{
			return user.recent == true
		})
		this.state.recent = recentCount.length;

		let unreadCount = this.props.allChatUsers.filter((user)=>{
			return user.unread == true
		})
		this.state.unread = unreadCount.length;

		let favouriteCount = this.props.allChatUsers.filter((user)=>{
			return user.favourite == true
		})
		this.state.favourite = favouriteCount.length;

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
			console.log('isthis.dddd' , INITIAL_STATE);
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

	setConverTypes(type) {
		this.state.btnType = type;
		this.props.chatConversationType(type);
	}

	render() {
		const { classes } = this.props;	
		const { open, anchorEl, btnType, mentions, recent, unread, favourite } = this.state;
		return (
			<div className="hk-chat-wrap">
				<Box className={classes.root}>
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