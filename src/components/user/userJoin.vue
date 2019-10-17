<template>
    <section>
        <v-app>
            <p>회원가입 페이지</p>
            <v-form>
                {{ isError }}
                <v-container>
                    <v-row justify="center">
                        <div id="firdiv">
                            간편하게 가입하고 <br>
                            다양한 서비스를 이용하세요.<br><br>
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
                    
                    <v-row id="captchaRow" justify="center">
                    <div class="form">
                    <div class="row">
                    <div><strong></strong></div>
                    <my-captcha :callSuccess="captchaBtn"></my-captcha>
                    </div>
                    </div>
                    </v-row>

                    <v-row justify="center">
                        <v-col cols="12" lg="2">
                            <v-btn  
                                color="primary"
                                class="hs_btn"
                                @click="join" 
                                :disabled="btndis">가입하기
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

Vue.use(VModal)
Vue.use(VueDaumPostcode)

export default {
    props: [
        'func',
    ],
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
        }
    },
    methods: {
        checkId(){
            axios({
                url: `${this.serverLocation}/checkId?id=${this.id}`,
                method: 'GET',
            })
            .then(res => {
                if (res.data == 0){
                    alert("사용 가능한 아이디입니다.")
                    this.isValidId = true;
                } else if (res.data == 1) {
                    alert("아이디가 중복됩니다.")
                    this.id = "";
                } else if (res.data == 2){
                    alert("아이디를 입력해주세요.")
                } else {
                    alert("아이디 형식에 맞지 않습니다.")
                    this.id = "";
                }
            })
        },
        join() {
            if (this.isValidId === false) {
                alert("중복검사를 해주세요!!!");
                res.data = 0;
                return;
            }
            if (this.id == "" || this.name == "" || this.pass == "" || this.conpass == "" || this.phone == "" || this.result.jibunAddress == "" ||this.addr2 == "") {
                alert('모두 입력해주세요!!!');
            } else {
                 axios({
                    url: `${this.serverLocation}/join`,
                    method: 'POST',
                    data: {
                        id: this.id,
                        name: this.name,
                        pass: this.pass,
                        phone: this.phone,
                        addr: this.result.jibunAddress + ' ' + this.addr2
                    },
                })
                .then(res => {
                    if (res.data === 1) {
                        alert("회원가입이 정상적으로 완료되었습니다.")
                        this.$router.replace('/');
                    }
                })
            }
        },
        getAddress(event) {
            this.result = event;
            console.log(this.result);
            this.dialog = false;

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
            this.$router.push('/login/' + this.$route.params.func);
        }
    },
    components: {
        'my-captcha': myCaptcha
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
    img{
        cursor: pointer;
    }
    .hs_btn[disabled] {
        cursor: not-allowed;
        opacity: 0.9;
    }
    #captchaRow {
        margin-right: 380px; 
        margin-bottom: 20px;
    }
   
</style>