/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Box, Grid, Button, Switch, Container, InputLabel, FormHelperText, NativeSelect, TextField, FormControl, Select, MenuItem } from '@material-ui/core';
import { userService } from '../../../_services';
//Components
import { SmallTitleBar } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { Link } from 'react-router-dom';

let statusList = { YES: "YES", NO: "NO" };
class Orders extends Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [
				{
					title: 'Order ID', field: 'orderId', render: rowData => <div>
						<Link to={`/order-detail/${rowData.orderId}`} target="_blank">{rowData.orderId}</Link>

					</div>,
					editComponent: rowData => <div>
						{rowData.id}
					</div>
				},
				{

					title: 'Medications', field: 'orderMedications', render: rowData => {
						let selectedMedications = JSON.parse(rowData.orderMedications);
						return (
							<div>
								{
									selectedMedications.map((value, index) => {
										return (<div key={index}>{value}</div>)
									})
								}
							</div>

						)

					},
					editComponent: rowData => {
						if (rowData.rowData.id) {
							console.log('rowData', rowData);
							let selectedMedications = JSON.parse(rowData.rowData.orderMedications);
							if (!selectedMedications) {
								selectedMedications = [];
							}
							if (this.state.isEditMedications) {
								this.setState({ selectedMedications: selectedMedications, isEditMedications: false })
							}
						}
						return (
							<MultiSelect
								data={this.state.medications}
								onChange={this.onChange}
								value={this.state.selectedMedications}
							/>
						)

					}
				},
				{
					title: 'Patient', field: 'patient', render: rowData => {
						let patient = this.state.patients.filter((a) => a.id == rowData.patient);
						return <div>
							{patient[0].firstName} {patient[0].lastName}
						</div>
					},
					editComponent: rowData => {
						return (
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								className="full-width"
								value={this.state.patient}
								onChange={this.handleChangePatients}
							>{
									this.state.patients.map((res, index) => {
										return (<MenuItem key={index} value={res.id}>{res.firstName}</MenuItem>)
									})
								}

							</Select>)
					}
				},
				{
					title: 'Pharmacy', field: 'pharmacy', render: rowData => {
						return (<div>
							{rowData.pharmacy}
						</div>)
					},
					editComponent: rowData => {
						return (
							<TextField
								id="pharmacy"
								style={{ marginBottom: 8 }}
								placeholder="pharmacy"
								value={this.state.pharmacy}
								InputProps={{
									readOnly: true,
								}}
							/>)
					}
				},
				{
					title: 'Family Doctor', field: 'doctor', render: rowData => {
						return (<div>
							{rowData.doctor}
						</div>)
					},
					editComponent: rowData => {
						return (
							<TextField
								id="doctor"
								style={{ marginBottom: 8 }}
								placeholder="doctor"
								value={this.state.doctor}
								InputProps={{
									readOnly: true,
								}}
							/>)
					}
				},

				{
					title: 'Due Date', field: 'date', render: rowData => {
						return (<div>
							{this.formate_date(rowData.date)}

						</div>)
					},
					editComponent: rowData => {

						let now = Date.now();
						console.log('now', now);
						return (
							<TextField
								className="full-width"
								id="datetime-local"
								type="date"
								defaultValue={now}
								InputLabelProps={{
									shrink: true,
								}}
								value={this.state.date}
								onChange={this.handleChangeDate}
							/>
						)
					}
				},
				{
					title: 'Note', field: 'note', render: rowData => {
						return (<div>
							{rowData.note}
						</div>)
					},
					editComponent: rowData => {
						return (
							<TextField
								className="full-width"
								id="outlined-multiline-static"
								label="Add Note"
								multiline
								rows={4}
								defaultValue="Default Value"
								variant="outlined"
								value={this.state.note}
								onChange={this.handleChangeNote}
							/>)
					}
				},
				{ title: 'Delivered', field: 'status', lookup: statusList }

				// {
				// 	title: 'Delivered', field: 'status', render: rowData => {
				// 		return (
				// 			rowData.status ? <div className="send">
				// 				YES
				// 		</div> :
				// 				<div className="notsend">
				// 					NO
				// 	</div>)
				// 	},
				// 	editComponent: rowData => {
				// 		return (
				// 			rowData.rowData.status ? <div className="send">
				// 				YES
				// 		</div> :
				// 				<div className="notsend">
				// 					NO
				// 	</div>)
				// 	},
				// }
			],

			pharmacy: '',
			patient: '',
			doctor: '',
			note: '',
			data: [],
			selectedMedications: [],
			medications: [],
			isEditMedications: true,
			patients: [],
		};

	}
	onChange = (event) => {
		this.setState({
			selectedMedications: [...event.target.value]
		});
	}
	formate_date(dateString) {
		let date;
		if (dateString) {
			let str = dateString.split(" ");
			date = str[0].split('-');
			date = date[2] + '.' + date[1] + '.' + date[0];
		}

		return date;
	}

	handleChangePatients = (event) => {
		let patient_id = event.target.value;
		let patient = this.state.patients.filter((a) => a.id == patient_id);
		let pharmacy = patient[0].pharmacy;
		let doctor = patient[0].familyDoctor;
		this.setState({ patient: event.target.value, pharmacy: pharmacy, doctor: doctor });


	}
	handleChangeNote = (event) => {
		this.setState({ note: event.target.value });
	}
	handleChangeDate = (event) => {
		this.setState({ date: event.target.value });
	}


	componentWillMount() {
		this.defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		this.user_id = user.id;


		console.log('res-1', this.user_id);
		userService.showOrders({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			let medications = res.medications.map(ele => {
				return ele.medicationName;
			});
			let patients = res.patients;

			console.log('res', res.orders);
			this.setState({
				medications, medications,
				data: res.orders,
				patients: patients
			})

		})

	}

	render() {
		let EditableData = this.instance_id ? {
			onRowAdd: newData =>
				new Promise(resolve => {
					resolve();

					newData.user_id = this.instance_id;

					newData.orderMedications = JSON.stringify(this.state.selectedMedications);
					newData.patient = this.state.patient;
					newData.date = this.state.date;
					newData.note = this.state.note;
					newData.pharmacy = this.state.pharmacy;
					newData.doctor = this.state.doctor;
					if (this.state.selectedMedications.length && newData.patient && newData.note && newData.date && newData.pharmacy && newData.doctor) {
						userService.addOrders(newData).then(res => {
							console.log('res', res);
							this.setState(prevState => {
								const data = [...prevState.data];
								data.push(res);
								const selectedMedications = [];
								const isEditMedications = true;
								return { ...prevState, data, selectedMedications, isEditMedications };
							});
						});
					} else {
						alert("Bitte füllen Sie die erforderlichen Felder aus.");
					}

				}),
			onRowDelete: oldData =>
				new Promise(resolve => {
					setTimeout(() => {
						resolve();
						console.log(';oldData', oldData.id);
						userService.deleteOrders({ id: oldData.id }).then(res => {
							console.log('res', res);
							this.setState(prevState => {
								const data = [...prevState.data];
								data.splice(data.indexOf(oldData), 1);
								return { ...prevState, data };
							});
						})
					}, 600);
				})
		} : {
				onRowDelete: oldData =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							console.log(';oldData', oldData.id);
							userService.deleteOrders({ id: oldData.id }).then(res => {
								console.log('res', res);
								this.setState(prevState => {
									const data = [...prevState.data];
									data.splice(data.indexOf(oldData), 1);
									return { ...prevState, data };
								});
							})
						}, 600);
					})
			};

		return (
			<div className="tables-wrapper search-table-wrap order-page">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.order" />}
					center
				/>
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<MaterialTable
							title={<IntlMessages id="sidebar.order" />}
							columns={this.state.columns}
							data={this.state.data}
							editable={EditableData}		
						/>
					</Box>
				</Container>
			</div>
		);
	}
}
export default Orders;


