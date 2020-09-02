/**
 * Email Sidebar
 */
import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
	Hidden, List, ListItem, ListItemIcon, ListSubheader, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,Box, Divider
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ReactQuill from 'react-quill';

import IntlMessages from 'util/IntlMessages';

const modules = {
	toolbar: [
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
		[{ 'font': [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
		['link', 'image'],
		['clean'],
		[{ 'align': [] }]
	],
};

const formats = [
	'header',
	'font',
	'bold', 'italic', 'underline', 'strike', 'blockquote',
	'list', 'bullet', 'indent',
	'link', 'image', 'align'
];

const styles = theme => ({
	root:{
		width: '100%',
		paddingTop: '15px',
		paddingBottom: '15px',
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	dialog: {
		width: '100%',
		maxWidth: '60vw',
		'@media (max-width:960px)':{
			maxWidth: '80vw'
		},
		'@media (max-width:600px)':{
			maxWidth: '95vw',
			marginLeft: 15,
			marginRight: 15,
		}
	},
	subheader:{
		color:theme.palette.text.primary,
		lineHeight:'40px',
		fontSize:theme.typography.body1.fontSize,
	},
	listItem:{
		padding:'4px 16px',
	},
	listIcon:{
		minWidth:30,
		'& span': {
			fontSize:'1.25rem',
		},
	},
	listActive:{
		backgroundColor:theme.palette.background.default,
		boxShadow: '0 0 3px 0 rgba(0, 0, 0, .12)',
		'& span': {
			color:theme.palette.primary.main,
		},
	},
	divider:{
		'&:First-child':{
			display:'none',
		}
	}
});

class EmailSidebar extends Component {
	state = {
		open: false,
		selected:1
	}

	navigateTo(key,i) {
		const { match, history } = this.props;
		history.push(`${match.url}/folder/${key}`);
		this.setState({
			selected:i
		})
	}

	handleClickOpen() {
		this.setState({
			open: true
		});
	};

	handleClose() {
		this.setState({
			open: false
		});
	};

	render() {
		const { folders, classes } = this.props;
		const { selected }=this.state;
		return (
			<div>
				<Box px={3} pt={4} pb={2} textAlign="center" bgcolor="back">
					<Button size="large" startIcon={<AddIcon />} className={`${classes.button} primary-bg-btn compose-btn`} onClick={() => this.handleClickOpen()}
						variant="outlined" color="primary"
					>
                  <IntlMessages id="components.compose" />
					</Button>
				</Box>
				<Box>
					{folders.map((folder, key) => (
						<Fragment key={key}>
							<Box mx={2} className={classes.divider}><Divider /></Box>
							<List
								aria-labelledby="nested-list-subheader"
								subheader={
									<ListSubheader className={classes.subheader} component="div" id="nested-list-subheader">
										{folder.viewBy}
									</ListSubheader>
								}
								className={classes.root}
							>
								<Hidden mdUp implementation="css">
									{folder.links.map((folder, i) => (
										<ListItem
											className={clsx(classes.listItem, {
												[classes.listActive]: folder.id === selected,
											})}
											button
											key={i}
											onClick={() => {
												this.navigateTo(folder.path, folder.id);
												this.props.closeEmailSidebar();
											}}
										>
											<ListItemIcon className={classes.listIcon}>
												<Box component="span" className="material-icons-outlined">{folder.icon}</Box>
											</ListItemIcon>
                                 <ListItemText primary={<IntlMessages id={folder.name} />} />
										</ListItem>
									))
									}
								</Hidden>
								<Hidden smDown implementation="css">
									{folder.links.map((folder, i) => (
										<ListItem
											className={clsx(classes.listItem, {
												[classes.listActive]: folder.id === selected,
											}, "list-item")}
											button
											key={i}
											onClick={() => this.navigateTo(folder.path, folder.id)}
										>
											<ListItemIcon className={classes.listIcon}>
												<Box component="span" className="material-icons-outlined">{folder.icon}</Box>
											</ListItemIcon>
                                 <ListItemText primary={<IntlMessages id={folder.name} />} />

										</ListItem>
									))
									}
								</Hidden>
							</List>
						</Fragment>
					))}
				</Box>
				{/* Compose Dialog Box */}
				<Dialog
					aria-labelledby="customized-dialog-title"
					open={this.state.open}
					classes={{ paper: classes.dialog }}
					onClose={() => this.handleClose()}
				>
					<DialogTitle id="customized-dialog-title">
                  <IntlMessages id="components.composer" />
          		</DialogTitle>
					<DialogContent dividers>
						<Box mb={1}>
							<TextField fullWidth	label="To" />
						</Box>
						<Box mb={1}>
							<TextField fullWidth	label="CC" />
						</Box>
						<Box mb={1}>
							<TextField fullWidth	label="BCC" />
						</Box>
						<Box mb={3}>
							<TextField fullWidth	label="Subject" />
						</Box>
						<Box height="100%">
							<ReactQuill
								modules={modules}
								formats={formats}
								placeholder="Enter Your Message.."
							/>
						</Box>
					</DialogContent>
					<DialogActions>
						<Box py={1} px={2}>
							<Box display="inline-block" mr={2}>
								<Button variant="outlined" className="primary-bg-btn" color="primary" onClick={() => this.handleClose()}>
									<Box component="span" fontSize="20px" mr={1} className="material-icons">cancel_schedule_send</Box>
									Cancel
								</Button>
							</Box>
							<Button variant="outlined" className="primary-bg-btn" color="primary" autoFocus onClick={() => this.handleClose()}>
								<Box component="span" fontSize="18px" mr={1} className="material-icons">send</Box>
								Send
							</Button>
						</Box>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

// Map state to props
const mapStateToProps = ({ emailApp }) => {
	return emailApp
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(EmailSidebar)));