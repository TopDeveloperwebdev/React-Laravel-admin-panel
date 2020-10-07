import * as React from 'react';
import { Button, Box, Typography, Dialog, Container, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
export default class PageTemplate extends React.Component {
    getUrl(logo) {
        let url = '/backend_latest/file_storage/' + logo.split('/')[5];
        //  let defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
        let defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTpbeI4IdEQfeCLO9h67Z9SptqluMsBzJG-Ww&usqp=CAU";
        return defaultUrl
    }
    render() {
        let instanceInfo = JSON.parse(localStorage.getItem('instanceInfo'));
        return (
            <div>
                <div
                    style={{ position: "absolute", top: "50px", left: "60px" }}
                    id="header"
                >
                    <img src={this.getUrl(instanceInfo.instanceLogo)} height="auto" width="100px"/>
                </div>
                <div
                    style={{ position: "absolute", bottom: "30px", right: "30px", fontSize: "12px" }}
                    id="footer"
                >

                    Seite {this.props.pageNum} von {this.props.totalPages}
                </div>
                <div
                    style={{ position: "absolute", bottom: "30px", left: "60px", fontSize: "12px", color: "#b6b6b6" }}
                    id="footer"
                >
                    <div>{instanceInfo.instanceName}</div>
                    Mail :  {instanceInfo.email}
                </div>
            </div>
        );
    }
}
