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
import { MultiSelect } from '@progress/kendo-react-dropdowns';

class Roles extends Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [
				{
					title: 'ID', field: 'id', editComponent: rowData => <div>
						{rowData.id}
					</div>
				},
				{ title: 'Role', field: 'role' },
				{
					title: 'Permissions', field: 'permissions', render: rowData => {
						let selectedPermissions = JSON.parse(rowData.permissions);
						return (
							<div>
								{
									selectedPermissions.map((value, index) => {
										return (<div key={index}>{value}</div>)
									})
								}
							</div>

						)

					},
					editComponent: rowData => {
						if (rowData.rowData.id) {
							console.log('rowData', rowData);
							let selectedPermissions = JSON.parse(rowData.rowData.permissions);
							if (!selectedPermissions) {
								selectedPermissions = [];
							}
							if (this.state.isEditPermissions) {
								this.setState({ selectedPermissions: selectedPermissions, isEditPermissions: false })
							}
						}
						return (
							<MultiSelect
								data={this.state.permissionsList}
								onChange={this.onChange}
								value={this.state.selectedPermissions}
							/>
						)

					}
				},
			],

			data: [],
			selectedPermissions: [],
			permissionsList: [],
			isEditPermissions: true

		};

	}
	onChange = (event) => {
		this.setState({
			selectedPermissions: [...event.target.value]
		});
	}
	componentWillMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		console.log('res', this.instance_id);
		userService.showRoles({ instance_id: this.instance_id, pagination: 1 }).then(res => {

			let permissionsList = res.permissions.map(ele => { return ele.permissions })
			this.setState({ permissionsList: permissionsList })
			this.setState(prevState => {
				const data = res.roles;
				return { ...prevState, data };
			});

		})

	}

	render() {

		return (
			<div className="tables-wrapper search-table-wrap">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.roles" />}
					center
				/>
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<MaterialTable
							title={<IntlMessages id="sidebar.roles" />}
							columns={this.state.columns}
							data={this.state.data}
							editable={{
								onRowAdd: newData =>
									new Promise(resolve => {
										resolve();
										console.log('newData', newData);
										newData.instance_id = this.instance_id;
										newData.permissions = JSON.stringify(this.state.selectedPermissions);
										userService.addRoles(newData).then(res => {
											console.log('res', res);
											this.setState(prevState => {
												const old = [...prevState.data];
												let data = [];
												data.push(res);
												[...data] = [...data, ...old];
												const selectedPermissions = [];
												const isEditPermissions = true;
												return { ...prevState, data, selectedPermissions, isEditPermissions };
											});
										});
									}),
								onRowUpdate: (newData, oldData) =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log('newdata', newData.id);
											newData.permissions = JSON.stringify(this.state.selectedPermissions);
											userService.editRoles(newData).then(res => {
												if (oldData) {
													this.setState(prevState => {
														const data = [...prevState.data];
														data[data.indexOf(oldData)] = newData;
														const selectedPermissions = [];
														const isEditPermissions = true;
														return { ...prevState, data, selectedPermissions, isEditPermissions };
													});
												}
											})
										}, 600);
									}),
								onRowDelete: oldData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log(';oldData', oldData.id);
											userService.deleteRoles({ id: oldData.id }).then(res => {
												console.log('res', res);
												this.setState(prevState => {
													const data = [...prevState.data];
													data.splice(data.indexOf(oldData), 1);
													return { ...prevState, data };
												});
											})
										}, 600);
									}),
							}}
						/>
					</Box>
				</Container>
			</div>
		);
	}
}
export default Roles;


