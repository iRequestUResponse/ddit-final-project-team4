(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d8c40b82"],{"2bdc":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("v-container",{staticClass:"px-10 py-0 mt-12"},[s("v-row",{staticClass:"pl-4 my-4"},[s("v-col",{attrs:{cols:"12",md:"4"}},[s("div",{staticClass:"juk-leftdevide"},[s("div",{staticClass:"grey--text"},[t._v("\n                    거래유형 / 금액\n                ")]),s("div",{staticClass:"display-1"},[t._v("\n                    "+t._s(t.norsale.SALES_TYPE)+" "+t._s(t._f("comma")(t.norsale))+"\n                ")])])]),s("v-col",{attrs:{cols:"12",md:"2"}},[s("div",{staticClass:"juk-leftdevide"},[s("div",{staticClass:"grey--text"},[t._v("\n                    면적\n                ")]),s("div",{staticClass:"display-1"},[t._v("\n                    "+t._s(t.norsale.AREA)+"평\n                ")])])]),s("v-spacer"),s("v-col",{staticClass:"d-flex align-center title",attrs:{cols:"12",md:"2"}},[s("v-icon",[t._v("\n                person\n            ")]),s("div",{staticClass:"pl-2"},[t._v("\n                "+t._s(t.norsale.AGENTID)+"\n            ")])],1)],1),s("v-row",{staticClass:"juk-maindivide py-1"},[s("v-col",[t._v(t._s(t.norsale.SALES_TITLE))])],1),s("v-row",{staticClass:"juk-bottomdivide py-1"},[s("v-col",{attrs:{cols:"3"}},[t._v("해당층/전체층 : "+t._s(t.norsale.RELEVANT_FLOOR)+"층/"+t._s(t.norsale.WHOLE_FLOOR)+"층")]),s("v-col",{attrs:{cols:"3"}},[t._v("방향 : "+t._s(t.norsale.DIRECTION))]),s("v-col",{attrs:{cols:"3"}},[t._v("준공년도 : "+t._s(t.norsale.COMPLETION_DATE.substring(0,4))+"년")]),s("v-col",{attrs:{cols:"3"}},[t._v("입주가능일 : "+t._s(t.norsale.AVAILABILITY_DATE))])],1),s("v-row",{staticClass:"px-12",attrs:{justify:"center"}},[s("v-col",{attrs:{cols:"12",sm:"12",md:"8"}},[s("v-container",[s("v-row",t._l(t.norsale.photolist,(function(a){return s("v-col",{key:a.PHOTO_SEQ,staticClass:"d-flex child-flex",attrs:{cols:"12",sm:"6",md:"6"}},[s("v-card",{staticClass:"d-flex",attrs:{flat:"",tile:""}},[s("v-img",{staticClass:"grey lighten-2",attrs:{src:"//192.168.0.121:9000/api/file/"+a.PHOTO_PATH,"aspect-ratio":"1"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[s("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[s("v-progress-circular",{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}],null,!0)})],1)],1)})),1)],1)],1)],1),s("v-row",{staticClass:"mt-8 px-8"},[s("v-card",{attrs:{"min-height":"500",flat:"",tile:""}},[s("div",{staticClass:"display-1"},[t._v("\n                "+t._s(t.norsale.SALES_CONT)+"\n            ")])])],1)],1)},n=[],c=(s("a481"),s("768b")),r=(s("96cf"),s("3b8d")),o={props:["aptNum"],beforeMount:function(){var t=this;Object(r["a"])(regeneratorRuntime.mark((function a(){var s,e,n,r,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,axios({url:"".concat(t.serverLocation,"/mpGetNorSalesDetail?num=").concat(t.aptNum)});case 2:s=a.sent.data,e=[s.COMPLETION_DATE,s.AVAILABILITY_DATE].map((function(t){return new Date(t)})),n=Object(c["a"])(e,2),r=n[0],o=n[1],s.COMPLETION_DATE="".concat(r.getFullYear(),".").concat(r.getMonth()+1,".").concat(r.getDate()),s.AVAILABILITY_DATE="".concat(o.getFullYear(),".").concat(o.getMonth()+1,".").concat(o.getDate()),t.norsale=s;case 7:case"end":return a.stop()}}),a)})))()},filters:{comma:function(t){var a=t.PRICE,s="";return a>1e8&&(s+="".concat(Math.floor(a/1e8),"억 "),a%=1e8),a>1e4&&(s+="".concat(Math.floor(a/1e4),"만 "),a%=1e4),a>0&&(s+="".concat(a," ")),s+="원","".concat(s.replace(/\B(?=(\d{3})+(?!\d))/g,",")).concat(t.DEPOSIT?"/월":"")}},data:function(){return{norsale:{}}}},l=o,i=(s("b2a7"),s("2877")),v=s("6544"),d=s.n(v),u=s("b0af"),_=s("62ad"),f=s("a523"),p=s("132d"),m=s("adda"),C=s("490a"),g=s("0fd9"),E=s("2fa4"),A=Object(i["a"])(l,e,n,!1,null,null,null);a["default"]=A.exports;d()(A,{VCard:u["a"],VCol:_["a"],VContainer:f["a"],VIcon:p["a"],VImg:m["a"],VProgressCircular:C["a"],VRow:g["a"],VSpacer:E["a"]})},b2a7:function(t,a,s){"use strict";var e=s("b5f4"),n=s.n(e);n.a},b5f4:function(t,a,s){}}]);
//# sourceMappingURL=chunk-d8c40b82.0f0ce685.js.map