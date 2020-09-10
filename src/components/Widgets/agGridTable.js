import React, { useState, Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import GridComponents from "./Components";
import { columnDefs, defaultColDef } from "../../assets/Data/columns";
import { uuid } from "uuidv4";





class agGridTable extends Component {
   constructor(props) {
      super(props);
      this.state = {
         gridApi: null,
         columnApi: null,
         rowData: []
      }
    
   }

   onGridReady = (params) => {
      // this.setState(gridApi , params.api);
      // this.setState(columnApi , params.columnApi); 
      this.setState({
         gridApi:  params.api,
         columnApi : params.columnApi
      });
      fetch(
         "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
      )
         .then(res => res.json())
         .then(data => {
            data.forEach(row => (row.id = uuid()));
            console.log('data' , data.slice(0,100));
            let temp = data.slice(0,100);
           
            this.setState({
               rowData: temp,
            });

         });
      params.api.sizeColumnsToFit();
   }
   render() {
      const frameworkComponents = {
         simpleEditor: GridComponents.SimpleEditor,
         asyncValidationEditor: GridComponents.AsyncValidationEditor,
         autoCompleteEditor: GridComponents.AutoCompleteEditor,
         agDateInput: GridComponents.MyDatePicker,
         dateEditor: GridComponents.DateEditor,
         actionsRenderer: GridComponents.ActionsRenderer,
         addRowStatusBar: GridComponents.AddRowStatusBar
      };
      return (
         <div className="grid-table">
            <div
               id="myGrid"
               style={{ height: "100%", width: "100%" }}
               className="ag-theme-alpine"
            >
               <AgGridReact
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  rowData={this.state.rowData}
                  getRowNodeId={data => data.id}
                  onGridReady={this.onGridReady}
                  frameworkComponents={frameworkComponents}
                  editType="fullRow"
                  suppressClickEdit
                  statusBar={{
                     statusPanels: [{ statusPanel: "addRowStatusBar" }]
                  }}
               />
            </div>
         </div>
      );
   }

}

export default agGridTable;
