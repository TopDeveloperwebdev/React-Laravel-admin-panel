/**
 * Horizontal Menu
*/
import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import menuItems from 'assets/Data/MenuItems';
import NavMenuItem from './NavMenuItem';
import IntlMessages from 'util/IntlMessages';

class HorizontalMenu extends Component {

   constructor(props) {
		super(props);
		this.state = {
			navLinks: menuItems.data,
			general:null,
			modules:null,
			components:null,
			application:null,
		}
	}
	
	componentDidMount(){
		this.setCategory()
		
	}
	
	setCategory(){
		
		let category1 = this.state.navLinks.filter((item, i) => {
			return item.category === 'general';
		})
		let category2 = this.state.navLinks.filter((item, i) => {
			return item.category === 'modules';
		})
		let category3 = this.state.navLinks.filter((item, i) => {
			return item.category === 'components';
		})
		let category4 = this.state.navLinks.filter((item, i) => {
			return item.category === 'applications';
		})
		this.setState({
			general:category1,
			modules:category2,
			components:category3,
			application:category4,
		})
	}

	render() {
      const { general,
			modules,
			components,
			application } = this.state;
			
		return (
         <Box className="horizontal-menu">
            <ul className="list-unstyled nav">
					<li className="nav-item menu-item-has-child">
						<span>
							<i className="material-icons-outlined">dashboard</i>
                     <span className="menu-title"><IntlMessages id="horizontalMenu.general" /></span>
						</span>
						<ul className="list-unstyled sub-menu">
							{general && general.map((menu, key) => (
								<NavMenuItem
									menu={menu}
									key={key}
								/>
							))}
						</ul>
					</li>   
					<li className="nav-item menu-item-has-child">
						<span>
							<i className="material-icons-outlined">widgets</i>
                     <span className="menu-title"><IntlMessages id="horizontalMenu.modules" /></span>
						</span>
						<ul className="list-unstyled sub-menu">
							{modules && modules.map((menu, key) => (
								<NavMenuItem
									menu={menu}
									key={key}
								/>
							))}
						</ul>
					</li>                 
					<li className="nav-item menu-item-has-child">
						<span>
							<i className="material-icons-outlined">view_carousel</i>
                     <span className="menu-title"><IntlMessages id="horizontalMenu.components" /></span>
						</span>
						<ul className="list-unstyled sub-menu">
							{components && components.map((menu, key) => (
								<NavMenuItem
									menu={menu}
									key={key}
								/>
							))}
						</ul>
					</li>     
					<li className="nav-item menu-item-has-child">
						<span>
							<i className="material-icons-outlined">apps</i>
                     <span className="menu-title"><IntlMessages id="horizontalMenu.applications" /></span>
						</span>
						<ul className="list-unstyled sub-menu">
							{application && application.map((menu, key) => (
								<NavMenuItem
									menu={menu}
									key={key}
								/>
							))}
						</ul>
					</li>     
            </ul>
         </Box>   
		);
	}
}

export default HorizontalMenu;