(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67c2119e"],{"158c":function(t,e,a){"use strict";var n=a("82e1"),o=a.n(n);o.a},"5d6d":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("HomeMenu"),a("v-container",{staticClass:"pa-0 white ",attrs:{fluid:"","fill-height":""}},[a("v-layout",{attrs:{column:""}},[a("div",{staticClass:"pa-0"},[a("v-row",{staticClass:"ma-0 ",staticStyle:{height:"300px"},attrs:{align:"center",justify:"center"}},[a("p",{staticClass:"display-2 black--text"},[t._v("게시판")])]),a("v-row",{staticClass:"ma-0",attrs:{justify:"center"}},[a("v-col",{staticClass:"pa-0 mb-10",attrs:{cols:"10"}},[a("v-tabs",{attrs:{color:"black","background-color":"transparent",height:"76","slider-size":"4",grow:""},model:{value:t.board,callback:function(e){t.board=e},expression:"board"}},[a("v-tab",{staticClass:"headline bottom-border",attrs:{href:"#NewsList"},on:{click:function(e){t.board="NewsList"}}},[t._v("뉴스")]),a("v-tab",{staticClass:"headline bottom-border",attrs:{href:"#NoticeList"},on:{click:function(e){t.board="NoticeList"}}},[t._v("공지사항")])],1)],1)],1)],1),a("div",{staticClass:"px-0"},[a("v-row",{staticClass:"pa-0 ma-0",attrs:{justify:"center"}},[a("v-col",{staticClass:"pa-0",attrs:{cols:"10"}},[a(t.board,{tag:"component"})],1)],1)],1)])],1)],1)},o=[],s=(a("7f7f"),a("e30d")),r={props:["name"],beforeMount:function(){console.log(this.$route.params.name)},data:function(){return{board:this.$route.params.name||"NewsList"}},components:{HomeMenu:s["a"],NewsList:function(){return a.e("chunk-7860d61b").then(a.bind(null,"69a7"))},NoticeList:function(){return a.e("chunk-28d9fd5f").then(a.bind(null,"e957"))}}},i=r,c=(a("158c"),a("2877")),l=a("6544"),u=a.n(l),d=a("7496"),f=a("62ad"),v=a("a523"),p=a("a722"),h=a("0fd9"),m=a("71a3"),b=a("fe57"),g=Object(c["a"])(i,n,o,!1,null,null,null);e["default"]=g.exports;u()(g,{VApp:d["a"],VCol:f["a"],VContainer:v["a"],VLayout:p["a"],VRow:h["a"],VTab:m["a"],VTabs:b["a"]})},7630:function(t,e,a){},"82e1":function(t,e,a){},"8f64":function(t,e,a){"use strict";var n=a("7630"),o=a.n(n);o.a},e30d:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{on:{click:function(e){return e.stopPropagation(),t.hideModal(e)}}},[a("header",[a("v-toolbar",{attrs:{height:"110px",flat:""}},[a("v-container",{attrs:{"mx-auto":"","py-0":""}},[a("v-layout",{attrs:{"align-center":""}},[a("v-icon",{attrs:{size:"50",icon:"",color:"#1564f9",id:"homeicon"},on:{click:t.home}},[t._v("apartment")]),t._v("  \r\n          "),a("router-link",{staticClass:"logo",attrs:{to:"/"}},[t._v("죽방")]),a("router-link",{staticClass:"offset-md-1 juk-menu",attrs:{to:"/map/apart"}},[t._v("아파트")]),a("router-link",{staticClass:"offset-md-1 juk-menu",attrs:{to:"/map/oneRoom"}},[t._v("원룸")]),a("router-link",{staticClass:"offset-md-1 juk-menu",attrs:{to:"/map/village"}},[t._v("투룸")]),a("v-spacer"),t.loginUser?t._e():a("v-btn",{attrs:{to:"/login/user"}},[t._v("로그인 / 회원가입")]),t.loginUser?t._e():a("v-btn",{attrs:{to:"/login/agent"}},[t._v("공인중개사 회원전용")]),"agent"===(t.loginUser||{}).type?a("v-btn",{attrs:{to:"/agentpage",color:"grey darken-3",outlined:"",tile:""}},[t._v("\r\n            중개사페이지\r\n          ")]):t._e(),t.loginUser?a("v-btn",{attrs:{color:"grey darken-3",outlined:"",tile:""},on:{click:t.logout}},[t._v("\r\n            로그아웃\r\n          ")]):t._e()],1)],1)],1)],1),a("modal",{directives:[{name:"show",rawName:"v-show",value:t.isModalVisible,expression:"isModalVisible"}],attrs:{id:"modal"},on:{close:t.closeModal}})],1)},o=[],s=(a("96cf"),a("3b8d")),r=a("bc3a"),i=a.n(r),c=a("6ae1"),l={beforeMount:function(){var t=this;Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i()({url:"".concat(t.serverLocation,"/check")});case 2:a=e.sent,t.loginUser=a.data.user;case 4:case"end":return e.stop()}}),e)})))()},data:function(){return{loginUser:void 0,modalVisibility:!1,isModalVisible:!1}},methods:{logout:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i()({url:"".concat(this.serverLocation,"/logout")});case 2:this.loginUser=void 0,this.$router.push("/");case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),showModal:function(){this.isModalVisible=!0},closeModal:function(){this.isModalVisible=!1},hideModal:function(t){t.target===document.querySelector("#modal")&&(this.isModalVisible=!1)},home:function(){this.$router.push("/")}},components:{modal:c["a"]}},u=l,d=(a("8f64"),a("2877")),f=a("6544"),v=a.n(f),p=a("8336"),h=a("a523"),m=a("132d"),b=a("a722"),g=a("2fa4"),k=a("71d9"),w=Object(d["a"])(u,n,o,!1,null,"35d21144",null);e["a"]=w.exports;v()(w,{VBtn:p["a"],VContainer:h["a"],VIcon:m["a"],VLayout:b["a"],VSpacer:g["a"],VToolbar:k["a"]})}}]);
//# sourceMappingURL=chunk-67c2119e.307e1f2d.js.map