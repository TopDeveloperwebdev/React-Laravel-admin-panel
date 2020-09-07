/*
 * Notification Sidebar
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Tooltip, Drawer, Button } from '@material-ui/core';

// Component
import Tabs from './Components/Tabs';

// Actions
import { notificationSidebarAction } from 'actions';

const styles = theme => ({
	drawer: {
		width: 260,
		flexShrink: 0,
	},
	CustomezerBtn: {
		fontSize: '1.125rem',
		height: '2.625rem',
		minWidth: '2.625rem',
		borderRadius: 0,
		padding: 0,
		zIndex: 99,
		right: -1,
		position: 'fixed',
		top: 200
	}
}); 

class NotificationSidebar extends Component {

   /**
    * function for toggle sidebar
    */
	toggleDrawer = () => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		const val = !this.props.settings.notificationSidebar;
		this.props.notificationSidebarAction(val);
	};

	render(){
		const { classes } = this.props;
		return (
			<div>
				<Tooltip title="Notifications" placement="bottom">
					<Button
						variant="contained"
						aria-label="settings"
						className={`custom-btn ${classes.CustomezerBtn}`}
						onClick={this.toggleDrawer()}
						color="primary"
					>
						<i className={`material-icons-outlined ${this.props.iconColor}`}>help_outline</i>
					</Button>
				</Tooltip>
				<Drawer
					className={classes.drawer}
					anchor="right"
					open={this.props.settings.notificationSidebar}
					onClose={this.toggleDrawer()}
				>
					<Tabs/>
				</Drawer>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return { settings }
}

export default withRouter(connect(mapStateToProps, {
	notificationSidebarAction

})(withStyles(styles)(NotificationSidebar)));
