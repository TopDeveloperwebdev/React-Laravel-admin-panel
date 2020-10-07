/**
 * Hulk App Layout
*/
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import { Hidden, Drawer, Box } from '@material-ui/core';
import IconSidebar from 'components/IconSidebar';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import SidebarCustomization from 'components/Customizer/Customization';
import NotificationSidebar from 'components/NotificationSidebar/NotificationSidebar'
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar';
import Tutorials from 'components/Tutorials';

// Actions
import { collapsedSidebarAction, darkModeAction, miniSidebarAction, rtlAction, horizontalMenuAction, chooseThemeAction } from 'actions';

const drawerWidth = 260;

const styles = theme => ({
	root: {
		display: 'flex',
		height: '100vh'
	},
	content: {
		paddingTop: 64,
		flexGrow: 1,
		marginLeft: -drawerWidth,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		[theme.breakpoints.down('xs')]: {
			paddingTop: 52,
		},
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	menuButton: {
		color: 'red',
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	bgColor: {
		backgroundColor: '#272e3d',
		borderRight: '0',
		overflowY: 'hidden',
	},
	drawerPaper: {
		width: '100%',
		backgroundColor: '#272e3d',
		borderRight: '0',
		overflowY: 'hidden',
		[theme.breakpoints.up('md')]: {
			position: 'relative',
		},
	},
});

class HulkAppLayout extends Component {

	state = {
		mobileOpen: false,
		loading: true
	};

	renderPage() {
		const { children } = this.props;
		const { pathname } = this.props.location;
		if (pathname === '/app/chat' || pathname.startsWith('/app/email') || pathname === '/app/todo' || pathname === '/app/calendar') {
			return (
				<div className="hulk-page-content">
					{children}
				</div>
			);
		}
		if (this.props.settings.isMiniSidebarActive) {
			return (
				<div className="hulk-page-content">
					{children}
				</div>
			)
		} else {
			return (
				<Scrollbars
					className="hulk-scroll main-content"
					autoHide
					autoHideDuration={100}
					ref="scrollUp"
					style={this.getScrollBarStyle()}
				>
					<div className="hulk-page-content">
						{children}
					</div>
				</Scrollbars>
			);
		}
	}

	componentDidMount() {
		setTimeout(() => {
			if (this.state.loading === false && this.props.location.pathname === '/') {
				document.getElementsByClassName("hulk-page-content")[0].classList.add('fadeInUpShorter');
				setTimeout(() => {
					document.getElementsByClassName("hulk-page-content")[0].classList.remove('fadeInUpShorter');
				}, 1500)
			}
		}, 2500)
		const { isDarkModeActive, isRtlActive, isHorizontalMenuActive, isMiniSidebarActive, selectedThemeColor } = this.props.settings;
		if (this.props.location.search === '?darkmode=true&horizontalmenu=true' || this.props.location.search === '?horizontalmenu=true&darkmode=true') {
			this.onToggleHorizontalMenu(true);
			this.onToggleDarkMode(true);
		}
		if (this.props.location.search === '?horizontalmenu=true' || isHorizontalMenuActive) {
			this.onToggleHorizontalMenu(true);
		}
		if (this.props.location.search === '?darkmode=true' || isDarkModeActive) {
			this.onToggleDarkMode(true);
		}
		if (this.props.location.search === '?rtl=true' || isRtlActive) {
			this.onToggleRtl(true);
		}
		if (this.props.location.search === '?minisidebar=true' || isMiniSidebarActive) {
			this.onToggleMiniSidebar(true);
		}
		if (selectedThemeColor) {
			this.chooseTheme(selectedThemeColor)
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
		//	document.getElementsByClassName("hulk-page-content")[0].classList.add('fadeInUpShorter');
			window.scrollTo(0, 0);
			setTimeout(() => {
			//	document.getElementsByClassName("hulk-page-content")[0].classList.remove('fadeInUpShorter');
			}, 1500)
		}
		if (this.state.loading === true) {
			console.log('here')
			setTimeout(() => {
				this.setState({ loading: false });
			}, 1500)
		}
	}

	//Scrollbar height
	getScrollBarStyle() {
		if (this.props.settings.isHorizontalMenuActive) {
			return {
				height: 'calc(100vh - 115px)',
			}
		} else {
			return {
				height: 'calc(100vh - 64px)',
			}
		}
	}

	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen });
	};

	// Function to change the state of collapsed sidebar
	onToggleNavCollapsed = (isActive) => {
		const val = !this.props.settings.navCollapsed;
		this.props.collapsedSidebarAction(val);
	}

	onToggleDarkMode(isTrue) {
		if (isTrue) {
			document.body.classList.remove('light-theme')
			document.body.classList.add('dark-theme');
		} else {
			document.body.classList.remove('dark-theme')
			document.body.classList.add('light-theme');
		}
		this.props.darkModeAction(isTrue);
	}

	onToggleRtl = (isTrue) => {
		if (isTrue) {
			document.body.classList.add('rtl-layout');
		} else {
			document.body.classList.remove('rtl-layout')
		}
		this.props.rtlAction(isTrue);
	}

	onToggleMiniSidebar = (isTrue) => {
		if (isTrue) {
			document.body.classList.add('icon-layout-wrap');
			document.body.classList.remove('horizontal-layout');
			this.props.horizontalMenuAction(false);
			this.props.miniSidebarAction(true);
			this.props.collapsedSidebarAction(true);
		} else {
			document.body.classList.remove('icon-layout-wrap')
			this.props.miniSidebarAction(false);
			if (this.props.settings.isHorizontalMenuActive === false) {
				this.props.collapsedSidebarAction(true);
			}
		}
	}

	onToggleHorizontalMenu = (isActive) => {
		if (isActive) {
			document.body.classList.add('horizontal-layout');
			this.onToggleMiniSidebar(false);
			this.props.horizontalMenuAction(true);
			this.props.collapsedSidebarAction(false);
		} else {
			if (document.body.classList.contains('horizontal-layout')) {
				document.body.classList.remove('horizontal-layout');
				this.props.horizontalMenuAction(false);
			}
			if (this.props.settings.isMiniSidebarActive === false) {
				this.props.collapsedSidebarAction(true);
			}
		}
	}

	chooseTheme = (theme) => {
		document.body.classList.remove('light-theme', 'teal-theme', 'violet-theme')
		document.body.classList.add(theme);
		this.props.chooseThemeAction(theme);
	}

	render() {
		console.log('ressre');
		const { classes } = this.props;
		const { navCollapsed, isDarkModeActive, isMiniSidebarActive, isRtlActive, isHorizontalMenuActive } = this.props.settings;
			const { instance_id , permissions , email } = this.props.authUser;
			
		return (
			<div>
				{this.state.loading === true ?
					<div id="loading-bg" className="hk-full-loader" >
						<div className="text-center">
							<Box mb={3}>
								{isDarkModeActive ?
									<img alt="site-logo" width="110" height="30" src={require(`assets/Images/hulk-light.png`)} />
									:
									<img alt="site-logo" width="110" height="30" src={require(`assets/Images/hulk-dark.png`)} />
								}
							</Box>
							<CircularProgress />
						</div>
					</div>
					:
					<Fragment>
						{isMiniSidebarActive === false ?
							// Layout One
							<div className={`hk-app-layout ${classes.root}`}>
								<Header
									toggleResponsiveSidebar={this.handleDrawerToggle}
									open={navCollapsed}
									toggleSidebar={(e) => this.onToggleNavCollapsed(e)}
									openHorizontal={isHorizontalMenuActive}
								/>
								{/* <SidebarCustomization
									iconColor="#fff"
									open={navCollapsed}
									toggleSidebar={(e) => this.onToggleNavCollapsed(e)}
									darkModeStatus={isDarkModeActive}
									miniSidebarStatus={isMiniSidebarActive}
									toggleDarkMode={(e) => this.onToggleDarkMode(e)}
									toggleMiniSidebar={(e) => this.onToggleMiniSidebar(e)}
									rtlStatus={isRtlActive}
									toggleRtl={(e) => this.onToggleRtl(e)}
									horizontalMenuStatus={isHorizontalMenuActive}
									toggleHorizontalMenu={(e) => this.onToggleHorizontalMenu(e)}
									chooseTheme={(e) => this.chooseTheme(e)}
								/>
								<Tutorials />
								<NotificationSidebar /> */}
								<nav aria-label="menu-sidebar">
									{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
									<Hidden lgUp implementation="css">
										<Drawer
											variant="temporary"
											anchor='left'
											open={this.state.mobileOpen}
											onClose={this.handleDrawerToggle}
											classes={{
												paper: `${classes.bgColor} ${classes.drawer}`,
											}}
											ModalProps={{
												keepMounted: true, // Better open performance on mobile.
											}}
										>
											<div>
												<Sidebar closeSidebar={this.handleDrawerToggle} />
											</div>
										</Drawer>
									</Hidden>
									<Hidden mdDown implementation="css"
										className={clsx(classes.drawer, {
											[`rtl-sidebar`]: !navCollapsed,
										})}
									>
										<Drawer
											variant="persistent"
											anchor="left"
											open={navCollapsed}
											classes={{
												paper: ` ${classes.drawerPaper}`,
											}}
										>
											<Sidebar />
										</Drawer>
									</Hidden>
								</nav>
								<main
									className={clsx(classes.content, {
										[classes.contentShift]: navCollapsed,
									}, 'hk-main')}
								>
									<div className="hk-page">
										{this.renderPage()}
									</div>
								</main>
							</div>
							:
							<div className={`hk-icon-layout ${classes.root}`}>
								<Fragment>
									{/* <SidebarCustomization
										iconColor="#fff"
										open={navCollapsed}
										toggleSidebar={(e) => this.onToggleNavCollapsed(e)}
										darkModeStatus={isDarkModeActive}
										miniSidebarStatus={isMiniSidebarActive}
										toggleDarkMode={(e) => this.onToggleDarkMode(e)}
										toggleMiniSidebar={(e) => this.onToggleMiniSidebar(e)}
										rtlStatus={isRtlActive}
										toggleRtl={(e) => this.onToggleRtl(e)}
										horizontalMenuStatus={isHorizontalMenuActive}
										toggleHorizontalMenu={(e) => this.onToggleHorizontalMenu(e)}
										chooseTheme={(e) => this.chooseTheme(e)}
									/>
									<NotificationSidebar
										iconColor="#fff"
										open={navCollapsed}
										toggleSidebar={(e) => this.onToggleNavCollapsed(e)}
										darkModeStatus={isDarkModeActive}
										miniSidebarStatus={isMiniSidebarActive}
										toggleDarkMode={(e) => this.onToggleDarkMode(e)}
										toggleMiniSidebar={(e) => this.onToggleMiniSidebar(e)}
										rtlStatus={isRtlActive}
										toggleRtl={(e) => this.onToggleRtl(e)}
										horizontalMenuStatus={isHorizontalMenuActive}
										toggleHorizontalMenu={(e) => this.onToggleHorizontalMenu(e)}
									/> */}
									<nav aria-label="menu-sidebar" className="icon-sidebar">
										{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
										<Hidden lgUp implementation="css">
											<Drawer
												variant="temporary"
												anchor='left'
												open={this.state.mobileOpen}
												onClose={this.handleDrawerToggle}
												classes={{
													paper: `${classes.bgColor} ${classes.drawer}`,
												}}
												ModalProps={{
													keepMounted: true, // Better open performance on mobile.
												}}
											>
												<div>
													<Sidebar closeSidebar={this.handleDrawerToggle} />
												</div>
											</Drawer>
										</Hidden>
										<Hidden mdDown implementation="css" className={`icon-drawer ${classes.drawer}`}>
											<Drawer
												variant="persistent"
												anchor="left"
												open={navCollapsed}
												classes={{ paper: classes.drawerPaper, }}
											>
												<IconSidebar />
											</Drawer>
										</Hidden>
									</nav>
									<main
										className={clsx(classes.content, {
											[classes.contentShift]: navCollapsed,
										}, 'hk-main')}
									>
										<Box className="icon-header-layout">
											<Header
												toggleResponsiveSidebar={this.handleDrawerToggle}
												open={navCollapsed}
												toggleSidebar={(e) => this.onToggleNavCollapsed(e)}
												openHorizontal={isHorizontalMenuActive}
											/>
										</Box>
										<div className="hk-page">
											{this.renderPage()}
										</div>
									</main>
								</Fragment>
							</div>
						}
					</Fragment>
				}
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings , authUser }) => {
	return { settings , authUser }
}

export default withRouter(connect(mapStateToProps, {
	collapsedSidebarAction,
	darkModeAction,
	miniSidebarAction,
	rtlAction,
	horizontalMenuAction,
	chooseThemeAction
})(withStyles(styles)(HulkAppLayout)));