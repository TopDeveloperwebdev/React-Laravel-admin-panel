/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Container, Box, Switch, FormControl, InputLabel, Select } from '@material-ui/core';
import { userService } from '../../../_services';
import MapPage from './Map';

class Maps extends Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [
				{
					title: 'ID', field: 'id', editComponent: rowData => <div>
						{rowData.id}
					</div>
				},
				{ title: 'Services', field: 'services' },
			],

			data: [],

		};

	}

	// componentWillMount() {
	// 	let user = JSON.parse(localStorage.getItem('user'));
	// 	this.instance_id = user.instance_id;
	// 	console.log('res', this.instance_id);
	// 	userService.showServices({ instance_id: this.instance_id, pagination: 1 }).then(res => {

	// 		this.setState(prevState => {
	// 			const data = res;
	// 			return { ...prevState, data };
	// 		});

	// 	})

	// }

	render() {

		return (
			<div className="tables-wrapper search-table-wrap">

				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<div style={{ margin: '100px' }}>
							<MapPage							
								center={{ lat: 18.5204, lng: 73.8567 }}
								height='300px'
								zoom={15}
							/>
						</div>
					</Box>
				</Container>
			</div>
		);
	}
}
export default Maps;


