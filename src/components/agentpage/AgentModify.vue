<template>
    <section>
        <v-app>
            <p>공인중개사 수정 페이지</p>
            <v-form>
                <v-container>
            
                    <v-row justify="center">
                        <v-col cols="12" lg="4">
                            <v-text-field
                                ref="name"
                                v-model="name"
                                :rules="[
                                    () => !!name || '이름을 입력해주세요!!!',
                                    () => /^[가-힣]{2,6}$/.test(name) || '이름은 한글(2~6글자) 입력!!!'
                                ]"
                                label="이름"
                                outlined
                                required
                                class="juk-mu_text-field"
                                @update:error="error"
                            >
                            </v-text-field>

                            <v-text-field
                                type="password"
                                ref="pass"
                                v-model="pass"
                                :rules="[
                                    () => !!pass || '비밀번호를 입력해주세요!!!',
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
                                            !!(pass === conpass) || '비밀번호가 일치하지 않습니다.'
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
                                        ]"
                                outlined
                                required
                                class="juk-mu_text-field"
                                @update:error="error"
                            >
                            </v-text-field>
                    </v-col>
                    </v-row>
                        
                    <img :src="`${this.serverLocation}/file/agent/${filename}`" alt="">

                    <v-row justify="center">
                        <v-col cols="12" lg="4" id="addrff">
                            <v-text-field
                                ref="addr"
                                id="addr"
                                v-model="addr"
                                label="주소"
                                outlined
                                class="juk-mu_text-field"
                            >
                            </v-text-field>
                         </v-col>

                        <v-col>
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
                        <v-col>
                            <div id="app">
                                <file-pond
                                    name="test"
                                    ref="pond"
                                    label-idle="파일 변경!!!"
                                    allow-multiple="false"
                                    accepted-file-types="image/jpeg, image/png"
                                    :server="server"
                                    :files="myFiles"
                                    @init="handleFilePondInit"
                                    @processfile="onload"
                                />
                            </div>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="12" lg="2" id="btnff">
                            <v-btn  
                                color="primary"
                                class="hs_btn"
                                @click="modifyAgentData" 
                            >수정하기
                            </v-btn>
                        </v-col>
                        <v-col cols="12" lg="2">
                            <v-btn 
                                color="primary"
                                dark
                                @click="cancel" 
                                class="hs_btn">취소하기
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-row justify="center">
                        <v-col cols="12" lg="2" id="leavebtn">
                            <v-btn  
                                color="primary"
                                v-model="withdrawal"
                                class="hs_btn"
                                @click="leaveAgent">탈퇴하기
                            </v-btn>
                        </v-col>
                        <loading :active.sync="isLoading" 
                        :can-cancel="true" 
                        :on-cancel="onCancel"
                        :is-full-page="fullPage"></loading>
                    </v-row>

                </v-container>
            </v-form>
        </v-app>
    </section>
</template>

<script>
import Vue from 'vue'
import VueDaumPostcode from "vue-daum-postcode"
import VModal from 'vue-js-modal'

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


import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

Vue.use(VModal)
Vue.use(VueDaumPostcode)

export default {
    props: [
        'func',
    ],
    beforeMount() {
        (async () => {
            let result = await axios({
                url: `${this.serverLocation}/check`
            });

            this.id = result.data.user.AGENTID;
            this.name = result.data.user.AGENT_NAME;
            this.pass = result.data.user.AGENT_PASS;
            this.conpass = result.data.user.AGENT_PASS;
            this.phone = result.data.user.AGENT_PHONE;
            this.addr = result.data.user.AGENT_ADDR;
            this.filename = result.data.user.DOCUMENT_NAME;

        })();
    },
    data() {
        return {
            name: '',
            pass: '',
            conpass: '',
            phone: '',
            addr: '',
            withdrawal: 'N',
            addr2: '',
            filename: '',
            dialog: false,
            result: {},
            myFiles: [],
            server: {
                url: `${this.serverLocation}/file/agent`,
            },
            disview: true,
            isLoading: false,
        }
    },
    methods: {
        test() {
            console.log('test')
        },
        modifyAgentData() {
            if (this.pass === this.conpass) {
                this.isLoading = true;
                axios({
                    url: `${this.serverLocation}/modifyAgent`,
                    method: 'POST',
                    data: {
                        id: this.id,
                        name: this.name,
                        pass: this.pass,
                        phone: this.phone,
                        addr: this.addr,
                        filename: this.filename,
                        withdrawal: this.withdrawal,
                    },
                })
                .then(res => {
                    if (res.data === 1) {
                        // simulate AJAX
                        setTimeout(() => {
                            this.isLoading = false
                        },1000)
                        alert("수정완료 되었습니다.")
                        this.$router.push('/agentpage');
                    } else {
                        alert("수정 실패")
                    }
                })
            } else {
                alert("비밀번호가 일치하지 않습니다.");
            }
        },
        getAddress(event) {
            console.log(event);
            this.dialog = false;

            this.addr = event.jibunAddress;

            if (!event.jibunAddress) {
                this.addr = event.autoJibunAddress;
            }
        },
        error(event) {
            this.isError = event;
        },
        leaveAgent(){
            axios({
                url: `${this.serverLocation}/leaveAgent`,
                method: 'POST',
                data: {
                    id: this.id,
                    withdrawal: this.withdrawal,
                },
            })
            .then(res => {
                if (res.data === 1) {
                    alert("회원탈퇴가 완료되었습니다.");

                    axios({
                        url: `${this.serverLocation}/logout`
                    });

                    this.isLogin = false;
                    this.$router.push('/');
                 }
            })
        },
        cancel () {
            this.$router.push('/login/' + this.$route.params.func);
        },
        handleFilePondInit: function() {
            // console.log('FilePond has initialized');
 
            // FilePond instance methods are available on `this.$refs.pond`
        },
        onload(error, result) {
            let info = JSON.parse(result.serverId);
            console.log(info);
            this.filename = info.filename
        },
    },
    components: {
        FilePond,
        Loading
    }
}
</script>

<style>
   .juk-mu_text-field {
        border-radius: 0;
    }

    .juk-mu_btn > span {
        font-size: 1.4em;
    }
    #addrff{
        margin-left: 595px;
    }
    #btnff{
        margin-left: 100px;
        margin-bottom: 100px;
    }
    #leavebtn{
        margin-left: 300px;
    }
</style>