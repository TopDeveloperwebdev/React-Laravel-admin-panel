(this.webpackJsonphulk=this.webpackJsonphulk||[]).push([[30],{1636:function(e,t,a){"use strict";var n=a(151);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a(0)),r=(0,n(a(416)).default)(i.default.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.default=r},1681:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(15),i=a(16),r=a(18),s=a(17),o=a(0),c=function(e){Object(r.a)(a,e);var t=Object(s.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"getUrl",value:function(e){var t="/backend_latest/file_storage/"+e.split("/")[5];return console.log("url",t),console.log("url",t),t}},{key:"render",value:function(){var e=JSON.parse(localStorage.getItem("instanceInfo"));return o.createElement("div",null,o.createElement("div",{style:{position:"absolute",top:"50px",left:"60px"},id:"header"},o.createElement("img",{src:this.getUrl(e.instanceLogo),style:{maxHeight:"60px"},height:"auto",width:"100px"})),o.createElement("div",{style:{position:"absolute",bottom:"30px",left:"60px",fontSize:"12px",color:"#b6b6b6",fontFamily:"Arial"},id:"footer"},o.createElement("div",{style:{fontFamily:"Arial"}},e.instanceName),"Mail:  ",e.email))}}]),a}(o.Component)},1826:function(e,t,a){"use strict";var n=a(15),i=a(16),r=a(18),s=a(17),o=a(0),c=a.n(o),l=a(1497),u=a(1500),d=a(61),f=a(1636),m=a.n(f),p=(a(11),a(30),function(e){Object(r.a)(a,e);var t=Object(s.a)(a);function a(e){var i;return Object(n.a)(this,a),(i=t.call(this,e)).state={open:!1,instance:null,title:"",content:"",name:"",street:"",zip:"",city:"",insurance:"",insuranceNr:"",birthday:"",phone:""},i.pdfExportComponent=c.a.createRef(),i}return Object(i.a)(a,[{key:"openDialog",value:function(){var e=this;this.setState({open:!0},(function(){var t=e.state,a=t.name,n=t.street,i=t.zip,r=t.city,s=t.insurance,o=t.insuranceNr,c=t.birthday,l=t.phone;setTimeout((function(){for(var t=document.getElementsByClassName("name"),u=0;u<t.length;u++)document.getElementsByClassName("name")[u].innerText=a;for(var d=document.getElementsByClassName("street"),f=0;f<d.length;f++)document.getElementsByClassName("street")[f].innerText=n;for(var m=document.getElementsByClassName("zip"),p=0;p<m.length;p++)document.getElementsByClassName("zip")[p].innerText=i;for(var g=document.getElementsByClassName("city"),h=0;h<g.length;h++)document.getElementsByClassName("city")[h].innerText=r;for(var v=document.getElementsByClassName("insurance"),y=0;y<v.length;y++)document.getElementsByClassName("insurance")[y].innerText=s;for(var D=document.getElementsByClassName("insuranceNr"),E=0;E<D.length;E++)document.getElementsByClassName("insuranceNr")[E].innerText=o;for(var N=document.getElementsByClassName("birthday"),b=0;b<N.length;b++)document.getElementsByClassName("birthday")[b].innerText=e.formate_date(c);for(var S=document.getElementsByClassName("phone"),C=0;C<S.length;C++)document.getElementsByClassName("phone")[C].innerText=l}),10)}))}},{key:"formate_date",value:function(e){var t="";e&&(t=(t=e.split(" ")[0].split("-"))[2]+"."+t[1]+"."+t[0]);return t}},{key:"closeDialog",value:function(){this.setState({open:!1})}},{key:"onCloseDialog",value:function(e){this.setState({open:!1})}},{key:"getUrl",value:function(e){return"/backend_latest/file_storage/"+e.split("/")[5]}},{key:"render",value:function(){var e=this;return c.a.createElement(l.a,{open:this.state.open,onClose:this.closeDialog.bind(this),"aria-labelledby":"responsive-dialog-title",className:"confirmation-dialog"},c.a.createElement(u.a,{className:"p-10 downloadPaper"},c.a.createElement(d.a,null,c.a.createElement(m.a,{className:"closeBtn",onClick:function(){return e.onCloseDialog(!1)}})),c.a.createElement("div",{id:"downloadArea"},this.props.selectedDocumentList.map((function(e,t){return c.a.createElement(d.a,{key:t,className:"pageContainer",id:"page-".concat(t)},c.a.createElement("div",{className:"p-10"},c.a.createElement("div",{variant:"h5",className:"title",textAlign:"left"},e.title)),c.a.createElement("div",{className:"p-10 contentHtml"},c.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.content}})))})),c.a.createElement("style",null,'\n    /* Use the DejaVu Sans font for displaying and embedding in the PDF file. The standard PDF fonts do not support Unicode characters. */\n     h4{\n        font-family: "DejaVu Sans", "Arial", sans-serif;\n        }\n        p,div {\n            font-family: "DejaVu Sans", "Arial", sans-serif;\n    \n        }\n\n    /* The examples load the DejaVu Sans from the KendoReact CDN. Other fonts have to be hosted from your application.\n    The official site of the Deja Vu Fonts project is https://dejavu-fonts.github.io/. */\n    @font-face {\n        font-family: "DejaVu Sans";\n        src: url("https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans.ttf") format("truetype");\n    }\n\n    @font-face {\n        font-family: "DejaVu Sans";\n        font-weight: bold;\n        src: url("https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Bold.ttf") format("truetype");\n    }\n\n    @font-face {\n        font-family: "DejaVu Sans";\n        font-style: italic;\n        src: url("https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf") format("truetype");\n    }\n\n    @font-face {\n        font-family: "DejaVu Sans";\n        font-weight: bold;\n        font-style: italic;\n        src: url("https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf") format("truetype");\n    }\n'))))}}]),a}(c.a.Component));t.a=p},2496:function(e,t,a){"use strict";a.r(t);var n=a(7),i=a(195),r=a(15),s=a(16),o=a(18),c=a(17),l=a(0),u=a.n(l),d=a(1587),f=a.n(d),m=a(33),p=a(1743),g=a(408),h=a(789),v=a(1525),y=a(1569),D=a(1551),E=a(61),N=a(2541),b=a(236),S=a(11),C=a(30),O=a(38),w=a(1826),j=a(1681),k=a(1643),L={Herr:"Herr",Frau:"Frau"},I={1:1,2:2,3:3,4:4,5:5},x={Aufnahme:"Aufnahme",Aktiv:"Aktiv",Inakktiv:"Inakktiv"},_=[],B=[],A=[],P={},V=[],U=function(e){Object(o.a)(l,e);var t=Object(c.a)(l);function l(e){var n;return Object(r.a)(this,l),(n=t.call(this,e)).handleChangeNote=function(e){console.log("event",e.target.value),n.setState({note:e.target.value})},n.handleChangeDate=function(e){n.setState({birthday:e.target.value})},n.onChangeDoctor=function(e,t){t&&n.setState({familyDoctor:t.doctorName,familyDoctorData:t})},n.onChangeCareManager=function(e,t){console.log("caremanagersList",n.state.caremanagersList),t&&n.setState({caremanager:t.id,caremanagerData:t})},n.onChangePharmacies=function(e,t){t&&n.setState({pharmacy:t.pharmacyName,pharmacyData:t})},n.onChangeInsurance=function(e,t){t&&n.setState({insurance:t.insurances,insuranceData:t})},n.onChangeResources=function(e,t){var a=t.map((function(e){return e.resources}));n.setState({selected:Object(i.a)(a)})},n.onChangeUsers=function(e){var t=Object(i.a)(e.target.value);(t.length==A.length-1||t.indexOf("Alle")>-1)&&(t=["Alle"]),n.setState({selectedUsers:t})},n.onChangeServices=function(e,t){var a=t.map((function(e){return e.services}));n.setState({selectedservice:Object(i.a)(a)})},n.state={columns:[{title:"Bild",field:"picture",render:function(e){return u.a.createElement("img",{src:e.picture?e.picture:a(747),className:"logo-td bdr-rad-50"})},editComponent:function(e){return u.a.createElement("input",{type:"file",onChange:function(t){return e.onChange(t.target.files[0])}})},filtering:!1},{title:"Anrede",field:"salutation",lookup:L,filtering:!1},{title:"*Vorname",field:"firstName",filtering:!1},{title:"*Nachname",field:"lastName",filtering:!1},{title:"Stra\xdfe",field:"streetNr",filtering:!1},{title:"PLZ",field:"zipCode",filtering:!1},{title:"Ort",field:"city",filtering:!1},{title:"Geburtstag",field:"birthday",render:function(e){return u.a.createElement("div",null,n.formate_date(e.birthday))},editComponent:function(e){return u.a.createElement(g.a,{className:"full-width",id:"date",type:"date",defaultValue:"2017-05-24",InputLabelProps:{shrink:!0},value:n.state.birthday,onChange:n.handleChangeDate})},filtering:!1},{title:"Telefon 1",field:"phone1",filtering:!1},{title:"Telefon 2",field:"phone2",filtering:!1},{title:"E-Mail",field:"email",filtering:!1},{title:"Bereich",field:"resources",render:function(e){var t=[];return(t=JSON.parse(e.resources))||(t=[]),u.a.createElement("div",null,t.map((function(e,t){return u.a.createElement("div",{key:t},e)})))},editComponent:function(e){var t;if(e.rowData.id){var a=JSON.parse(e.rowData.resources);a||(a=[]),n.state.isEditResources&&n.setState({selected:a,isEditResources:!1})}return t=n.state.selected.map((function(e){return console.log("resource",e),_.find((function(t){return t.resources==e}))})),u.a.createElement(N.a,{multiple:!0,id:"tags-standard",options:_,getOptionLabel:function(e){return e.resources},value:t,onChange:n.onChangeResources,renderInput:function(e){return u.a.createElement(g.a,Object.assign({},e,{variant:"standard",placeholder:"Bereich"}))}})},filtering:!1},{title:"*Versicherung",field:"insurance",editComponent:function(e){if(console.log("rowData-------",n.state.insuranceData),e.rowData.id){var t=e.rowData.insurance;if(n.state.isEditInsurance){var a=n.state.insuranceList.find((function(e){return e.insurances==t}));n.setState({isEditInsurance:!1,insurance:t,insuranceData:a})}}return u.a.createElement(N.a,{options:n.state.insuranceList,getOptionLabel:function(e){return e.insurances},id:"auto-complete",autoComplete:!0,value:n.state.insuranceData,includeInputInList:!0,onChange:n.onChangeInsurance,renderInput:function(e){return u.a.createElement(g.a,Object.assign({placeholder:"Versicherung",id:"input-with-icon-textfield"},e,{margin:"normal"}))}})},filtering:!1},{title:"Versicherten-Nr.",field:"insuranceNr",filtering:!1},{title:"Leistungen",field:"services",render:function(e){var t=JSON.parse(e.services);return t||(t=[]),u.a.createElement("div",{className:"serviceContainer"},u.a.createElement("div",null,t.map((function(e,t){return u.a.createElement("div",{key:t},e)}))))},editComponent:function(e){var t;if(e.rowData.id){var a=JSON.parse(e.rowData.services);a||(a=[]),n.state.isEditServices&&n.setState({selectedservice:a,isEditServices:!1})}return t=n.state.selectedservice.map((function(e){return console.log("resource",e),B.find((function(t){return t.services==e}))})),u.a.createElement(N.a,{multiple:!0,id:"tags-standard",options:B,getOptionLabel:function(e){return e.services},onChange:n.onChangeServices,value:t,renderInput:function(e){return u.a.createElement(g.a,Object.assign({},e,{variant:"standard",placeholder:"Leistungen"}))}})},filtering:!1},{title:"*Familiendoktor",field:"familyDoctor",editComponent:function(e){if(e.rowData.id){var t=e.rowData.familyDoctor;if(n.state.isEditfamilyDoctor){var a=n.state.family_doctorsList.find((function(e){return e.doctorName==t}));n.setState({isEditfamilyDoctor:!1,familyDoctor:t,familyDoctorData:a})}}return u.a.createElement(N.a,{options:n.state.family_doctorsList,getOptionLabel:function(e){return e.doctorName},value:n.state.familyDoctorData,id:"auto-complete",autoComplete:!0,includeInputInList:!0,onChange:n.onChangeDoctor,renderInput:function(e){return u.a.createElement(g.a,Object.assign({id:"input-with-icon-textfield"},e,{margin:"normal",placeholder:"Familiendoktor"}))}})},filtering:!1},{title:"*Zuweiser",field:"caremanager",render:function(e){var t=e.caremanager,a={};if(n.state.isEditCaremanager&&(a=n.state.caremanagersList.find((function(e){return e.id==t}))))return u.a.createElement("div",null,a.firstName+" "+a.lastName)},editComponent:function(e){if(e.rowData.id){var t=e.rowData.caremanager;if(n.state.isEditCaremanager){var a=n.state.caremanagersList.find((function(e){return e.id==t}));n.setState({isEditCaremanager:!1,caremanager:t,caremanagerData:a}),console.log("caremanage",a,t)}}return u.a.createElement(N.a,{options:n.state.caremanagersList,getOptionLabel:function(e){return e.firstName+" "+e.lastName},value:n.state.caremanagerData,id:"auto-complete",autoComplete:!0,includeInputInList:!0,onChange:n.onChangeCareManager,renderInput:function(e){return u.a.createElement(g.a,Object.assign({id:"input-with-icon-textfield"},e,{margin:"normal",placeholder:"Zuweiser"}))}})},filtering:!1},{title:"Schl\xfcssel-Nr.",field:"keyNumber",type:"numeric",filtering:!1},{title:"Etage",field:"floor",type:"numeric",filtering:!1},{title:"Pflegegrad",field:"degreeCare",lookup:I,filtering:!1},{title:"*Apotheke",field:"pharmacy",editComponent:function(e){if(e.rowData.id){var t=e.rowData.pharmacy;if(n.state.isEditPharmacy){var a=n.state.pharmaciesList.find((function(e){return e.pharmacyName==t}));n.setState({isEditPharmacy:!1,pharmacy:t,pharmacyData:a})}}return u.a.createElement(N.a,{options:n.state.pharmaciesList,getOptionLabel:function(e){return e.pharmacyName},id:"auto-complete",autoComplete:!0,includeInputInList:!0,onChange:n.onChangePharmacies,value:n.state.pharmacyData,renderInput:function(e){return u.a.createElement(g.a,Object.assign({id:"input-with-icon-textfield"},e,{margin:"normal",placeholder:"Apotheke"}))}})},filtering:!1},{title:"Instance",field:"instance_id",hidden:!1,render:function(e){return V.find((function(t,a){return a==e.instance_id}))?u.a.createElement("div",null,V[e.instance_id]):u.a.createElement("div",null)},editComponent:function(e){return V.find((function(t,a){return a==e.rowData.instance_id}))?u.a.createElement("div",null,V[e.rowData.instance_id]):u.a.createElement("div",null)},filtering:!1},{title:"Nutzergruppe",field:"userGroup",render:function(e){var t=[];return(t=JSON.parse(e.userGroup))||(t=[]),u.a.createElement("div",null,t.map((function(e,t){return u.a.createElement("div",{key:t},e)})))},editComponent:function(e){if(e.rowData.id){var t=JSON.parse(e.rowData.userGroup);t||(t=[]),n.state.isEditUsers&&n.setState({selectedUsers:t,isEditUsers:!1})}return u.a.createElement(k.b,{data:A,value:n.state.selectedUsers,onChange:n.onChangeUsers})},filtering:!1},{title:"Status",field:"status",render:function(e){return u.a.createElement(h.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:n.state.statusArray[e.id],onChange:function(t){return n.handleChange(t.target.value,e)}},u.a.createElement(v.a,{value:"Aufnahme"},"Aufnahme"),u.a.createElement(v.a,{value:"Aktiv"},"Aktiv"),u.a.createElement(v.a,{value:"Inakktiv"},"Inakktiv"))},lookup:x},{title:"Notiz",field:"note",render:function(e){return u.a.createElement("div",{className:"td-note"},e.note)},editComponent:function(e){return e.rowData.id&&e.rowData.note&&n.state.isEditNote&&(console.log("rowData.rowData.note",e.rowData.note),n.setState({note:e.rowData.note,isEditNote:!1})),u.a.createElement(g.a,{className:"full-width",id:"outlined-multiline-static",label:"Add Note",multiline:!0,rows:4,defaultValue:"Default Value",variant:"outlined",value:n.state.note,onChange:n.handleChangeNote})},filtering:!1},{title:"Benachrichtigungen",field:"serviceplan",render:function(e){return u.a.createElement(y.a,{size:"small",color:"primary",checked:!!e.serviceplan})},editComponent:function(e){return n.state.isEditServiceplan&&e.rowData.id&&n.setState({serviceplan:!!e.rowData.serviceplan,isEditServiceplan:!1}),u.a.createElement(y.a,{size:"small",color:"primary",checked:n.state.serviceplan,onChange:function(e){return n.setState({serviceplan:e.target.checked})}})},filtering:!1}],note:"",data:[],selected:[],selectedservice:[],selectedUsers:[],isEditServices:!0,isEditResources:!0,isEditUsers:!0,isEditServiceplan:!0,isEditInsurance:!0,isEditfamilyDoctor:!0,isEditPharmacy:!0,serviceplan:!0,insurance:"",pharmacy:"",birthday:"",documentsList:[],folders:[],downloadDocs:[],family_doctorsList:[],caremanagersList:[],insuranceList:[],familyDoctorData:null,insuranceData:null,pharmaciesList:[],pharmacyData:null,caremanager:"",caremanagerData:null,statusArray:[],completed:!1,isEditNote:!0,isEditCaremanager:!0},n.preViewDialog=u.a.createRef(),n}return Object(s.a)(l,[{key:"handleChange",value:function(e,t){var a=this;console.log("thishandle",e),b.a.editStatus({id:t.id,status:e}).then((function(r){r&&a.setState((function(a){var r=Object(i.a)(a.statusArray);return r[t.id]=e,Object(n.a)(Object(n.a)({},a),{},{statusArray:r})})),O.NotificationManager.success("Die Daten werden erfolgreich gespeichert.")})).catch((function(e){O.NotificationManager.error("Es wurden keine Daten gespeichert")}))}},{key:"formate_date",value:function(e){var t="";e&&(t=(t=e.split(" ")[0].split("-"))[2]+"."+t[1]+"."+t[0]);return t}},{key:"previewDocument",value:function(e,t){var a=this;console.log("previewDocument",e);var n=[];if(this.state.folders.forEach((function(t){e.indexOf(t.service)>-1&&JSON.parse(t.documents).map((function(e){n.push(e)}))})),console.log("ssssssss1",n),n=Object(i.a)(new Set(n)),console.log("ssssssss2",n),n.length){var r=this.state.documentsList.filter((function(e){return n.indexOf(e.id)>-1})),s=t.firstName+" "+t.lastName,o=t.streetNr,c=t.zipCode,l=t.city,u=t.insurance,d=t.insuranceNr,f=t.birthday,m=t.phone1;this.preViewDialog.current.setState({name:s,street:o,zip:c,city:l,insurance:u,insuranceNr:d,birthday:f,phone:m}),this.setState({downloadDocs:Object(i.a)(r)}),this.preViewDialog.current.openDialog(),setTimeout((function(){a.generatePdf(a.state.downloadDocs.length)}),2e3)}else O.NotificationManager.warning("Es gibt keine Pflegeordner, die optionale Dienste anbieten.")}},{key:"generatePdf",value:function(e){console.log("instances",P);var t={instanceName:P.instanceName,instanceLogo:P.instanceLogo,email:P.email,name:P.name};localStorage.setItem("instanceInfo",JSON.stringify(t)),console.log("instanceInfo",t),Object(p.a)(m.findDOMNode(document.getElementById("downloadArea")),{pageTemplate:j.a,paperSize:[794,1123],margin:{top:100,left:50,right:20,bottom:70}})}},{key:"formate",value:function(e,t){console.log("formate");for(var a=0;a<e;a++){var n=document.getElementById("page-"+a).clientHeight;n>t&&(document.getElementById("page-"+a).style.paddingBottom=t-n%t+"px")}return[]}},{key:"componentWillMount",value:function(){var e=this,t=JSON.parse(localStorage.getItem("user"));this.instance_id=t.instance_id,b.a.showPatients({instance_id:this.instance_id,pagination:1}).then((function(t){e.setState((function(t){var a=t.columns;return t.columns[21].hidden=!!e.instance_id,{columns:a}})),B=[],B=t.services,_=t.resources,(A=t.users.map((function(e){return e.name}))).push("Alle");var a=t.family_doctors,i=t.caremanagers,r=t.insurances,s=t.pharmacies;t.instances.length&&(P=t.instances[0]),V=[],t.instanceNames.map((function(e){V[e.id]=e.instanceName})),console.log("resinstanceName",V);var o=[];t.patients.forEach((function(e){o[e.id]=e.status})),e.setState((function(e){var c=t.patients,l=t.documents,u=t.folders;return Object(n.a)(Object(n.a)({},e),{},{data:c,documentsList:l,folders:u,family_doctorsList:a,insuranceList:r,pharmaciesList:s,caremanagersList:i,statusArray:o})}))}))}},{key:"render",value:function(){var e=this,t=this.instance_id?{onRowAdd:function(t){return new Promise((function(a){setTimeout((function(){if(a(),t.instance_id=e.instance_id,t.resources=JSON.stringify(e.state.selected),t.services=JSON.stringify(e.state.selectedservice),t.userGroup=JSON.stringify(e.state.selectedUsers),t.insurance=e.state.insurance,t.familyDoctor=e.state.familyDoctor,t.pharmacy=e.state.pharmacy,t.birthday=e.state.birthday,t.caremanager=e.state.caremanager,t.serviceplan=e.state.serviceplan,t.note=e.state.note,console.log("this.state.pharmacy && this.state.familyDoctor && newData.firstName && newData.lastName",e.state.pharmacy),t.pharmacy&&t.familyDoctor&&t.firstName&&t.lastName){var r=new FormData;r.append("file",t.picture),t.picture="",r.append("data",JSON.stringify(t)),b.a.addPatients(r).then((function(t){e.setState((function(e){var a=Object(i.a)(e.data);return a.push(t),Object(n.a)(Object(n.a)({},e),{},{data:Object(i.a)(a)})})),e.setState({selected:[],selectedservice:[],isEditServices:!0,isEditResources:!0,isEditServiceplan:!0,isEditPharmacy:!0,isEditUsers:!0,isEditfamilyDoctor:!0,isEditInsurance:!0,isEditCaremanager:!0,isEditNote:!0,insurance:"",familyDoctor:"",pharmacy:"",birthday:"",caremanager:"",selectedUsers:[]}),O.NotificationManager.success("Die Daten werden erfolgreich gespeichert.")})).catch((function(e){O.NotificationManager.error(e.message)}))}else O.NotificationManager.warning("Bitte f\xfcllen Sie die erforderlichen Felder aus.")}),600)}))},onRowUpdate:function(t,a){return new Promise((function(r){setTimeout((function(){r();var s=new FormData;"object"==typeof t.picture&&(s.append("file",t.picture),t.picture=""),t.resources=JSON.stringify(e.state.selected),t.services=JSON.stringify(e.state.selectedservice),t.userGroup=JSON.stringify(e.state.selectedUsers),e.state.insurance&&(t.insurance=e.state.insurance),e.state.familyDoctor&&(t.familyDoctor=e.state.familyDoctor),e.state.pharmacy&&(t.pharmacy=e.state.pharmacy),e.state.birthday&&(t.birthday=e.state.birthday),e.state.serviceplan&&(t.serviceplan=e.state.serviceplan),e.state.caremanager&&(t.caremanager=e.state.caremanager),t.note=e.state.note,s.append("data",JSON.stringify(t)),t.pharmacy&&t.familyDoctor&&t.firstName&&t.lastName?b.a.editPatients(s).then((function(t){if(a){e.setState((function(e){var r=Object(i.a)(e.data);return r[r.indexOf(a)]=t,Object(n.a)(Object(n.a)({},e),{},{data:r})}));e.setState({selected:[],selectedservice:[],isEditServices:!0,isEditResources:!0,isEditServiceplan:!0,isEditPharmacy:!0,isEditUsers:!0,isEditfamilyDoctor:!0,isEditInsurance:!0,isEditCaremanager:!0,isEditNote:!0,caremanager:"",insurance:"",familyDoctor:"",pharmacy:"",birthday:"",selectedUsers:[],serviceplan:!0})}O.NotificationManager.success("Die Daten werden erfolgreich gespeichert.")})).catch((function(e){O.NotificationManager.error(e.message)})):O.NotificationManager.warning("Bitte f\xfcllen Sie die erforderlichen Felder aus.")}),600)}))},onRowDelete:function(t){return new Promise((function(a){setTimeout((function(){a(),console.log(";oldData",t.id),b.a.deletePatients({id:t.id}).then((function(a){console.log("res",a),e.setState((function(e){var a=Object(i.a)(e.data);return a.splice(a.indexOf(t),1),Object(n.a)(Object(n.a)({},e),{},{data:a})})),O.NotificationManager.success("Die Daten werden erfolgreich gel\xf6scht.")}))}),600)}))}}:{onRowUpdate:function(t,a){return new Promise((function(r){setTimeout((function(){r();var s=new FormData;"object"==typeof t.picture&&(s.append("file",t.picture),t.picture=""),e.state.selected.length&&(t.resources=JSON.stringify(e.state.selected)),e.state.selectedservice.length&&(t.services=JSON.stringify(e.state.selectedservice)),e.state.selectedUsers.length&&(t.userGroup=JSON.stringify(e.state.selectedUsers)),e.state.insurance&&(t.insurance=e.state.insurance),e.state.familyDoctor&&(t.familyDoctor=e.state.familyDoctor),e.state.pharmacy&&(t.pharmacy=e.state.pharmacy),e.state.birthday&&(t.birthday=e.state.birthday),e.state.serviceplan&&(t.serviceplan=e.state.serviceplan),s.append("data",JSON.stringify(t)),t.pharmacy&&t.familyDoctor&&t.firstName&&t.lastName?b.a.editPatients(s).then((function(t){if(a){e.setState((function(e){var r=Object(i.a)(e.data);return r[r.indexOf(a)]=t,Object(n.a)(Object(n.a)({},e),{},{data:r})}));e.setState({selected:[],selectedservice:[],isEditServices:!0,isEditResources:!0,isEditServiceplan:!0,isEditUsers:!0,insurance:"",familyDoctor:"",pharmacy:"",birthday:"",selectedUsers:[],serviceplan:!0})}O.NotificationManager.success("Die Daten werden erfolgreich gespeichert.")})).catch((function(e){O.NotificationManager.error(e.message)})):O.NotificationManager.warning("Bitte f\xfcllen Sie die erforderlichen Felder aus.")}),600)}))},onRowDelete:function(t){return new Promise((function(a){setTimeout((function(){a(),console.log(";oldData",t.id),b.a.deletePatients({id:t.id}).then((function(a){console.log("res",a),e.setState((function(e){var a=Object(i.a)(e.data);return a.splice(a.indexOf(t),1),Object(n.a)(Object(n.a)({},e),{},{data:a})})),O.NotificationManager.success("Die Daten werden erfolgreich gel\xf6scht.")}))}),600)}))}};return u.a.createElement("div",{className:"tables-wrapper search-table-wrap patients"},u.a.createElement(S.f,{title:u.a.createElement(C.a,{id:"sidebar.patients"}),center:!0}),u.a.createElement(D.a,{maxWidth:"lg"},u.a.createElement(E.a,{px:{xs:"12px",lg:0},className:"page-space patient-container"},u.a.createElement(f.a,{title:u.a.createElement(C.a,{id:"sidebar.patients"}),columns:this.state.columns,data:this.state.data,localization:{header:{actions:"Funktionen"}},options:{actionRowIndex:-1,filtering:!0},editable:t,actions:this.instance_id?[{icon:"folder_outlined_icon",tooltip:"Download Care Folder",onClick:function(t,a){var n=JSON.parse(a.services);e.previewDocument(n,a)}}]:[]}))),u.a.createElement(w.a,{ref:this.preViewDialog,selectedDocumentList:this.state.downloadDocs}))}}]),l}(l.Component);t.default=U}}]);
//# sourceMappingURL=30.4643378a.chunk.js.map