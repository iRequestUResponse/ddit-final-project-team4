(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086b7"],{a55b:function(n,t,e){"use strict";e.r(t);var r=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-app",{attrs:{id:"inspire"}},[e(n.logintype,{tag:"component"})],1)},a=[],i=(e("96cf"),e("3b8d")),u={props:["func"],beforeMount:function(){var n=this;Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.loginCheck();case 2:if(!t.sent){t.next=4;break}n.$router.push("/");case 4:case"end":return t.stop()}}),t)})))()},data:function(){return{logintype:this.$route.params.func}},methods:{login:function(){var n=this;axios({url:"".concat(this.serverLocation,"/login"),method:"POST",data:{id:this.id,pw:this.pw}}).then((function(t){"Y"!==t.data[0].USER_WITHDRAWAL?1===t.data.length?(alert("로그인 되었습니다!!!"),n.$router.push("/")):alert("일치하는 회원정보가 없습니다!!!"):alert(n.id+"은 탈퇴한 회원입니다.")}))},idX:function(){this.id=""}},components:{user:function(){return e.e("chunk-0451e12a").then(e.bind(null,"a60b"))},agent:function(){return e.e("chunk-2a8f9912").then(e.bind(null,"243d"))}}},o=u,c=e("2877"),s=e("6544"),p=e.n(s),l=e("7496"),h=Object(c["a"])(o,r,a,!1,null,null,null);t["default"]=h.exports;p()(h,{VApp:l["a"]})}}]);
//# sourceMappingURL=chunk-2d2086b7.b2764ad1.js.map