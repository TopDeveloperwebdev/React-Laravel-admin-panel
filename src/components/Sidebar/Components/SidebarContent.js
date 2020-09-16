/**
 * admin header component
 */
/* eslint-disable */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import NavListItem from './NavListItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleThirdMenu, toggleMenu, toggleFourthMenu, onLoadToggleMenu } from 'actions';

class SidebarContent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			navLinks: this.props.menuListReducer.navLinks,
			isLoad : false
		}
	}

	getPlanName(name) {
		let newName = name.replace("-", " ");
		return newName
	}

	componentDidMount() {
		let currentURL = window.location.href
		let currentIndex
		for (let i = 0; i < this.state.navLinks.length; i++) {
			if (this.state.navLinks[i].menu == currentURL.split('/')[4]) {
				currentIndex = i;
			}
		}
		this.onLoadToggleMenu(currentIndex);
	}

	onLoadToggleMenu(index) {
		this.props.onLoadToggleMenu(index)
		this.setState({
			navLinks: this.props.menuListReducer.navLinks
		})
	}

	toggleMenu(index) {
		this.props.toggleMenu(index)
		this.setState({
			navLinks: this.props.menuListReducer.navLinks
		})
	}
	toggleThirdMenuAndCloseSidebar(index) {
		this.props.toggleThirdMenu(index)
		this.setState({
			navLinks: this.props.menuListReducer.navLinks
		})
		if (this.props.closeSidebar) {
			this.props.closeSidebar()
		}
	}
	toggleThirdMenu(index) {
		this.props.toggleThirdMenu(index)
		this.setState({
			navLinks: this.props.menuListReducer.navLinks
		})
	}

	toggleFourthMenu(fourthindex) {
		this.props.toggleFourthMenu(fourthindex)
		this.setState({
			navLinks: this.props.menuListReducer.navLinks
		})
		if (this.props.closeSidebar) {
			this.props.closeSidebar()
		}
	}


	render() {
		const { closeSidebar } = this.props;
		let { permissions, instance_id } = this.props.authUser;
		let navItems =[];
		console.log('navItems-------',this.state.navLinks);
		if (instance_id) {
			let links = this.state.navLinks;			
			links && links.map((Navlink, index) => {
				if (permissions.indexOf(Navlink.menu_title.split('.')[1] + '_access') > -1) {
					navItems.push(Navlink);
				}
				else if (Navlink.child_routes) {
					let child_routes = [];
					Navlink.child_routes.map((child_route) => {
						if (permissions.indexOf(child_route.menu_title.split('.')[1] + '_access') > -1) {
							child_routes.push(child_route);
						}
					})
					Navlink.child_routes = child_routes;
					if (child_routes.length) navItems.push(Navlink);
				}
			});
	
		}
		else {
				navItems = this.state.navLinks;
		}

		// let navItems = [];
		// if (permissions) {
		// 	permissions = JSON.parse(permissions);
		// }
		// let links = this.state.navLinks;
		// if (instance_id) {
		// 	links && links.map((Navlink, index) => {
		// 		if (permissions.indexOf(Navlink.menu_title.split('.')[1] + '_access') > -1) {
		// 			navItems.push(Navlink);
		// 		}
		// 		else if (Navlink.child_routes) {
		// 			let child_routes = [];
		// 			Navlink.child_routes.map((child_route) => {
		// 				if (permissions.indexOf(child_route.menu_title.split('.')[1] + '_access') > -1) {
		// 					child_routes.push(child_route);
		// 				}
		// 			})
		// 			Navlink.child_routes = child_routes;
		// 			if (child_routes.length) navItems.push(Navlink);
		// 		}
		// 	});
		// }
		// else {
		// 	navItems = this.state.navLinks;
		// 	console.log('navItems',navItems);
		// }

		// console.log('permissions', navItems);
		return (
			<div>
				<List className="menu-wrap" style={{ padding: 0, }}>
					{navItems && navItems.map((Navlink, index) => {
						return (
							<NavListItem
								menu={Navlink} key={index}
								toggleMenu={() => this.toggleMenu(index)}
								toggleFourthMenu={(e) => this.toggleFourthMenu(e)}
								toggleThirdMenu={(e) => this.toggleThirdMenu(e)}
								toggleThirdMenuAndCloseSidebar={(e) => this.toggleThirdMenuAndCloseSidebar(e)}
								closeSidebar={closeSidebar}
							/>
						)

					})}
				</List>
			</div>
		);

	}
}

const mapStateToProps = ({ menuListReducer, authUser }) => {
	return { menuListReducer, authUser };
};

export default withRouter(connect(mapStateToProps, {
	toggleThirdMenu,
	toggleMenu,
	toggleFourthMenu,
	onLoadToggleMenu
})(SidebarContent));