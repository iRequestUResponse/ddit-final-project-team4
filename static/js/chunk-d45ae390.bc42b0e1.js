(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d45ae390"],{"1f4f":function(t,e,r){"use strict";r("8e6e"),r("ac6a"),r("456d");var s=r("bd86"),n=(r("c5f6"),r("8b37"),r("80d2")),a=r("7560"),i=r("58df");function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,s)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(r,!0).forEach((function(e){Object(s["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}e["a"]=Object(i["a"])(a["a"]).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes:function(){return o({"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader},this.themeClasses)}},methods:{genWrapper:function(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(n["e"])(this.height)}},[this.$createElement("table",this.$slots.default)])}},render:function(t){return t("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}})},"28b1":function(t,e,r){},"41d7":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[0===this.reports.length?r("v-row",{staticClass:"juk-empty_content",attrs:{align:"center"}},[r("v-col",[r("div",{staticClass:"title text-center"},[t._v("내용이 없습니다.")])])],1):r("v-simple-table",{staticClass:"juk-uri_table",scopedSlots:t._u([{key:"default",fn:function(){return[r("thead",[r("tr",[r("th",{staticClass:"text-center"},[t._v("제목")]),r("th",{staticClass:"text-center"},[t._v("날짜")]),r("th",{staticClass:"text-center"},[t._v("상태")])])]),r("tbody",t._l(t.reports,(function(e){return r("tr",{key:e.REPORT_SEQ},[r("td",[t._v("["+t._s(e.REPORT_REASON)+"] "+t._s(e.REPORT_CONT))]),r("td",{staticClass:"text-center"},[t._v(t._s(e.REPORT_DATE.substring(0,10)))]),"N"===e.PROCESSING_STATUS?r("td",{staticClass:"text-center"},[t._v("처리중")]):r("td",{staticClass:"text-center"},[t._v("처리완료")])])})),0)]},proxy:!0}])})],1)},n=[],a=(r("96cf"),r("3b8d")),i={beforeMount:function(){var t=this;Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,axios({url:"".concat(t.serverLocation,"/mpReportList")});case 2:t.reports=e.sent.data;case 3:case"end":return e.stop()}}),e)})))()},data:function(){return{reports:[]}},methods:{}},c=i,o=(r("e553"),r("2877")),l=r("6544"),u=r.n(l),d=r("62ad"),p=r("a523"),f=r("0fd9"),h=r("1f4f"),b=Object(o["a"])(c,s,n,!1,null,null,null);e["default"]=b.exports;u()(b,{VCol:d["a"],VContainer:p["a"],VRow:f["a"],VSimpleTable:h["a"]})},"8b37":function(t,e,r){},e553:function(t,e,r){"use strict";var s=r("28b1"),n=r.n(s);n.a}}]);
//# sourceMappingURL=chunk-d45ae390.bc42b0e1.js.map