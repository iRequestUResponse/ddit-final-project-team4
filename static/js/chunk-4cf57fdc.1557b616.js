(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4cf57fdc"],{"351b":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"chat"},[n("ChatPopup",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],attrs:{agentid:t.agentid}}),n("ChatList",{directives:[{name:"show",rawName:"v-show",value:t.listVisible,expression:"listVisible"}]})],1)},s=[],a={beforeMount:function(){var t=this;socket.on("msg",(function(e){t.$store.dispatch("addChatMsg",e),t.$store.dispatch("refreshChatList")}))},data:function(){return{chatRoomList:[]}},computed:{visible:function(){return this.$store.state.chatVisible},agentid:function(){return this.$store.state.agentid},unread:function(){return this.$store.state.unread},listVisible:function(){return this.$store.state.listVisible}},methods:{},components:{Badge:function(){return n.e("chunk-59ce7c5e").then(n.bind(null,"6aef"))},ChatPopup:function(){return n.e("chunk-4577ba30").then(n.bind(null,"2905"))},ChatList:function(){return n.e("chunk-34e7e302").then(n.bind(null,"925b"))}}},r=a,u=(n("820d"),n("2877")),o=Object(u["a"])(r,i,s,!1,null,"71fcc4f6",null);e["default"]=o.exports},"3a26":function(t,e,n){},"820d":function(t,e,n){"use strict";var i=n("3a26"),s=n.n(i);s.a}}]);
//# sourceMappingURL=chunk-4cf57fdc.1557b616.js.map