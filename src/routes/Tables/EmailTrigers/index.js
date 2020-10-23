/**
 * Custom Table Widget
*/
import React, { Component } from "react";

import { withStyles } from '@material-ui/styles';
import { Grid, Box, Typography, Avatar, Tooltip, IconButton, Container, Button } from '@material-ui/core';

import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import IntlMessages from 'util/IntlMessages';
import { SmallTitleBar } from 'components/GlobalComponents';
import { AutoComplete, MultiSelect } from '@progress/kendo-react-dropdowns';
// Components
import { CustomCard, SocialIcons } from 'components/GlobalComponents';
import { userService } from '../../../_services';
import { NotificationManager } from 'react-notifications';

let usersList = ['Family doctors', 'Pharmacies','Care managers' ,'Patients', 'Related Users'];
const types = ['Jedes Jahr an Geburtstagen', 'Benutzer erzeugt eine Bestellung'];

const styles = theme => ({
	root: {
		'& .MuiTableCell-paddingNone': {
			padding: '0 16px',
		},
		'& .MuiTableCell-body': {
			lineHeight: 1,
		},
		'& .MuiToolbar-root': {
			paddingRight: 20,
			'& >div:first-child': {
				fontSize: '1.25rem',
				fontFamily: "'Roboto', sans-serif",
				fontWeight: 500,
			}
		}
	},
	content: {

	},
	menuButton: {

	}
});

class EmailTrigers extends Component {

	state = {

		selectedRow: {
			"firstName": "Zachery",
			"lastName": "Terrell",
			"designation": "Web Developer",
			"city": "Chakwal",
			"postal": "352950",
			"address": "Ap #262-5976 Elementum Rd.",
			"country": "Virgin Islands",
			"imageUrl": "user-1.jpg",
			"contactNo": "9876543210",
			"lastModified": "17/3/2019",
			"tableData": {
				"id": 0
			}
		},
		selectedRowForStyle: null,
		selectedUsers: [],
		selectedType: 'Jedes Jahr an Geburtstagen',
		TemplateAllList: [],
		TemplateList: [],
		isEditBirthday: false,
		isEditOrder: false,
		triggers: [],
		Template: '',
		id: ''
	};

	handleRowClick = (selectedType) => {
		let TemplateList = [];
		this.state.TemplateAllList.forEach(ele => {
			if (ele.type == selectedType) {
				TemplateList.push(ele.title)
			}
		})
		let isEditBirthday = false, isEditOrder = false, selectedUsers = [], Template, id;
		let trigger = this.state.triggers.filter(ele => ele.type == selectedType);

		if (trigger.length) {
			if (trigger[0].type == types[0]) {
				isEditBirthday = true;
			}
			else if (trigger[0].type == types[1]) {
				isEditOrder = true;
			}
			selectedUsers = JSON.parse(trigger[0].usergroup);
			Template = trigger[0].template;
			id = trigger[0].id;

		}


		this.setState(prevState => {
			return { ...prevState, TemplateList, selectedType, selectedUsers, Template, isEditBirthday, isEditOrder, id };
		});

	}
	onChangeUsers = (event) => {
		console.log('adfa', event);
		this.setState({
			selectedUsers: [...event.target.value]
		});

	}
	onChangeTemplate = (event) => {
		this.setState({ Template: event.target.value });
	}

	componentWillMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		console.log('res', this.instance_id);
		userService.showTriggers({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			this.setState({
				TemplateAllList: [...res.templates],
				triggers: [...res.triggers]

			})
			this.handleRowClick('Benutzer erzeugt eine Bestellung');
		})
	}

	onSubmitTrigger() {

		userService.addTriggers({ instance_id: this.instance_id, type: this.state.selectedType, usergroup: JSON.stringify(this.state.selectedUsers), template: this.state.Template }).then(res => {

			NotificationManager.success("Sie haben den Triggerfluss erfolgreich gespeichert'");
		}, error => {
			NotificationManager.error(error);

		})
	}
	onUpdateTrigger() {
		userService.editTriggers({ id: this.state.id, instance_id: this.instance_id, type: this.state.selectedType, usergroup: JSON.stringify(this.state.selectedUsers), template: this.state.Template }).then(res => {
			NotificationManager.success("Sie haben den Triggerfluss erfolgreich aktualisiert");
		}, error => {

			NotificationManager.error(error);
		})
	}
	render() {
		const { classes } = this.props;
		const { selectedRow } = this.state;
		console.log('(this.state.selectedType == types[0] && this.state.isEditBirthday) || (this.state.selectedType == types[1] && this.state.isEditOrder)',
			this.state.selectedType == types[0], this.state.isEditBirthday, (this.state.selectedType == types[1] && this.state.isEditOrder))
		return (
			<div className="tables-wrapper search-table-wrap">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.emailTrigers" />}
					center
				/>
				<Container maxWidth="lg" className="triggerContainer">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<Grid container spacing={0} className="res-custom-table">
							<Grid item xs={12} sm={12} md={5}>
								<CustomCard title="Verfügbare Abläufe" showDivider={true}>
									<ul className="top-hits" mt={10}>

										<li onClick={() => this.handleRowClick('Benutzer erzeugt eine Bestellung')}>
											<div className="top-product">
												<div className="top-product-detail">
													<div className="top-product-thumb">
														<ShoppingCartOutlinedIcon />
													</div>
													<Box>
														<Typography className="top-product-title">Wenn der Benutzer eine Bestellung tätigt</Typography>
														<Box display="flex">
															<Box display="flex" alignItems="center" className="top-product-meta" mr={1}>
																<Typography>Workflow wird ausgelöst, wenn ein Benutzer eine Bestellung tätigt</Typography>
															</Box>
														</Box>
													</Box>
												</div>
											</div>
										</li>

										<li onClick={() => this.handleRowClick('Jedes Jahr an Geburtstagen')}>
											<div className="top-product">
												<div className="top-product-detail">
													<div className="top-product-thumb">
														<EventAvailableOutlinedIcon />
													</div>
													<Box>
														<Typography className="top-product-title">Der Jahrestag eines Datums</Typography>
														<Box display="flex">
															<Box display="flex" alignItems="center" className="top-product-meta" mr={1}>
																<Typography>Workflow, der jedes Jahr an bestimmten Datum ausgelöst wird (z.B. Geburtstag)</Typography>
															</Box>
														</Box>
													</Box>
												</div>
											</div>
										</li>

									</ul>

								</CustomCard>
							</Grid>
							<Grid item xs={12} sm={12} md={5}>
								{selectedRow ?
									<div className="previewPanel">
										<CustomCard mb={20} textAlign="center">
											<Box className="triggerTitle">
												{this.state.selectedType}
											</Box>
										</CustomCard>
										<CustomCard mb={20} textAlign="center">

											<Box className="flowItem">
												<h5>Benutzergruppe:</h5>
												<Box>
													<MultiSelect
														placeholder="Benutzergruppe auswählen"
														data={usersList} 
														value={this.state.selectedUsers}
														onChange={this.onChangeUsers}
													/>
												</Box>
											</Box>

										</CustomCard>

										<CustomCard mb={20}>

											<Box className="flowItem">
												<h5>E-Mail Vorlage auswählen:</h5>
												<Box>
													<AutoComplete data={this.state.TemplateList} value={this.state.Template} placeholder="E-Mail Vorlage auswählen" onChange={this.onChangeTemplate} />
												</Box>
											</Box>


										</CustomCard>
										{
											((this.state.selectedType == types[0] && this.state.isEditBirthday) || (this.state.selectedType == types[1] && this.state.isEditOrder)) ? <Box textAlign="center">
												<Button variant="contained" color="primary" onClick={this.onUpdateTrigger.bind(this)}>
													Update E-Mail Trigger
											  </Button>
											</Box> :
												<Box textAlign="center">
													<Button variant="contained" color="primary" onClick={this.onSubmitTrigger.bind(this)}>
														Create E-Mail Trigger
											   </Button>
												</Box>
										}

									</div>
									:
									null
								}

							</Grid>
						</Grid>
					</Box>
				</Container>

			</div>

		);
	}
}

export default withStyles(styles)(EmailTrigers);