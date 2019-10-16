<template>
    <section>
        <v-app>
            <p>회원가입 페이지</p>
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
                        <v-col cols="12" lg="2" id="btnff">
                            <v-btn  
                                color="primary"
                                class="hs_btn"
                                @click="modifyUserData" 
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
                                @click="leaveUser">탈퇴하기
                            </v-btn>
                        </v-col>
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

Vue.use(VModal)
Vue.use(VueDaumPostcode)

export default {
    props: [
        'func',
    ],
    beforeMount() {
        (async () => {
            let result = await axios({
                url: `${this.$store.state.serverLocation}/check`
            });

            this.id = result.data.user.USERID;
            this.name = result.data.user.USER_NAME;
            this.pass = result.data.user.USER_PASS;
            this.conpass = result.data.user.USER_PASS;
            this.phone = result.data.user.USER_PHONE;
            this.addr = result.data.user.USER_ADDR;

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
            dialog: false,
        }
    },
    methods: {
        modifyUserData() {
            if(this.pass === this.conpass){
                axios({
                    url: `${this.$store.state.serverLocation}/modifyUser`,
                    method: 'POST',
                    data: {
                        id: this.id,
                        name: this.name,
                        pass: this.pass,
                        phone: this.phone,
                        addr: this.addr,
                        withdrawal: this.withdrawal,
                    },
                })
                .then(res => {
                    if (res.data === 1) {
                        alert("수정완료 되었습니다.")
                        this.$router.push('/mypage');
                    }else {
                        alert("수정 실패")
                    }

                })
            }else{
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
        leaveUser(){
            axios({
                url: `${this.$store.state.serverLocation}/leaveUser`,
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
                        url: `${this.$store.state.serverLocation}/logout`
                    });

                    this.isLogin = false;
                    this.$router.push('/');
                 }
            })
        },
        cancel () {
            this.$router.push('/login/' + this.$route.params.func);
        }
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
        margin-left: 395px;
    }
    #btnff{
        margin-left: 100px;
        margin-bottom: 100px;
    }
    #leavebtn{
        margin-left: 300px;
    }
</style>