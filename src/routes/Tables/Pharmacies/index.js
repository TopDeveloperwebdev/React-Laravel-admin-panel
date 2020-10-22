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

class Pharmacies extends Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [
				{
					title: 'Pharmacy logo', field: 'pharmacyLogo', render: rowData => <img src={rowData.pharmacyLogo ? rowData.pharmacyLogo : this.defaultUrl} className="logo-td bdr-rad-50" />,
					editComponent: props => {
						return (
							<input
								type='file'
								onChange={e => props.onChange(e.target.files[0])}
							/>
						)

					}
				},
				{ title: 'Pharmacy name', field: 'pharmacyName' },
				{ title: 'Street Nr', field: 'streetNr' },
				{ title: 'zip code', field: 'zipCode' },
				{ title: 'City', field: 'city' },
				{ title: 'Phone', field: 'phone', type: 'string', required: true },
				{ title: 'Fax', field: 'fax' },
				{ title: 'Email', field: 'email' },
				{ title: 'Password', field: 'password', type: 'string' },			
				{
					title: 'Notifications', field: 'notifications', render: rowData => {
						return (<Switch
							size="small"
							color="primary"
							checked={rowData.notifications ? true : false}
						/>)

					},
					editComponent: rowData => {
						console.log('rowData', rowData);
						if (this.state.isEditNotifications && rowData.rowData.id) {
							this.setState({ notifications: rowData.rowData.notifications ? true : false, isEditNotifications: false });
						}
						return (<Switch
							size="small"
							color="primary"
							checked={this.state.notifications}
							onChange={e => this.setState({ notifications: e.target.checked })}
						/>)

					}
				},
			],
			selectedData: {
				logo: '',
			},
			data: [],
			notifications : true,
			isEditNotifications : false
		};

	}

	componentWillMount() {
		this.defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;

		userService.showPharmacies({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			console.log('res', res);
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
					title={<IntlMessages id="sidebar.pharmacies" />}
					center
				/>
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<MaterialTable
							title={<IntlMessages id="sidebar.pharmacies" />}
							columns={this.state.columns}
							data={this.state.data}
							localization={{								
								header: {
									actions: 'Funktionen'
								},								
							}}
							editable={{
								onRowAdd: newData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();

											newData.instance_id = this.instance_id;
											newData.notifications = this.state.notifications;
											const formData = new FormData()
											formData.append('file', newData.pharmacyLogo);
											newData.pharmacyLogo = '';
											formData.append('data', JSON.stringify(newData));
											userService.addPharmacies(formData).then(res => {
												console.log('res', res);
												this.setState(prevState => {
													const data = [...prevState.data];
													data.push(res);
													return { ...prevState, data };
												});
											});
											this.setState({notifications : true , isEditNotifications : true})
										}, 600);
									}),
								onRowUpdate: (newData, oldData) =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											const formData = new FormData()
											if (typeof newData.pharmacyLogo == 'object') {
												formData.append('file', newData.pharmacyLogo);
												newData.pharmacyLogo = '';
											}
											newData.notifications = this.state.notifications;
											formData.append('data', JSON.stringify(newData));
									
											userService.editPharmacies(formData).then(res => {
												if (oldData) {
													this.setState(prevState => {
														const data = [...prevState.data];
														data[data.indexOf(oldData)] = res;
														return { ...prevState, data };
													});
												}
											})
											this.setState({notifications : true , isEditNotifications : true})
										}, 600);
									}),
								onRowDelete: oldData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log(';oldData', oldData.id);
											userService.deletePharmacies({ id: oldData.id }).then(res => {
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
export default Pharmacies;


