/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Button, Box, Typography, Input, Dialog, DialogTitle, Checkbox, ListItemText, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { AutoComplete, MultiSelect } from '@progress/kendo-react-dropdowns';

import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { userService } from '../../../../_services';

class EditorDialog extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		open: false,
		data: {},
		selectedService: '',
		selectedDocuments: [],
		title: '',
		servicesList: [],
		documentsList: [],
		instance_id: 0,
		isEdit: false
	};

	//Define function for open confirmation dialog box
	openDialog() {
		this.setState({ open: true });
	};

	//Define function for close confirmation dialog box 
	closeDialog() {
		this.setState({ open: false });
	};

	//Define function for close confirmation dialog box and callback for delete item 
	onCloseDialog(isTrue) {
		this.setState({ open: false });
	};
	onSubmit() {

		this.setState({ open: false });
		this.props.onConfirm({ title: this.state.title, documents: JSON.stringify(this.state.selectedDocuments), service: this.state.selectedService, instance_id: this.state.instance_id });

	}
	onUpdate() {
		this.setState({ open: false });
		this.props.onUpdate({id : this.state.id, title: this.state.title, documents: JSON.stringify(this.state.selectedDocuments), service: this.state.selectedService, instance_id: this.state.instance_id });

	}

	onchangeDocument = (event) => {
		this.setState({ selectedDocuments: [...event.target.value] })
	}
	onChangeServices = (event) => {
		this.setState({ selectedService: event.target.value })
	}
	onChangeTitle = (event) => {
		this.setState({ title: event.target.value })
	}
	render() {

		return (
			<Dialog
				className="contact-dialog carefolderContainer"
				open={this.state.open}
				onClose={this.closeDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Edit Contact</DialogTitle>
				<DialogContent>
					<div>
						<form autoComplete="off">
							<div style={{ "marginBottom": "20px" }}>
								<Box className="p-10">

									<TextField
										className="full-width"
										type="text"
										label="Please input Care folder title"
										InputLabelProps={{
											shrink: true,
										}}
										value={this.state.title}
										onChange={this.onChangeTitle.bind(this)}
										defaultValue="Title..."
									/>
								</Box>
								<Box className="p-10">

									<FormControl className="selection-wrap full-width" >
										<InputLabel id="page-size">Please Select a Service</InputLabel>
										<Select
											labelId="page-size"
											id="page-size"
											value={this.state.selectedService}
											onChange={this.onChangeServices.bind(this)}
											defaultValue={1}
										>{
												this.state.servicesList.map(ele => {
													return (<option key={ele.id} value={ele.id}>{ele.services}</option>)
												})

											}


										</Select>
									</FormControl>
								</Box>

								<Box className="p-10">

									<FormControl className="full-width">
										<InputLabel id="demo-mutiple-checkbox-label">Please select documents</InputLabel>
										<Select
											labelId="demo-mutiple-checkbox-label"
											id="demo-mutiple-checkbox"
											multiple
											value={this.state.selectedDocuments}
											onChange={this.onchangeDocument.bind(this)}
											input={<Input />}
											renderValue={(selected) => selected.join(', ')}

										>
											{this.state.documentsList.map((ele) => (
												<MenuItem key={ele.id} value={ele.id}>
													<Checkbox checked={this.state.selectedDocuments.indexOf(ele.id) > -1} />
													<ListItemText primary={ele.title} />
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Box>


							</div>
						</form>
					</div>
				</DialogContent>
				<DialogActions className="px-20 pb-20 justify-content-center">
					<Box mb={2} width="100%" display="flex" justifyContent="center" p={1} textAlign="center">
						{!this.state.isEdit && <Box mx={2}>
							<Button variant="contained" color="primary" onClick={() => this.onSubmit(true)}>
								Submit
							</Button>
						</Box>
						}
						{this.state.isEdit && <Box mx={2}>
							<Button variant="contained" color="primary" onClick={() => this.onUpdate(true)}>
								Update
							</Button>
						</Box>
						}
						<Button variant="contained" color="secondary" onClick={() => this.onCloseDialog(false)} >
							No
						</Button>
					</Box>

				</DialogActions>
			</Dialog>

		);
	}
}

export default EditorDialog;