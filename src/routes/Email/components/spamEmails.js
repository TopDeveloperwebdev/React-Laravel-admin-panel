/**
 * Spam Emails
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Route } from 'react-router-dom';

// Components
import EmailListing from './emailListing';
import EmailDetail from './emailDetail';

// Redux actions
import { getSpamEmails } from 'actions';

class SpamEmails extends Component {

	UNSAFE_componentWillMount() {
		this.props.getSpamEmails();
	}

	render() {
		const { match } = this.props;
		return (
			<Switch>
				<Route exact path={match.url} component={EmailListing} />
				<Route path={`${match.url}/:id`} component={EmailDetail} />
			</Switch>
		);
	}
}

export default withRouter(connect(null, {
	getSpamEmails
})(SpamEmails));
