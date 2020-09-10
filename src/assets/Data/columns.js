import { OLYMPIC_SPORTS, OLYMPIC_COUNTRIES } from "./olympic_lists.js";

export const columnDefs = [
  {
    headerName: "Avatar",
    field: "imageUrl",
    cellEditor: "imgEditor"
  },
  {
    headerName: "Sport (Validation)",
    field: "sport",
    cellEditor: "asyncValidationEditor",
    cellEditorParams: {
      condition: value => OLYMPIC_SPORTS.includes(value)
    }
  },
  {
    headerName: "Country (autoComplete)",
    field: "country",
    cellEditor: "autoCompleteEditor",
    cellEditorParams: {
      options: OLYMPIC_COUNTRIES
    }
  },
  {
    headerName: "Country (autoComplete)",
    field: "country",
    cellEditor: "autoCompleteEditor",
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
  }
];

export const defaultColDef = {
  editable: true,
  resizable: true,
  filter: true,
  floatingFilter: true,
  suppressKeyboardEvent: params => params.editing
};
