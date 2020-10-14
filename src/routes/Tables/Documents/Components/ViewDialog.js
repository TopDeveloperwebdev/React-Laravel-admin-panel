/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Button, Box, Typography, Dialog, Container, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as ReactDOM from 'react-dom';
import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import PageTemplate from '../../PatientsTable/Components/PageTemplates';
import { AutoComplete, MultiSelect } from '@progress/kendo-react-dropdowns';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
let patients = ["Hans-Willi","Heiner","Galina","Josef"];
class ViewDialog extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		open: false,
		instance: null,
		title: '',
		content: '',
		name: '{{patient.name}}',
		Patient: '',
	

	};

	//Define function for open confirmation dialog box
	openDialog() {
		this.setState({ open: true }, () => {
			setTimeout(() => {
				document.getElementsByClassName('patientname').innerText = this.state.name;
			}, 1);
		});
	};
	onChangePatient = (event) => {
		this.setState({ Patient: event.target.value });
	}
	//Define function for close confirmation dialog box 
	closeDialog() {
		this.setState({ open: false });
	};

	//Define function for close confirmation dialog box and callback for delete item 
	onCloseDialog(isTrue) {
		this.setState({ open: false });
	};
	componentDidMount() {
	}
	downloadDoc() {
		savePDF(ReactDOM.findDOMNode(document.getElementById('document')), {
			pageTemplate: PageTemplate,
			paperSize: [794, 1123],
			margin: { top: 70, left: 50, right: 20, bottom: 70 }
		});
	}
	render() {
		console.log('this.state.patients', this.state.patients);

		return (

			<Dialog
				open={this.state.open}
				onClose={this.closeDialog.bind(this)}
				aria-labelledby="responsive-dialog-title"
				className="confirmation-dialog document"
			>
				<DialogContent className="p-10" id="document">
					<Box>
						<CloseIcon className="closeBtn" onClick={() => this.onCloseDialog(false)}></CloseIcon>
					</Box>

					{/* <Box>
						<CloudDownloadOutlinedIcon variant="contained" color="primary" onClick={() => this.downloadDoc()}>
						</CloudDownloadOutlinedIcon>
						<AutoComplete data={patients} placeholder="Select Patient" onChange={this.onChangePatient} />
					</Box> */}
					<div id="document">
						<Box >	<img className="logo" src={this.props.document.instanceLogo} width="50px" /></Box>
						<Box className="p-10">
							<Typography variant="h4" className="title">
								{this.props.document.title}
							</Typography>
						</Box>
						<Box className="p-10">

							<div dangerouslySetInnerHTML={{
								__html: this.props.document.content
							}}>
							</div>

						</Box>


						<Box textAlign="center" pt={2}>

						</Box>
						<Box className="title-content" textAlign="center">
							<Box pt={1} fontSize="body2.fontSize">
								instance Name : {this.props.document.instanceName}
							</Box>
							<Box pt={1} fontSize="body2.fontSize">
								Contact Email : {this.props.document.email}
							</Box>
						</Box>
					</div>

				</DialogContent>

			</Dialog>
		);
	}
}

export default ViewDialog;