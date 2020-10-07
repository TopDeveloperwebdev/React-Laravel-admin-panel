/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Button, Box, Typography, Dialog, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css'; // import styles

import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { userService } from '../../../../_services';
import { Link } from 'react-router-dom';
import $ from 'jquery'
import ReactQuill from 'react-quill';

class EditorDialog extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		open: false,
		instance: null,
		userInstance_id: null,
		title: '',
		content: '',
		contentHeight: 0,
		contentWidth: 0,
		isEdit: false,
		id: null
	};

	//Define function for open confirmation dialog box
	openDialog() {
		this.setState({ open: true });
	};

	//Define function for close confirmation dialog box 
	closeDialog() {
		this.setState({ open: false ,title: '', content: '' ,isEdit: false});
	};

	//Define function for close confirmation dialog box and callback for delete item 
	onCloseDialog(isTrue) {
		this.setState({ open: false ,title: '', content: '' ,isEdit: false});
	};
	onSubmit() {
		let instance_id = this.state.userInstance_id;
		if (!this.state.userInstance_id) instance_id = this.state.instance;
		if (this.state.title && instance_id && this.state.content) {
			this.setState({ open: false });

			let { content } = this.state;
			const nameTag = `<span class='name'>[name]</span>`;
			const streetTag = `<span class='street'>[street]</span>`;
			const zipTag = `<span class='zip'>[zip]</span>`;
			const cityTag = `<span class='city'>city]</span>`;
			const insuranceTag = `<span class='insurance'>[insurance]</span>`;
			const insuranceNrTag = `<span class='insuranceNr'>[insuranceNr]</span>`;
			const birthdayTag = `<span class='birthday'>[birthday]</span>`;
			const phoneTag = `<span class='phone'>[phone]</span>`;
			content = content.replaceAll('[name]', `${nameTag}`);
			content = content.replaceAll('[street]', `${streetTag}`);
			content = content.replaceAll('[zip]', `${zipTag}`);
			content = content.replaceAll('[city]', `${cityTag}`);
			content = content.replaceAll('[insurance]', `${insuranceTag}`);
			content = content.replaceAll('[insuranceNr]', `${insuranceNrTag}`);
			content = content.replaceAll('[birthday]', `${birthdayTag}`);
			content = content.replaceAll('[phone]', `${phoneTag}`);

			this.props.onConfirm({ title: this.state.title, instance_id: instance_id, content: content, contentHeight: this.state.contentHeight, contentWidth: this.state.contentWidth });
		}
		else {
			alert("Bitte geben Sie die erforderlichen Felder ein")
		}

	}
	onUpdate() {
		let instance_id = this.state.userInstance_id;
		if (!this.state.userInstance_id) instance_id = this.state.instance;
		if (this.state.title && instance_id && this.state.content) {
			this.setState({ open: false });
			let { content } = this.state;
		
			const nameTag = `<span class='name'>[name]</span>`;
			const streetTag = `<span class='street'>[street]</span>`;
			const zipTag = `<span class='zip'>[zip]</span>`;
			const cityTag = `<span class='city'>city]</span>`;
			const insuranceTag = `<span class='insurance'>[insurance]</span>`;
			const insuranceNrTag = `<span class='insuranceNr'>[insuranceNr]</span>`;
			const birthdayTag = `<span class='birthday'>[birthday]</span>`;
			const phoneTag = `<span class='phone'>[phone]</span>`;
			content = content.replaceAll('[name]', `${nameTag}`);
			content = content.replaceAll('[street]', `${streetTag}`);
			content = content.replaceAll('[zip]', `${zipTag}`);
			content = content.replaceAll('[city]', `${cityTag}`);
			content = content.replaceAll('[insurance]', `${insuranceTag}`);
			content = content.replaceAll('[insuranceNr]', `${insuranceNrTag}`);
			content = content.replaceAll('[birthday]', `${birthdayTag}`);
			content = content.replaceAll('[phone]', `${phoneTag}`);

			this.props.onUpdate({ id: this.state.id, title: this.state.title, instance_id: instance_id, content: content, contentHeight: this.state.contentHeight, contentWidth: this.state.contentWidth });
		}
		else {
			alert("Bitte geben Sie die erforderlichen Felder ein")
		}

	}
	onChange(content) {
		let contentHeight = document.getElementById('editArea').clientHeight;
		let contentWidth = document.getElementById('editArea').clientWidth;

		this.setState({ content: content, contentHeight: contentHeight, contentWidth: contentWidth });
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
		console.log('this.state.instance', this.state.instance);
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
						{
							!this.state.userInstance_id ? <Box>
								{this.props.instances.length ?

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
									:
									<div>
										<Link to="/app/instances">Add New Instances</Link>
									</div>

								}

							</Box> :
								''
						}

					</Box>


					{/* <Box textAlign="center" id="editArea" pt={2}>
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
									['color', ['color']],
									['table', ['table']],
									['view', ['fullscreen', 'codeview']],
									['mybutton', ['Apotheken']],

								],
								buttons: {
									Apotheken: Apotheken,
								}
							}}
							onChange={(content) => this.onChange(content)}
						/>
					</Box> */}

					<div className="text-editor" id="editArea">
						<ReactQuill
							theme={'snow'}
							value={this.state.content}
							onChange={(content) => this.onChange(content)}
							modules={EditorDialog.modules}
						// placeholder={this.props.placeholder}
						/>		
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

EditorDialog.modules = {
	toolbar: {
		container:
			[
				[{
					'placeholder': ['[name]', '[street]', '[zip]', '[city]' ,'[insurance]','[insuranceNr]','[birthday]' ,'[phone]']
				}], // my custom dropdown
				['bold', 'italic', 'underline', 'strike'],        // toggled buttons
				['blockquote', 'code-block'],
				[{ 'header': 1 }, { 'header': 2 }],               // custom button values
				[{ 'list': 'ordered' }, { 'list': 'bullet' }],
				[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
				[{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
				[{ 'direction': 'rtl' }],                         // text direction

				[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
				[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
				[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
				[{ 'font': [] }],
				[{ 'align': [] }],

				['clean']                                    // remove formatting button

			],
		handlers: {
			"placeholder": function (value) {
				if (value) {
					const cursorPosition = this.quill.getSelection().index;
					this.quill.insertText(cursorPosition, value);
					this.quill.setSelection(cursorPosition + value.length);
				}
			}
		}
	}
}
export default EditorDialog;