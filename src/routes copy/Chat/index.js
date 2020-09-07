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

// Redux action
import { chatConversationType } from 'actions';
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
		const { open, anchorEl, btnType, mentions, recent, unread, favourite } = this.state;
		return (
			<div className="hk-chat-wrap">
				<Box className={classes.root}>
					<Box className={classes.list}>
						<Box p={{ xs:'5px 15px', lg:0 }}>
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
									<MenuItem onClick={() => this.handleClose('mentions')}>Mentions</MenuItem>
									<MenuItem onClick={() => this.handleClose('recent')}>Recent</MenuItem>
									<MenuItem onClick={() => this.handleClose('unread')}>Unread</MenuItem>
									<MenuItem onClick={() => this.handleClose('favourite')}>Your Favourite</MenuItem>
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
											[classes.active]: btnType == 'all' || btnType == 'mentions' || btnType == 'recent' ,
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
													[classes.activeNested]: btnType == 'mentions',
												})}
												button onClick={() => this.setConverTypes('mentions')}
											>
												{
													btnType == 'mentions' ?
													<Box pr={1} fontSize={18} className="icon fas fa-dot-circle"></Box>
													:
													<Box pr={1} fontSize={18} className="icon far fa-dot-circle"></Box>
												}
												<ListItemText primary="Mentions" />
												<Box className={classes.countBadge} bgcolor="primary.main" color="primary.contrastText">{mentions}</Box>
											</ListItem>
											<ListItem 
												className={clsx(classes.nested, {
													[classes.activeNested]: btnType == 'recent',
												})}
												button onClick={() => this.setConverTypes('recent')}
											>
												{
													btnType == 'recent' ?
													<Box pr={1} fontSize={18} className="icon fas fa-dot-circle"></Box>
													:
													<Box pr={1} fontSize={18} className="icon far fa-dot-circle"></Box>
												}
												<ListItemText primary="Recent" />
												<Box className={classes.countBadge} bgcolor="primary.main" color="primary.contrastText">{recent}</Box>
											</ListItem>
										</List>
									</Collapse>
									<ListItem 
										className={clsx({
											[classes.active]: btnType == 'unread',
										})}
										button onClick={() => this.setConverTypes('unread')}>
										<ListItemText primary="Unread" />
										{unread > 0 ?
											<Box className={classes.countBadge} bgcolor="primary.main" color="primary.contrastText">{unread}</Box>
											:
											null
										}
										</ListItem>
									<ListItem 
										className={clsx( {
											[classes.active]: btnType == 'favourite',
										})}
										button onClick={() => this.setConverTypes('favourite')}>

										<ListItemText primary="Your Favourite" />
										<Box className={classes.countBadge} bgcolor="primary.main" color="primary.contrastText">{favourite}</Box>
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
	chatConversationType
})(withStyles(styles)(ChatList)));