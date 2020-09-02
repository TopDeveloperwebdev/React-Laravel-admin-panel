/**
 * Email Page
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Redirect, Route, Switch} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Box, Drawer, IconButton, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { getEmails, getInbox } from 'actions';
import Folders from './components/folder';
import EmailSidebar from './components/sidebar'

const drawerWidth = 240;

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 'auto',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%',
	},
	drawer: {
		backgroundColor:theme.palette.common.white,
		[theme.breakpoints.up('md')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	menuButton: {
		marginLeft:'7px  !important',
		position: 'absolute',
		top: 25,
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	drawerPaper: {
		width: drawerWidth,
		borderRight:0,
		[theme.breakpoints.up('md')]: {
			position: 'relative',
		},
	},
	content: {
		flexGrow: 1,
		borderLeft:`1px solid ${theme.palette.divider}`,
		backgroundColor: theme.palette.background.paper,
	},
	contentWrap:{
		position:'relative',
	}
});

const drawer = (
	<div>
	  <EmailSidebar />
	</div>
);

class Email extends Component {

	state = {
		mobileOpen: false,
	};

	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen });
	};

	componentDidMount() {
		// this.props.getEmails();
		this.props.getInbox();
	}

	render(){
		const { classes, match } = this.props;
		return (
			<Box className="hk-mail-wrapper" >
				<div className={classes.root}>
					<nav className={classes.drawer} aria-label="mailbox folders">
						<Hidden mdUp implementation="css">
							<Drawer
								variant="temporary"
								anchor='left'
								open={this.state.mobileOpen}
								onClose={this.handleDrawerToggle}
								classes={{
									paper: classes.drawerPaper,
								}}
								ModalProps={{
									keepMounted: true,   // Better open performance on mobile.
								}}
							>
								<div>
									<EmailSidebar closeEmailSidebar={this.handleDrawerToggle} />
								</div>
							</Drawer>
						</Hidden>
						<Hidden smDown implementation="css">
							<Drawer
								variant="permanent"
								open
								classes={{
									paper: classes.drawerPaper,
								}}								
							>
								{drawer}
							</Drawer>
						</Hidden>
					</nav>
					<main className={classes.content}>
						<Box height="100%" className={classes.contentWrap}>
							<IconButton
								size="small"
								aria-label="open drawer"
								edge="start"
								onClick={this.handleDrawerToggle}
								className={`email-btn ${classes.menuButton}`}
							>
								<MenuIcon />
							</IconButton>
							<div className="overview-section">
								<Switch>
									<Redirect exact from={`${match.url}/`} to={`${match.url}/folder`} />
									<Route path={`${match.url}/folder`} component={Folders} />
								</Switch>
							</div>
						</Box>
					</main>
				</div>
			</Box>
		);
	}	
}

// Map state to props
const mapStateToProps = ({ emailApp }) => {
	const { currentEmail } = emailApp;
	return { currentEmail };
}

export default withRouter(connect(mapStateToProps, {
	getEmails,
	getInbox
})(withStyles(styles)(Email)));