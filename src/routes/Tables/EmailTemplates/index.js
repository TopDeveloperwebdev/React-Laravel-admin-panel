/**
 * Basic Table
*/
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Box } from '@material-ui/core';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import MaterialTable from 'material-table';
// Components
import { SmallTitleBar, CustomCard } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { userService } from '../../../_services';
import EditorDialog from './Components/EditorDialog';
import ViewDialog from './Components/ViewDialog';
import DeleteDialog from './Components/DeleteDialog';
window.patients = {
	name: [],
	street: [],
	zip: [],
	city: [],
	insurance: [],
	insuranceNr: [],
	birthday: [],
	phone: []
};
class EmailTemplates extends Component {
	constructor(props) {
		super(props)
		this.state = {
			instances: [],
			templates: [],
			selectedDocument: {},
			oldData: {},
			columns: [
				{
					title: 'Inhalt', field: 'action', render: row => <div>
						<InsertDriveFileOutlinedIcon className="pointerIcon" onClick={() => this.viewDocument(row.body, row.title)} />
					</div>
				},
				{ title: 'Titel', field: 'title' },
				{ title: 'Typ', field: 'type' },
				{
					title: 'Funktionen', field: 'actions', render: row => <div>
						<EditOutlinedIcon className="pointerIcon" onClick={() => this.editDocument(row)} />
						<DeleteOutlineOutlinedIcon className="pointerIcon" onClick={() => this.ondeleteContact(row)} />

					</div>
				},
			],

		}
		this.editorDialog = React.createRef();
		this.viewDialog = React.createRef();
		this.deleteDialog = React.createRef();
		this.addDocument = this.addDocument.bind(this);
	}
	addDocument() {
		this.editorDialog.current.setState({ userInstance_id: this.instance_id });
		this.editorDialog.current.openDialog();
		setTimeout(() => {
			const placeholderPickerItems = Array.prototype.slice.call(document.querySelectorAll('.ql-placeholder .ql-picker-item'));
			placeholderPickerItems.forEach(item => item.textContent = item.dataset.value);
			document.querySelector('.ql-placeholder .ql-picker-label').innerHTML
				= 'Insert placeholder' + document.querySelector('.ql-placeholder .ql-picker-label').innerHTML;
		}, 10);

	}
	viewDocument(content, title) {
		this.setState({ selectedDocument: { content: content, title: title } });

		this.viewDialog.current.openDialog();

	}
	editDocument(oldData) {
		this.editorDialog.current.setState({ id: oldData.id, title: oldData.title, content: oldData.body, selectedType : oldData.type, isEdit: true, userInstance_id: this.instance_id });
		this.setState({ oldData });
		this.editorDialog.current.openDialog();
		setTimeout(() => {
			const placeholderPickerItems = Array.prototype.slice.call(document.querySelectorAll('.ql-placeholder .ql-picker-item'));
			placeholderPickerItems.forEach(item => item.textContent = item.dataset.value);
			document.querySelector('.ql-placeholder .ql-picker-label').innerHTML
				= 'Insert placeholder' + document.querySelector('.ql-placeholder .ql-picker-label').innerHTML;
		}, 10);
	}
	onSubmit(popupResponse) {
		if (popupResponse) {
			userService.addMails(popupResponse).then(res => {
				// this.setState(prevState => {
				// 	const templates = [...prevState.templates];
				// 	templates.push(res);
				// 	return { ...prevState, templates };
				// });
				window.location.reload();
			})
		}
	}

	onUpdate(popupResponse) {
		if (popupResponse) {

			userService.editMails(popupResponse).then(res => {
				// this.setState(prevState => {
				// 	const templates = [...prevState.templates];
				// 	templates[templates.indexOf(this.state.oldData)] = popupResponse;
				// 	let oldData = {};
				// 	return { ...prevState, templates, oldData };
				// });
				window.location.reload();

			})
		}
	}
	ondeleteContact(oldData) {
		console.log(';', oldData);
		this.setState({ oldData })
		this.deleteDialog.current.openDialog();
	}

	deleteContactPermanent(popupResponse) {
		if (popupResponse) {
			userService.deleteMails({ id: this.state.oldData.id }).then(res => {
				if (res) {
					this.setState(prevState => {
						const templates = [...prevState.templates];
						templates.splice(templates.indexOf(this.state.oldData), 1);
						return { ...prevState, templates };
					});
				}
			})
		}
	}



	onCloseDialog = (popupResponse) => {
		this.setState({
			oldData: null,
		})
	}

	componentWillMount() {

		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		userService.showMails({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			this.setState({ templates: res });
		})

		// this.documents = this.props.match.params.id;
		// userService.showDocuments({ instance_id: this.instance_id, pagination: 1, folder_id: this.folder_id }).then(res => {
		// 	if (this.documents != '*') {
		// 		let docs = JSON.parse(this.documents);
		// 		res.documents = res.documents.filter((a) => {
		// 			return docs.indexOf(a.id) > -1;
		// 		})
		// 	}



		// 	console.log('elemnet' , window.patients);

		// 	this.setState({ documents: res.documents, instances: res.instances });
		// })
	}

	render() {
		return (
			<div className="tables-wrapper">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.emailTemplates" />}
					center
				/>
				<Container maxWidth="lg" className="documentContainer">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">

						<MaterialTable
							title={<IntlMessages id="sidebar.emailTemplates" />}
							columns={this.state.columns}
							data={this.state.templates}
							localization={{								
								header: {
									actions: 'Funktionen'
								},								
							}}
							actions={this.instance_id ? [
								{
									icon: "note_add_outlined",
									tooltip: "my tooltip",
									position: "toolbar",
									onClick: () => {
										this.addDocument()
									}
								}
							] : []}
						/>
					</Box>
				</Container>

				<EditorDialog
					ref={this.editorDialog}
					instances={this.state.instances}
					onConfirm={(res) => this.onSubmit(res)}
					onUpdate={(res) => this.onUpdate(res)}
				/>

				<ViewDialog
					ref={this.viewDialog}
					document={this.state.selectedDocument}

				/>
				<DeleteDialog
					ref={this.deleteDialog}
					onConfirm={(res) => this.deleteContactPermanent(res)}
				/>
			</div>
		);
	}
}
export default EmailTemplates;