(this.webpackJsonphulk=this.webpackJsonphulk||[]).push([[58],{2022:function(e,t,n){"use strict";n.r(t);var s=n(7),i=n(413),a=n(14),o=n(15),r=n(17),c=n(16),l=n(0),d=n.n(l),u=n(1577),m=n.n(u),f=n(1537),p=n(61),h=n(236),b=n(18),O=n(30),v=n(1615),g=function(e){Object(r.a)(n,e);var t=Object(c.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).onChange=function(e){s.setState({selectedPermissions:Object(i.a)(e.target.value)})},s.state={columns:[{title:"ID",field:"id",editComponent:function(e){return d.a.createElement("div",null,e.id)}},{title:"Role",field:"role"},{title:"Permissions",field:"permissions",render:function(e){var t=JSON.parse(e.permissions);return d.a.createElement("div",null,t.map((function(e,t){return d.a.createElement("div",{key:t},e)})))},editComponent:function(e){if(e.rowData.id){console.log("rowData",e);var t=JSON.parse(e.rowData.permissions);t||(t=[]),s.state.isEditPermissions&&s.setState({selectedPermissions:t,isEditPermissions:!1})}return d.a.createElement(v.a,{data:s.state.permissionsList,onChange:s.onChange,value:s.state.selectedPermissions})}}],data:[],selectedPermissions:[],permissionsList:[],isEditPermissions:!0},s}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=JSON.parse(localStorage.getItem("user"));this.instance_id=t.instance_id,console.log("res",this.instance_id),h.a.showRoles({instance_id:this.instance_id,pagination:1}).then((function(t){var n=t.permissions.map((function(e){return e.permissions}));e.setState({permissionsList:n}),e.setState((function(e){var n=t.roles;return Object(s.a)(Object(s.a)({},e),{},{data:n})}))}))}},{key:"render",value:function(){var e=this;return d.a.createElement("div",{className:"tables-wrapper search-table-wrap"},d.a.createElement(b.f,{title:d.a.createElement(O.a,{id:"sidebar.roles"}),center:!0}),d.a.createElement(f.a,{maxWidth:"lg"},d.a.createElement(p.a,{px:{xs:"12px",lg:0},className:"page-space"},d.a.createElement(m.a,{title:d.a.createElement(O.a,{id:"sidebar.roles"}),columns:this.state.columns,data:this.state.data,editable:{onRowAdd:function(t){return new Promise((function(n){n(),console.log("newData",t),t.instance_id=e.instance_id,t.permissions=JSON.stringify(e.state.selectedPermissions),h.a.addRoles(t).then((function(t){console.log("res",t),e.setState((function(e){var n=Object(i.a)(e.data);n.push(t);return Object(s.a)(Object(s.a)({},e),{},{data:n,selectedPermissions:[],isEditPermissions:!0})}))}))}))},onRowUpdate:function(t,n){return new Promise((function(a){setTimeout((function(){a(),console.log("newdata",t.id),t.permissions=JSON.stringify(e.state.selectedPermissions),h.a.editRoles(t).then((function(a){n&&e.setState((function(e){var a=Object(i.a)(e.data);a[a.indexOf(n)]=t;return Object(s.a)(Object(s.a)({},e),{},{data:a,selectedPermissions:[],isEditPermissions:!0})}))}))}),600)}))},onRowDelete:function(t){return new Promise((function(n){setTimeout((function(){n(),console.log(";oldData",t.id),h.a.deleteRoles({id:t.id}).then((function(n){console.log("res",n),e.setState((function(e){var n=Object(i.a)(e.data);return n.splice(n.indexOf(t),1),Object(s.a)(Object(s.a)({},e),{},{data:n})}))}))}),600)}))}}}))))}}]),n}(l.Component);t.default=g}}]);
//# sourceMappingURL=58.c603cb92.chunk.js.map