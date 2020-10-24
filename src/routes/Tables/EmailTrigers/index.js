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
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import $ from 'jquery';
let usersList = ['Family doctors', 'Pharmacies', 'Care managers', 'Patients', 'Related Users'];
const types = ['Jedes Jahr an Geburtstagen', 'Benutzer erzeugt eine Bestellung', 'Kommentar für Bestellung', 'Neuer Patient', 'Status geändert'];

let triggers = [
	{
		type: 'Benutzer erzeugt eine Bestellung',
		icon: 'order',
		title: 'Wenn der Benutzer eine Bestellung tätigt',
		description: 'Workflow wird ausgelöst, wenn ein Benutzer eine Bestellung tätigt'
	},
	{
		type: 'Jedes Jahr an Geburtstagen',
		icon: 'birthday',
		title: 'Der Jahrestag eines Datums',
		description: 'Workflow, der jedes Jahr an bestimmten Datum ausgelöst wird (z.B. Geburtstag)'
	}
	,
	{
		type: 'Kommentar für Bestellung',
		icon: 'comment',
		title: 'Kommentar zum Vorgang',
		description: 'Workflow, der jedes Jahr an bestimmten Datum ausgelöst wird (z.B. Geburtstag)'
	}
	,
	{
		type: 'Neuer Patient',
		icon: 'patient',
		title: 'Neue Patienten wurde hinzugefügt',
		description: 'Workflow, der jedes Jahr an bestimmten Datum ausgelöst wird (z.B. Geburtstag)'
	}
	,
	{
		type: 'Status geändert',
		icon: 'status',
		title: 'Neue Status des Patienten wurde geändert',
		description: 'Workflow, der jedes Jahr an bestimmten Datum ausgelöst wird (z.B. Geburtstag)'
	}
]



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
		triggers: [],
		Template: '',
		id: '',
		isEditSelectedTrigger: false
	};

	handleRowClick = (selectedType) => {
		// $('.triggers li').removeClass('selected');
		// $('#'+ selectedType).addClass('selected');

		let TemplateList = [];
		this.state.TemplateAllList.forEach(ele => {
			if (ele.type == selectedType) {
				TemplateList.push(ele.title)
			}
		})
		let isEditSelectedTrigger = false, selectedUsers = [], Template, id;
		let trigger = this.state.triggers.filter(ele => ele.type == selectedType);

		if (trigger.length) {

			isEditSelectedTrigger = true;
			selectedUsers = JSON.parse(trigger[0].usergroup);
			Template = trigger[0].template;
			id = trigger[0].id;

		}


		this.setState(prevState => {
			return { ...prevState, TemplateList, selectedType, selectedUsers, Template, id, isEditSelectedTrigger };
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
		   this.setState(prevState => {
			const triggers = [...prevState.triggers];
			triggers.push(res);
			return { ...prevState, triggers , isEditSelectedTrigger : true };
		 });
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
									<ul className="top-hits triggers" mt={10} >
										{
											triggers.map((element, index) => (
												<li key={index} onClick={() => this.handleRowClick(element.type)} id={element.type}>
													<div className="top-product">
														<div className="top-product-detail">
															{element.icon == 'order' && <div className="top-product-thumb">
																<ShoppingCartOutlinedIcon />
															</div>
															}
															{element.icon == 'birthday' && <div className="top-product-thumb">
																<EventAvailableOutlinedIcon />
															</div>

															}
															{element.icon == 'comment' && <div className="top-product-thumb">
																<CommentOutlinedIcon />
															</div>
															}
															{element.icon == 'patient' && <div className="top-product-thumb">
																<PermIdentityOutlinedIcon />
															</div>
															}
															{element.icon == 'status' && <div className="top-product-thumb">
																<AddCircleOutlineOutlinedIcon />
															</div>
															}

															<Box>
																<Typography className="top-product-title">{element.title}</Typography>
																<Box display="flex">
																	<Box display="flex" alignItems="center" className="top-product-meta" mr={1}>
																		<Typography>{element.description}</Typography>
																	</Box>
																</Box>
															</Box>
														</div>
													</div>
												</li>
											))
										}

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
										{(this.state.isEditSelectedTrigger) ? <Box textAlign="center">
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