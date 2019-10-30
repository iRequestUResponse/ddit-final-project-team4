<template>
    <section>
        <v-app>
            <v-form>
                <v-container style="height: 1000px;">
                    <v-row justify="center">
                        <v-col cols="12" sm="8" md="4">
                            <v-row class="headline modifyuser-content mt-12">
                                <v-col cols="8" class="mx-auto">
                                    <div class="text-center mt-12">변경할 항목을 입력하여 개인정보를 변경해주세요</div>
                                </v-col>
                            </v-row>

                            <v-row>
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
                                />
                            </v-row>
                            <v-row>
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
                                />
                            </v-row>

                            <v-row>
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
                                />
                            </v-row>

                            <v-row>
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
                                />
                            </v-row>

                            <v-row>
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
                                />
                            </v-row>

                            <v-row justify="center">
                                <v-col cols="10" class="ma-0 pa-0">
                                    <v-text-field
                                        ref="addr"
                                        id="addr"
                                        v-model="addr"
                                        label="주소"
                                        outlined
                                        class="juk-mu_text-field"
                                    />
                                </v-col>
                                <v-col cols="2" class="d-flex justify-center">
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

                            <v-row>
                                 <div class="body2 grey--text">제출서류:   {{ this.originname }}</div>
                            </v-row>
                            <v-row justify="center">
                                <img id="subimg" :src="uploadImg" alt="noimage">
                            </v-row>
                            <v-row>
                                <div class="d-flex-row fileinput">
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
                                        imagePreviewHeight="280px"
                                    />
                                </div>
                            </v-row>

                            <v-row class="mt-10 pt-4">
                                <v-btn 
                                    block 
                                    dark
                                    tile
                                    depressed
                                    class="jukBtnFont mb-2"
                                    height="64px"
                                    color="jukBtnColor"
                                    @click="modifyAgentData"
                                >수정하기</v-btn>
                            </v-row>

                            <v-row>
                                <v-btn 
                                    block 
                                    dark
                                    tile
                                    depressed
                                    class="jukBtnFont mb-2"
                                    height="64px"
                                    color="jukBtnColor"
                                    @click="cancel"
                                >취소하기</v-btn>
                            </v-row>

                            <v-row>
                                <v-btn 
                                    block 
                                    dark
                                    tile
                                    depressed
                                    class="jukBtnFont mb-2"
                                    height="64px"
                                    color="jukBtnCancelColor"
                                    @click="leaveAgent"
                                >탈퇴하기</v-btn>
                            </v-row>
                        </v-col>
                        <loading 
                            :active.sync="isLoading" 
                            :can-cancel="true" 
                        ></loading>
                    </v-row>
                </v-container>
            </v-form>
        </v-app>
    </section>
</template>

<script>
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

export default {
    props: [
        'func',
    ],
    beforeMount() {
        this.server.url = `${this.serverLocation}/file/agent`;
        window.addEventListener('FilePond:removefile', async event => {
            this.filename = (await axios.get(`${this.serverLocation}/agent/documentName?id=${this.id}`)).data;
        });
        this.server.url = `${this.fileServer}/file/agent`;
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
            this.originname = result.data.user.DOCUMENT_NAME;
            this.path = result.data.user.DOCUMENT_PATH;

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
            path: '',
            dialog: false,
            result: {},
            myFiles: [],
            server: {
                url: `http://192.168.0.121:9000/api/file/agent`,
            },
            isLoading: false,
            originname: '',
        }
    },
    computed: {
        uploadImg() {
            console.log(this.path)
            if (this.path) {
                return `//192.168.0.121:9000/api/file/${this.path}`;
            } 
            else {
                return `//192.168.0.121:9000/api/file/noimage.png`;
            }
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
                        path: this.path,
                        withdrawal: this.withdrawal,
                        originname: this.originname,
                    },
                })
                .then(res => {
                    if (res.data === 1) {
                        // simulate AJAX
                        setTimeout(() => {
                            this.isLoading = false
                            this.$swal('수정완료', '안전하게 회원정보가 수정되었습니다.', 'success');
                        },100)
                        
                        this.$router.push('/agentpage');
                    } else {
                        this.$swal('수정실패', '회원정보 수정이 실패하였습니다.', 'error');
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
            // 파일 삭제하는거

            this.$router.push('/login/' + this.$route.params.func);
        },
        handleFilePondInit: function() {
            // console.log('FilePond has initialized');
 
            // FilePond instance methods are available on `this.$refs.pond`
        },
        onload(error, result) {
            let info = JSON.parse(result.serverId);
            this.path = 'agent/' + info.files[0].filename
            this.originname = info.files[0].originalname
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
        margin-bottom: 100px;
    }
    #btnff{
        margin-left: 100px;
        margin-bottom: 100px;
    }
    #leavebtn{
        margin-left: 300px;
    }
    #submit{
        margin-left: 600px;
        margin-bottom: 50px;
    }
    
    .filepond--panel-root {
        background-color: transparent;
        border: 2px solid #4a6bff;
    }
    @media (min-width: 50em) {
        .filepond--item {
            width: calc(30% - .5em);
            margin-left: 50px;
        }
    }
    #subimg{
        width: 48%;
        height: auto;
    }

    .fileinput{

        width: 100%;
        margin-top: 20px;
    }

    .jukBtnColor {
        background-color: #1669F7 !important;
    }

    .jukBtnFont {
        font-size: 20pt !important;
    }

    .jukBtnCancelColor {
        background-color: #E62E46 !important;
    }

    .modifyuser-content {
        margin-bottom: 80px;
    }

    .bor {
        border: 1px solid black;
    }
</style>