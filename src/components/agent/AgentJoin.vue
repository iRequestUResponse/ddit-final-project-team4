<template>
    <section>
        <v-app>
            <v-form>
                <v-container>
                    <v-row justify="center" class="mt-12">
                        <div id="firdiv">
                          <h1 class="display-2">공인중개사 회원가입<br></h1>
                          <h2><br>
                            간편하게 가입하고 <br>
                            다양한 서비스를 이용하세요.<br><br>
                          </h2>
                        </div>
                    </v-row>              
                    <v-row justify="center">
                        <v-col cols="12" lg="3">
                            <v-text-field
                                type="email"
                                ref="email"
                                v-model="id"
                                :rules="[
                                    () => !!id || '아이디를 입력해주세요!!!',
                                    () => /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/.test(id) || '이메일 형식에 맞지 않습니다',
                                ]"
                                label="아이디(이메일)"
                                outlined
                                required
                                class="juk-mu_text-field"
                                @update:error="error"
                                @input="isValidId=false"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" lg="1">
                            <v-btn color="primary"
                                    dark
                                    class="hs_btn" @click="checkId">중복검사</v-btn>
                        </v-col>
                    </v-row>
            
                    <v-row justify="center">
                        <v-col cols="12" lg="4">
                            <v-text-field
                                type="password"
                                ref="pass"
                                v-model="pass"
                                :rules="[
                                    () => !!pass || '비밀번호를 입력해주세요!!!',
                                    () => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(pass) || '형식에 맞지 않습니다.',
                                ]"
                                label="비밀번호 (최소 8자리 - 숫자 문자 특수문자 1개 이상 포함)"
                                outlined
                                required
                                class="juk-mu_text-field"
                                @update:error="error"
                            >
                            </v-text-field>

                            <v-text-field
                                type="password"
                                ref="conpass"
                                v-model="conpass"
                                :rules="[() => 
                                            !!conpass || '비밀번호 확인을 입력해주세요!!!',
                                            !!(pass === conpass) || '비밀번호가 일치하지 않습니다.',
                                        () => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(pass) || '형식에 맞지 않습니다.'
                                        ]"
                                label="비밀번호 확인"
                                outlined
                                required
                                class="juk-mu_text-field"
                            >
                            </v-text-field>

                            <v-text-field
                                type="tel"
                                ref="phone"
                                v-model="phone"
                                label="휴대폰번호(예시:010-1234-5678)"
                                :rules="[
                                            () => !!phone || '핸드폰번호를 입력해주세요!!!',
                                            () => /^(?:(010-?\d{4})|(01[1|6|7|8|9]-?\d{3,4}))-?\d{4}$/.test(phone) || '형식에 맞지 않습니다.',
                                        ]"
                                outlined
                                required
                                class="juk-mu_text-field"
                                @update:error="error"
                            >
                            </v-text-field>
                    </v-col>
                    </v-row>
                        <v-row justify="center">
                            <v-col cols="12" lg="3">
                             <v-text-field
                                ref="addrCode"
                                v-model="result.postcode"
                                label="우편번호"
                                outlined
                                class="juk-mu_text-field"
                                disabled
                            >
                            </v-text-field>
                            </v-col>
                          
                            <v-col cols="12" lg="1">
                                <!-- 주소검색 다음 api -->
                                 <v-btn
                                    color="primary"
                                    dark
                                    class="hs_btn"
                                    @click.stop="dialog = true"
                                >
                                    주소검색
                                </v-btn>
                                
                                <v-dialog
                                    v-model="dialog"
                                    max-width="500"
                                >
                                    <v-card>
                                        <v-card-actions>
                                            <div class="flex-grow-1"></div>
                                            <img src="@/assets/img/iconX.png" text @click="dialog = false">
                                        </v-card-actions>
                                        <vue-daum-postcode @complete="getAddress" />
                                    </v-card>
                                </v-dialog>

                            </v-col>
                            </v-row>

                        <v-row justify="center">
                         <v-col cols="12" lg="4">
                            <v-text-field
                                  ref="name"
                                  v-model="name"
                                  :rules="[
                                      () => !!name || '이름을 입력해주세요!!!',
                                  ]"
                                  label="공인중개사사무소 이름"
                                  outlined
                                  required
                                  class="juk-mu_text-field"
                                  @update:error="error"
                              >
                            </v-text-field>

                            <v-text-field
                                ref="addr1"
                                id="addr1"
                                v-model="result.jibunAddress"
                                label="주소"
                                outlined
                                class="juk-mu_text-field"
                                disabled
                            >
                            </v-text-field>

                            <v-text-field
                                ref="addr2"
                                v-model="addr2"
                                label="상세주소"
                                outlined
                                class="juk-mu_text-field"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-row justify="center">
                      <v-col cols="4">
                        <div id="app" class="d-flex-row fileinput">
                          <p>서류제출 : {{ this.originname }}</p>
                          <file-pond style="margin-top:20px;"
                              name="test"
                              ref="pond"
                              label-idle="파일 업로드 해주세요!!!"
                              allow-multiple="false"
                              accepted-file-types="image/jpeg, image/png"
                              :server="server"
                              :files="myFiles"
                              @init="handleFilePondInit"
                              @processfile="onload"
                          />
                        </div>
                        <br>
                      </v-col>
                    </v-row>

                    <v-row justify="center" style="margin-left: 600px; width:600px;">
                      <v-col cols="5">
                      <div class="row1">
                        <div class="row">
                          <my-captcha 
                            :callSuccess="captchaBtn">
                          </my-captcha>
                        </div>
                      </div>
                      </v-col>
                      <v-col cols="7">
                          <v-btn  
                              color="primary"
                              width="300"
                              class="hs_btn"
                              @click="join" 
                              :disabled="btndis">가입하기
                          </v-btn><br>
                      
                          <v-btn 
                              color="red"
                              width="300"
                              dark
                              @click="cancel" 
                              class="hs_btn">취소하기
                          </v-btn>
                      </v-col>
                    </v-row>
                </v-container>
            </v-form>
            
        </v-app>
    </section>
</template>


<script>
import Vue from "vue"
import VueDaumPostcode from "vue-daum-postcode"
import VModal from 'vue-js-modal'
import myCaptcha from 'vue-captcha'

// Import Vue FilePond
import vueFilePond from 'vue-filepond';
 
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
 
// Import FilePond plugins
// Please note that you need to install these plugins separately
 
// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
 
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
 
Vue.use(VModal)
Vue.use(VueDaumPostcode)

export default {
    name: 'app',
    props: [
        'func',
    ],
    beforeMount() {
        this.server.url = `//192.168.0.121:9000/api/file/agent`;
        window.addEventListener('FilePond:removefile', event => {
            this.filename = '';
        });
    },
    data() {
        return {
            id: '',
            name: '',
            pass: '',
            conpass: '',
            phone: '',
            addr1: '',
            addr2: '',
            dialog: false,
            result: {},
            isError: false,
            isValidId: false,
            btndis: true,
            myFiles: [],  //미리 가져오는값
            server: {
                url: `${this.fileServer}/file/agent`
            },
            filename: '',
            path: '',
            originname: '',
        }
    },
    methods: {
        checkId(){
            axios({
                url: `${this.serverLocation}/checkAgentId?id=${this.id}`,
                method: 'GET',
            })
            .then(res => {
                if (res.data == 0){
                    this.$swal('사용 가능한 아이디입니다.', ' ', 'success');
                    this.isValidId = true;
                } else if (res.data == 1) {
                    this.$swal('아이디가 중복됩니다.', ' ', 'info');
                    this.id = "";
                } else if (res.data == 2){
                    this.$swal('아이디를 입력해주세요.', ' ', 'info');
                } else {
                    this.$swal('아이디 형식에 맞지 않습니다.', ' ', 'info');
                    this.id = "";
                }
            })
        },
        join() {
            if (this.isValidId === false) {
                this.$swal('중복검사를 해주세요!!!', ' ', 'info');

                res.data = 0;
                return;
            }
            if (this.id == "" || this.name == "" || this.pass == "" || this.conpass == "" || this.phone == "" || this.result.jibunAddress == "" || this.addr2 == "") {
                this.$swal('모두 입력해주세요!!!', ' ', 'info');
            } else {
                axios({
                    url: `${this.serverLocation}/joinAgent`,
                    method: 'POST',
                    data: {
                        id: this.id,
                        name: this.name,
                        pass: this.pass,
                        phone: this.phone,
                        addr: this.result.jibunAddress + ' ' + this.addr2,
                        filename: this.filename
                    },
                })
                .then(res => {
                    if (res.data === 1) {
                         this.$swal({
                          type: 'success',
                          title: '회원가입 성공',
                          text: '회원가입이 정상적으로 완료되었습니다.',
                          confirmButtonText: '시작하기',
                        })
                        .then((result) => {
                          this.$router.push('/');
                        })
                    }
                })
            }
        },
        getAddress(event) {
            this.result = event;
            this.dialog = false;

            this.name = this.result.buildingName;
            if (!event.jibunAddress) {
                this.result.jibunAddress = event.autoJibunAddress;
            }
        },
        error(event) {
            this.isError = event;
        },
        captchaBtn () {
            this.btndis = false
        },
        cancel () {
            window.addEventListener('FilePond:removefile', event => {
                this.filename = '';
            });
            
            this.$router.push('/login/' + this.$route.params.func);
        },
        handleFilePondInit: function() {
            // console.log('FilePond has initialized');
 
            // FilePond instance methods are available on `this.$refs.pond`
            // console.log(this.$refs.pond);
        },
        onload(error, result) {
          let info = JSON.parse(result.serverId);
          this.path = 'agent/' + info.files[0].filename
          this.originname = info.files[0].originalname

          console.log(this.originname)
            
        },
    },
    components: {
        'my-captcha': myCaptcha,
        FilePond
    }
}
</script>

<style scoped>
    .juk-mu_text-field {
        border-radius: 0;
    }
    .juk-mu_btn > span {
        font-size: 1.4em;
    }
    img{
        cursor: pointer;
    }
    .hs_btn {
      margin-top: 5px;
    }
    .hs_btn[disabled] {
        cursor: not-allowed;
        opacity: 0.9;
    }
    #captchaRow {
        margin-right: 380px; 
        margin-bottom: 20px;
    }
    .filepond--panel-root {
      background-color: transparent;
      border: 2px solid #4a6bff;
    }
    @media (min-width: 50em) {
      .filepond--item {
          width: calc(100% - .5em);
          text-align: center;
      }
    }
    #subimg{
        width: 100%;
        height: auto;
    }

    .fileinput{
        width: 100%;
        margin-top: 30px;
    }

    #row1{
      margin-top: 10px;
    }
   
</style>