/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Container, Box, Switch, FormControl, InputLabel, Select } from '@material-ui/core';
import { userService } from '../../../_services';
//Components
import { SmallTitleBar } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';

class Permissions extends Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [
				{
					title: 'ID', field: 'id', editComponent: rowData => <div>
						{rowData.id}
					</div>
				},
				{ title: 'Permissions', field: 'permissions' },
			],

			data: [],

		};

	}

	componentWillMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		console.log('res', this.instance_id);
		userService.showPermissions({ instance_id: this.instance_id, pagination: 1 }).then(res => {

			this.setState(prevState => {
				const data = res;
				return { ...prevState, data };
			});

		})

	}

	render() {

		return (
			<div className="tables-wrapper search-table-wrap">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.permissions" />}
					center
				/>
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<MaterialTable
							title={<IntlMessages id="sidebar.permissions" />}
							columns={this.state.columns}
							data={this.state.data}
							editable={{
								onRowAdd: newData =>
									new Promise(resolve => {
										resolve();
										console.log('newData', newData);
										newData.instance_id = this.instance_id;
										userService.addPermissions(newData).then(res => {
											console.log('res', res);
											this.setState(prevState => {
												const data = [...prevState.data];
												data.push(res);
												return { ...prevState, data };
											});
										});
									}),
								onRowUpdate: (newData, oldData) =>
									new Promise(resolve => {
										resolve();
										console.log('newdata', newData.id);
										userService.editPermissions(newData).then(res => {
											if (oldData) {
												this.setState(prevState => {
													const data = [...prevState.data];
													data[data.indexOf(oldData)] = newData;
													return { ...prevState, data };
												});
											}
										})
									}),
								onRowDelete: oldData =>
									new Promise(resolve => {
										resolve();
										console.log(';oldData', oldData.id);
										userService.deletePermissions({ id: oldData.id }).then(res => {
											console.log('res', res);
											this.setState(prevState => {
												const data = [...prevState.data];
												data.splice(data.indexOf(oldData), 1);
												return { ...prevState, data };
											});
										})
									}),
							}}
						/>
					</Box>
				</Container>
			</div>
		);
	}
}
export default Permissions;


