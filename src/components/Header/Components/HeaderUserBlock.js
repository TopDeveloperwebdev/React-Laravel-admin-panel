/**
 * User Block Section
*/
import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { IconButton, List, ListItem, Button, ListSubheader, Typography, Popover, Tooltip, Avatar } from '@material-ui/core';

// redux action
import { hulkLogoutUserFirebase } from 'actions';

const styles = theme => ({
	root: {
		width: '100%',
		minWidth: 300,
		padding: 0,
		'& >a': {
			color: theme.palette.text.primary,
			'&:hover': {
				backgroundColor: 'rgba(0,0,0,0.05)'
			}
		},
		'& .top-dropdown-menu--item': {
			padding: '20px 12px',
			borderTop: `1px solid ${theme.palette.divider}`,
		}
	},
	large: {
		width: theme.spacing(10),
		height: theme.spacing(10)
	},
	avatar: {
		'@media (max-width:1560px)': {
			width: 35,
			height: 35,
		}
	}
});

class HeaderUserBlock extends Component {
	constructor(props) {
		super(props)
		this.confirmationDialog = React.createRef();
		this.state = {
			anchorEl: null,
		};
	}

	//Define function for open dropdown
	handleClick = event => {
		this.setState({
			anchorEl: event.currentTarget,
		});
	};


	//Define function for close dropdown
	handleClose = () => {
		this.setState({
			anchorEl: null,
		});
	};
	/*
	 * Logout User
	 */
	logoutUser = () => {
		this.setState(
			{
				anchorEl: null,
			}
		)
		this.props.hulkLogoutUserFirebase();
	}

	render() {
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);
		const { classes } = this.props;
		const { email, name, role, instance_id, userAvatar } = this.props;
		console.log('emial', email, name, role);
		return (
			<div>
				<Tooltip title="User Profile" placement="bottom">
					<IconButton aria-describedby={open ? 'simple-popper' : null} variant="contained" color="primary"
						style={{ padding: '6px' }}
						onClick={this.handleClick}>
						<Avatar alt="user-thumb" className={classes.avatar} src={userAvatar ? userAvatar : require('assets/Images/avatars/user-4.jpg')} />
					</IconButton>
				</Tooltip>
				<Popover
					id="simple-popper"
					open={open}
					anchorEl={anchorEl}
					onClose={this.handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<Fragment>
						<List className={`${classes.root} top-dropdown-menu`}
							component="nav"
							aria-labelledby="nested-list-subheader"
							subheader={
								<ListSubheader component="div" id="nested-list-subheader">
									<div className="dropdown-header user-info  text-center">
										<Avatar alt="user-thumb" className={classes.large} src={userAvatar ? userAvatar : require('assets/Images/avatars/user-4.jpg')} />
										<Typography variant="body2">  {name}</Typography>
										<Typography variant="subtitle2">   {instance_id ? role : "super administrator"}</Typography>
										<Button className="btn primary-bg-btn" component={Link} to="/app/user-settings" variant="outlined" color="primary">
											Manage your account
										</Button>
									</div>
								</ListSubheader>
							}
						>
							<ListItem component="div" className="top-dropdown-menu--item d-block text-center">
								<Button variant="contained" color="primary" onClick={this.logoutUser}>
									Sign out
        						</Button>
							</ListItem>
						</List>
					</Fragment>
				</Popover>
			</div>
		);
	}
}

const mapStateToProps = ({ settings, authUser }) => {
	const { email, name, role, instance_id, userAvatar } = authUser;
	return { settings, email, name, role, instance_id, userAvatar };
}

export default withRouter(connect(mapStateToProps, {
	hulkLogoutUserFirebase
})(withStyles(styles)(HeaderUserBlock)));