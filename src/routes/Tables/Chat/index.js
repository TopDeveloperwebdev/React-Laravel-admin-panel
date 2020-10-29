/*eslint-disable*/
/**
 * Chat Page
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { List, Box, ListItem, ListItemText, Collapse, Menu, MenuItem, Button, Hidden} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { userService } from '../../../_services';
// Redux action
import { chatConversationType ,updateUsers} from 'actions';
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
	navWrap:{
		[theme.breakpoints.down('md')]: {
			display:'inline-flex',
			'& >div >div:nth-child(1)':{
				whiteSpace:'nowrap',
			}
		}
	},
	nested: {
		paddingLeft: theme.spacing(4),
		color:theme.palette.text.secondary,
	},
	countBadge: {
		height: 20,
		fontSize: 11,
		lineHeight: 1.6,
		minWidth: 20,
		textAlign: "center",
		padding: 2,
		borderRadius: '100%',
		marginLeft:10,
	},
	btn:{
		'& svg':{
			fontSize:'1.3rem',
			marginLeft:5,
		}
	},
	active: {
		color:theme.palette.primary.main,
		'& .MuiListItemText-primary':{
			color:theme.palette.primary.main
		}
	},
	activeNested:{
		color:theme.palette.primary.main,
		'& .MuiListItemText-primary':{
			color:theme.palette.primary.main
		}
	}
});

class ChatList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			btnType:'all',
			open: true,
			anchorEl:null,
			mentions: '',
			recent: '',
			unread: '',
			favourite: '',
		}
	}
	// componentWillMount(){
	// 	let mentionsCount = this.props.allChatUsers.filter((user)=>{
	// 		return user.mentions == true
	// 	})
	// 	this.state.mentions = mentionsCount.length;

	// 	let recentCount = this.props.allChatUsers.filter((user)=>{
	// 		return user.recent == true
	// 	})
	// 	this.state.recent = recentCount.length;

	// 	let unreadCount = this.props.allChatUsers.filter((user)=>{
	// 		return user.unread == true
	// 	})
	// 	this.state.unread = unreadCount.length;

	// 	let favouriteCount = this.props.allChatUsers.filter((user)=>{
	// 		return user.favourite == true
	// 	})
	// 	this.state.favourite = favouriteCount.length;
     
	// }

componentDidMount(){
	let user = JSON.parse(localStorage.getItem('user'));
	this.instance_id = user.instance_id;
	this.user_id = user.id;
	userService.getOrdersByUserId({ user_id :  this.user_id , instance_id : this.instance_id}).then(res => {
		console.log('res' , res);
		
	})
	let orders = [  {
		"id": 1,
		"first_name": "John",
		"last_name": "Cruz",
		"photo_url": "user-3.jpg",
		"mumber_since": "13 Jan 2009",
		"user": 784587,
		"email":"ellie@example.com",
		"contact_no": 7858784264,
		"designation": "FrontEnd Developer",
		"last_chat_date": "1 day ago",
		"isActive": true,
		"status": "online",
		"last_chat": "Ut vel consectetur ligula, non tincidunt elit. Nulla pellentesque finibus consequat.",
		"new_message_count": 5,
		"isSelectedChat": true,
		"all":true,
		"mentions":false,
		"recent":false,
		"unread":false,
		"favourite":true,
		"previousChats":[
		   {
			  "message": "Sed mollis, mi in malesuada semper, ipsum nulla luctus sem",
			  "sent": "12:47 PM",
			  "isAdmin": false
		   },
		   {
			  "message": "Vivamus aliquet ligula augue, et suscipit mauris sollicitudin",
			  "sent": "12:49 PM",
			  "isAdmin": true
		   },
		   {
			  "message": "Phasellus in felis posuere, fringilla ligula eget, tristique diam",
			  "sent": "12:51 PM",
			  "isAdmin": false
		   },
		   {
			  "message": "Ut vel consectetur ligula, non tincidunt elit. Nulla pellentesque finibus consequat.",
			  "sent": "12:55 PM",
			  "isAdmin": true
		   }
		]
	 },]
	let INITIAL_STATE = {
		admin_photo_url: require('assets/Images/avatars/user-6.jpg'),
		recentChatUsers: orders,
		allRecentChatUsers: orders,
		allChatUsers: orders,
		selectedUser: orders[0],
		searchUsers: '',
		isSidebarShow: true,
		conversationType: 'all',
		['isupdated'] : true
	 };

	if(!this.props.isupdated){
		this.props.updateUsers(INITIAL_STATE);
	}

}
	menuClick = (event) => {
		this.setState({anchorEl:event.currentTarget});
	};
  
	handleClose(type){
		
		this.setState({anchorEl:null});
		this.setState({btnType:type});
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
		console.log('this props' , this.props);
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