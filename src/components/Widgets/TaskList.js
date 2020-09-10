/*
 * Task List Widget
 */
import React, { Component, Fragment } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
	Checkbox, Box, FormControlLabel, List, ListItem, Snackbar, Avatar, IconButton, Button, Dialog,
	DialogActions, DialogContent, DialogTitle, TextField, TextareaAutosize
} from '@material-ui/core';
import update from 'react-addons-update';
import Dragula from 'react-dragula';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
// Data
import TaskListData from 'assets/Data/Tasks.json';

const styles = theme => ({
	checkRoot: {
		marginRight: 0,
		marginLeft: -10,
	},
	checkBox: {
		fontSize: '1.3rem',
	},
	drag: {
		width: 25,
		paddingLeft: 3,
		textAlign: 'center',
		fontSize: 16,
		opacity: 0,
		transition: 'all 0.3s ease-out',
		marginLeft: -18,
	},
	navList: {
		borderBottom: `1px Solid ${theme.palette.divider}`,
		transition: 'all 0.3s ease-out',
		'& .content-wrap': {
			position: 'relative',
			width: 'calc(100% - 40px)',
		},
		'& .content-text': {
			width: 'calc(100% - 130px)',

		},
		'& .task-meta': {
			width: 130,

		},
		'& .task-action': {
			position: 'absolute',
			right: 0,
			opacity: 0
		},
		'&:hover': {
			'& .icon-wrap': {
				opacity: 1
			},
			'& .task-meta': {
				opacity: 0
			},
			'& .task-action': {
				opacity: 1,
			},
		}
	},
	padY: {
		paddingTop: 10,
		paddingBottom: 0,
	},
	avatr: {
		fontSize: 15,
		width: 36,
		height: 36,
	},
	taskMeta: {
		transition: 'all 0.3s ease-in',
	},
});

class TaskListWidget extends Component {
	state = {
		toDoListData: TaskListData,
		snackbar: false,
		snackbarMessage: '',
		dialog: false,
		updateBtn: false,
		newTask: {
			id: TaskListData.length + 1,
			taskName: "",
			deadline: new Date(),
			completed: false,
			assignedTo: "",
			deadlineColor: "primary.main",
			avatarBG: "bg-success",
		}
	}

	dragulaDecorator = (componentBackingInstance) => {
		if (componentBackingInstance) {
			let options = {};
			Dragula([componentBackingInstance], options);
		}
	}

	// on change task status
	handleChange(value, data) {
		let selectedTodoIndex = this.state.toDoListData.indexOf(data);
		let newState = update(this.state, {
			toDoListData: {
				[selectedTodoIndex]: {
					completed: { $set: value }
				}
			}
		});
		let self = this;
		if (newState.toDoListData[selectedTodoIndex].completed) {
			setTimeout(() => {
				self.setState({ toDoListData: newState.toDoListData, snackbar: true, snackbarMessage: 'Task Completed' });
			}, 1500);
		} else {
			setTimeout(() => {
				self.setState({ toDoListData: newState.toDoListData });
			}, 1500);
		}
	}

	getfirstcharacters = (str) => {
		var matches = str.match(/\b(\w)/g);
		return matches.join('');
	}

	addNewTask() {
		if (this.state.newTask.taskName !== '' && this.state.newTask.deadline !== '') {
			setTimeout(() => {
				this.state.toDoListData.push(this.state.newTask)
				this.setState({ snackbar: true, snackbarMessage: "New Task Added" })
				this.refs.taskListScroll.scrollToBottom();
			}, 1500)
		}

		this.setState({ dialog: false })
	}

	editTask(data) {
		this.setState({ updateBtn: true });
		this.setState({
			newTask: {
				...this.state.newTask,
				id: data.id,
				taskName: data.taskName,
				deadline: data.deadline,
				completed: data.completed,
				assignedTo: data.assignedTo,
				deadlineColor: data.deadlineColor,
				avatarBG: data.avatarBG
			}
		})

		this.setState({ dialog: true })
	};

	updateTask() {
		let ddd = this.state.toDoListData.filter((data) => {
			return this.state.newTask.id === data.id
		})
		let selectedTodoIndex = this.state.toDoListData.indexOf(ddd[0]);
		setTimeout(() => {
			this.state.toDoListData.splice(selectedTodoIndex, 1, this.state.newTask)
			this.setState({ snackbar: true, snackbarMessage: "Task Updated Successfully" })
		}, 500)
		this.setState({ dialog: false })
	}

	deleteTask(data) {
		let selectedTodoIndex = this.state.toDoListData.indexOf(data);
		setTimeout(() => {
			this.state.toDoListData.splice(selectedTodoIndex, 1)
			this.setState({ snackbar: true, snackbarMessage: "Task Deleted Successfully" })
		}, 1000)
	}

	addNew() {
		this.setState({
			dialog: true,
			updateBtn: false,
			newTask: {
				...this.state.newTask,
				taskName: "",
				assignedTo: "",
				deadline: new Date()
			}
		})
	}
	render() {

		const { classes } = this.props;
		const { updateBtn } = this.state;
		return (
			<Box position="relative" className="task-list-wrap">
				<Box position="absolute" className="add-new-btn" top={{ xs: '-40px', sm: '-48px' }} right="0">
					<Button className={`${classes.addBtn} primary-bg-btn`} variant="outlined" color="primary" onClick={() => this.addNew()}>
						Add New
					</Button>
				</Box>
				<Scrollbars
					className="rct-scroll"
					autoHide
					style={{ height: "468px" }}
					ref="taskListScroll"
				>
					<List component="nav" className={clsx(`${classes.padY} container todo-list-ul`)} ref={this.dragulaDecorator}>
						{this.state.toDoListData.length > 0 ?
							<Fragment>
								{
									this.state.toDoListData.slice(-this.props.startIndex, this.state.toDoListData.length).map((data, index) => (
										<Link to="/app/ecommerce/invoice">
											<ListItem key={index} disableRipple className={classes.navList} button>
												<div className="w-100">
													<Box display="flex" justifyContent="flex-start" alignItems="center">
														<Box width="40px" className="checkbox-wrap" display="flex" justifyContent="flex-start" alignItems="center">
															<Box className={clsx(`${classes.drag} icon-wrap fas fa-grip-vertical`)} component="span" display="inline-block" color="text.disabled"></Box>
															<FormControlLabel
																className={classes.checkRoot}
																control={
																	<Checkbox
																		className={classes.checkBox}
																		checked={data.completed}
																		color="primary"
																		onChange={(event) => this.handleChange(event.target.checked, data)}
																	/>
																}
															/>
														</Box>
														<Box className="content-wrap" display={{ xs: 'block', sm: 'flex' }} justifyContent="space-between" alignItems="center">
															<Box className="medication-content">
																<h4>{data.taskName}</h4>
																<Box  >{data.assignedTo}</Box>
															</Box>
															<Box className="task-meta" pl={2} display="flex" justifyContent="flex-end" alignItems="center">
																{data.deadline && <Box color={data.deadlineColor} pr={1} fontSize="body1.fontSize">{data.deadline}</Box>}
																<Avatar className={clsx(`${classes.avatr} ${data.avatarBG}`)}>{this.getfirstcharacters(data.assignedTo)}</Avatar>
															</Box>
															<Box className="task-action" display="flex" justifyContent="flex-end" alignItems="center">
																<IconButton size="small" onClick={() => this.editTask(data)}>
																	<Box component="span" fontSize={{ xs: 14, sm: 20 }} color="primary.main" className="material-icons">edit</Box>
																</IconButton>
																<IconButton size="small" onClick={() => this.deleteTask(data)}>
																	<Box component="span" fontSize={{ xs: 14, sm: 20 }} color="secondary.main" className="material-icons-outlined">delete</Box>
																</IconButton>
															</Box>
														</Box>
													</Box>
												</div>
											</ListItem>
										</Link>
									))
								}
							</Fragment>
							:
							<Box fontSize="h5.fontSize">
								List is empty
							</Box>
						}

					</List>
				</Scrollbars>
				<Snackbar
					className="snackbar-wrap"
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					open={this.state.snackbar}
					onClose={() => this.setState({ snackbar: false })}
					autoHideDuration={2000}
					snackbarcontentprops={{
						'aria-describedby': 'message-id',
					}}
					message={<span id="message-id">{this.state.snackbarMessage}</span>}
				/>
				<Dialog
					open={this.state.dialog}
					onClose={() => this.setState({ dialog: false })}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle className="dialog-header" id="alert-dialog-title">{"Add New Medication"}</DialogTitle>
					<DialogContent className="dialog-content">
						<TextField
							margin="dense"
							id="name"
							onChange={(e) => this.setState({ newTask: { ...this.state.newTask, taskName: e.target.value } })}
							label="Task Title"
							type="text"
							fullWidth
							value={this.state.newTask.taskName} className="mb-1"
						/>
						<TextareaAutosize
							margin="dense"
							id="name"
							onChange={(e) => this.setState({ newTask: { ...this.state.newTask, assignedTo: e.target.value } })}
							label="Assign to"
							type="text"
							rowsMin='4'
							value={this.state.newTask.assignedTo} className="mb-1 textArea"
						/>

						<TextField
							id="date"
							label="Schedule Date"
							type="date"
							InputLabelProps={{
								shrink: true
							}}
							fullWidth
							value={this.state.newTask.deadline}
							onChange={(e) => this.setState({ newTask: { ...this.state.newTask, deadline: e.target.value } })}
						/>
					</DialogContent>
					<DialogActions className="dialog-footer">
						<Button onClick={() => this.setState({ dialog: false })} variant="contained" color="secondary">
							Cancel
						</Button>
						{
							updateBtn ?
								<Button onClick={() => this.updateTask()} variant="outlined" className="primary-bg-btn" color="primary" autoFocus>
									Update
							</Button>
								:
								<Button onClick={() => this.addNewTask()} variant="outlined" className="primary-bg-btn" color="primary" autoFocus>
									Add
							</Button>
						}
					</DialogActions>
				</Dialog>
			</Box>
		)
	}
}
export default withStyles(styles)(TaskListWidget);