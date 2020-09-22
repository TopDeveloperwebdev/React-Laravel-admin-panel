/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Button, Box, Typography, Dialog, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles

import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { userService } from '../../../../_services';
class EditorDialog extends React.Component {
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
	onSubmit() {
		
		this.setState({ open: false });
		this.props.onConfirm({ title : this.state.title, instance_id : this.state.instance, content : this.state.content });
	
	}
	onChange(content) {
		this.setState({ content: content })
	}
	instanceChanged(e) {
		this.setState({ instance: e.target.value });
	}
	titleChanged(e) {
		this.setState({ title: e.target.value });
	}
	onInit = (note) => {
		note.reset()
		const regex = /(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/i
		if (this.state.content.match(regex) !== null) {
		  note.replace(this.state.content)
		} else {
		  note.insertText(this.state.content)
		}
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
					<SmallTitleBar
						title={<IntlMessages id="sidebar.document" />}
						center
					/>
					<Box className="box">

						<TextField
							className="full-width"
							id="datetime-local"
							type="text"
							label="Please input document title"
							InputLabelProps={{
								shrink: true,
							}}
							value={this.state.title}
							onChange={this.titleChanged.bind(this)}
							defaultValue="Title..."
						/>
						<FormControl className="selection-wrap full-width" >
							<InputLabel id="page-size">Please Select a Instance</InputLabel>
							<Select
								labelId="page-size"
								id="page-size"
								value={this.state.instance}
								onChange={this.instanceChanged.bind(this)}
								defaultValue={1}
							>{
									this.props.instances.map(instance => {
										return (<option key={instance.id} value={instance.id}>{instance.instanceName}</option>)
									})

								}


							</Select>
						</FormControl>
					</Box>


					<Box textAlign="center" pt={2}>
						<ReactSummernote
						
							onInit={this.onInit.bind(this)}
							options={{
							
								height: 350,
								dialogsInBody: true,
								toolbar: [
									['style', ['style']],
									['font', ['bold', 'underline', 'clear']],
									['fontname', ['fontname']],
									['para', ['ul', 'ol', 'paragraph']],
									['table', ['table']],
									['view', ['fullscreen', 'codeview']]
								]
							}}
							onChange={(content) => this.onChange(content)}
						/>
					</Box>

				</DialogContent>
				<DialogActions className="px-20 pb-20 justify-content-center">
					<Box mb={2} width="100%" display="flex" justifyContent="center" p={1} textAlign="center">
						<Box mx={2}>
							<Button variant="contained" color="primary" onClick={() => this.onSubmit(true)}>
								Yes
               		</Button>
						</Box>
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