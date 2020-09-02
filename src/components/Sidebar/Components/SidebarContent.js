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
         navLinks: this.props.navLinks
		}
	}

	getPlanName(name) {
		let newName = name.replace("-", " ");
		return newName
	}

   componentDidMount(){
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
         navLinks: this.props.navLinks
      })
	}

	toggleMenu(index) {
		this.props.toggleMenu(index)
      this.setState({
         navLinks: this.props.navLinks
      })
	}
	toggleThirdMenuAndCloseSidebar(index){
		this.props.toggleThirdMenu(index)
      this.setState({
         navLinks: this.props.navLinks
      })
      if(this.props.closeSidebar){
			this.props.closeSidebar()
		}
	}
	toggleThirdMenu(index){
      this.props.toggleThirdMenu(index)
      this.setState({
         navLinks: this.props.navLinks
      })
   }
   
   toggleFourthMenu(fourthindex) {
      this.props.toggleFourthMenu(fourthindex)
      this.setState({
         navLinks: this.props.navLinks
      })
      if(this.props.closeSidebar){
			this.props.closeSidebar()
		}
   }


	render() {
		const { closeSidebar } = this.props;
		return (
			<div>
				<List className="menu-wrap" style={{ padding: 0, }}>
               {this.state.navLinks && this.state.navLinks.map((Navlink, index) => {
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

const mapStateToProps = ({ menuListReducer }) => {	
	return menuListReducer;
};

export default withRouter(connect(mapStateToProps, {
	toggleThirdMenu,
   toggleMenu,
	toggleFourthMenu,
	onLoadToggleMenu
})(SidebarContent));