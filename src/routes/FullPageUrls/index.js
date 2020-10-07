/**
 * Full Page Urls
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Container, Box, Typography } from '@material-ui/core';

// Intl messages
import IntlMessages from 'util/IntlMessages';
// Component
import { CustomCard } from 'components/GlobalComponents';

const styles = theme => ({
	root:{
		width:'80%',
		margin:'0 auto',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		},
		'& ul':{
			margin:0,
			padding:0,
			listStyle:'none',
		},
		'& .full-page-menu':{
			display: 'flex',
			flexWrap: 'wrap',
			'& >li':{
				width:'33.3333%',
				padding: '0 10px',
				marginBottom:20,
			},
			'& li a':{
				display: 'flex',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
				fontWeight:500,
				fontSize:16,
				marginBottom:10,
				'& .icon':{
					backgroundColor:'#f4f6f8',
					height: 35,
					width: 35,
					fontSize: 20,
					display: 'inline-flex',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 4,
				},
				'& .content':{
					width: 'calc(100% - 51px)'
				},
			},
			'& ul':{
				paddingLeft:51,
				'& ul':{
					paddingLeft:16,
				},
			},
		}
	}
});

class fullPageMenu extends Component {

	state = {
		menuItems: this.props.navLinks,
		submenus: []
	}

	render() {
	
		const { classes } = this.props;
		let { menuItems, submenus } = this.state;

		for (let i = 0; i < menuItems.length; i++) {
			if (menuItems[i].isMenuOpen === true && menuItems[i].child_routes !== null && menuItems[i].fullPageMenu === true) {
				if (submenus.length < 0 ){
              		this.setState({ submenus: [] });	
              	}
				submenus = menuItems[i].child_routes
			} else {
				if (menuItems[i].child_routes !== null && menuItems[i].isMenuOpen === true) {
					for (let j = 0; j < menuItems[i].child_routes.length; j++) {
                  if (menuItems[i].child_routes[j].fullPageMenu === true && menuItems[i].child_routes[j].isMenuOpen === true && menuItems[i].child_routes[j].third_child_routes !== null) {
                  	if (submenus.length < 0 ){
                  		this.setState({ submenus: [] });	
                  	}
                     submenus = menuItems[i].child_routes[j].third_child_routes
						}
					}
				}
			}
		}

		for (let i = 0; i < menuItems.length; i++) {
			if (menuItems[i].child_routes !== null && menuItems[i].isMenuOpen === true) {
				for (let j = 0; j < menuItems[i].child_routes.length; j++) {
					if (menuItems[i].child_routes[j].third_child_routes !== null && menuItems[i].child_routes[j].fullPageMenu === false) {
						for (let k = 0; k < menuItems[i].child_routes[j].third_child_routes.length; k++) {
							if (menuItems[i].child_routes[j].third_child_routes[k].fourth_child_routes !== null && menuItems[i].child_routes[j].third_child_routes[k].fullPageMenu === true && menuItems[i].child_routes[j].third_child_routes[k].isMenuOpen === true) {
                        if (submenus.length < 0 ){
                  			this.setState({ submenus: [] });	
                  		}
								submenus = menuItems[i].child_routes[j].third_child_routes[k].fourth_child_routes
							}
						}
					}
				}
			}
		}
		
		return (
			<div>
				<Container maxWidth="lg">
					<Box px={{ xs:'12px', lg:0 }}>
						<Box py={5} className={`full-page-menu-wrap ${classes.root}`}>
							<CustomCard title={<IntlMessages id="sidebar.fullpagemenu"/>}>
								<Box pt={5}>
									<Fragment>
										<ul className="full-page-menu">								
											{submenus && submenus.map((item, index) => (
												<li key={index}>
													<NavLink to={item.path}>
														<Box mr={2} component="span" color="text.secondary" className="icon material-icons-outlined">{item.icon}</Box>
														<Box className="content">
															<IntlMessages id={item.menu_title}/>
															<Typography variant="subtitle2">{item.f_desc}</Typography>
														</Box>
													</NavLink>
													<>
														{item.third_child_routes ?
															<ul>
																{item.third_child_routes.map((item1, index) => (
																	<li key={index}>
																		<NavLink to={item1.path}>
																			<IntlMessages id={item1.menu_title}/>
																		</NavLink>
																		<>
																			{item1.fourth_child_routes ?
																				<ul>
																					{item1.fourth_child_routes.map((item2, index) => (
																						<li>
																							<NavLink to={item2.path}>
																								<IntlMessages id={item2.menu_title}/>
																							</NavLink>
																						</li>
																					))}
																				</ul>
																				: 
																				null
																			}
																		</>
																	</li>
																))}
															</ul>
															: 
															null
														}
													</>
												</li>
											))}
										</ul>
									</Fragment>
								</Box>
							</CustomCard>
						</Box>
					</Box>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = ({ menuListReducer }) => {
	return menuListReducer;
};

export default withRouter(connect(mapStateToProps, {})(withStyles(styles)(fullPageMenu)));
