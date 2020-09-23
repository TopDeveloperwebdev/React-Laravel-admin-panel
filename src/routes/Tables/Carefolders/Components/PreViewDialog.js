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
								<Box key={index} className="pageContainer">
									<Box bgcolor="background.paper" className={`title-banner`} >
										<Container>
											<Box className="title-content" textAlign="center">
												<Typography variant="h4">
													{element.instanceName}
												</Typography>
												{/* <Box pt={1} fontSize="body2.fontSize">
													<img src={element.instanceLogo} />
												</Box> */}
											</Box>
										</Container>
									</Box>
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
									<Box bgcolor="background.paper" className={`title-banner`} >
										<Container>
											<Box className="title-content" textAlign="center">
												<Box pt={1} fontSize="body2.fontSize">
													instance Name : {element.instanceName}
												</Box>
												<Box pt={1} fontSize="body2.fontSize">
													Contact Email : {element.email}
												</Box>
											</Box>
										</Container>
									</Box>
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