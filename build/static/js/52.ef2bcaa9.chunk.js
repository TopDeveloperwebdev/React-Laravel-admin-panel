(this.webpackJsonphulk=this.webpackJsonphulk||[]).push([[52],{2024:function(e,t,a){"use strict";a.r(t);var n=a(415),i=a(7),r=a(14),o=a(15),c=a(17),s=a(16),l=a(0),d=a.n(l),u=a(1583),m=a.n(u),f=a(1555),p=a(1537),h=a(61),g=a(199),b=a(19),y=a(29),O=function(e){Object(c.a)(a,e);var t=Object(s.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={columns:[{title:"Pharmacy logo",field:"pharmacyLogo",render:function(e){return d.a.createElement("img",{src:e.pharmacyLogo?e.pharmacyLogo:n.defaultUrl,className:"logo-td bdr-rad-50"})},editComponent:function(e){return d.a.createElement("input",{type:"file",onChange:function(t){return e.onChange(t.target.files[0])}})}},{title:"Pharmacy name",field:"pharmacyName"},{title:"Street Nr",field:"streetNr"},{title:"zip code",field:"zipCode"},{title:"City",field:"city"},{title:"Phone",field:"phone",type:"string",required:!0},{title:"Fax",field:"fax"},{title:"Email",field:"email"},{title:"Password",field:"password",type:"string"},{title:"Notifications",field:"notifications",render:function(e){return d.a.createElement(f.a,{size:"small",color:"primary"})},editComponent:function(e){return d.a.createElement(f.a,{size:"small",color:"primary"})}}],selectedData:{logo:""},data:[]},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.defaultUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";var t=JSON.parse(localStorage.getItem("user_id"));this.instance_id=t.instance_id,g.a.showPharmacies({instance_id:this.instance_id,pagination:1}).then((function(t){console.log("res",t),e.setState((function(e){var a=t;return Object(i.a)(Object(i.a)({},e),{},{data:a})}))}))}},{key:"render",value:function(){var e=this;return d.a.createElement("div",{className:"tables-wrapper search-table-wrap"},d.a.createElement(b.f,{title:d.a.createElement(y.a,{id:"sidebar.familiy-directors"}),center:!0}),d.a.createElement(p.a,{maxWidth:"lg"},d.a.createElement(h.a,{px:{xs:"12px",lg:0},className:"page-space"},d.a.createElement(m.a,{title:d.a.createElement(y.a,{id:"sidebar.familiy-directors"}),columns:this.state.columns,data:this.state.data,editable:{onRowAdd:function(t){return new Promise((function(a){setTimeout((function(){a(),t.instance_id=e.instance_id;var r=new FormData;r.append("file",t.pharmacyLogo),t.pharmacyLogo="",r.append("data",JSON.stringify(t)),g.a.addPharmacies(r).then((function(t){console.log("res",t),e.setState((function(e){var a=Object(n.a)(e.data);return a.push(t),Object(i.a)(Object(i.a)({},e),{},{data:a})}))}))}),600)}))},onRowUpdate:function(t,a){return new Promise((function(r){setTimeout((function(){r();var o=new FormData;"object"==typeof t.pharmacyLogo&&(o.append("file",t.pharmacyLogo),t.pharmacyLogo=""),o.append("data",JSON.stringify(t)),console.log("newData",t),g.a.editPharmacies(o).then((function(t){a&&e.setState((function(e){var r=Object(n.a)(e.data);return r[r.indexOf(a)]=t,Object(i.a)(Object(i.a)({},e),{},{data:r})}))}))}),600)}))},onRowDelete:function(t){return new Promise((function(a){setTimeout((function(){a(),console.log(";oldData",t.id),g.a.deletePharmacies({id:t.id}).then((function(a){console.log("res",a),e.setState((function(e){var a=Object(n.a)(e.data);return a.splice(a.indexOf(t),1),Object(i.a)(Object(i.a)({},e),{},{data:a})}))}))}),600)}))}}}))))}}]),a}(l.Component);t.default=O}}]);
//# sourceMappingURL=52.ef2bcaa9.chunk.js.map