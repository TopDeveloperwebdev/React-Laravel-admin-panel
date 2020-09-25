/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Button, Box, Typography, Dialog, Container, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';

class PreviewDialgo extends React.Component {
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
	getUrl(logo) {
		let url = '/backend_latest/file_storage/' + logo.split('/')[5];
		let defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
		return defaultUrl
	}
	render() {
		return (

			<Dialog
				open={this.state.open}
				onClose={this.closeDialog.bind(this)}
				aria-labelledby="responsive-dialog-title"
				className="confirmation-dialog"

			>
				<DialogContent className="p-10 downloadPaper">
					<Box>
						<CloseIcon className="closeBtn" onClick={() => this.onCloseDialog(false)}></CloseIcon>
					</Box>
					<div id="downloadArea">
						{this.props.selectedDocumentList.map((element, index) => {
							return (
								<Box key={index} className="pageContainer" id={`page-${index}`}>
									{/* <Box textAlign="center" className="headerBar">
										<Box pt={1} fontSize="body2.fontSize">
											<img src={this.getUrl(element.instanceLogo)} />
										</Box>
										<Typography variant="h4">
											{element.instanceName}
										</Typography>

									</Box> */}
									<Box className="p-10">
										<Typography variant="h4" className="title">
											{element.title}
										</Typography>
									</Box>
									<Box className="p-10 contentHtml">

										<div dangerouslySetInnerHTML={{
											__html: element.content
										}}>

										</div>

									</Box>
									{/* <Box bgcolor="background.paper"  >
										<Box className="footerBar" >
											<div textAlign="left">
												<Box pt={1} fontSize="body2.fontSize">
													instance Name : {element.instanceName}
												</Box>
												<Box pt={1} fontSize="body2.fontSize">
													Contact Email : {element.email}
												</Box>
											</div>
											<Box>
												Seilte 3 von 3
											</Box>
										</Box>

									</Box> */}
								</Box>
							)
						})

						}
					</div>

				</DialogContent>

			</Dialog>
		);
	}
}

export default PreviewDialgo;