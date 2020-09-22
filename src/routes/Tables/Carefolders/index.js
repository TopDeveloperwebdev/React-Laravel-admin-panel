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
import DeleteDialog from './Components/DeleteDialog';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import 'react-summernote/dist/react-summernote.css'; // import styles
class Carefolders extends Component {
	constructor(props) {
		super(props)
		this.state = {
			servicesList: [],
			folders: [],
			selectedDocument: {},
			oldData: {},
			documentsList: [],

		}
		this.editorDialog = React.createRef();
		this.viewDialog = React.createRef();
		this.deleteDialog = React.createRef();
		this.addDocument = this.addDocument.bind(this);
	}
	addDocument() {
		this.editorDialog.current.setState({ servicesList: this.state.servicesList, documentsList: this.state.documentsList, instance_id: this.instance_id });
		this.editorDialog.current.openDialog();

	}
	viewDocument(content, email, instanceLogo, instanceName, title) {
		this.setState({ selectedDocument: { content: content, instanceLogo: instanceLogo, email: email, instanceName: instanceName, title: title } });
		this.viewDialog.current.openDialog();
	}
	editDocument(instance, title, content) {

		this.editorDialog.current.setState({ instance: instance, title: title, content: content });
		this.editorDialog.current.openDialog();
	}

	onSubmit(popupResponse) {
		if (popupResponse) {

			userService.addFolders(popupResponse).then(res => {
				let folders = this.state.folders;
				folders.push(res);
				this.setState({ folders: folders });

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
			userService.deleteDocuments({ id: this.state.oldData.id }).then(res => {
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
	convert(instanceName, instanceLogo, title, content, email) {
		console.log(instanceLogo);
		let html = `<div>
		<div id="printable-area">
			<div bgcolor="background.paper"  class='title-banner' >
				<div>
					<div className="title-content"  textAlign="center">
						<div variant="h4" style="color : red">
							${instanceName}
						</div>
						
					</div>
				</div>
			</div>
			<div className="p-10">
				<div variant="h4" className="title">
					${title}
				</div>
			</div>
			

			<div style="margin : 0 auto" >
			${content}
			</div>
			<div bgcolor="background.paper" className='title-banner' >
				<div>
					<div className="title-content" textAlign="center">
						<div pt={1} fontSize="body2.fontSize">
							instance Name : ${instanceName}
						</div>
						<div pt={1} fontSize="body2.fontSize">
							Contact Email : ${email}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`

			;
		return html;
	}
	downloadCarefolder(documents) {
		let selectedDocuments = [];

		if (documents) {
			let docs = JSON.parse(documents);
			selectedDocuments = this.state.documentsList.filter((a) => {
				return docs.indexOf(a.id) > -1;
			})
		}
		let pdf = new jsPDF('p', 'pt', 'a4');
		console.log('res', selectedDocuments);
		let html = '<div id="pdf-area">';
		let contentHeight = 0;
		let contentWidth = selectedDocuments[0].contentWidth;
		selectedDocuments.forEach(element => {
			let htmlTemp = this.convert(element.instanceName, element.instanceLogo, element.title, element.content, element.email);
			contentHeight += element.contentHeight;
			html = html + htmlTemp;
		});
		html = html + '</div>';
		console.log('client', contentWidth, contentHeight);
		pdf.html(html, {
			html2canvas: {
				// insert html2canvas options here, e.g.
				width: contentWidth,
				height: contentHeight,			
				scrollX: 30,
				scrollY: 30,			
				proxy: null,			
				useCORS: false
			},
			callback: function () {
				pdf.save('myDocument.pdf');
			}
		});


	}
	componentWillMount() {

		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;

		userService.showDocuments({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			this.setState({ documentsList: res });
		})
		userService.showServices({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			this.setState({ servicesList: res });
		})
		console.log('instance', this.instance_id);
		userService.showFolders({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			console.log('servicesList', res);
			this.setState({ folders: res });

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
						<CustomCard title={<IntlMessages id="sidebar.carefolders" />}>
							<Box>	<CreateNewFolderOutlinedIcon onClick={this.addDocument} /></Box>

							{<Box pt={3}>
								<TableContainer>
									<Table aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell></TableCell>
												<TableCell align="left">Title</TableCell>
												<TableCell align="left">Size</TableCell>
												<TableCell align="left">Created_At</TableCell>
												<TableCell align="left">Actions</TableCell>
											</TableRow>
										</TableHead>

										<TableBody>
											{this.state.folders.map(row => (
												<TableRow key={row.title} >
													<TableCell align="left" className="pointerIcon" >
														<Link to={`/app/documents/${row.documents}`}><FolderOutlinedIcon /></Link></TableCell>
													<TableCell component="th" scope="row">
														{row.title}
													</TableCell>
													<TableCell component="th" scope="row">
														{this.getLength(row.documents)}
													</TableCell>

													<TableCell align="left">{row.created_at}</TableCell>
													<TableCell align="left">

														<CloudDownloadOutlinedIcon onClick={() => this.downloadCarefolder(row.documents)} />
														<DeleteOutlineOutlinedIcon onClick={() => this.ondeleteContact(row)} />

													</TableCell>

												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Box>}
						</CustomCard>
					</Box>
				</Container>

				<EditorDialog
					ref={this.editorDialog}
					onConfirm={(res) => this.onSubmit(res)}
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
export default Carefolders;