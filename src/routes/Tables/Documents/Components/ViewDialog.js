/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Button, Box, Typography, Dialog, Container, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';

class ViewDialog extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		open: false,
		instance: null,
		title: '',
		content: '',
		name : '{{patient.name}}'
	};

	//Define function for open confirmation dialog box
	openDialog() {
		this.setState({ open: true }, () => {
			setTimeout(() => {
				document.getElementsByClassName('patientname').innerText=this.state.name;
			}, 1);
		});
	};

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
	render() {
		return (

			<Dialog
				open={this.state.open}
				onClose={this.closeDialog.bind(this)}
				aria-labelledby="responsive-dialog-title"
				className="confirmation-dialog"
			>
				<DialogContent className="p-10">
					<Box>
						<CloseIcon className="closeBtn" onClick={() => this.onCloseDialog(false)}></CloseIcon>
					</Box>

					<Box bgcolor="background.paper" className={`title-banner`} >
						<Container>
							<Box className="title-content" textAlign="center">
								<Typography variant="h4">
									{this.props.document.instanceName}
								</Typography>
								<Box pt={1} fontSize="body2.fontSize">
									<img src={this.props.document.instanceLogo} />
								</Box>
							</Box>
						</Container>
					</Box>
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
					<Box bgcolor="background.paper" className={`title-banner`} >
						<Container>
							<Box className="title-content" textAlign="center">
								<Box pt={1} fontSize="body2.fontSize">
									instance Name : {this.props.document.instanceName}
								</Box>
								<Box pt={1} fontSize="body2.fontSize">
									Contact Email : {this.props.document.email}
								</Box>
							</Box>
						</Container>
					</Box>
				</DialogContent>

			</Dialog>
		);
	}
}

export default ViewDialog;