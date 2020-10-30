/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Grid, Checkbox, TextField, Typography, Container, Box, Switch } from '@material-ui/core';
import { userService } from '../../../_services';
import { Link } from 'react-router-dom';
//Components
import { SmallTitleBar } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';

import moment from "moment";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider
} from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";

moment.updateLocale("en", {
	week: {
		dow: 1
	}
});
let carsList = { car1: 'car1', car2: 'car2', car3: 'car3' };
let userList = { user1: 'user1', user2: 'user2', user3: 'user3' };
let typeList = { type1: 'type1', type2: 'type2', type3: 'type3' };

class Ausgaben extends Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [
				{
					title: 'Eingang(Datum)', field: 'date', render: rowData => {
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
								placeholder="tt.mm.jjjj"
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
				{ title: 'Rechungs-Nr.', field: 'invoiceNr' },
				{
					title: 'Grund', field: 'reason', editComponent: rowData => {
						if (rowData.rowData.id) {
							let reason = rowData.rowData.reason;
							if (this.state.isEditReason) {
								let reasonData = this.state.reasonList.find(element => element.reason == reason);
								this.setState({ isEditReason: false, reason: reason, reasonData })
							}
						}
						
						return (<Autocomplete
							options={this.state.reasonList}
							getOptionLabel={(option) => option.reason}
							value={this.state.reasonData}
							id="auto-complete"
							autoComplete
							includeInputInList
							onChange={this.onChangeReason}
							renderInput={(params) => <TextField
								id="input-with-icon-textfield"
								{...params}
								margin="normal"
								placeholder="Familiendoktor"

							/>}
						/>)
					}
				},
				{ title: 'Type', field: 'type', lookup: typeList },
				{ title: 'Mitarbeiter', field: 'user', lookup: userList },
				{ title: 'Auto', field: 'car', lookup: carsList },
				{ title: 'Betrag', field: 'amount', type: 'numeric' },
				{
					title: 'Link', field: 'link', render: rowData => <div className="linkdiv">
						<a  href={rowData.link} target="_blank">{rowData.link}</a>

					</div>

				},
				{
					title: 'Booked', field: 'booked', render: rowdata => {

						return (<Checkbox
							checked={this.state.checked[rowdata.id]}
							color="primary"
							onChange={(event) => this.handleChange(event.target.checked, rowdata)}
						/>)
					},
					editComponent: rowdata => {
						return (<Checkbox
							checked={this.state.completed}
							color="primary"
							onChange={(event) => this.handleChangeCheckbox(event.target.checked, rowdata)}
						/>)
					},
				},
			],
			reasonList: [],
			reasonData: {},
			data: [],
			date: '',
			isEditReason: false,
			completed: false,
			checked: [],
			reason: '',
			from: new Date(),
			to: new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000)),
			selectedData : []


		};

	}
	onChangeReason = (event, reasonData) => {
		if (reasonData) {
			this.setState({ reason: reasonData.reason, reasonData })
		}

	}
	componentWillMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		console.log('res', this.instance_id);
		userService.showAusgaben().then(res => {
          
			this.setState(prevState => {
				const data = res;
				return { ...prevState, data };
			});
			let checked = [];
			res.forEach(element => {
				checked[element.id] = element.booked;
			});
			this.handleFromChange(this.state.from);
          
		})

	}

	handleChangeDate = (event) => {
		this.setState({ date: event.target.value });
	}
	handleChange(value, data) {
		console.log('v alue', value);
		userService.editAusgaben({ id: data.id, booked: value }).then(res => {
			if (res) {
				this.setState(prevState => {
					const checked = [...prevState.checked];
					checked[data.id] = value;
					return { ...prevState, checked };
				});
			}

		})

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
	handleChangeCheckbox(value, data) {
		this.setState({ completed: value })
	}
	handleFromChange = (from) => {
	   let selectedData = this.state.data.filter(element =>  from <= new Date(element.date) && new Date(element.date) <= this.state.to);
	   
		this.setState({ from: from  , selectedData})
	}
	handleToChange = (to) => {

		let selectedData = this.state.data.filter(element => this.state.from <=  new Date(element.date)  && new Date(element.date) <= to);

		this.setState({ to: to , selectedData })
	}
	render() {

		return (
			<div className="tables-wrapper search-table-wrap ausgaben">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.ausgaben" />}
					center
				/>
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<Box pt={1} mb={3}>
							<Grid container sm={12} md={12} lg={12} className="datecontainer">
								<MuiPickersUtilsProvider utils={MomentUtils}>
									<Grid mr={3} item sm={4} md={4} lg={4} className="justify-around">
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											label="von"
											locale="ru"
											format="DD.MM.YYYY"
											margin="normal"
											id="date-picker-inline"
											value={this.state.from}
											name='from'
											onChange={this.handleFromChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</Grid>
									<Grid ml={2} item sm={4} md={4} lg={4} className="justify-around">

										<KeyboardDatePicker
											disableToolbar
											label="bis"
											variant="inline"
											format="DD.MM.YYYY"
											margin="normal"
											name='to'
											value={this.state.to}
											onChange={this.handleToChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</Grid>
								</MuiPickersUtilsProvider>



							</Grid>

						</Box>
						<MaterialTable
							title={<IntlMessages id="sidebar.ausgaben" />}
							columns={this.state.columns}
							data={this.state.selectedData}

							editable={{
								onRowAdd: newData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log('newData', newData);
											newData.date = this.state.date;
											newData.reason = this.state.reason;
											newData.booked = this.state.completed;
											console.log('this.state', this.state.reason);
											userService.addAusgaben(newData).then(res => {
												console.log('res', res);
												this.setState(prevState => {
													const data = [...prevState.data];
													data.push(res);
													return { ...prevState, data };
												});
												NotificationManager.success("Die Daten werden erfolgreich gespeichert.")
											}).catch(error => {
												NotificationManager.error(error.message);
											});
											this.setState({ isEditReason: true })

										}, 600);
									}),
								onRowUpdate: (newData, oldData) =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											newData.date = this.state.date;
											newData.reason = this.state.reason;
											newData.booked = this.state.completed;
											userService.editAusgaben(newData).then(res => {
												if (res) {
													this.setState(prevState => {
														const data = [...prevState.data];
														data[data.indexOf(oldData)] = newData;
														return { ...prevState, data };
													});
												}
												this.setState({ isEditReason: true })
												NotificationManager.success("Die Daten werden erfolgreich gespeichert.")
											}).catch(error => {
												NotificationManager.error(error.message);
											});
										}, 600);
									}),
								onRowDelete: oldData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											userService.deleteAusgaben({ id: oldData.id }).then(res => {
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
export default Ausgaben;


