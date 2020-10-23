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

class CareManagers extends Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [
				{ title: 'Ansprechpartner', field: 'ansprechpartner' },
				{ title: 'Klinik', field: 'klinik' },
				{ title: 'Fax', field: 'fax' },
				{ title: 'Email', field: 'email' },
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
			data: [],
			notifications: true,
			isEditNotifications: false

		};

	}

	componentWillMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		console.log('res', this.instance_id);
		userService.showCaremanagers().then(res => {

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
					title={<IntlMessages id="sidebar.caremanagers" />}
					center
				/>
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<MaterialTable
							title={<IntlMessages id="sidebar.caremanagers" />}
							columns={this.state.columns}
							data={this.state.data}
							editable={{
								onRowAdd: newData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log('newData', newData);
											newData.instance_id = this.instance_id;
											newData.notifications = this.state.notifications;
											userService.addCaremanagers(newData).then(res => {
												console.log('res', res);
												this.setState(prevState => {
													const data = [...prevState.data];
													data.push(res);
													return { ...prevState, data };
												});
											});
											this.setState({ notifications: true, isEditNotifications: true })

										}, 600);
									}),
								onRowUpdate: (newData, oldData) =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();

											newData.notifications = this.state.notifications;
											userService.editCaremanagers(newData).then(res => {
												if (res) {
													this.setState(prevState => {
														const data = [...prevState.data];
														data[data.indexOf(oldData)] = newData;
														return { ...prevState, data };
													});
												}
												this.setState({ notifications: true, isEditNotifications: true })
											})
										}, 600);
									}),
								onRowDelete: oldData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log(';oldData', oldData.id);
											userService.deleteCaremanagers({ id: oldData.id }).then(res => {
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
export default CareManagers;


