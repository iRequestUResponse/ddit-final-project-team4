<template>
    <section>
        <v-app>
            <v-form>
                <v-container class="fill-height" style="height: 1000px;">
                    <v-row justify="center">
                        <v-col cols="12" sm="8" md="4">
                            <v-row class="headline modifyuser-content">
                                <v-col cols="8" class="mx-auto">
                                    <div class="text-center">변경할 항목을 입력하여 개인정보를 변경해주세요</div>
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
                                >
                                </v-text-field>
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
                                >
                                </v-text-field>
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
                                >
                                </v-text-field>
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
                                >
                                </v-text-field>
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
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2" id="btncol">
                                    <button type="button" id="addressbtn" class="btn-green" @click.stop="dialog = true">주소검색
                                    </button>
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
                            <v-row class="mt-10 pt-4">
                                <v-btn 
                                    block 
                                    dark
                                    tile
                                    depressed
                                    class="jukBtnFont mb-2"
                                    height="64px"
                                    color="jukBtnColor"
                                    @click="modifyUserData" 
                                >수정하기</v-btn>
                            </v-row>
                            <!-- <v-row>
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
                            </v-row> -->
                            <v-row>
                                <v-btn 
                                    block 
                                    dark
                                    tile
                                    depressed
                                    class="jukBtnFont mb-2"
                                    height="64px"
                                    color="jukBtnCancelColor"
                                    @click="leaveUser"
                                >탈퇴하기</v-btn>
                            </v-row>
                        </v-col>
                    </v-row>

                    <!-- <v-row justify="center">
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
                    </v-row> -->

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
                url: `${this.serverLocation}/check`
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
            if (this.pass === this.conpass) {
                axios({
                    url: `${this.serverLocation}/modifyUser`,
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
                      this.$swal('수정완료', '회원정보가 정상적으로 수정되었습니다.', 'success');
                    } else {
                      this.$swal('수정실패', '수정이 실패하였습니다.', 'warning');
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
        leaveUser(){
           this.$swal({

            title: '탈퇴하시겠습니까?',
            text: '죽방의 다양한 서비스를 이용할 수 없습니다.',
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: '탈퇴',
            cancelButtonText: '취소',

          }).then((result) => {
            if (result.value) {
              axios({
                url: `${this.serverLocation}/leaveUser`,
                method: 'POST',
                data: {
                    id: this.id,
                    withdrawal: this.withdrawal,
                },
              })
              .then(res => {
                if (res.data === 1) {
                  this.$swal('탈퇴가 완료되었습니다.', '', 'success');

                  axios({
                      url: `${this.serverLocation}/logout`
                  });

                  this.isLogin = false;
                  this.$router.push('/');
                }
              })
            }
          })
        },
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
    .jukBtnColor {
        background-color: #1669F7 !important;
    }

    .jukBtnFont {
        font-size: 20pt !important;
    }

    .jukBtnCancelColor {
        background-color: rgba(255, 0, 0, 0.7) !important;
    }

    .modifyuser-content {
        margin-bottom: 80px;
    }

    .btn-green {
      width: 75px;
    }

    #btncol {
      margin-top: -11px;
    }
</style>