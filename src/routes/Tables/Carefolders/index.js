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
import * as jsPDF from 'jspdf'
import $ from 'jquery';
import i2b from "imageurl-base64";

import 'react-summernote/dist/react-summernote.css'; // import styles
import MaterialTable from 'material-table';
import { PDFDownloadLink } from '@react-pdf/renderer';


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
		}, 1000);

	}

	generatePdf(documentsLen) {
		let pageH = 1123;
		
		// setTimeout(() => {
		// 	let margins = {
		// 		top: 120,
		// 		bottom: 120,
		// 		left: 30,
		// 		width: 794
		// 	};
		//  let pagesData = this.formate(documentsLen, pageH - 2 * margins.top);


		// 	var pdf = new jsPDF('p', 'pt', [794, 1123]);
		// 	let source = document.getElementById("downloadArea");
		// 	let specialElementHandlers = {
		// 		'#bypassme': function (element, renderer) {
		// 			// true = "handled elsewhere, bypass text extraction"
		// 			return true
		// 		}
		// 	};

		// 	pdf.fromHTML(
		// 		source, // HTML string or DOM elem ref.
		// 		margins.left, // x coord
		// 		margins.top, { // y coord
		// 		'width': margins.width - 2 * margins.left, // max width of content on PDF
		// 		'elementHandlers': specialElementHandlers
		// 	}, function (dispose) {
				
		// 		const pages = pdf.internal.getNumberOfPages();
		// 		const pageWidth = pdf.internal.pageSize.width;  //Optional
		// 		const pageHeight = pdf.internal.pageSize.height;  //Optional
		// 		pdf.setFontSize(10);  //Optional

		// 		for (let j = 1; j < pages + 1; j++) {
		// 			console.log('pagesData',pagesData);
		// 			let horizontalPos = pageWidth-100;  //Can be fixed number
		// 			let verticalPos = pageHeight - 100;  //Can be fixed number
					
		// 			pdf.setPage(j);
				
		// 			let baseB6 = "data:image/jpeg;base64,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"
		// 			pdf.addImage(baseB6, '', 30, 50, 50, 50)
		// 			pdf.text(pagesData[j-1].instanceName, 100, 80);
		// 			pdf.setFontSize(12);//optional
		// 			pdf.text(`Seilte${j} von ${pages}`, 650, 1080)
		// 			pdf.text("name :" + pagesData[j-1].name, 30, 1050)
		// 			pdf.text("emamil :" + pagesData[j-1].email, 30, 1080)			
		// 		}
		// 		pdf.save('Test.pdf');
		// 	}, margins
		// 	);
		// }, 1000);
	}
	formate(documentsLen, pageHight) {
		let pages = [];
		for (let i = 0; i < documentsLen; i++) {
			let ipageHight = document.getElementById("page-" + i).clientHeight;
			if (ipageHight > pageHight) {
				document.getElementById("page-" + i).style.paddingBottom = (pageHight - (ipageHight % pageHight)) + 'px';
			}
			ipageHight = document.getElementById("page-" + i).clientHeight;
		 
			for (let j = 1; j < ipageHight / pageHight; j++) {	
				pages.push(this.state.selectedDocumentList[i]);
			}
		}
		return pages;
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

			this.setState({ folders: res.folders, servicesList: res.services, documentsList: res.documents })
			console.log('servicesList-----', this.state.documentsList);
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