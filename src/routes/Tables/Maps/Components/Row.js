/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Button, Box, Typography, Dialog, Container, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,

        }
    }

    handleClick = (row) => {  
        let open = !this.state.open;
   
        this.setState({ open });
       
        if(row.streetNr){
            this.props.OnRowclick(row.id);
        }
        
    }
    render() {

        let { row } = this.props;
        return (
            <>
                <TableRow >
                    <TableCell align="left">{row.firstName + ' ' + row.lastName}</TableCell>
                    <TableCell align="left">{row.phone1}</TableCell>
                    <TableCell align="right">
                        <IconButton aria-label="expand row" size="small" onClick={() => this.handleClick(row)}>
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                {this.state.open ? <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography gutterBottom component="div">
                                    {row.streetNr}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    {row.zipCode}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    {row.city}
                                </Typography>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow> : ''}
            </>
        );
    }
}

export default Row;