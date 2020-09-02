
/**
 * Email Listing Component
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

// folders
import Inbox from './inbox';
import SentEmails from './sentEmails';
import DraftsEmails from './draftEmails';
import SpamEmails from './spamEmails';
import TrashEmails from './trashEmails';

class Folders extends Component {

	render() {
		const { match } = this.props;
		return (
			<div className="list-wrap">
				<Switch>
					<Redirect exact from={`${match.url}/`} to={`${match.url}/inbox`} />
					<Route path={`${match.url}/inbox`} component={Inbox} />
					<Route path={`${match.url}/sent`} component={SentEmails} />
					<Route path={`${match.url}/drafts`} component={DraftsEmails} />
					<Route path={`${match.url}/spam`} component={SpamEmails} />
					<Route path={`${match.url}/trash`} component={TrashEmails} />
					<Route path={`${match.url}/Primary`} component={Inbox} />
					<Route path={`${match.url}/Social`} component={Inbox} />
					<Route path={`${match.url}/Marketing`} component={Inbox} />
				</Switch>
			</div>
		);
	}
}

// Map state to props
const mapStateToProps = ({ emailApp }) => {
	return emailApp;
};

export default withRouter(connect(mapStateToProps)(Folders));
