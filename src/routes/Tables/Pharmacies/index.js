/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { userService } from '../../../_services';
//Components
import { SmallTitleBar, CustomCard } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Box, Switch } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
class Pharmacies extends Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [
				{ title: 'Actions', field: 'actions' },
				{ title: 'Pharmacy logo', field: 'pharmacyLogo' },
				{ title: 'Pharmacy name', field: 'pharmacyName' },
				{ title: 'Street Nr', field: 'streetNr' },
				{ title: 'zip code', field: 'zipcode', type: 'numeric' },
				{ title: 'City', field: 'city' },
				{ title: 'Phone', field: 'phone', type: 'string', required: true },
				{ title: 'Fax', field: 'fax' },
				{ title: 'Email', field: 'email' },
				{ title: 'Password', field: 'password', type: 'string' },
				{ title: 'Notifications', field: 'notifications' },
			],
			data: [
				{ pharmacyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU', pharmacyName: 'Baran1', streetNr: 'streetNr', zipCode: 63, city: 'Mehmet', phone: 'Baran', fax: 'streetNr', email: 'test@admin.com', password: 'password', notifications: true },
				{ pharmacyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU', pharmacyName: 'Baran2', streetNr: 'streetNr', zipCode: 63, city: 'Mehmet', phone: 'Baran', fax: 'streetNr', email: 'test@admin.com', password: 'password', notifications: true },
				{ pharmacyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU', pharmacyName: 'Baran3', streetNr: 'streetNr', zipCode: 63, city: 'Mehmet', phone: 'Baran', fax: 'streetNr', email: 'test@admin.com', password: 'password', notifications: true },
				{ pharmacyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU', pharmacyName: 'Baran4', streetNr: 'streetNr', zipCode: 63, city: 'Mehmet', phone: 'Baran', fax: 'streetNr', email: 'test@admin.com', password: 'password', notifications: true },
			],
		};

	}

	// componentDidMount()
	// {
	// 	let user = JSON.parse(localStorage.getItem('user_id'));
	// 	 this.instance_id = user.instance_id;
	// 	userService.showFamilyDirectors({ instance_id: this.instance_id, pagination: 1 }).then(res => {
	// 		console.log('res', res);
	// 		this.setState(prevState => {
	// 			const data = res;				
	// 			return { ...prevState, data };
	// 		});

	// 	})

	// }

	render() {

		return (
			<div className="tables-wrapper search-table-wrap">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.familiy-directors" />}
					center
				/>
			
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<CustomCard title={<IntlMessages id="sidebar.basicTable" />}>
						<AddBoxIcon className="add-icon" />
							<Box pt={3}>
								<TableContainer>
									<Table aria-label="simple table">
										<TableHead>
											<TableRow>
												{this.state.columns.map(column => (
													<TableCell>{column.title}</TableCell>
												))}

											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.data.map(row => (
												<TableRow key={row.pharmacyName}>
													<TableCell component="th" scope="row" >
														<EditOutlinedIcon />
														<DeleteOutlineOutlinedIcon />
													</TableCell>

													<TableCell component="th" scope="row" >
														<img className="logo-td" src={row.pharmacyLogo} />
													</TableCell>
													<TableCell component="th" scope="row" >
														{row.pharmacyName}
													</TableCell>
													<TableCell component="th" scope="row">
														{row.streetNr}
													</TableCell>

													<TableCell component="th" scope="row">
														{row.zipCode}
													</TableCell>
													<TableCell component="th" scope="row">
														{row.city}
													</TableCell>
													<TableCell component="th" scope="row">
														{row.phone}
													</TableCell>
													<TableCell component="th" scope="row">
														{row.fax}
													</TableCell>

													<TableCell component="th" scope="row">
														{row.email}
													</TableCell>
													<TableCell component="th" scope="row">
														{row.password}
													</TableCell>
													<TableCell component="th" scope="row">
														<Switch
															size="small"
															color="primary"
														/>
													</TableCell>

												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Box>
						</CustomCard>
					</Box>
				</Container>
			</div>
		);
	}
}
export default Pharmacies;


