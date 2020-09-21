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
		content: ''
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
									instance NAme
						</Typography>
								<Box pt={1} fontSize="body2.fontSize">
									instance logo
						</Box>
							</Box>
						</Container>
					</Box>
					<Box className="box">

						<div dangerouslySetInnerHTML={{
							__html: this.props.document
						}}>

						</div>

					</Box>


					<Box textAlign="center" pt={2}>

					</Box>
					<Box bgcolor="background.paper" className={`title-banner`} >
						<Container>
							<Box className="title-content" textAlign="center">
								<Typography variant="h4">
									instance NAme
						</Typography>
								<Box pt={1} fontSize="body2.fontSize">
									instance logo
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