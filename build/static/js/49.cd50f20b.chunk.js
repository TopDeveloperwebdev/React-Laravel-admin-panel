(this.webpackJsonphulk=this.webpackJsonphulk||[]).push([[49],{2033:function(e,t,n){"use strict";n.r(t);var a=n(413),i=n(7),c=n(14),s=n(15),o=n(17),r=n(16),d=n(0),l=n.n(d),u=n(1577),f=n.n(u),m=n(1537),b=n(61),h=n(236),g=n(18),p=n(29),O=function(e){Object(o.a)(n,e);var t=Object(r.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={columns:[{title:"ID",field:"id",editComponent:function(e){return l.a.createElement("div",null,e.id)}},{title:"Ingredients",field:"ingredients"}],data:[]},a}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=JSON.parse(localStorage.getItem("user_id"));this.instance_id=t.instance_id,console.log("res",this.instance_id),h.a.showIngredients({instance_id:this.instance_id,pagination:1}).then((function(t){e.setState((function(e){var n=t;return Object(i.a)(Object(i.a)({},e),{},{data:n})}))}))}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"tables-wrapper search-table-wrap"},l.a.createElement(g.f,{title:l.a.createElement(p.a,{id:"sidebar.Ingredients"}),center:!0}),l.a.createElement(m.a,{maxWidth:"lg"},l.a.createElement(b.a,{px:{xs:"12px",lg:0},className:"page-space"},l.a.createElement(f.a,{title:l.a.createElement(p.a,{id:"sidebar.Ingredients"}),columns:this.state.columns,data:this.state.data,editable:{onRowAdd:function(t){return new Promise((function(n){setTimeout((function(){n(),console.log("newData",t),t.instance_id=e.instance_id,h.a.addIngredients(t).then((function(t){console.log("res",t),e.setState((function(e){var n=Object(a.a)(e.data);return n.push(t),Object(i.a)(Object(i.a)({},e),{},{data:n})}))}))}),600)}))},onRowUpdate:function(t,n){return new Promise((function(c){setTimeout((function(){c(),console.log("newdata",t.id),h.a.editIngredients(t).then((function(c){n&&e.setState((function(e){var c=Object(a.a)(e.data);return c[c.indexOf(n)]=t,Object(i.a)(Object(i.a)({},e),{},{data:c})}))}))}),600)}))},onRowDelete:function(t){return new Promise((function(n){setTimeout((function(){n(),console.log(";oldData",t.id),h.a.deleteIngredients({id:t.id}).then((function(n){console.log("res",n),e.setState((function(e){var n=Object(a.a)(e.data);return n.splice(n.indexOf(t),1),Object(i.a)(Object(i.a)({},e),{},{data:n})}))}))}),600)}))}}}))))}}]),n}(d.Component);t.default=O}}]);
//# sourceMappingURL=49.cd50f20b.chunk.js.map