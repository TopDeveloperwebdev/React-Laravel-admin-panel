/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Button, Box, Typography, Dialog, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';


import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { userService } from '../../../../_services';
import { Link } from 'react-router-dom';
import $ from 'jquery'
const types = ['Every year on birthdays', 'User create an Order'];
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';

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
		id: null,

		selectedType: 'Every year on birthdays'
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
		let instance_id = this.state.userInstance_id;
		console.log('this.state.title && this.state.content', this.state.title, this.state.content);
		if (this.state.title && this.state.content) {
			this.setState({ open: false });
			let { content } = this.state;
			this.props.onConfirm({ title: this.state.title, instance_id: instance_id, body: content, type: this.state.selectedType });
		}
		else {
			alert("Bitte geben Sie die erforderlichen Felder ein")
		}

	}
	onUpdate() {
		let instance_id = this.state.userInstance_id;

		if (this.state.title && this.state.content) {
			this.setState({ open: false });
			let { content } = this.state;
		
			this.props.onUpdate({ id: this.state.id, title: this.state.title, type: this.state.selectedType, instance_id: instance_id, body: content });
		}
		else {
			alert("Bitte geben Sie die erforderlichen Felder ein")
		}

	}
	onChange(content) {
		console.log('content', content);
		this.setState({ content: content });
	}
	typeChanged(e) {
		this.setState({ selectedType: e.target.value });
		setTimeout(() => {
			const placeholderPickerItems = Array.prototype.slice.call(document.querySelectorAll('.ql-placeholder .ql-picker-item'));
			placeholderPickerItems.forEach(item => item.textContent = item.dataset.value);
			document.querySelector('.ql-placeholder .ql-picker-label').innerHTML
				= 'Insert placeholder'
		}, 10);
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
						title={<IntlMessages id="sidebar.emailTemplates" />}
						center
					/>
					<Box className="box">

						<TextField
							className="full-width"
							id="datetime-local"
							type="text"
							label="Please input Template Title"
							InputLabelProps={{
								shrink: true,
							}}
							value={this.state.title}
							onChange={this.titleChanged.bind(this)}
							defaultValue="Title..."
						/>
						<FormControl pt={5} className="selection-wrap full-width" >
							<InputLabel id="page-size">Trigger Type</InputLabel>
							<Select
								labelId="page-size"
								id="page-size"
								value={this.state.selectedType}
								onChange={this.typeChanged.bind(this)}
								defaultValue='Every year on birthdays'
								label="Trigger Type"

							>{
									types.map(type => {
										return (<option key={type} value={type} >{type}</option>)
									})

								}


							</Select>
						</FormControl>

					</Box>
					<div className="text-editor">
						{this.state.selectedType == 'Every year on birthdays' ?
							<ReactQuill
								theme={'snow'}
								value={this.state.content}
								onChange={(content) => this.onChange(content)}
								modules={EditorDialog.modules1}
							// placeholder={this.props.placeholder}
							/>
							:
							<ReactQuill
								theme={'snow'}
								value={this.state.content}
								onChange={(content) => this.onChange(content)}
								modules={EditorDialog.modules2}

							// placeholder={this.props.placeholder}
							/>
						}

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

// export default EditorDialog;

/* 
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
EditorDialog.modules1 = {
	toolbar: {
		container:
			[
				[{
					'placeholder': ['[Name]', '[Birthday Date]', '[Address]', '[Phone]']
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
EditorDialog.modules2 = {
	toolbar: {
		container:
			[
				[{ 'placeholder': ['[patient firstname]', '[patient lastname]', '[patient birthday]', '[patient insurance]', '[patient address]', '[patient phone]'] }], // my custom dropdown
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


/* 
 * PropType validation
 */
// EditorDialog.propTypes = {
//     placeholder: PropTypes.string,
//     onChange: PropTypes.func,
//     value: PropTypes.string
// }

export default EditorDialog;