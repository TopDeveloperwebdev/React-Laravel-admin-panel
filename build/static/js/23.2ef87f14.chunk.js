(this.webpackJsonphulk=this.webpackJsonphulk||[]).push([[23],{1566:function(e,t,a){var n={"./user-1.jpg":723,"./user-2.jpg":725,"./user-3.jpg":726,"./user-4.jpg":312,"./user-5.jpg":727,"./user-6.jpg":413};function r(e){var t=l(e);return a(t)}function l(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=l,e.exports=r,r.id=1566},1859:function(e,t,a){"use strict";var n=a(152);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),l=(0,n(a(412)).default)(r.default.createElement("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz");t.default=l},2039:function(e,t,a){"use strict";a.r(t);var n=a(241),r=a(14),l=a(15),i=a(17),o=a(16),c=a(84),s=a(34),d=a(0),m=a.n(d),u=a(409),p=a(129),h=a(33),E=a(245),g=a.n(E),f=a(116),b=a(60),v=a(1537),C=a(227),y=a(403),x=a(521),k=a(1507),M=a(1529),j=a(1558),w=a(1556),S=a(228),D=a(760),N=a(428),O=a.n(N),V=a(29),z=a(761),B=a(1489),W=a(1481),A=a(1484),U=a(1485),I=a(23),R=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(e=t.call.apply(t,[this].concat(l))).state={open:!1,name:"",designation:"",address:"",isValidname:!1,isValiddesignation:!1,isValidaddress:!1},e.closeDialog=function(){e.setState({open:!1}),e.props.onCloseDialog(!1)},e.handleClose=function(){e.setState({open:!1}),e.props.onCloseDialog(!0)},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.setState({open:!0}),this.getcontactData()}},{key:"getcontactData",value:function(){var e=this.props.data;this.setState({name:e.name,designation:e.designation,address:e.address})}},{key:"onPressUpdate",value:function(){var e=this.state,t=e.name,a=e.designation,n=e.address;this.setState({isValidname:!1,isValiddesignation:!1,isValidaddress:!1}),""!==t&&""!==a&&""!==n?this.updatecontact():(""===t&&this.setState({isValidname:!0}),""===a&&this.setState({isValiddesignation:!0}),""===n&&this.setState({isValidaddress:!0}),""===t&&""===a&&""===n&&this.setState({isValidname:!0,isValiddesignation:!0,isValidaddress:!0}))}},{key:"updatecontact",value:function(){var e=this.props.data.id,t={name:this.state.name,designation:this.state.designation,address:this.state.address};this.props.onUpdateContact(t,e),this.props.onCloseDialog(!0),this.setState({open:!1})}},{key:"render",value:function(){var e=this,t=this.state,a=t.name,n=t.designation,r=t.address,l=t.isValidname,i=t.isValiddesignation,o=t.isValidaddress;return m.a.createElement("div",null,m.a.createElement(W.a,{className:"contact-dialog",open:this.state.open,onClose:this.closeDialog,"aria-labelledby":"form-dialog-title"},m.a.createElement(U.a,{id:"form-dialog-title"},"Edit Contact"),m.a.createElement(A.a,null,m.a.createElement("div",null,m.a.createElement("form",{autoComplete:"off"},m.a.createElement("div",{className:"row",style:{marginBottom:"20px"}},m.a.createElement(b.a,{mb:2},m.a.createElement(y.a,{fullWidth:!0,required:!0,error:l,"aria-describedby":"firstsname-text",className:"d-block",style:{marginBottom:"10px"}},m.a.createElement(z.a,{htmlFor:"name"},"Name"),m.a.createElement(x.a,{fullWidth:!0,id:"name",type:"text",value:a||"",onChange:function(t){e.setState({name:t.target.value})}}),l&&m.a.createElement(B.a,{id:"firstsname-text"},m.a.createElement("i",{className:"zmdi zmdi-alert-circle mr-1"}),"This field should not be empty."))),m.a.createElement(b.a,{mb:2},m.a.createElement(y.a,{fullWidth:!0,required:!0,error:i,"aria-describedby":"designation-text",className:"d-block",style:{marginBottom:"10px"}},m.a.createElement(z.a,{htmlFor:"designation"},"Contact"),m.a.createElement(x.a,{fullWidth:!0,id:"designation",type:"text",value:n||"",onChange:function(t){e.setState({designation:t.target.value})}}),i&&m.a.createElement(B.a,{id:"designation-text"},m.a.createElement("i",{className:"zmdi zmdi-alert-circle mr-1"}),"This field should not be empty."))),m.a.createElement(b.a,{mb:2},m.a.createElement(y.a,{fullWidth:!0,required:!0,error:o,"aria-describedby":"address-text",className:"d-block",style:{marginBottom:"10px"}},m.a.createElement(z.a,{htmlFor:"address"},"Address"),m.a.createElement(x.a,{fullWidth:!0,id:"address",type:"text",value:r||"",onChange:function(t){e.setState({address:t.target.value})}}),o&&m.a.createElement(B.a,{id:"address-text"},m.a.createElement("i",{className:"zmdi zmdi-alert-circle mr-1"}),"This field should not be empty.")))),m.a.createElement("div",{className:"pt-25 text-right"},m.a.createElement(b.a,{mb:2,width:"100%",display:"flex",justifyContent:"flex-end",textAlign:"center"},m.a.createElement(b.a,{mx:2},m.a.createElement(C.a,{variant:"contained",color:"secondary",onClick:this.handleClose},"Cancel")),m.a.createElement(C.a,{variant:"contained",color:"primary",onClick:function(){return e.onPressUpdate()}},"Submit"))))))))}}]),a}(m.a.Component),T=Object(h.b)((function(e){return{contactsData:e.ContactReducer.contactsData}}),{onUpdateContact:I.F})(R),F=a(1483),P=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(e=t.call.apply(t,[this].concat(l))).state={open:!1},e}return Object(l.a)(a,[{key:"openDialog",value:function(){this.setState({open:!0})}},{key:"closeDialog",value:function(){this.setState({open:!1})}},{key:"onCloseDialog",value:function(e){this.setState({open:!1}),this.props.onConfirm(e)}},{key:"render",value:function(){var e=this;return m.a.createElement(W.a,{open:this.state.open,onClose:this.closeDialog.bind(this),"aria-labelledby":"responsive-dialog-title",className:"confirmation-dialog"},m.a.createElement(A.a,null,m.a.createElement(b.a,{textAlign:"center",pt:2},m.a.createElement(f.a,{variant:"h5"},"Are you sure you want to delete this contact permanently?"))),m.a.createElement(F.a,{className:"px-20 pb-20 justify-content-center"},m.a.createElement(b.a,{mb:2,width:"100%",display:"flex",justifyContent:"center",p:1,textAlign:"center"},m.a.createElement(b.a,{mx:2},m.a.createElement(C.a,{variant:"contained",color:"primary",onClick:function(){return e.onCloseDialog(!0)}},"Yes")),m.a.createElement(C.a,{variant:"contained",color:"secondary",onClick:function(){return e.onCloseDialog(!1)}},"No"))))}}]),a}(m.a.Component),H=a(21),_=a(64),q=a(519),J=a(149),L=a(451),G=a(1510),Y=a(1859),K=a.n(Y);function Q(e){var t=m.a.useState(null),a=Object(_.a)(t,2),n=a[0],r=a[1],l=Boolean(n);return m.a.createElement("div",null,m.a.createElement(S.a,{size:"small","aria-label":"more","aria-controls":"long-menu","aria-haspopup":"true",onClick:function(e){r(e.currentTarget)}},m.a.createElement(K.a,null)),m.a.createElement(L.a,{id:"long-menu",anchorEl:n,keepMounted:!0,open:l,onClose:function(){r(null)}},m.a.createElement(G.a,{key:"Edit",onClick:function(){return e.data,r(null),void e.parentEditMethod()}},"Edit"),m.a.createElement(G.a,{key:"Delete",onClick:function(){return e.data,r(null),void e.parentMethod()}},"Delete")))}var X=a(782),Z=a(1511),$=a(1512),ee=a(1513),te=a(1557),ae=a(1515),ne=a(1517),re=Object(q.a)((function(e){return{thumb:{width:100,height:100,marginBottom:10},paper:{backgroundColor:"transparent",boxShadow:"none"},table:{"& tr":{marginBottom:10,borderRadius:4,height:"auto",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"},"& .MuiTableHead-root":{backgroundColor:"transparent"},"& .MuiTableCell-head, .MuiTableCell-body":{height:"auto",padding:"12px 16px",lineHeight:1,borderBottom:0,backgroundColor:e.palette.common.white}}}}));function le(e){var t=m.a.useState(!1),n=Object(_.a)(t,2),r=n[0],l=n[1],i=function(e){l(e.target.checked)},o=re(),c=e.contacts;return m.a.createElement(d.Fragment,null,m.a.createElement(te.a,{component:J.a,className:"contact-list-wrap ".concat(o.paper)},m.a.createElement(Z.a,{className:o.table,"aria-label":"simple table"},m.a.createElement(ae.a,null,m.a.createElement(ne.a,null,m.a.createElement(ee.a,null,m.a.createElement(X.a,{checked:r,onChange:i,value:"primary",inputProps:{"aria-label":"primary checkbox"}})),m.a.createElement(ee.a,null,"Name"),m.a.createElement(ee.a,{align:"left"},"Email"),m.a.createElement(ee.a,{align:"left"},"Designation"),m.a.createElement(ee.a,{align:"left"},"Address"),m.a.createElement(ee.a,{align:"left"},"Phone No."),m.a.createElement(ee.a,{align:"left"},"Actions"))),m.a.createElement($.a,null,c&&c.map((function(t,n){return m.a.createElement(ne.a,{key:n},m.a.createElement(ee.a,null,m.a.createElement(X.a,{checked:r,onChange:i,value:"primary",inputProps:{"aria-label":"primary checkbox"}})),m.a.createElement(ee.a,{align:"left"},m.a.createElement(b.a,{display:"inline-flex",alignItems:"center"},m.a.createElement("img",{alt:"Remy Sharp",style:{borderRadius:4},height:48,width:48,src:a(1566)("./".concat(t.image))}),m.a.createElement(b.a,{px:"12px"},m.a.createElement(f.a,{variant:"body2",color:"primary"},t.name)))),m.a.createElement(ee.a,{align:"left"},t.email),m.a.createElement(ee.a,{align:"left"},t.designation),m.a.createElement(ee.a,{align:"left"},t.address),m.a.createElement(ee.a,{align:"left"},t.phoneNo),m.a.createElement(ee.a,{align:"left"},m.a.createElement(Q,{parentEditMethod:function(){return e.parentEditMethod(t)},parentMethod:function(){return e.parentMethod(t)},data:t})))}))))))}var ie=a(1534),oe=a(1536),ce=a(1499),se=a(1555),de=a(1535),me=a(18),ue=Object(q.a)((function(e){return{thumb:{width:100,height:100,marginBottom:10}}}));function pe(e){var t=ue(),n=e.contacts;return m.a.createElement(d.Fragment,null,n&&n.map((function(n,r){return m.a.createElement("div",{key:r,className:"contact-grid-item"},m.a.createElement(ie.a,null,m.a.createElement(oe.a,null,m.a.createElement("div",{className:"contact-grid-action"},m.a.createElement(Q,{parentEditMethod:function(){return e.parentEditMethod(n)},parentMethod:function(){return e.parentMethod(n)},data:n})),m.a.createElement(ce.a,{alt:"Remy Sharp",className:t.thumb,src:a(1566)("./".concat(n.image))}),m.a.createElement("div",{className:"contact-grid-content"},m.a.createElement(b.a,{fontSize:"subtitle1.fontSize",fontWeight:"h6.fontWeight",mb:"5px"},"Medication name"),m.a.createElement(f.a,{variant:"subtitle2"},"Ingredients"),m.a.createElement(b.a,{display:"flex",alignItems:"center",justifyContent:"center"},m.a.createElement(se.a,{size:"small",color:"primary"})))),m.a.createElement(de.a,{disableSpacing:!0,className:"footer-icon"},m.a.createElement(me.b,{to:"/app/tables/patients-table"}," ",m.a.createElement(S.a,{size:"small"},"Patients")),m.a.createElement(me.b,{to:"/app/tables/search-table"}," ",m.a.createElement(S.a,{size:"small"},"Directors")),m.a.createElement(me.b,{to:"/app/user-settings"}," ",m.a.createElement(S.a,{size:"small"},"Manager")))))})),";")}function he(e){var t=e.children,a=e.value,n=e.index,r=e.dir,l=Object(c.a)(e,["children","value","index","dir"]);return m.a.createElement(f.a,Object.assign({component:"div",role:"tabpanel",hidden:a!==n,id:"scrollable-force-tabpanel-".concat(n),"aria-labelledby":"scrollable-force-tab-".concat(n)},l,{dir:r,className:"pad-12"}),a===n&&m.a.createElement(b.a,{pb:4},t))}function Ee(e){return{id:"scrollable-force-tab-".concat(e),"aria-controls":"scrollable-force-tabpanel-".concat(e)}}var ge=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={message:"",value:0,favContacts:[],recentContacts:null,data:null,isUpdated:!1,gridView:!0},n.handleChange=function(e,t){n.setState({value:t})},n.onCloseDialog=function(e){n.setState({data:null,isUpdated:!1})},n.confirmationDialog=m.a.createRef(),n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.getFavContact(),this.getRecentContact()}},{key:"componentDidUpdate",value:function(e){e.contactsData.length!==this.props.contactsData.length&&(this.getFavContact(),this.getRecentContact())}},{key:"getFavContact",value:function(){var e=[],t=this.props.contactsData;if(null!==t){var a,r=Object(n.a)(t);try{for(r.s();!(a=r.n()).done;){var l=a.value;"favourite"===l.type&&e.push(l)}}catch(i){r.e(i)}finally{r.f()}this.setState({favContacts:e,isUpdated:!1})}}},{key:"getRecentContact",value:function(){var e=[],t=this.props.contactsData;if(null!==t){var a,r=Object(n.a)(t);try{for(r.s();!(a=r.n()).done;){var l=a.value;"recently_added"===l.type&&e.push(l)}}catch(i){r.e(i)}finally{r.f()}this.setState({recentContacts:e,isUpdated:!1})}}},{key:"ondeleteContact",value:function(e){this.data=e,this.confirmationDialog.current.openDialog()}},{key:"deleteContactPermanent",value:function(e){e&&(this.props.deleteContact(this.data),this.data="")}},{key:"handleClickEdit",value:function(e){this.setState({data:e,isUpdated:!0})}},{key:"render",value:function(){var e=this,t=this.props,a=t.theme,n=t.contactsData,r=t.classes,l=this.state,i=l.recentContacts,o=l.favContacts,c=l.isUpdated,s=l.data,d=l.message,u=l.gridView;return m.a.createElement("div",{className:"contact-grid"},m.a.createElement(H.f,{title:m.a.createElement(V.a,{id:"component.contactGrid"})}),m.a.createElement(b.a,{className:"title-contact-block ".concat(r.searchBarWrap),pt:0,bgcolor:"background.paper",px:{xs:"12px",md:0},pb:3},m.a.createElement(v.a,null,m.a.createElement(b.a,{textAlign:{xs:"center",sm:"right"},display:{xs:"block",sm:"flex"},alignItems:"center",justifyContent:"space-between"},m.a.createElement(C.a,{variant:"outlined",color:"default"},m.a.createElement(V.a,{id:"component.addContact"})),m.a.createElement(b.a,null,m.a.createElement(y.a,{fullWidth:!0},m.a.createElement(x.a,{type:"text",name:"search",placeholder:"Search Contact",onChange:function(t){return e.setState({message:t.target.value})},value:d,endAdornment:m.a.createElement(k.a,{position:"end"},m.a.createElement(O.a,null))})))))),m.a.createElement(b.a,{className:r.tabsWrap,bgcolor:"background.paper"},m.a.createElement(v.a,null,m.a.createElement(M.a,{position:"static",className:r.appWrap},m.a.createElement(j.a,{value:this.state.value,onChange:this.handleChange,indicatorColor:"primary",textColor:"primary",variant:"scrollable",scrollButtons:"on","aria-label":"scrollable auto tabs example",className:"".concat(r.toolbar," contact-grid-tabs")},m.a.createElement(w.a,Object.assign({label:m.a.createElement(V.a,{id:"component.allContacts"})},Ee(0))),m.a.createElement(w.a,Object.assign({label:m.a.createElement(V.a,{id:"component.recentlyAdded"})},Ee(1))),m.a.createElement(w.a,Object.assign({label:m.a.createElement(V.a,{id:"component.favourite"})},Ee(2))))))),m.a.createElement(v.a,null,m.a.createElement(b.a,{textAlign:{xs:"center",sm:"right"},display:{xs:"block",sm:"flex"},alignItems:"center",justifyContent:"space-between"},m.a.createElement("div",{className:"contact-tab-wrap Tab-wrap"},c&&s&&m.a.createElement(T,{data:s,onCloseDialog:this.onCloseDialog}),m.a.createElement("div",null,m.a.createElement("div",{className:r.visibleHidden},m.a.createElement(b.a,{textAlign:"right",py:3},m.a.createElement(S.a,{className:!0===u?"active":"",onClick:function(){return e.setState({gridView:!0})}},m.a.createElement(D.a,null,"apps")),m.a.createElement(S.a,{className:!1===u?"active":"",onClick:function(){return e.setState({gridView:!1})}},m.a.createElement(D.a,null,"view_list")))),m.a.createElement(g.a,{axis:"rtl"===a.direction?"x-reverse":"x",index:this.state.value},m.a.createElement(he,{dir:a.direction},u&&!0===u?m.a.createElement("div",{className:"contact-grid-wrap"},m.a.createElement(pe,{parentEditMethod:function(t){return e.handleClickEdit(t)},parentMethod:function(t){return e.ondeleteContact(t)},contacts:n})):m.a.createElement("div",null,m.a.createElement(le,{parentEditMethod:function(t){return e.handleClickEdit(t)},parentMethod:function(t){return e.ondeleteContact(t)},contacts:n}))),m.a.createElement(he,{dir:a.direction},u&&!0===u?m.a.createElement("div",{className:"contact-grid-wrap"},m.a.createElement(pe,{parentEditMethod:function(t){return e.handleClickEdit(t)},parentMethod:function(t){return e.ondeleteContact(t)},contacts:i})):m.a.createElement("div",null,m.a.createElement(le,{parentEditMethod:function(t){return e.handleClickEdit(t)},parentMethod:function(t){return e.ondeleteContact(t)},contacts:i}))),m.a.createElement(he,{dir:a.direction},u&&!0===u?m.a.createElement("div",{className:"contact-grid-wrap"},m.a.createElement(pe,{parentEditMethod:function(t){return e.handleClickEdit(t)},parentMethod:function(t){return e.ondeleteContact(t)},contacts:o})):m.a.createElement("div",null,m.a.createElement(le,{parentEditMethod:function(t){return e.handleClickEdit(t)},parentMethod:function(t){return e.ondeleteContact(t)},contacts:o}))))),m.a.createElement(P,{ref:this.confirmationDialog,onConfirm:function(t){return e.deleteContactPermanent(t)}})))))}}]),a}(d.Component);t.default=Object(p.h)(Object(h.b)((function(e){return{contactsData:e.ContactReducer.contactsData}}),{deleteContact:I.f})(Object(u.a)((function(e){return{tabsWrap:{boxShadow:"0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"},appWrap:{boxShadow:"none"},toolbar:{padding:"0",marginLeft:-12,marginRight:-12,"& button":{minHeight:50},"& .MuiTab-wrapper":{fontSize:"1rem"},"& .Mui-selected":{backgroundColor:"rgba(0,0,0,0.1)"}},searchBarWrap:{"& .MuiInput-underline::before":{borderBottom:"1px solid ".concat(e.palette.common.white)},"& .MuiInputBase-input::placeholder":{color:e.palette.common.white},"& .MuiInput-underline:hover:not(.Mui-disabled)::before":{borderColor:e.palette.common.white},"& .MuiInput-underline::after":{borderBottom:"1px solid ".concat(e.palette.common.white)},"& .MuiInputBase-root":Object(s.a)({width:360,"& input":{color:e.palette.common.white}},e.breakpoints.down("xs"),{width:"100%",marginBottom:20}),"& .MuiSvgIcon-root":{fill:e.palette.common.white}},visibleHidden:{visibility:"hidden"}}}),{withTheme:!0})(ge)))}}]);
//# sourceMappingURL=23.2ef87f14.chunk.js.map