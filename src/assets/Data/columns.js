import { OLYMPIC_SPORTS, OLYMPIC_COUNTRIES } from "./olympic_lists.js";

export const columnDefs = [
  {
    headerName: "Avatar",
    field: "imageUrl",
    cellEditor: "simpleEditor"
  },
  {
    headerName: "First Name",
    field: "firstName",
    cellEditor: "simpleEditor"
  },
  {
    headerName: "Last Name",
    field: "lastName",
    cellEditor: "simpleEditor"
  },
  {
    headerName: "Salutation",
    field: "salutation",
    cellEditor: "simpleEditor"
  },
  {
    headerName: "Resources",
    field: "resources",
    cellEditor: "autoCompleteEditor",
    cellEditorParams: {
      options: OLYMPIC_COUNTRIES
    }
  },

  {
    headerName: "Insurance",
    field: "insurance",
    cellEditor: "autoCompleteEditor",
    cellEditorParams: {
      options: OLYMPIC_COUNTRIES
    }
  },
  
{
    headerName: "Services",
    field: "services",
    cellEditor: "autoCompleteEditor",
    cellEditorParams: {
      options: OLYMPIC_COUNTRIES
    }
  },
    
{
    headerName: "Family doctor",
    field: "familyDoctor",
    cellEditor: "autoCompleteEditor",
    cellEditorParams: {
      options: OLYMPIC_COUNTRIES
    }
  },
  {
    headerName: "Key number",
    field: "keyNumber",
    cellEditor: "simpleEditor"
  },
  {
    headerName: "Floor",
    field: "floor",
    cellEditor: "simpleEditor"
  },
  {
    headerName: "Degree of care",
    field: "familyDoctor",
    cellEditor: "autoCompleteEditor",    
  },
{
    headerName: "Pharmacy",
    field: "pharmacy",
    cellEditor: "autoCompleteEditor",
    cellEditorParams: {
      options: OLYMPIC_COUNTRIES
    }
  },
{
    headerName: "User group",
    field: "userGroup",
    cellEditor: "autoCompleteEditor",
    cellEditorParams: {
      options: OLYMPIC_COUNTRIES
    }
  },
  {
    headerName: "Status",
    field: "status",
    cellEditor: "statusEditor",
    cellEditorParams: {
      options: OLYMPIC_COUNTRIES
    }
  },
  {
    headerName: "",
    colId: "actions",
    cellRenderer: "actionsRenderer",
    editable: false,
    filter: false,
    minWidth: 220
  },
];

export const defaultColDef = {
  editable: true,
  resizable: true,
  filter: true,
  floatingFilter: true,
  suppressKeyboardEvent: params => params.editing
};
