(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4e668773"],{"2ba0":function(t,a,s){"use strict";var e=s("b823"),c=s.n(e);c.a},b823:function(t,a,s){},e5b0:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("v-container",{staticClass:"px-auto"},[s("v-row",{staticClass:"ma-0 ",staticStyle:{height:"300px"},attrs:{align:"center",justify:"center"}},[s("p",{staticClass:"display-2 black--text"},[t._v("매물관리")])]),s("v-row",[s("v-col",{attrs:{cols:"12"}},[s("div",{staticClass:"grey--text"},[t._v("\n                아파트명\n            ")]),s("div",{staticClass:"display-2"},[t._v("\n                "+t._s(t.aptsale.APT_NAME)+"\n            ")])])],1),s("v-row",{staticClass:"pl-4 my-4"},[s("v-col",{attrs:{cols:"12",md:"4"}},[s("div",{staticClass:"juk-leftdevide"},[s("div",{staticClass:"grey--text"},[t._v("\n                    거래유형 / 금액\n                ")]),s("div",{staticClass:"display-1"},[t._v("\n                    "+t._s(t.aptsale.SALES_TYPE)+" "+t._s(t._f("comma")(t.aptsale))+"\n                ")])])]),s("v-col",{attrs:{cols:"12",md:"2"}},[s("div",{staticClass:"juk-leftdevide"},[s("div",{staticClass:"grey--text"},[t._v("\n                    면적\n                ")]),s("div",{staticClass:"display-1"},[t._v("\n                    "+t._s(t.aptsale.PYEONG)+"평\n                ")])])]),s("v-spacer"),s("v-col",{staticClass:"d-flex align-center title",attrs:{cols:"12",md:"2"}},[s("v-icon",[t._v("\n                person\n            ")]),s("div",{staticClass:"pl-2"},[t._v("\n                "+t._s(t.aptsale.AGENTID)+"\n            ")])],1)],1),s("v-row",{staticClass:"juk-maindivide py-1"},[s("v-col",[t._v(t._s(t.aptsale.SALES_TITLE))])],1),s("v-row",{staticClass:"juk-bottomdivide py-1"},[s("v-col",{attrs:{cols:"3"}},[t._v("해당층/전체층 : "+t._s(t.aptsale.RELEVANT_FLOOR)+"층/"+t._s(t.aptsale.WHOLE_FLOOR)+"층")]),s("v-col",{attrs:{cols:"3"}},[t._v("방향 : "+t._s(t.aptsale.DIRECTION))]),s("v-col",{attrs:{cols:"3"}},[t._v("준공년도 : "+t._s(t.aptsale.COMPLETION_DATE.substring(0,4))+"년")]),s("v-col",{attrs:{cols:"3"}},[t._v("입주가능일 : "+t._s(t.aptsale.AVAILABILITY_DATE))])],1),s("v-row",{staticClass:"px-12",attrs:{justify:"center"}},[s("v-col",{attrs:{cols:"12",sm:"12",md:"8"}},[s("v-container",[s("v-row",t._l(t.aptsale.photolist,(function(a){return s("v-col",{key:a.PHOTO_SEQ,staticClass:"d-flex child-flex",attrs:{cols:"12",sm:"6",md:"6"}},[s("v-card",{staticClass:"d-flex",attrs:{flat:"",tile:""}},[s("v-img",{staticClass:"grey lighten-2",attrs:{src:"//192.168.0.121:9000/api/file/"+a.PHOTO_PATH,"aspect-ratio":"1"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[s("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[s("v-progress-circular",{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}],null,!0)})],1)],1)})),1)],1)],1)],1),s("v-row",{staticClass:"mt-8 px-8"},[s("v-card",{attrs:{"min-height":"500",flat:"",tile:""}},[s("div",{staticClass:"display-1"},[t._v("\n                "+t._s(t.aptsale.SALES_CONT)+"\n            ")])])],1)],1)},c=[],l=(s("a481"),s("768b")),n=(s("96cf"),s("3b8d")),r={props:["offerNum"],beforeMount:function(){var t=this;Object(n["a"])(regeneratorRuntime.mark((function a(){var s,e,c,n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,axios({url:"".concat(t.serverLocation,"/mpGetAptSalesDetail?aptNum=").concat(t.offerNum)});case 2:s=a.sent.data,e=[s.COMPLETION_DATE,s.AVAILABILITY_DATE].map((function(t){return new Date(t)})),c=Object(l["a"])(e,2),n=c[0],r=c[1],s.COMPLETION_DATE="".concat(n.getFullYear(),".").concat(n.getMonth()+1,".").concat(n.getDate()),s.AVAILABILITY_DATE="".concat(r.getFullYear(),".").concat(r.getMonth()+1,".").concat(r.getDate()),t.aptsale=s;case 7:case"end":return a.stop()}}),a)})))()},filters:{comma:function(t){var a=t.PRICE,s="";return a>1e8&&(s+="".concat(Math.floor(a/1e8),"억 "),a%=1e8),a>1e4&&(s+="".concat(Math.floor(a/1e4),"만 "),a%=1e4),a>0&&(s+="".concat(a," ")),s+="원","".concat(s.replace(/\B(?=(\d{3})+(?!\d))/g,",")).concat(t.DEPOSIT?"/월":"")}},data:function(){return{aptsale:{}}}},i=r,o=(s("2ba0"),s("2877")),v=s("6544"),p=s.n(v),d=s("b0af"),u=s("62ad"),_=s("a523"),f=s("132d"),C=s("adda"),m=s("490a"),g=s("0fd9"),E=s("2fa4"),A=Object(o["a"])(i,e,c,!1,null,null,null);a["default"]=A.exports;p()(A,{VCard:d["a"],VCol:u["a"],VContainer:_["a"],VIcon:f["a"],VImg:C["a"],VProgressCircular:m["a"],VRow:g["a"],VSpacer:E["a"]})}}]);
//# sourceMappingURL=chunk-4e668773.06ba9611.js.map