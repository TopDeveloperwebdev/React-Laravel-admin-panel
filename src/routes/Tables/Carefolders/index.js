/**
 * Basic Table
*/
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Box } from '@material-ui/core';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
// Components
import { SmallTitleBar, CustomCard } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { userService } from '../../../_services';
import EditorDialog from './Components/EditorDialog';
import ViewDialog from './Components/ViewDialog';
import PreViewDialog from './Components/PreViewDialog';
import DeleteDialog from './Components/DeleteDialog';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import domtoimage from 'dom-to-image';
import 'react-summernote/dist/react-summernote.css'; // import styles
import MaterialTable from 'material-table';
class Carefolders extends Component {
	constructor(props) {
		super(props)
		this.state = {
			servicesList: [],
			folders: [],
			selectedDocument: {},
			oldData: {},
			documentsList: [],
			selectedDocumentList: [],
			columns: [
				{
					title: 'Folders', field: 'action', render: row => <div>
						<Link className="pointerIcon" to={`/app/documents/${row.documents}`}><FolderOutlinedIcon /></Link>
					</div>
				},
				{
					title: 'Title', field: 'title'
				},
				{
					title: 'Size', field: 'size', render: row => <div>
						{this.getLength(row.documents)}
					</div>
				},
				{
					title: 'Created_At', field: 'created_at'
				},
				{
					title: 'Actions', field: 'actions', render: row => <div>
						<CloudDownloadOutlinedIcon onClick={() => this.previewDocument(row.documents)} />
						<EditOutlinedIcon className="pointerIcon" onClick={() => this.editDocument(row)} />
						<DeleteOutlineOutlinedIcon className="pointerIcon" onClick={() => this.ondeleteContact(row)} />
					</div>
				},
			]

		}
		this.editorDialog = React.createRef();
		this.viewDialog = React.createRef();
		this.preViewDialog = React.createRef();
		this.deleteDialog = React.createRef();
		this.addFolder = this.addFolder.bind(this);
	}
	addFolder() {
		this.editorDialog.current.setState({ servicesList: this.state.servicesList, documentsList: this.state.documentsList, instance_id: this.instance_id });
		this.editorDialog.current.openDialog();
	}

	previewDocument(documents) {
		let selectedDocumentList = [];

		if (documents) {
			let docs = JSON.parse(documents);
			selectedDocumentList = this.state.documentsList.filter((a) => {
				return docs.indexOf(a.id) > -1;
			})
		}
		this.setState({ selectedDocumentList: [...selectedDocumentList] });
		this.preViewDialog.current.openDialog();
		setTimeout(() => {
			// let pdfDiv = document.getElementById('downloadArea');
			// console.log('pdf' , pdfDiv);
			this.generatePdf(selectedDocumentList.length);
		}, 2000);

	}
	generatePdf(documentsLen) {
		let HTML_Width, HTML_Height, PDF_Width, PDF_Height, canvas_image_width, canvas_image_height, top_left_margin;
		HTML_Width = document.getElementById('downloadArea').clientWidth;
		HTML_Height = document.getElementById('downloadArea').clientHeight;
		top_left_margin = 15;

		PDF_Width = HTML_Width + (top_left_margin * 2);
		PDF_Height = (1.5 * PDF_Width) + (top_left_margin * 2);
		canvas_image_width = HTML_Width;
		canvas_image_height = HTML_Height;

		var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
		const div = document.getElementById('downloadArea');

		domtoimage.toPng(div).then((dataUrl) => {
			//Initialize JSPDF
			var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);

			//Add image Url to PDF
			pdf.addImage(dataUrl, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
			console.log('totalPDFPages', PDF_Width, PDF_Height);

			for (var i = 1; i <= totalPDFPages; i++) {
				pdf.addPage();
				pdf.addImage(dataUrl, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
			}

			pdf.save("HTML-Document.pdf");

		})

	}
	editDocument(oldData) {

		let documents = [];
		if (oldData.documents) documents = JSON.parse(oldData.documents);
		this.editorDialog.current.setState({ servicesList: this.state.servicesList, documentsList: this.state.documentsList, instance_id: this.instance_id });
		this.editorDialog.current.setState({ id: oldData.id, instance_id: oldData.instance_id, title: oldData.title, selectedDocuments: [...documents], selectedService: oldData.service, isEdit: true });
		this.setState({ oldData });
		this.editorDialog.current.openDialog();
	}
	onSubmit(popupResponse) {
		if (popupResponse) {
			userService.addFolders(popupResponse).then(res => {
				this.setState(prevState => {
					const folders = [...prevState.folders];
					folders.push(res);
					return { ...prevState, folders };
				});

			})
		}
	}


	onUpdate(popupResponse) {
		if (popupResponse) {
			userService.editFolders(popupResponse).then(res => {
				this.setState(prevState => {
					const folders = [...prevState.folders];
					popupResponse['created_at'] = this.state.oldData.created_at;
					folders[folders.indexOf(this.state.oldData)] = popupResponse;
					let oldData = {};
					return { ...prevState, folders, oldData };
				});

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
			userService.deleteFolders({ id: this.state.oldData.id }).then(res => {
				if (res) {
					this.setState(prevState => {
						const folders = [...prevState.folders];
						folders.splice(folders.indexOf(this.state.oldData), 1);
						return { ...prevState, folders };
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
	getLength = (documents) => {
		let len = 0;
		if (documents) {
			let Documents = JSON.parse(documents);
			len = Documents.length;
		}
		return len;
	}

	componentWillMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		console.log('instance', this.instance_id);
		userService.showFolders({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			console.log('servicesList', res);
			this.setState({ folders : res.folders, servicesList: res.services, documentsList: res.documents })

		})

	}

	render() {
		return (
			<div className="tables-wrapper" >
				<SmallTitleBar
					title={<IntlMessages id="sidebar.carefolders" />}
					center
				/>
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">

						<MaterialTable
							title={<IntlMessages id="sidebar.carefolders" />}
							columns={this.state.columns}
							data={this.state.folders}
							actions={[
								{
									icon: "create_new_folder_outlinedIcon",
									tooltip: "create",
									position: "toolbar",
									onClick: () => {
										this.addFolder()
									}
								}
							]}
						/>
					</Box>
				</Container>

				<EditorDialog
					ref={this.editorDialog}
					onConfirm={(res) => this.onSubmit(res)}
					onUpdate={(res) => this.onUpdate(res)}
				/>

				<ViewDialog
					ref={this.viewDialog}
					document={this.state.selectedDocument}

				/>
				<PreViewDialog
					ref={this.preViewDialog}
					selectedDocumentList={this.state.selectedDocumentList}

				/>
				<DeleteDialog
					ref={this.deleteDialog}
					onConfirm={(res) => this.deleteContactPermanent(res)}
				/>
			</div>
		);
	}
}
export default Carefolders;