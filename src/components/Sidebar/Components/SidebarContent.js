/**
 * admin header component
 */
/* eslint-disable */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import NavListItem from './NavListItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleThirdMenu, toggleMenu, toggleFourthMenu, onLoadToggleMenu,onloadmenuwithpermission } from 'actions';

class SidebarContent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			navLinks: this.props.menuListReducer.navLinks,
			isLoad: false,
			isEdited: false
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
	loadNavLink() {
		let { permissions, instance_id } = this.props.authUser;
		let links = this.state.navLinks.slice();

		let navItems = [];
		if(permissions){
			permissions = JSON.parse(permissions);
		}
		console.log('1navLinks', this.state.navLinks ,permissions);
		links && links.map((Navlink, index) => {
			if (permissions.indexOf(Navlink.menu_title.split('.')[1].toLowerCase() + '_access') > -1) {
				navItems.push(Navlink);	
					
			}
			else if (Navlink.child_routes) {
				let child_routes = [];
				let NavlinkClone ={};
				NavlinkClone = Object.assign(NavlinkClone, Navlink)
				NavlinkClone.child_routes.map((child_route) => {
					if (permissions.indexOf(child_route.menu_title.split('.')[1].toLowerCase() + '_access') > -1) {
						child_routes.push(child_route);							
					}
				})
				NavlinkClone.child_routes = child_routes;
				if (child_routes.length) navItems.push(NavlinkClone);
			}
		});

	
		
		if(this.state.navLinks.length == 9){
			this.props.onloadmenuwithpermission(navItems)
			this.setState({
				navLinks: this.props.menuListReducer.navLinks 		
			})		
		}

		
	}

	render() {
		const { closeSidebar } = this.props;
	
		this.loadNavLink();
		 console.log('navItems' , this.state.navLinks);
		return (
			<div>
				<List className="menu-wrap" style={{ padding: 0, }}>
					{this.state.navLinks ? this.state.navLinks.map((Navlink, index) => {
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

					}) : ''}
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
	onLoadToggleMenu,
	onloadmenuwithpermission
})(SidebarContent));