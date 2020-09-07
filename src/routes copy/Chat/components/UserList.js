/**
 * User List
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router-dom';
import {FormControl, Input, InputAdornment, Box, Divider} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

// Components
import RecentChatUsers from './RecentChatUsers';

// Redux actions
import {
	chatWithSelectedUser,
	updateUsersSearch,
	onSearchUsers
} from 'actions';

class UserList extends Component {

   /**
    * Swicth Chat With User
    * @param {*object} user
    */
	switchChatWithUser(user) {
		this.props.chatWithSelectedUser(user);
	}

   /**
    * On Search Chat Users
   */
	updateSearch(e) {
		this.props.updateUsersSearch(e.target.value);
		this.props.onSearchUsers(e.target.value);
	}

	render() {
		const { searchUsers } = this.props;
		return (
			<Box position="relative">
				<Box position="absolute" top='15px' left={16} right={16}>
					<FormControl fullWidth >
						<Input
							type="text"
							name="search-users"
							id="search"
							placeholder="Search"
							onChange={(e) => this.updateSearch(e)}
							value={searchUsers}
							endAdornment={
								<InputAdornment position="end">
									<SearchIcon />
								</InputAdornment>
							}
						/>
					</FormControl>	
				</Box>
				<Divider />
				<div className="chat-list">
					<Scrollbars
						className="rct-scroll"
						autoHide
						style={{ height: 'calc(100vh - 135px)' }}
					>
						<RecentChatUsers />
					</Scrollbars>
				</div>
			</Box>
		);
	}
}

const mapStateToProps = ({ chatAppReducer }) => {
	return chatAppReducer;
};

export default withRouter(connect(mapStateToProps, {
	chatWithSelectedUser,
	updateUsersSearch,
	onSearchUsers
})(UserList));