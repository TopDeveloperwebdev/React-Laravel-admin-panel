(this.webpackJsonphulk=this.webpackJsonphulk||[]).push([[2],{1626:function(e,a,t){"use strict";var n=t(34),l=t(7),c=t(14),r=t(15),i=t(17),o=t(16),m=t(84),s=t(0),u=t.n(s),d=(t(245),t(1543)),p=t(60),E=t(227),f=t(761),h=t(403),v=t(1677),b=t.n(v),g=t(521),C=t(1678),x=function(e){e.inputRef;var a=Object(m.a)(e,["inputRef"]);return u.a.createElement(b.a,Object.assign({},a,{mask:[/\d/,/\d/,/\d/,/\d/]}))},N=function(e){e.inputRef;var a=Object(m.a)(e,["inputRef"]);return u.a.createElement(b.a,Object.assign({},a,{mask:[/\d/,/\d/,"/",/\d/,/\d/]}))},y=function(e){e.inputRef;var a=Object(m.a)(e,["inputRef"]);return u.a.createElement(b.a,Object.assign({},a,{mask:[/\d/,/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/]}))},k=function(e){Object(i.a)(t,e);var a=Object(o.a)(t);function t(){var e;Object(c.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=a.call.apply(a,[this].concat(l))).state={value:0,selected:"a",age:"",creditCardInfo:{number:"",holderName:"",expiryDate:"",focused:""}},e}return Object(r.a)(t,[{key:"onCreditCardValueChange",value:function(e,a){this.setState({creditCardInfo:Object(l.a)(Object(l.a)({},this.state.creditCardInfo),{},Object(n.a)({},e,a.target.value))})}},{key:"onFocusTextFields",value:function(e){this.setState({creditCardInfo:Object(l.a)(Object(l.a)({},this.state.creditCardInfo),{},{focused:e})})}},{key:"render",value:function(){var e=this,a=this.state.creditCardInfo,t=this.props.validatePayment;return console.log(window.location.pathname),u.a.createElement("div",null,u.a.createElement("div",{className:""},u.a.createElement(d.a,{container:!0,spacing:0},u.a.createElement(d.a,{item:!0,xs:12,sm:12,md:6,lg:6},u.a.createElement("form",{noValidate:!0,autoComplete:"off",className:"my-20"},u.a.createElement(d.a,{container:!0,spacing:2},u.a.createElement(d.a,{item:!0,xs:12,sm:12,md:6,lg:6},u.a.createElement(h.a,{fullWidth:!0},u.a.createElement(f.a,{shrink:!0},"Card Number"),u.a.createElement(g.a,{placeholder:"0123 4567 8912 3456",value:a.number,onChange:function(a){return e.onCreditCardValueChange("number",a)},onFocus:function(){return e.onFocusTextFields("number")},inputComponent:y}))),u.a.createElement(d.a,{item:!0,xs:12,sm:12,md:6,lg:6},u.a.createElement(h.a,{fullWidth:!0},u.a.createElement(f.a,{shrink:!0},"Name On Card"),u.a.createElement(g.a,{value:a.holderName,onChange:function(a){return e.onCreditCardValueChange("holderName",a)},onFocus:function(){return e.onFocusTextFields("name")},placeholder:"John Doe"}))),u.a.createElement(d.a,{item:!0,xs:12,sm:12,md:6,lg:6},u.a.createElement(h.a,{fullWidth:!0},u.a.createElement(f.a,{shrink:!0},"Expiry Date"),u.a.createElement(g.a,{value:a.expiryDate,onChange:function(a){return e.onCreditCardValueChange("expiryDate",a)},onFocus:function(){return e.onFocusTextFields("expiry")},placeholder:"MM YYYY",inputComponent:N}))),u.a.createElement(d.a,{item:!0,xs:12,sm:12,md:6,lg:6},u.a.createElement(h.a,{fullWidth:!0},u.a.createElement(f.a,{shrink:!0},"CVC"),u.a.createElement(g.a,{value:a.cvc?a.cvc:"",onChange:function(a){return e.onCreditCardValueChange("cvc",a)},onFocus:function(){return e.onFocusTextFields("cvc")},placeholder:"XXX",inputComponent:x})))),u.a.createElement(p.a,{my:3},"/app/pages/pricing/pricing-upgrade"==window.location.pathname||"/app/pages/stepper/vertical-stepper"==window.location.pathname?u.a.createElement(E.a,{variant:"contained",color:"primary",className:"button btn-active mr-20",onClick:t},"submit"):u.a.createElement(p.a,{display:"flex",alignItems:"center"},u.a.createElement(p.a,{mx:2},u.a.createElement(E.a,{variant:"contained",color:"default",className:"button",onClick:this.props.onChangeInfo},"Back")),u.a.createElement(E.a,{variant:"contained",color:"primary",className:"button btn-active mr-20"},"submit"))))),u.a.createElement(d.a,{item:!0,xs:12,sm:12,md:6,lg:6},u.a.createElement("div",null,u.a.createElement(C.a,{number:a.number,name:a.holderName,expiry:a.expiryDate,cvc:a.cvc?a.cvc:"",focused:a.focused}))))))}}]),t}(u.a.Component);a.a=k},2021:function(e,a,t){"use strict";t.r(a);var n=t(34),l=t(7),c=t(64),r=t(0),i=t.n(r),o=t(519),m=t(1543),s=t(60),u=t(228),d=t(1554),p=t(1551),E=t(1552),f=t(116),h=t(1553),v=t(522),b=t(759),g=t(1559),C=t(782),x=t(227),N=t(1481),y=t(1484),k=t(1483),j=t(2),O=t(1626),q=t(129),w=t(29),F=Object(o.a)((function(e){return{root:{width:"100%"},actionsContainer:{marginBottom:e.spacing(2)},resetContainer:{padding:e.spacing(3)},activeBtn:{marginTop:e.spacing(1)}}}));a.default=function(e){var a=Object(q.g)(),r=F(),o=i.a.useState(0),B=Object(c.a)(o,2),D=B[0],I=B[1],P=i.a.useState({selectedPlan:"plan1"}),S=Object(c.a)(P,2),Y=S[0],T=S[1],V=i.a.useState({checkedB:!0,checkedA:!0}),A=Object(c.a)(V,2),R=A[0],U=A[1],W=i.a.useState(!1),L=Object(c.a)(W,2),J=L[0],X=L[1],$=["Choose Your Plan","Add Your Debit Credit Card","Terms & Conditions"],_=i.a.useState(!1),z=Object(c.a)(_,2),M=z[0],G=z[1],H=function(){a.goBack(),G(!1)},K=function(){I((function(e){return e+1}))},Q=function(){I((function(e){return e-1}))},Z=function(e){return function(a){U(Object(l.a)(Object(l.a)({},R),{},Object(n.a)({},e,a.target.checked)))}};return i.a.createElement("div",{className:"pricing-update"},i.a.createElement("div",{className:r.root},i.a.createElement(m.a,{container:!0,direction:"row"},i.a.createElement(m.a,{item:!0,xs:12,sm:12},i.a.createElement(m.a,{container:!0,direction:"row"},i.a.createElement(m.a,{item:!0,xs:12,sm:10,className:"up-main-col"},i.a.createElement(s.a,{py:7},i.a.createElement(s.a,{display:"flex",alignItems:"center"},i.a.createElement(u.a,{"aria-label":"close",onClick:function(){a.goBack()}},i.a.createElement(s.a,{color:"text.primary",className:"fas fa-times"})),i.a.createElement(s.a,{pl:1,fontSize:"h5.fontSize",fontWeight:"h5.fontWeight"},i.a.createElement(w.a,{id:"component.upgradeYourPlanNow"}))),i.a.createElement(s.a,{pl:1,className:"vertical-stepper-wrap"},i.a.createElement(d.a,{activeStep:D,orientation:"vertical"},i.a.createElement(p.a,null,i.a.createElement(E.a,null,i.a.createElement(s.a,{my:2},i.a.createElement(f.a,{variant:"h6"},i.a.createElement(w.a,{id:"component.chooseYourPlan"})))),i.a.createElement(h.a,{className:"stepper-content"},i.a.createElement(s.a,{mb:2},i.a.createElement(s.a,{mb:1},i.a.createElement(v.a,{"aria-label":"gender",className:"group-pack",name:"gender1",value:Y,onChange:function(e){T(Object(l.a)(Object(l.a)({},Y),{},{selectedPlan:e.target.value}))}},i.a.createElement("div",{className:Object(j.a)("extra-cap pack-1",Object(n.a)({},r.activeBtn,"plan1"===Y.selectedPlan))},i.a.createElement(b.a,{value:"plan1",control:i.a.createElement(g.a,null)}),i.a.createElement(s.a,{className:"pack-content"},i.a.createElement(s.a,{display:"flex",justifyContent:"space-between",alignItems:"center"},i.a.createElement(s.a,null,i.a.createElement(s.a,null,i.a.createElement(f.a,{variant:"h5"},"Silver")),i.a.createElement(s.a,null,i.a.createElement(f.a,null,"$55/per month"))),i.a.createElement(s.a,null,i.a.createElement("i",{className:"material-icons"},"verified_user"))))),i.a.createElement("div",{className:Object(j.a)("extra-cap pack-2",Object(n.a)({},r.activeBtn,"plan2"===Y.selectedPlan))},i.a.createElement(b.a,{value:"plan2",control:i.a.createElement(g.a,null)}),i.a.createElement(s.a,{className:"pack-content"},i.a.createElement(s.a,{display:"flex",justifyContent:"space-between",alignItems:"center"},i.a.createElement(s.a,null,i.a.createElement(s.a,null,i.a.createElement(f.a,{variant:"h5"},"Platinum")),i.a.createElement(s.a,null,i.a.createElement(f.a,null,"$125/per month"))),i.a.createElement(s.a,null,i.a.createElement("i",{className:"material-icons"},"verified_user"))))),i.a.createElement("div",{className:Object(j.a)("extra-cap pack-3",Object(n.a)({},r.activeBtn,"plan3"===Y.selectedPlan))},i.a.createElement(b.a,{value:"plan3",control:i.a.createElement(g.a,null)}),i.a.createElement(s.a,{className:"pack-content"},i.a.createElement(s.a,{display:"flex",justifyContent:"space-between",alignItems:"center"},i.a.createElement(s.a,null,i.a.createElement(s.a,null,i.a.createElement(f.a,{variant:"h5"},"Gold")),i.a.createElement(s.a,null,i.a.createElement(f.a,null,"$256/per month"))),i.a.createElement(s.a,null,i.a.createElement("i",{className:"material-icons"},"verified_user"))))))),i.a.createElement(b.a,{className:"lg-label",control:i.a.createElement(C.a,{checked:R.checkedB,onChange:Z("checkedB"),value:"checkedB",color:"primary"}),label:"Try for 14 trial day first."})),i.a.createElement("div",{className:r.actionsContainer},i.a.createElement("div",null,i.a.createElement(x.a,{variant:"contained",color:"primary",onClick:K,className:r.button},D===$.length-1?"Finish":"Next"))))),i.a.createElement(p.a,null,i.a.createElement(E.a,null,i.a.createElement(s.a,{my:1},i.a.createElement(f.a,{variant:"h6"},i.a.createElement(w.a,{id:"component.addYourDebitCreditCard"})))),i.a.createElement(h.a,{className:"stepper-content"},i.a.createElement(O.a,{validatePayment:function(){X(!0)}}),i.a.createElement("div",{className:r.actionsContainer},i.a.createElement("div",{className:"eq-space"},i.a.createElement(x.a,{disabled:0===D,onClick:Q,className:r.button,variant:"contained"},"Back"),J&&i.a.createElement(x.a,{variant:"contained",color:"primary",onClick:K,className:r.button},D===$.length-1?"Finish":"Next"))))),i.a.createElement(p.a,null,i.a.createElement(E.a,null,i.a.createElement(s.a,{my:1},i.a.createElement(f.a,{variant:"h6"},i.a.createElement(w.a,{id:"component.termsandconditions"})))),i.a.createElement(h.a,{className:"stepper-content"},i.a.createElement(s.a,{className:"bg-scroller"},i.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),i.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),i.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),i.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),i.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")),i.a.createElement(b.a,{control:i.a.createElement(C.a,{checked:R.checkedA,onChange:Z("checkedA"),value:"checkedA",color:"primary"}),label:"I accept the above stated terms and conditions."}),i.a.createElement("div",{className:r.actionsContainer},i.a.createElement(s.a,{my:2,className:"eq-space"},i.a.createElement(x.a,{variant:"contained",color:"primary",disabled:0===D,onClick:Q,className:r.button},"Back"),i.a.createElement(x.a,{variant:"contained",color:"primary",onClick:function(){I((function(e){return e+1})),G(!0)},className:r.button},"Finish"))))))))),i.a.createElement(m.a,{item:!0,xs:12,sm:2,className:"md-hide"},i.a.createElement(s.a,{className:"update-img-wrap"},i.a.createElement("img",{src:t(771),alt:"site logo",width:"474",height:"559",className:"update-img-thumb"})),i.a.createElement(m.a,{container:!0,spacing:3,direction:"row"},i.a.createElement(m.a,{item:!0,xs:12,sm:12},i.a.createElement(s.a,{bgcolor:"primary.main",className:"sideline"})))))))),i.a.createElement(N.a,{open:M,onClose:H,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},i.a.createElement(y.a,{className:"plan-dialog-content"},i.a.createElement(s.a,null,i.a.createElement(s.a,{display:"flex",justifyContent:"center",mb:1},i.a.createElement("i",{className:"material-icons"},"done")),i.a.createElement(f.a,{variant:"h3"},"Congratulations !"),i.a.createElement(f.a,null,"Your Plan Has Been Upgraded."))),i.a.createElement(k.a,null,i.a.createElement(s.a,{mb:"12px",display:"flex",justifyContent:"center",width:"100%"},i.a.createElement(x.a,{variant:"contained",onClick:H,color:"primary",autoFocus:!0},"OK")))))}}}]);
//# sourceMappingURL=2.a5d2103f.chunk.js.map