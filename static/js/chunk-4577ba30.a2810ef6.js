(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4577ba30"],{2905:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{staticClass:"fill-height container",attrs:{fluid:""},on:{click:function(e){return e.stopPropagation(),t.close(e)}}},[s("v-card",{staticClass:"juk-chattingflame",attrs:{width:"400",height:"700"}},[s("v-system-bar",{attrs:{color:"indigo darken-2",dark:""}},[s("v-spacer"),s("v-icon",[t._v("mdi-window-minimize")]),s("v-icon",[t._v("mdi-window-maximize")]),s("v-icon",[t._v("mdi-close")])],1),s("v-toolbar",{attrs:{color:"indigo",dark:""}},[s("v-toolbar-title",[t._v("채팅방")])],1),s("v-content",{staticClass:"messagecont",attrs:{id:"chatMsgContainer"}},t._l(t.msgList,(function(e){return s("v-row",{key:e.seq},[s("v-col",{class:{msgCol:!0,isMe:t.isMe(e)}},[s("div",{class:{"juk-msg":!0,isMe:t.isMe(e)}},[t._v("\n                "+t._s(e.msg)+"\n              ")]),s("div",{staticClass:"juk-msgsub"},[t._v("\n                "+t._s(t._f("regdate")(e.sent))+"\n              ")])])],1)})),1),s("v-footer",{staticClass:"ma-0 pa-0 px-4",attrs:{absolute:""}},[s("v-col",{staticClass:"ma-0 pa-0",attrs:{cols:"12"}},[s("v-text-field",{attrs:{type:"text",label:"입력하세요"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:t.sendMessage(e)}},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}})],1)],1)],1)],1)},a=[],r=s("7618"),i=(s("96cf"),s("3b8d")),o=(s("55dd"),{props:["agentid"],data:function(){return{message:"",loaded:!1}},computed:{msgList:function(){return this.$store.state.chatMsgList.slice(0).sort((function(t,e){return t.sent-e.sent}))}},watch:{msgList:function(t){setTimeout((function(){chatMsgContainer.scrollTo({top:chatMsgContainer.scrollHeight})}),10)}},filters:{regdate:function(t){var e=new Date(t);return"".concat(e.getHours(),":").concat(e.getMinutes())}},methods:{isMe:function(t){return t.me===t.writer},sendMessage:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var s,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("Enter"===e.code&&this.message.trim()){t.next=2;break}return t.abrupt("return");case 2:return s=this.message,this.message="",t.next=6,axios({url:"".concat(this.serverLocation,"/chat/room/").concat(this.agentid),method:"POST",data:{msg:s}});case 6:if(n=t.sent,"object"!==Object(r["a"])(n.data)){t.next=13;break}return a=n.data.seq,t.next=11,axios.patch("".concat(this.state.serverLocation,"/chat/msg/").concat(a));case 11:return t.next=13,this.$store.dispatch("refreshChatList");case 13:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),close:function(t){t.target.classList.contains("container")&&this.$store.dispatch("chatClose")},getPreviousMsg:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,axios({url:"".concat(this.serverLocation,"/chat/room/").concat(e),method:"GET"});case 2:t.sent;case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),leaveRoom:function(t){this.loaded=!1,this.messageList=[],this.visible=!1}}}),c=o,u=(s("ef76"),s("2877")),l=s("6544"),h=s.n(l),d=s("b0af"),f=s("62ad"),g=s("a523"),m=s("a75b"),p=s("553a"),b=s("132d"),v=s("0fd9"),w=s("2fa4"),y=s("afd9"),O=s("8654"),j=s("71d9"),k=s("2a7f"),x=Object(u["a"])(c,n,a,!1,null,"c5126712",null);e["default"]=x.exports;h()(x,{VCard:d["a"],VCol:f["a"],VContainer:g["a"],VContent:m["a"],VFooter:p["a"],VIcon:b["a"],VRow:v["a"],VSpacer:w["a"],VSystemBar:y["a"],VTextField:O["a"],VToolbar:j["a"],VToolbarTitle:k["a"]})},"2a7f":function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));var n=s("71d9"),a=s("80d2"),r=Object(a["h"])("v-toolbar__title"),i=Object(a["h"])("v-toolbar__items");n["a"]},"430e":function(t,e,s){},8308:function(t,e,s){},afd9:function(t,e,s){"use strict";s("8e6e"),s("ac6a"),s("456d"),s("d263");var n=s("bd86"),a=(s("c5f6"),s("8308"),s("3a66")),r=s("a9ad"),i=s("7560"),o=s("58df"),c=s("80d2");function u(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,n)}return s}function l(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?u(s,!0).forEach((function(e){Object(n["a"])(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):u(s).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}e["a"]=Object(o["a"])(Object(a["a"])("bar",["height","window"]),r["a"],i["a"]).extend({name:"v-system-bar",props:{height:[Number,String],lightsOut:Boolean,window:Boolean},computed:{classes:function(){return l({"v-system-bar--lights-out":this.lightsOut,"v-system-bar--absolute":this.absolute,"v-system-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-system-bar--window":this.window},this.themeClasses)},computedHeight:function(){return this.height?isNaN(parseInt(this.height))?this.height:parseInt(this.height):this.window?32:24},styles:function(){return{height:Object(c["e"])(this.computedHeight)}}},methods:{updateApplication:function(){return this.$el?this.$el.clientHeight:this.computedHeight}},render:function(t){var e={staticClass:"v-system-bar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),Object(c["o"])(this))}})},ef76:function(t,e,s){"use strict";var n=s("430e"),a=s.n(n);a.a}}]);
//# sourceMappingURL=chunk-4577ba30.a2810ef6.js.map