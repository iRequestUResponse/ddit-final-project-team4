(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-912ca818"],{"111c":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("section",[a("v-app",[a("p",[t._v("회원가입 페이지")]),a("v-form",[a("v-container",[a("v-row",{attrs:{justify:"center"}},[a("div",{attrs:{id:"firdiv"}},[t._v("\n                        간편하게 가입하고 "),a("br"),t._v("\n                        다양한 서비스를 이용하세요."),a("br"),a("br")])]),a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12",lg:"3"}},[a("v-text-field",{ref:"email",staticClass:"juk-mu_text-field",attrs:{type:"email",rules:[function(){return!!t.id||"아이디를 입력해주세요!!!"}],label:"아이디(이메일)",outlined:"",required:""},on:{"update:error":t.error,input:function(s){t.isValidId=!1}},model:{value:t.id,callback:function(s){t.id=s},expression:"id"}})],1),a("v-col",{attrs:{cols:"12",lg:"1"}},[a("v-btn",{staticClass:"hs_btn mt-2",attrs:{color:"primary",dark:"",height:"40px"},on:{click:t.checkId}},[a("h3",[t._v("중복검사")])])],1)],1),a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12",lg:"4"}},[a("v-text-field",{ref:"name",staticClass:"juk-mu_text-field",attrs:{rules:[function(){return!!t.name||"이름을 입력해주세요!!!"},function(){return/^[가-힣]{2,6}$/.test(t.name)||"이름은 한글(2~6글자) 입력!!!"}],label:"이름",outlined:"",required:""},on:{"update:error":t.error},model:{value:t.name,callback:function(s){t.name=s},expression:"name"}}),a("v-text-field",{ref:"pass",staticClass:"juk-mu_text-field",attrs:{type:"password",rules:[function(){return!!t.pass||"비밀번호를 입력해주세요!!!"}],label:"비밀번호 (최소 8자리 - 숫자 문자 특수문자 1개 이상 포함)",outlined:"",required:""},on:{"update:error":t.error},model:{value:t.pass,callback:function(s){t.pass=s},expression:"pass"}}),a("v-text-field",{ref:"conpass",staticClass:"juk-mu_text-field",attrs:{type:"password",rules:[function(){return!!t.conpass||"비밀번호 확인을 입력해주세요!!!"},!(t.pass!==t.conpass)||"비밀번호가 일치하지 않습니다."],label:"비밀번호 확인",outlined:"",required:""},model:{value:t.conpass,callback:function(s){t.conpass=s},expression:"conpass"}}),a("v-text-field",{ref:"phone",staticClass:"juk-mu_text-field",attrs:{type:"tel",label:"휴대폰번호(예시:010-1234-5678)",rules:[function(){return!!t.phone||"핸드폰번호를 입력해주세요!!!"}],outlined:"",required:""},on:{"update:error":t.error},model:{value:t.phone,callback:function(s){t.phone=s},expression:"phone"}})],1)],1),a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12",lg:"3"}},[a("v-text-field",{ref:"addrCode",staticClass:"juk-mu_text-field",attrs:{label:"우편번호",outlined:"",disabled:""},model:{value:t.result.postcode,callback:function(s){t.$set(t.result,"postcode",s)},expression:"result.postcode"}})],1),a("v-col",{attrs:{cols:"12",lg:"1"}},[a("v-btn",{staticClass:"hs_btn mt-2",attrs:{color:"primary",dark:"",height:"40px"},on:{click:function(s){s.stopPropagation(),t.dialog=!0}}},[a("h3",[t._v("주소검색")])]),a("v-dialog",{attrs:{"max-width":"500"},model:{value:t.dialog,callback:function(s){t.dialog=s},expression:"dialog"}},[a("v-card",[a("v-card-actions",[a("div",{staticClass:"flex-grow-1"}),a("img",{attrs:{src:e("b3c2"),text:""},on:{click:function(s){t.dialog=!1}}})]),a("vue-daum-postcode",{on:{complete:t.getAddress}})],1)],1)],1)],1),a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12",lg:"4"}},[a("v-text-field",{ref:"addr1",staticClass:"juk-mu_text-field",attrs:{id:"addr1",label:"주소",outlined:"",disabled:""},model:{value:t.result.jibunAddress,callback:function(s){t.$set(t.result,"jibunAddress",s)},expression:"result.jibunAddress"}}),a("v-text-field",{ref:"addr2",staticClass:"juk-mu_text-field",attrs:{label:"상세주소",outlined:""},model:{value:t.addr2,callback:function(s){t.addr2=s},expression:"addr2"}})],1)],1),a("v-row",{attrs:{id:"captchaRow",justify:"center"}},[a("div",{staticClass:"form"},[a("div",{staticClass:"row"},[a("div",[a("strong")]),a("my-captcha",{attrs:{callSuccess:t.captchaBtn}})],1)])]),a("v-row",{attrs:{justify:"center",id:"joinrow"}},[a("v-col",{attrs:{cols:"12",lg:"2"}},[a("v-btn",{staticClass:"hs_btn white--text",attrs:{color:"rgb(28,157,115)",width:"300px",height:"50px",disabled:t.btndis},on:{click:t.join}},[a("h2",[t._v("가입하기")])])],1),a("v-col",{attrs:{cols:"12",lg:"2"}},[a("v-btn",{staticClass:"hs_btn",attrs:{color:"red",width:"300px",height:"50px",dark:""},on:{click:t.cancel}},[a("h2",[t._v("취소하기")])])],1)],1)],1)],1)],1)],1)},i=[],r=(e("7f7f"),e("2b0e")),n=e("3864"),o=e.n(n),l=e("1881"),d=e.n(l),c=e("1aaf");r["default"].use(d.a),r["default"].use(o.a);var u={props:["func"],data:function(){return{id:"",name:"",pass:"",conpass:"",phone:"",addr1:"",addr2:"",dialog:!1,result:{},isError:!1,isValidId:!1,btndis:!0}},methods:{checkId:function(){var t=this;axios({url:"".concat(this.serverLocation,"/checkId?id=").concat(this.id),method:"GET"}).then((function(s){0==s.data?(t.$swal("사용 가능한 아이디입니다."," ","success"),t.isValidId=!0):1==s.data?(t.$swal("아이디가 중복됩니다."," ","info"),t.id=""):2==s.data?t.$swal("아이디를 입력해주세요."," ","info"):(t.$swal("아이디 형식에 맞지 않습니다."," ","info"),t.id="")}))},join:function(){var t=this;if(!1===this.isValidId)return this.$swal("중복검사를 해주세요!!!"," ","info"),void(res.data=0);""==this.id||""==this.name||""==this.pass||""==this.conpass||""==this.phone||""==this.result.jibunAddress||""==this.addr2?this.$swal("모두 입력해주세요!!!"," ","info"):axios({url:"".concat(this.serverLocation,"/join"),method:"POST",data:{id:this.id,name:this.name,pass:this.pass,phone:this.phone,addr:this.result.jibunAddress+" "+this.addr2}}).then((function(s){t.$swal({type:"success",title:"회원가입 성공",text:"회원가입이 정상적으로 완료되었습니다.",confirmButtonText:"시작하기"}).then((function(s){t.$router.push("/")}))}))},getAddress:function(t){this.result=t,console.log(this.result),this.dialog=!1,t.jibunAddress||(this.result.jibunAddress=t.autoJibunAddress)},error:function(t){this.isError=t},captchaBtn:function(){this.btndis=!1},cancel:function(){this.$router.push("/login/"+this.$route.params.func)}},components:{"my-captcha":c["a"]}},f=u,p=(e("fb88"),e("2877")),h=e("6544"),v=e.n(h),b=e("7496"),m=e("8336"),x=e("b0af"),k=e("99d9"),w=e("62ad"),g=e("a523"),j=e("169a"),_=e("4bd4"),C=e("0fd9"),y=e("8654"),V=Object(p["a"])(f,a,i,!1,null,"3a8a6f59",null);s["default"]=V.exports;v()(V,{VApp:b["a"],VBtn:m["a"],VCard:x["a"],VCardActions:k["a"],VCol:w["a"],VContainer:g["a"],VDialog:j["a"],VForm:_["a"],VRow:C["a"],VTextField:y["a"]})},"35eb":function(t,s,e){},fb88:function(t,s,e){"use strict";var a=e("35eb"),i=e.n(a);i.a}}]);
//# sourceMappingURL=chunk-912ca818.be1d5dd0.js.map