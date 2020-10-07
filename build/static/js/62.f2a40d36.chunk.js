(this.webpackJsonphulk=this.webpackJsonphulk||[]).push([[62],{2361:function(e,t,a){"use strict";a.r(t);var n=a(7),i=a(28),r=a(194),o=a(15),l=a(16),d=a(18),c=a(17),s=a(0),u=a.n(s),m=a(1579),f=a.n(m),p=a(788),h=a(1514),v=a(407),g=a(1541),b=a(61),O=a(237),E=a(11),y=a(30),C=a(1627),w=a(19),N={YES:"YES",NO:"NO"},S=function(e){Object(d.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).onChange=function(e){n.setState({selectedMedications:Object(r.a)(e.target.value)})},n.handleChangePatients=function(e){var t=e.target.value,a=n.state.patients.filter((function(e){return e.id==t})),i=a[0].pharmacy,r=a[0].familyDoctor;n.setState({patient:e.target.value,pharmacy:i,doctor:r})},n.handleChangeNote=function(e){n.setState({note:e.target.value})},n.handleChangeDate=function(e){n.setState({date:e.target.value})},n.state={columns:[{title:"Order ID",field:"orderId",render:function(e){return u.a.createElement("div",null,u.a.createElement(w.b,{to:"/order-detail/".concat(e.orderId),target:"_blank"},e.orderId))},editComponent:function(e){return u.a.createElement("div",null,e.id)}},{title:"Medications",field:"orderMedications",render:function(e){var t=JSON.parse(e.orderMedications);return u.a.createElement("div",null,t.map((function(e,t){return u.a.createElement("div",{key:t},e)})))},editComponent:function(e){if(e.rowData.id){console.log("rowData",e);var t=JSON.parse(e.rowData.orderMedications);t||(t=[]),n.state.isEditMedications&&n.setState({selectedMedications:t,isEditMedications:!1})}return u.a.createElement(C.b,{data:n.state.medications,onChange:n.onChange,value:n.state.selectedMedications})}},{title:"Patient",field:"patient",render:function(e){var t=n.state.patients.filter((function(t){return t.id==e.patient}));return u.a.createElement("div",null,t[0].firstName," ",t[0].lastName)},editComponent:function(e){return u.a.createElement(p.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",className:"full-width",value:n.state.patient,onChange:n.handleChangePatients},n.state.patients.map((function(e,t){return u.a.createElement(h.a,{key:t,value:e.id},e.firstName)})))}},{title:"Pharmacy",field:"pharmacy",render:function(e){return u.a.createElement("div",null,e.pharmacy)},editComponent:function(e){return u.a.createElement(v.a,{id:"pharmacy",style:{marginBottom:8},placeholder:"pharmacy",value:n.state.pharmacy,InputProps:{readOnly:!0}})}},{title:"Family Doctor",field:"doctor",render:function(e){return u.a.createElement("div",null,e.doctor)},editComponent:function(e){return u.a.createElement(v.a,{id:"doctor",style:{marginBottom:8},placeholder:"doctor",value:n.state.doctor,InputProps:{readOnly:!0}})}},{title:"Due Date",field:"date",render:function(e){return u.a.createElement("div",null,n.formate_date(e.date))},editComponent:function(e){var t=Date.now();return console.log("now",t),u.a.createElement(v.a,{className:"full-width",id:"datetime-local",type:"date",defaultValue:t,InputLabelProps:{shrink:!0},value:n.state.date,onChange:n.handleChangeDate})}},{title:"Note",field:"note",render:function(e){return u.a.createElement("div",null,e.note)},editComponent:function(e){return u.a.createElement(v.a,{className:"full-width",id:"outlined-multiline-static",label:"Add Note",multiline:!0,rows:4,defaultValue:"Default Value",variant:"outlined",value:n.state.note,onChange:n.handleChangeNote})}},{title:"Delivered",field:"status",lookup:N}],pharmacy:"",patient:"",doctor:"",note:"",data:[],selectedMedications:[],medications:[],isEditMedications:!0,patients:[]},n}return Object(l.a)(a,[{key:"formate_date",value:function(e){var t;e&&(t=(t=e.split(" ")[0].split("-"))[2]+"."+t[1]+"."+t[0]);return t}},{key:"componentWillMount",value:function(){var e=this;this.defaultUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";var t=JSON.parse(localStorage.getItem("user"));this.instance_id=t.instance_id,this.user_id=t.id,console.log("res-1",this.user_id),O.a.showOrders({instance_id:this.instance_id,pagination:1}).then((function(t){var a,n=t.medications.map((function(e){return e.medicationName})),r=t.patients;console.log("res",t.orders),e.setState((a={medications:n},Object(i.a)(a,"medications",n),Object(i.a)(a,"data",t.orders),Object(i.a)(a,"patients",r),a))}))}},{key:"render",value:function(){var e=this,t=this.instance_id?{onRowAdd:function(t){return new Promise((function(a){a(),t.user_id=e.instance_id,t.orderMedications=JSON.stringify(e.state.selectedMedications),t.patient=e.state.patient,t.date=e.state.date,t.note=e.state.note,t.pharmacy=e.state.pharmacy,t.doctor=e.state.doctor,e.state.selectedMedications.length&&t.patient&&t.note&&t.date&&t.pharmacy&&t.doctor?O.a.addOrders(t).then((function(t){console.log("res",t),e.setState((function(e){var a=Object(r.a)(e.data);a.push(t);return Object(n.a)(Object(n.a)({},e),{},{data:a,selectedMedications:[],isEditMedications:!0})}))})):alert("Bitte f\xfcllen Sie die erforderlichen Felder aus.")}))},onRowDelete:function(t){return new Promise((function(a){setTimeout((function(){a(),console.log(";oldData",t.id),O.a.deleteOrders({id:t.id}).then((function(a){console.log("res",a),e.setState((function(e){var a=Object(r.a)(e.data);return a.splice(a.indexOf(t),1),Object(n.a)(Object(n.a)({},e),{},{data:a})}))}))}),600)}))}}:{onRowDelete:function(t){return new Promise((function(a){setTimeout((function(){a(),console.log(";oldData",t.id),O.a.deleteOrders({id:t.id}).then((function(a){console.log("res",a),e.setState((function(e){var a=Object(r.a)(e.data);return a.splice(a.indexOf(t),1),Object(n.a)(Object(n.a)({},e),{},{data:a})}))}))}),600)}))}};return u.a.createElement("div",{className:"tables-wrapper search-table-wrap order-page"},u.a.createElement(E.f,{title:u.a.createElement(y.a,{id:"sidebar.order"}),center:!0}),u.a.createElement(g.a,{maxWidth:"lg"},u.a.createElement(b.a,{px:{xs:"12px",lg:0},className:"page-space"},u.a.createElement(f.a,{title:u.a.createElement(y.a,{id:"sidebar.order"}),columns:this.state.columns,data:this.state.data,editable:t}))))}}]),a}(s.Component);t.default=S}}]);
//# sourceMappingURL=62.f2a40d36.chunk.js.map