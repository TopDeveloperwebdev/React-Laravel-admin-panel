(this.webpackJsonphulk=this.webpackJsonphulk||[]).push([[53],{2027:function(e,t,a){"use strict";a.r(t);var n=a(415),c=a(7),s=a(14),i=a(15),o=a(17),r=a(16),u=a(0),l=a.n(u),d=a(1583),f=a.n(d),b=a(1537),h=a(61),m=a(199),p=a(19),O=a(29),j=function(e){Object(o.a)(a,e);var t=Object(r.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={columns:[{title:"Resources",field:"resources"}],data:[]},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=JSON.parse(localStorage.getItem("user_id"));this.instance_id=t.instance_id,console.log("res",this.instance_id),m.a.showResources({instance_id:this.instance_id,pagination:1}).then((function(t){e.setState((function(e){var a=t;return Object(c.a)(Object(c.a)({},e),{},{data:a})}))}))}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"tables-wrapper search-table-wrap"},l.a.createElement(p.f,{title:l.a.createElement(O.a,{id:"sidebar.Resources"}),center:!0}),l.a.createElement(b.a,{maxWidth:"lg"},l.a.createElement(h.a,{px:{xs:"12px",lg:0},className:"page-space"},l.a.createElement(f.a,{title:l.a.createElement(O.a,{id:"sidebar.Resources"}),columns:this.state.columns,data:this.state.data,editable:{onRowAdd:function(t){return new Promise((function(a){setTimeout((function(){a(),console.log("newData",t),t.instance_id=e.instance_id,m.a.addResources(t).then((function(t){console.log("res",t),e.setState((function(e){var a=Object(n.a)(e.data);return a.push(t),Object(c.a)(Object(c.a)({},e),{},{data:a})}))}))}),600)}))},onRowUpdate:function(t,a){return new Promise((function(s){setTimeout((function(){s(),console.log("newdata",t.id),m.a.editResources(t).then((function(s){a&&e.setState((function(e){var s=Object(n.a)(e.data);return s[s.indexOf(a)]=t,Object(c.a)(Object(c.a)({},e),{},{data:s})}))}))}),600)}))},onRowDelete:function(t){return new Promise((function(a){setTimeout((function(){a(),console.log(";oldData",t.id),m.a.deleteResources({id:t.id}).then((function(a){console.log("res",a),e.setState((function(e){var a=Object(n.a)(e.data);return a.splice(a.indexOf(t),1),Object(c.a)(Object(c.a)({},e),{},{data:a})}))}))}),600)}))}}}))))}}]),a}(u.Component);t.default=j}}]);
//# sourceMappingURL=53.6df0e12e.chunk.js.map