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
class Instances extends Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [
				{
					title: 'ID', field: 'id', editComponent: rowData => <div>
						{rowData.id}
					</div>
				},
				{
					title: 'Instance logo', field: 'instanceLogo', render: rowData => <img src={rowData.instanceLogo ? rowData.instanceLogo : this.defaultUrl} className="logo-td bdr-rad-50" />,
					editComponent: props => {
						return (
							<input
								type='file'
								onChange={e => props.onChange(e.target.files[0])}
							/>
						)

					}
				},
				{
					title: 'Admin Avatar', field: 'userAvatar', render: rowData => <img src={rowData.userAvatar ? rowData.userAvatar : this.defaultUrl} className="logo-td bdr-rad-50" />,
					editComponent: props => {
						return (
							<input
								type='file'
								onChange={e => props.onChange(e.target.files[0])}
							/>
						)

					}
				},
				{ title: 'Instance Name', field: 'instanceName' },
				{ title: 'Admin Name', field: 'name' },
				{ title: 'Email', field: 'email' },
				{ title: 'Phone', field: 'phone' },
				{ title: 'Fax', field: 'fax' },
				{ title: 'Street nr', field: 'streetNr' },			
				{ title: 'Zip', field: 'zip' },
				{ title: 'City', field: 'city' },
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
			isEdit: true

		};

	}

	componentWillMount() {
		this.defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		console.log('res', this.instance_id);
		userService.showInstances({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			console.log('res.instances', res.instances);
			res.roles.map(ele => {
				rolesList[ele.role] = ele.role;
			})
			this.setState(prevState => {
				const data = res.instances
				return { ...prevState, data };
			});

		})

	}

	render() {

		return (
			<div className="tables-wrapper search-table-wrap">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.instances" />}
					center
				/>
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<MaterialTable
							title={<IntlMessages id="sidebar.instances" />}
							columns={this.state.columns}
							data={this.state.data}
							editable={{
								onRowAdd: newData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();

											newData.instance_id = this.instance_id;
											newData.status = this.state.status ? 1 : 0;
											const formData = new FormData()
											formData.append('file', newData.instanceLogo);
											formData.append('userAvatar', newData.userAvatar);
											if (newData.instanceLogo != undefined && newData.userAvatar != undefined && newData.instanceName && newData.name && newData.email && newData.password && newData.role) {
												newData.instanceLogo = '';
												newData.userAvatar = '';
												formData.append('data', JSON.stringify(newData));
												userService.addInstances(formData).then(res => {
													console.log('res', res);
													this.setState(prevState => {
														const data = [...prevState.data];
														data.push(res);
														const status = true;
														return { ...prevState, data, status };
													});
												}).catch(error => {
													alert("Diese E-Mail existiert bereits oder ist ein Netzwerkfehler.");
												});;
											}
											else {
												alert("Bitte füllen Sie die erforderlichen Felder aus.");
											}



										}, 600);
									}),
								onRowUpdate: (newData, oldData) =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log('newdata', newData.id);
											newData.status = this.state.status ? 1 : 0;

											const formData = new FormData()
											if (typeof newData.instanceLogo == 'object') {
												formData.append('file', newData.instanceLogo);
												newData.instanceLogo = '';
											}
											if (typeof newData.userAvatar == 'object') {
												formData.append('userAvatar', newData.userAvatar);
												newData.userAvatar = '';
											}
											formData.append('data', JSON.stringify(newData));
											userService.editInstances(formData).then(res => {
												if (oldData) {
													this.setState(prevState => {
														const data = [...prevState.data];
														newData.instanceLogo = res.instanceLogo;
														newData.userAvatar = res.userAvatar;
														data[data.indexOf(oldData)] = newData;
														const status = true;
														const isEdit = true;
														return { ...prevState, data, status, isEdit };
													});
												}
											}).catch(error => {
												alert("Diese E-Mail existiert bereits oder ist ein Netzwerkfehler.");
											});;
										}, 600);
									}),
								onRowDelete: oldData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log(';oldData', oldData.id);
											userService.deleteInstances({ id: oldData.id }).then(res => {
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
export default Instances;


