/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Box, Typography } from '@material-ui/core';

class ConfirmationDialog extends React.Component {
   state = {
      open: false,
   };

   //Define function for open confirmation dialog box
   openDialog() {
      this.setState({ open: true });
   };

   //Define function for close confirmation dialog box and callback for delete item 
   closeDialog(isTrue) {
      this.setState({ open: false });
      this.props.onConfirm(isTrue)
   };

   render() {

      return (
         <Dialog
            open={this.state.open}
            onClose={()=>this.closeDialog()}
            aria-labelledby="responsive-dialog-title"
         >
            <DialogContent>
					<Box textAlign="center" pt={2}>
						<Typography variant="h5">
							Are you sure you want to delete this product ?
						</Typography>
					</Box>
            </DialogContent>
            <DialogActions className="px-20 pb-20 justify-content-center">
               <Box mb={2} width="100%" display="flex" justifyContent="center" p={1} textAlign="center">
						<Box mr={2}>
							<Button color="primary" variant="contained" onClick={() => this.closeDialog(true)}>
								yes
							</Button>
						</Box>
						<Button color="secondary" variant="contained" onClick={() => this.closeDialog(false)} autoFocus>
							no
						</Button>
					</Box>
            </DialogActions>
         </Dialog >
      );
   }
}

export { ConfirmationDialog };