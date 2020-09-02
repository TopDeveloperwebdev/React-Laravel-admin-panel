import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// json file of menu items
import menuItems from 'assets/Data/MenuItems.json';

const styles = {
	links: {
		textDecoration: 'none',
	},
	subMenu: {
		padding: '10px',
		width: '25%',
		display: 'block',
	},
	navLink: {
		display: 'inline',
		float: 'left',
		paddingLeft: '30px',
	},
	wrapperStyle: {
		display: 'inline-block',
		marginLeft: '250px',
		marginRight: '250px',
		width: `calc(100% - ${500}px)`,
	}
};

class HorizontalMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}

	/**
	 * function is used to load the menu structure
	 */
	getNavMenu(children) {
		return children.map((subOption) => {
			if (!subOption.children) {
				return (
					<li className="nav-link" key={subOption.name} style={styles.navLink}>					
						<Link to={subOption.url ? subOption.url : ""} style={styles.links}>
							{subOption.name}
						</Link>
					</li>
				);
			}
			return (
				
				<li className="nav-link" key={subOption.name} style={styles.navLink}>
					<Link to={subOption.url ? subOption.url : ""} style={styles.links}>
						{subOption.name}
					</Link>
					<ul className="sub-menu" style={styles.subMenu}>
						{this.getNavMenu(subOption.children)}
					</ul>
				</li>
			);
		})

	}
	// main render function
	render() {
		return (
			<div className="horiz-menu-wrap">
				<ul className="horiz-menu" style={styles.wrapperStyle}>
					{this.getNavMenu(menuItems.data)}
				</ul>
			</div>
		);
	}
}

export default HorizontalMenu;