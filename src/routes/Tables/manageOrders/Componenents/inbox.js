/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Button, Box, Typography, Dialog, Container, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';

class InboxDialog extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        open: false,
        instance: null,
        title: '',
        content: '',
        name: '{{patient.name}}'
    };

    //Define function for open confirmation dialog box
    openDialog() {
        this.setState({ open: true }, () => {
            setTimeout(() => {
                document.getElementsByClassName('patientname').innerText = this.state.name;
            }, 1);
        });
    };

    //Define function for close confirmation dialog box 
    closeDialog() {
        this.setState({ open: false });
    };

    //Define function for close confirmation dialog box and callback for delete item 
    onCloseDialog(isTrue) {
        this.setState({ open: false });
    };
    componentDidMount() {
    }
    render() {
        return (

            <Dialog
                open={this.state.open}
                onClose={this.closeDialog.bind(this)}
                aria-labelledby="responsive-dialog-title"
                className="confirmation-dialog"
            >
                <DialogTitle id="customized-dialog-title">
                    <IntlMessages id="components.composer" />
                </DialogTitle>
                <DialogContent dividers>
                    <Box mb={1}>
                        <TextField fullWidth label="To" />
                    </Box>
                    <Box mb={1}>
                        <TextField fullWidth label="CC" />
                    </Box>
                    <Box mb={1}>
                        <TextField fullWidth label="BCC" />
                    </Box>
                    <Box mb={3}>
                        <TextField fullWidth label="Subject" />
                    </Box>
                    <Box height="100%">
                        <ReactQuill
                            modules={modules}
                            formats={formats}
                            placeholder="Enter Your Message.."
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Box py={1} px={2}>
                        <Box display="inline-block" mr={2}>
                            <Button variant="outlined" className="primary-bg-btn" color="primary" onClick={() => this.handleClose()}>
                                <Box component="span" fontSize="20px" mr={1} className="material-icons">cancel_schedule_send</Box>
									Cancel
								</Button>
                        </Box>
                        <Button variant="outlined" className="primary-bg-btn" color="primary" autoFocus onClick={() => this.handleClose()}>
                            <Box component="span" fontSize="18px" mr={1} className="material-icons">send</Box>
								Send
							</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        );
    }
}

export default InboxDialog;