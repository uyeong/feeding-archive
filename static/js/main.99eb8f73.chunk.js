(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{175:function(e,t,a){e.exports=a(377)},376:function(e,t,a){},377:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),i=a(32),o=a.n(i),s=a(174),u=a(50),l=a(51),p=a(54),m=a(52),d=a(55),f=a(53),g=a(126),h=a(41),b=a(163),v=a.n(b),E=a(20),w=a.n(E),O=a(40),j={fetch:function(){return new Promise(function(e){var t=o.a.auth().onAuthStateChanged(function(a){e(a),t()})})},login:function(){var e=Object(O.a)(w.a.mark(function e(t,a){return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.auth().setPersistence(o.a.auth.Auth.Persistence.LOCAL);case 2:return e.next=4,o.a.auth().signInWithEmailAndPassword(t,a);case 4:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),logout:function(){return o.a.auth().signOut()}},y=a(164),k="PREPARED",_="LOGIN_START",x="LOGIN_SUCCESS",S="LOGIN_FAIL",N=new y.Dispatcher,L={prepare:function(){var e=Object(O.a)(w.a.mark(function e(){var t;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.fetch();case 2:t=e.sent,N.dispatch({type:k,user:t});case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),login:function(){var e=Object(O.a)(w.a.mark(function e(t,a){var n;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return N.dispatch({type:_}),e.prev=1,e.next=4,j.login(t,a);case 4:return e.next=6,j.fetch();case 6:n=e.sent,N.dispatch({type:x,user:n}),e.next=14;break;case 10:throw e.prev=10,e.t0=e.catch(1),N.dispatch({type:S}),e.t0;case 14:case"end":return e.stop()}},e,null,[[1,10]])}));return function(t,a){return e.apply(this,arguments)}}()},I=a(165),A=new(function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(m.a)(t).call(this,N))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"getInitialState",value:function(){return{user:void 0,processing:{login:!1}}}},{key:"reduce",value:function(e,t){return Object(I.a)(e,function(e){switch(t.type){case k:case x:e.user=t.user,e.processing.login=!1;break;case _:e.processing.login=!0;break;case S:e.processing.login=!1}})}}]),t}(f.ReduceStore)),C=a(87),P=a.n(C),D=function(){return r.a.createElement("section",{className:P.a.wrapper},r.a.createElement("div",{className:P.a.dimmed}),r.a.createElement("div",{className:P.a.loader}),r.a.createElement("span",{className:"blind"},"\uc900\ube44\uc911"))},R=function(){return r.a.createElement("div",null,"Home")},z=a(42),F=a(173),H=a(59),T=a.n(H),B=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).onClickSubmit=function(e){e.preventDefault(),a.props.form.validateFields(function(){var e=Object(O.a)(w.a.mark(function e(t,a){var n,r;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=a.email,r=a.password,t){e.next=10;break}return e.prev=2,e.next=5,L.login(n,r);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),z.d.info("\ub85c\uadf8\uc778\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",2);case 10:case"end":return e.stop()}},e,null,[[2,7]])}));return function(t,a){return e.apply(this,arguments)}}())},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e,t=this.props.form,a=t.getFieldProps,n=t.getFieldError,c=(this.props.location.state||{from:{pathname:"/"}}).from,i=this.state,o=i.user,s=i.processing;return r.a.createElement("section",{className:T.a.wrapper},o?r.a.createElement(h.a,{to:c}):r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",{className:T.a.title},"\uc11c\ube44\uc2a4 \uc774\uc6a9\uc744 \uc704\ud574\uc11c",r.a.createElement("br",null),"\ub85c\uadf8\uc778\ud574\uc8fc\uc138\uc694."),r.a.createElement(z.c,{renderHeader:"\uc774\uba54\uc77c"},r.a.createElement(z.b,Object.assign({name:"email",type:"email",clear:!0,disabled:s.login},a("email",{rules:[{required:!0,message:"\uc774\uba54\uc77c\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694."},{type:"email",message:"\uc720\ud6a8\ud55c \uc774\uba54\uc77c\uc774 \uc544\ub2d9\ub2c8\ub2e4."}]}))),r.a.createElement("p",{className:T.a.error},(e=n("email"))?e.join(","):null)),r.a.createElement(z.c,{renderHeader:"\ube44\ubc00\ubc88\ud638"},r.a.createElement(z.b,Object.assign({name:"password",type:"password",clear:!0,disabled:s.login},a("password",{rules:[{required:!0,message:"\ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694."},{min:8,message:"8\uc790 \uc774\uc0c1 \uc785\ub825\ud574\uc8fc\uc138\uc694."}]}))),r.a.createElement("p",{className:T.a.error},(e=n("password"))?e.join(","):null)),r.a.createElement(z.a,{className:T.a.submit,type:"primary",size:"large",disabled:s.login,loading:s.login,onClick:this.onClickSubmit},"\ub85c\uadf8\uc778")))}}],[{key:"getStores",value:function(){return[A]}},{key:"calculateState",value:function(){return A.getState()}}]),t}(n.Component),G=Object(F.a)()(f.Container.create(B)),U=function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){L.prepare()}},{key:"render",value:function(){var e=this.state.user;return r.a.createElement("article",null,r.a.createElement(v.a,{transitionName:"preparing",transitionEnterTimeout:0,transitionLeaveTimeout:800},void 0===e?r.a.createElement(D,null):null),void 0!==e&&r.a.createElement(g.a,null,r.a.createElement(h.b,{path:"/login",component:G}),r.a.createElement(X,{path:"/",exact:!0,component:R,authenticated:!!e})))}}],[{key:"getStores",value:function(){return[A]}},{key:"calculateState",value:function(){return A.getState()}}]),t}(n.Component);function X(e){var t=e.component,a=e.authenticated,n=Object(s.a)(e,["component","authenticated"]);return r.a.createElement(h.b,Object.assign({},n,{render:function(e){return a?r.a.createElement(t,e):r.a.createElement(h.a,{to:{pathname:"/login",state:{from:e.location}}})}}))}var q=f.Container.create(U);a(374),a(376);o.a.initializeApp({apiKey:"AIzaSyDdeg2ga2gD508X3kzAxtZROIXc-bX-mL4",authDomain:"feeding-archive.firebaseapp.com",databaseURL:"https://feeding-archive.firebaseio.com",projectId:"feeding-archive",storageBucket:"feeding-archive.appspot.com",messagingSenderId:"217801729531"}),Object(c.render)(r.a.createElement(q,null),document.getElementById("root"))},59:function(e,t,a){e.exports={wrapper:"Login_wrapper__1sk6n",title:"Login_title__2HzUd",error:"Login_error__2M646",submit:"Login_submit__2ZwD2"}},87:function(e,t,a){e.exports={wrapper:"Preparing_wrapper__1mSHY",dimmed:"Preparing_dimmed__QIBRQ",loader:"Preparing_loader__1NukE","bong-bong":"Preparing_bong-bong__25t4x"}}},[[175,1,2]]]);
//# sourceMappingURL=main.99eb8f73.chunk.js.map