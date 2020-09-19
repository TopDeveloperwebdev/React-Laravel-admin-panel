/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Container, Box, Switch, FormControl, InputLabel, Select, Dialog, DialogActions, DialogContent, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { userService } from '../../../_services';
//Components
import { SmallTitleBar } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { Link } from 'react-router-dom';
let ingredientsList = {};
class Medication extends Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [
				{ title: 'Medication name', field: 'medicationName' },
				{
					title: 'Ingredients ', field: 'ingredients', lookup: ingredientsList
				},
				{ title: 'Packaging ', field: 'packaging' },
				{
					title: 'Relation to order', field: 'ordersCount', render: rowData => {
						return (
							<a className="pointer" onClick={() => this.openDialogue(rowData.medicationName, 'users')} >{rowData.ordersCount} </a>
						)
					}
					, editComponent: rowData => <div>
						{rowData.ordersCount}
					</div>
				},
				{
					title: 'Relation to patient', field: 'patientsCount', render: rowData => {
						return (
							<a className="pointer" onClick={() => this.openDialogue(rowData.medicationName, 'patient')} >{rowData.patientsCount} </a>
						)
					}, editComponent: rowData => <div>
						{rowData.patientsCount}
					</div>
				},
			],

			data: [],
			openPatient: false,
			openUser: false,
			relationPatients: [],
			relationUsers: []

		};
		this.closePatientDialogue = this.closePatientDialogue.bind(this);
		this.closeUserDialogue = this.closeUserDialogue.bind(this);

	}
	openDialogue(medicationName, relation) {


		userService.relationPatients({ medicationName: medicationName, relation: relation }).then(res => {
			if (relation == 'patient') {
				this.setState({ relationPatients: res });
				this.setState({ openPatient: true });
			} else {
				this.setState({ relationUsers: res });
				this.setState({ openUser: true });
			}

		})
	}
	closePatientDialogue() {
		this.setState({ openPatient: false });
	}
	closeUserDialogue() {
		this.setState({ openUser: false });
	}
	componentWillMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		console.log('res', this.instance_id);
		userService.showMedications({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			console.log('ingredients', res.medications);
			this.setState(prevState => {
				const data = res.medications;
				return { ...prevState, data };
			});
			res.ingredients.map(ele => {
				ingredientsList[ele.ingredients] = ele.ingredients;
			})
		})

	}

	render() {

		return (
			<div className="tables-wrapper search-table-wrap">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.medication" />}
					center
				/>
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<MaterialTable
							title={<IntlMessages id="sidebar.medication" />}
							columns={this.state.columns}
							data={this.state.data}
							editable={{
								onRowAdd: newData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log('newData', newData);
											newData.instance_id = this.instance_id;
											userService.addMedications(newData).then(res => {
												console.log('res', res);
												this.setState(prevState => {
													const data = [...prevState.data];
													data.push(res);
													console.log('ingredients-res', data);
													return { ...prevState, data };
												});
											});

										}, 600);
									}),
								onRowUpdate: (newData, oldData) =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log('newdata', newData.id);
											userService.editMedications(newData).then(res => {
												if (oldData) {
													this.setState(prevState => {
														const data = [...prevState.data];
														data[data.indexOf(oldData)] = newData;
														return { ...prevState, data };
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
											userService.deleteMedications({ id: oldData.id }).then(res => {
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
				<Dialog
					open={this.state.openPatient}
					// onClose={this.closeDialog.bind(this)}
					aria-labelledby="responsive-dialog-title"
					className="confirmation-dialog"
				>
					<DialogContent>
						<Box textAlign="center" pt={2}>
							<Typography variant="h5">
								Here is a list of patients using this meidcation.
					</Typography>
							<Box>
								<TableContainer>
									<Table aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell>ID</TableCell>
												<TableCell align="left">Avatar</TableCell>
												<TableCell align="left">Name</TableCell>
												<TableCell align="left">Phone1</TableCell>
												<TableCell align="left">Phone2</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.relationPatients.map(row => (
												<TableRow key={row.id}>
													<TableCell component="th" scope="row">
														{row.id}
													</TableCell>
													<TableCell align="left" className="user-logo">
														<img src={row.picture ? row.picture : require('assets/Images/avatars/user-1.jpg')} alt="search" width="45" height="45" /></TableCell>
													<TableCell align="left">{row.firstName} {row.lastName}</TableCell>
													<TableCell align="left">{row.phone1}</TableCell>
													<TableCell align="left">{row.phone2}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Box>


						</Box>
					</DialogContent>
					<DialogActions className="px-20 pb-20 justify-content-center">
						<Box mb={2} width="100%" display="flex" justifyContent="center" p={1} textAlign="center">
							<Box mx={2}>
								<Button variant="contained" color="primary" onClick={this.closePatientDialogue}>
									OK
               		</Button>
							</Box>
						</Box>
					</DialogActions>
				</Dialog>
				<Dialog
					open={this.state.openUser}
					// onClose={this.closeDialog.bind(this)}
					aria-labelledby="responsive-dialog-title"
					className="confirmation-dialog"
				>
					<DialogContent>
						<Box textAlign="center" pt={2}>
							<Typography variant="h5">
								Here is a list of users who order this meidcation.
					</Typography>
							<Box>
								<TableContainer>
									<Table aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell>ID</TableCell>
												<TableCell align="left">Name</TableCell>
												<TableCell align="left">E-mail</TableCell>
												<TableCell align="left">Instance</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.relationUsers.map(row => (
												<TableRow key={row.id}>
													<TableCell component="th" scope="row">
														{row.id}
													</TableCell>
													<TableCell align="left">{row.name}</TableCell>
													<TableCell align="left">{row.email}</TableCell>
													<TableCell align="left">{row.instance_id}</TableCell>

												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Box>


						</Box>
					</DialogContent>
					<DialogActions className="px-20 pb-20 justify-content-center">
						<Box mb={2} width="100%" display="flex" justifyContent="center" p={1} textAlign="center">
							<Box mx={2}>
								<Button variant="contained" color="primary" onClick={this.closeUserDialogue}>
									OK
               		</Button>
							</Box>
						</Box>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
export default Medication;


