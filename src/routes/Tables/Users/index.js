/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Container, Box, Switch } from '@material-ui/core';
import { userService } from '../../../_services';
//Components
import { SmallTitleBar } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
let rolesList = {};
let instancesList = {};
class Users extends Component {
	constructor(props) {
		super(props)
		this.state = {

			columns: [
				{
					title: 'ID', field: 'id', editComponent: rowData => <div>
						{rowData.id}
					</div>
				},
				{ title: 'Instance', field: 'instance_id', lookup: instancesList },
				{ title: 'User Name', field: 'name' },
				{ title: 'Email', field: 'email' },
				{ title: 'Password', field: 'password' },
				{ title: 'Role', field: 'role', lookup: rolesList },
				{
					title: 'Status', field: 'status', render: rowData => {
						return (<Switch
							size="small"
							color="primary"
							checked={rowData.status ? true : false}
						/>)

					},
					editComponent: rowData => {
						console.log('rowData', rowData);
						if (this.state.isEdit && rowData.rowData.id) {
							this.setState({ status: rowData.rowData.status ? true : false, isEdit: false });
						}
						return (<Switch
							size="small"
							color="primary"
							checked={this.state.status}
							onChange={e => this.setState({ status: e.target.checked })}
						/>)

					}
				},
			],
			data: [],
			status: true,
			isEdit: true,
			instance_id: 0

		};

	}

	componentDidMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		// this.setState({instance_id : this.instance_id});
		if (this.instance_id) {

			let colums = [
				{
					title: 'ID', field: 'id', editComponent: rowData => <div>
						{rowData.id}
					</div>
				},
				{ title: 'User Name', field: 'name' },
				{ title: 'Email', field: 'email' },
				{ title: 'Password', field: 'password' },
				{ title: 'Role', field: 'role', lookup: rolesList },
				{
					title: 'Status', field: 'status', render: rowData => {
						return (<Switch
							size="small"
							color="primary"
							checked={rowData.status ? true : false}
						/>)

					},
					editComponent: rowData => {
						console.log('rowData', rowData);
						if (this.state.isEdit && rowData.rowData.id) {
							this.setState({ status: rowData.rowData.status ? true : false, isEdit: false });
						}
						return (<Switch
							size="small"
							color="primary"
							checked={this.state.status}
							onChange={e => this.setState({ status: e.target.checked })}
						/>)

					}
				},
			];

			this.setState({ columns: [...colums] });

		}

		userService.showUsers({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			res.roles.map(ele => {
				rolesList[ele.role] = ele.role;
			})
			res.instances.map(ele => {
				instancesList[ele.id] = ele.instanceName;
			})

			this.setState(prevState => {
				const data = res.users;
				return { ...prevState, data };

			});

		})

	}

	render() {

		return (
			<div className="tables-wrapper search-table-wrap">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.users" />}
					center
				/>
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<MaterialTable
							title={<IntlMessages id="sidebar.users" />}
							columns={this.state.columns}
							data={this.state.data}
							editable={{
								onRowAdd: newData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log('newData', newData);

											newData.status = this.state.status ? 1 : 0;
											if (this.instance_id) {
												newData.instance_id = this.instance_id;
											}
											userService.addUsers(newData).then(res => {
												console.log('res', res);
												this.setState(prevState => {
													const old = [...prevState.data];
													let data = [];
													data.push(res);
													[...data] = [...data, ...old];
													const status = true;
													return { ...prevState, data, status };
												});
											});

										}, 600);
									}),
								onRowUpdate: (newData, oldData) =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log('newdata', newData.id);
											newData.status = this.state.status ? 1 : 0;
											userService.editUsers(newData).then(res => {
												if (oldData) {
													this.setState(prevState => {
														const data = [...prevState.data];
														data[data.indexOf(oldData)] = newData;
														const status = true;
														const isEdit = true;
														return { ...prevState, data, status, isEdit };
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
											userService.deleteUsers({ id: oldData.id }).then(res => {
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
export default Users;


