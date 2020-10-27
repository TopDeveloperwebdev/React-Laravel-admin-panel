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

    handleClick = (row , index) => {  
      
        if(row.id){
            this.props.OnSelectRow({id : row.id , index: index});
        }
        
    }
    componentWillMount(){

    }
    render() {

        let { row , index , open } = this.props;
        console.log('open'  , this.props.open);
    
        return (
            <>
                <TableRow >
                    <TableCell align="left" style={{width : '40%'}}>{row.firstName + ' ' + row.lastName}</TableCell>
                    <TableCell align="left" style={{width : '40%'}}>{row.phone1}</TableCell>
                    <TableCell align="right" style={{width : '20%'}}>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.handleClick(row , index)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                {open ? <TableRow>
                    <TableCell style={{ paddingBottom: 5, paddingTop: 5 , width : "100%" , height : 'auto'}} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography gutterBottom component="div">
                                    {row.streetNr}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    {row.zipCode} {row.city}
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