/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Button, Box, Typography, Dialog, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'react-summernote/lang/summernote-ru-RU'; // you can import any other locale
import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
class EditorDialog extends React.Component {
	constructor(props) {
		super(props);	
	}
	state = {
		open: false,
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
	onChange(content) {
		console.log('onChange', content);
	}
	render() {
		return (

			<Dialog
				open={this.state.open}
				onClose={this.closeDialog.bind(this)}
				aria-labelledby="responsive-dialog-title"
				className="confirmation-dialog"
			>
				<DialogContent>
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
						/>
						<FormControl className="selection-wrap full-width" >
							<InputLabel id="page-size">Please Select a Instance</InputLabel>
							<Select
								labelId="page-size"
								id="page-size"

							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
					</Box>


					<Box textAlign="center" pt={2}>
						<ReactSummernote
							value="Default value"
							options={{
								lang: 'ru-RU',
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
							<Button variant="contained" color="primary" onClick={() => this.onCloseDialog(true)}>
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