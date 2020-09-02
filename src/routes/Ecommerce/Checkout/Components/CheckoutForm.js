/**
 * Widget Top Sellers Ecommerce Dashboard
 */

import React, { Fragment } from 'react'
import { Typography, AppBar, Tabs, Tab, Box} from '@material-ui/core'

//Components
import BillingForm from './BillingForm';
import Payment from './Payment';
import IntlMessages from 'util/IntlMessages';
/** Function is responsible to display Tab panel content */
function TabContent({ children, dir }) {
	return (
		<Typography component="div" dir={dir}>
			{children}
		</Typography>
	);
}

class WidgetTopSellers extends React.Component {
	/** Constructor */
	constructor(props) {
		super(props);
		this.state = {
			tabIndex: 0
		}
	}

	/** Function to detect event changes */
	handleTabChange = (event, value) => {
		this.setState({ tabIndex: value });
	}

	/** Function to handle change on swipe view */
	handleChangeIndex = index => {
		this.setState({ tabIndex: index });
	}

	/** main function */
	render() {
		const { tabIndex } = this.state;
		return (
			<div className="checkout-tabs">
				<AppBar position="static" color="default" style={{ boxShadow: 'none' }}>
					<Tabs
						value={tabIndex}
						onChange={this.handleTabChange}
						indicatorColor="primary"
						textColor="primary"
					>
						<Tab
							disabled
                     label={<Fragment><Box component="span" fontSize="subtitle2.fontSize" mr={1} /><IntlMessages id="component.shippingAddress" /></Fragment>}
						/>
						<Tab
							disabled
                     label={<Fragment><Box component="span" fontSize="subtitle2.fontSize" mr={1} /><IntlMessages id="component.payment" /></Fragment>}
						/>
					</Tabs>
				</AppBar>
				{tabIndex === 0 && <TabContent><BillingForm onComplete={() => this.setState({ tabIndex: 1 })} /></TabContent>}
				{tabIndex === 1 && <TabContent><Box py={8}><Payment onChangeInfo={() => this.setState({ tabIndex: 0 })} /></Box></TabContent>}
			</div>
		);
	}
}

export default WidgetTopSellers;