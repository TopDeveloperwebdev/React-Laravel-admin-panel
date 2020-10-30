/**
 * Chat Area Component
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import MessageBlock from './MessageBlock';
import { Scrollbars } from 'react-custom-scrollbars';
import { Checkbox, Grid, MenuItem, FormGroup, Input, Button, IconButton, Tooltip, Menu, Avatar, Box, Typography, Divider } from '@material-ui/core';
import { CustomCard, SocialIcons } from 'components/GlobalComponents';
// actions
import { sendMessageToUser, getDefaultSelectedUsers } from 'actions';
import { userService } from '_services';
import { NotificationManager } from 'react-notifications';
const botMsg = [
	"Howdy",
	"Bye",
	"I'm good. you say?",
	"Okay"
];

const styles = theme => ({
	margin: {
		marginRight: 10,
		[theme.breakpoints.down('sm')]: {
			marginRight: 5,
		}
	},
	chatHead: {
		boxShadow: '0 2px 8px 0 rgba(0,0,0,.09)',
		[theme.breakpoints.down('xs')]: {
			'& .options-btn .material-icons': {
				fontSize: 19,
			}
		},
	},
	chatBody: {
		'& .user-thumb': {
			width: 64,
			height: 64,
			'@media (max-width:1560px)': {
				width: 54,
				height: 54,
			},
			[theme.breakpoints.down('xs')]: {
				width: 40,
				height: 40
			},
		}
	},
	pad10: {
		padding: 10,
		[theme.breakpoints.down('sm')]: {
			padding: 4,
		},
	},
	chatFooter: {
		[theme.breakpoints.down('xs')]: {
			'& .bot-button button': {
				padding: '2px 7px',
				minWidth: 'auto',
			}
		},
	},
	sendBtn: {
		border: '3px solid',
		borderColor: theme.palette.primary.main,
		padding: 10,
		[theme.breakpoints.down('sm')]: {
			padding: 8,
		},
	},
	shadow: {
		boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
	}
});

class ChatArea extends Component {
	state = {
		message: '',
		anchorEl: null,
		chatOptions: [
			'Mute Notifications',
			'Block',
			'Clear Chat',
			'Send Contact',
		],
		randomMessages: [
			"How are you?",
			"We are glad to know",
			"How can I help you?",
			"We are happy to help you"
		],
		typing: false,
		comment: "",
		checked: {}
	}
	// componentDidMount() {
	// 	this.props.getDefaultSelectedUsers();
	// }

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	chatOptionsHandler = event => {
		this.setState({ anchorEl: event.currentTarget });
	}
	onbotmsg(msg) {
		if (msg !== '') {
			let data = {
				user: this.props.selectedUser,
				message: msg,
				isAdmin: true,
				time: 'Just Now'
			}
			this.props.sendMessageToUser(data);
			this.setState({ message: '' });
			setTimeout(() => {
				this.refs.chatScroll.scrollToBottom();
			}, 200);
			setTimeout(() => {
				this.setState({ typing: true });
				this.refs.chatScroll.scrollToBottom();
			}, 1000);
			setTimeout(() => {
				this.setState({ typing: false });
				this.getReply();
			}, 3000);
		}
	}

	sendMsgOnEnter(event) {
		if (event.key === 'Enter') {
			this.onSubmitMessage(event);
		}
	}

	onSubmitMessage(event) {
		if (this.state.message !== '') {
			let user = JSON.parse(localStorage.getItem('user'));
			this.user_id = user.id;
			userService.addComment({ comment: this.state.message, patient_id: this.props.selectedUser.id }).then(res => {
				let data = {
					user: this.props.selectedUser,
					comment: this.state.message,
					isAdmin: true,
					time: 'Just Now'
				}
				this.props.sendMessageToUser(data);
				this.setState({ message: '' });

			})
		}
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
	getReply() {
		let randomMessage = Math.floor(
			Math.random() * this.state.randomMessages.length
		);
		let reply = {
			id: new Date().getTime(),
			message: this.state.randomMessages[randomMessage],
			user: this.props.selectedUser,
			isAdmin: false,
			time: "Just Now"
		};

		this.props.sendMessageToUser(reply);
		this.refs.chatScroll.scrollToBottom();
	}
	handleChangeComment = (event) => {
		this.setState({ message: event.target.value });
	}



	// handleChange(value, data) {
	// 	console.log('v alue', value , data);
	// 	let checked = {};
	// 	userService.editOrders({ id: data.id, done: value }).then(res => {
	// 		if (res) {
	// 			 checked[data.id] = value;		
	//             this.setState({
	// 				checked
	// 			});
	// 			NotificationManager.success("Der Kommentar wurde erfolgreich gespeichert.")
	// 		}
	// 	})

	// }
	render() {
		const { classes } = this.props;
		const { selectedUser, admin_photo_url } = this.props;
		const { chatOptions, anchorEl } = this.state;
		console.log('selectedUser.commentList', this.state.checked);
		return (
			<Fragment>
				<Box className="chat-main-body" bgcolor="background.paper">
					<Box className={`button-wrap ${classes.chatHead}`}>
						<Box pl={{ xs: '50px', md: 3 }} pr='5px' py={{ xs: '10px', md: '20px' }} display="flex" alignItems="center">
							<Box style={{ width: 'calc(100% - 150px)' }} textAlign={{ xs: 'left', md: 'center' }}>
								<Box pt={2} pb={2}>
									<Typography variant="h6" className="left">{selectedUser.patient.firstName}&nbsp;{selectedUser.patient.lastName} geb.am {selectedUser.patient.birthday} {selectedUser.patient.insurance} {selectedUser.patient.insuranceNr}.</Typography>
								</Box>

								<Grid container>
									<Grid item sm={4} md={4} lg={4} className="left">
										<Typography >{selectedUser.patient.streetNr}</Typography>
										<Typography >{selectedUser.patient.zipCode}&nbsp;{selectedUser.patient.city}</Typography>
										<Typography >Tel.:&nbsp;{selectedUser.patient.phone1}</Typography>
									</Grid>
									<Grid item sm={4} md={4} lg={4} className="left">
										<Typography >{selectedUser.doctor.doctorName}</Typography>
										<Typography>{selectedUser.doctor.zipcode}&nbsp;{selectedUser.doctor.city}</Typography>
										<Typography>Tel.: {selectedUser.doctor.phone}&nbsp; Fax: {selectedUser.doctor.fax}</Typography>
									</Grid>
									<Grid item sm={4} md={4} lg={4} className="left">
										<Typography >{selectedUser.pharmacy.pharmacyName}</Typography>
										<Typography>{selectedUser.pharmacy.streetNr}, {selectedUser.pharmacy.zipcode} ,{selectedUser.pharmacy.city}  </Typography>
										<Typography>Tel. {selectedUser.pharmacy.phone}, Fax: {selectedUser.pharmacy.fax}</Typography>
									</Grid>
								</Grid>

							</Box>
							<Box className='options-btn' width={150} textAlign="right">
								<IconButton className={classes.margin} size="small">
									<Box component="span" className="material-icons">star_border</Box>
								</IconButton>
								<IconButton className={classes.margin} size="small">
									<Box component="span" className="material-icons-outlined">videocam</Box>
								</IconButton>
								<IconButton size="small" style={{ marginRight: "4px" }}>
									<Box component="span" className="material-icons-outlined" style={{ transform: 'rotate(270deg)' }}>call</Box>
								</IconButton>
								<IconButton size="small" aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={this.chatOptionsHandler} >
									<Box component="span" className="material-icons">more_vert</Box>
								</IconButton>
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									open={Boolean(anchorEl)}
									onClose={this.handleClose}
								>
									{chatOptions.map((option, index) => (
										<MenuItem key={index} onClick={this.handleClose}>{option}</MenuItem>
									))}
								</Menu>
							</Box>
						</Box>
					</Box>
					<Scrollbars
						className="rct-scroll"
						autoHide
						ref="chatScroll"
						style={{ height: 'calc(100vh - 350px)' }}
					>
						{
							selectedUser.orderDetails.map(order => (
								<Box>
									<Box mt={2}>
										<Grid container>
											<Grid item sm={1} md={1} lg={1} className="left">
												<Box className="flex-column">
													<Box mb="3" className="site-logo user-logo">
														<img src={order.user.userAvatar ? order.user.userAvatar : require('assets/Images/avatars/user-1.jpg')} alt="search" width="45" height="45" />
													</Box>
													<Box className="font-2 warp-row">
														{order.user.name}
													</Box>
												</Box>
											</Grid>
											<Grid item sm={5} md={5} lg={5} className="left">
												<CustomCard>
													<Box pt={2} pb={2}>
														<Typography variant="h6" className="left">Medikamentenbestellung: {order.orderId}</Typography>
													</Box>
													<Box pt={2} pb={2}>
														<ul>
															{
																order.Medications.length > 0 && order.Medications.map(element => (
																	<li><Typography className="left">{element.medicationName}.</Typography></li>
																))
															}


														</ul>

													</Box>
													<Box className="checkbox">
														<Checkbox
														
															color="primary"
														
														/>
													</Box>

												</CustomCard>
												<Box pt={1}>{this.formate_date(order.date)}</Box>
											</Grid>

										</Grid>

									</Box>

								</Box>
							))
						}

						<Box className={classes.chatBody} pt={3}>
							{selectedUser.commentList.length > 0 && selectedUser.commentList.map((previousChat, index) => (
								<Box key={index}>
									<MessageBlock
										// even={!previousChat.isAdmin}
										selectedUserPhotoUrl={selectedUser.pharmacy.pharmacyLogo}
										data={previousChat}
										adminPhotoUrl={selectedUser.pharmacy.pharmacyLogo}
										textBlock={classes.shadow}
									/>
								</Box>
							))}
						</Box>

					</Scrollbars>
					<div className={classes.chatFooter}>
						<Divider />
						<Box p={{ xs: '10px 20px', md: '20px' }}>
							<Box display="flex" alignItems="center" >
								<Box style={{ width: 'calc(100% - 60px' }}>
									<Box className="mr-3 w-100">
										<FormGroup className="mb-0">
											<Input
												type="text"
												id="search-msg"
												placeholder="Type your message"
												value={this.state.message}
												className="msg-input"
												onChange={this.handleChangeComment}
												onKeyPress={(event) => this.sendMsgOnEnter(event)}
											/>
										</FormGroup>
									</Box>
								</Box>
								<Box style={{ width: 60 }} textAlign="right" className="send-icon">
									<Tooltip title="Send Mail" placement="bottom">
										<IconButton className={classes.sendBtn} onClick={(event) => this.onSubmitMessage(event)}>
											<Box component="span" fontSize="18px" mr={1} className="material-icons">send</Box>

										</IconButton>
									</Tooltip>
								</Box>
							</Box>
							<Box display="flex" alignItems="center">
								<Tooltip title="Attachment" placement="bottom">
									<IconButton className={classes.pad10}>
										<Box component="span" fontSize={{ xs: 14, md: 18 }} color="text.secondary" className="fas fa-paperclip"></Box>
									</IconButton>
								</Tooltip>
								<Tooltip title="Smiley" placement="bottom">
									<IconButton className={classes.pad10}>
										<Box component="span" fontSize={{ xs: 14, md: 18 }} color="text.secondary" className="far fa-laugh"></Box>
									</IconButton>
								</Tooltip>
								<Tooltip title="Insert Image" placement="bottom">
									<IconButton className={classes.pad10}>
										<Box component="span" fontSize={{ xs: 14, md: 18 }} color="text.secondary" className="far fa-image"></Box>
									</IconButton>
								</Tooltip>
							</Box>
						</Box>
					</div>
				</Box>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ chatAppReducer }) => {
	return chatAppReducer;
}

export default withRouter(connect(mapStateToProps, {
	sendMessageToUser,
	getDefaultSelectedUsers
})(withStyles(styles)(ChatArea)));