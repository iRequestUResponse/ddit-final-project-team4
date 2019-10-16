<template>
    <v-container>
        <p>개인정보수정 페이지</p>
        <v-form>
            <v-row justify="center">
                <v-col cols="12" sm="10" md="4">
                    <v-text-field
                        ref="name"
                        v-model="name"
                        :rules="[() => !!name || '이름을 입력해주세요!!!']"
                        label="이름"
                        outlined
                        required
                        class="juk-mu_text-field"
                    >
                    </v-text-field>

                    <v-text-field
                        type="password"
                        ref="pass"
                        v-model="pass"
                        :rules="[() => !!pass || '비밀번호를 입력해주세요!!!']"
                        label="비밀번호"
                        outlined
                        required
                        class="juk-mu_text-field"
                    >
                    </v-text-field>

                    <v-text-field
                        type="password"
                        ref="conpass"
                        v-model="conpass"
                        :rules="[() => 
                            !!conpass || '비밀번호를 확인해주세요!!!',
                            !!(pass === conpass) || '비밀번호가 일치하지 않습니다!!!'
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
                        label="연락처"
                        outlined
                        class="juk-mu_text-field"
                    >
                    </v-text-field>

                    <v-text-field
                        ref="addr"
                        v-model="addr"
                        label="주소"
                        outlined
                        class="juk-mu_text-field"
                    >
                    </v-text-field>

                    <v-btn block color="primary" class="juk-mu_btn" @click="modifyUserData">
                        수정
                    </v-btn>
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
                                </v-card-actions>

                                <vue-daum-postcode @complete="getAddress" />
                            </v-card>
                        </v-dialog>

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
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                    <v-text-field v-if="result.jibunAddress"
                        ref="addr1"
                        v-model="result.jibunAddress"
                        label="주소"
                        outlined
                        class="juk-mu_text-field"
                    >
                    </v-text-field>

                    <v-text-field v-else
                        ref="addr1"
                        v-model="result.autoJibunAddress"
                        label="주소"
                        outlined
                        class="juk-mu_text-field"
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
                    <v-btn  
                        color="primary"
                        v-model="withdrawal"
                        class="juk-mu_text-field"
                        @click="leave">탈퇴하기
                    </v-btn>

                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
import Vue from 'vue'
import VueDaumPostcode from "vue-daum-postcode"
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.use(VueDaumPostcode)

export default {
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
            result: {},
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
                        addr: this.addr + ' ' + this.sangseaddr,
                        withdrawal: this.withdrawal,
                    },
                })
                .then(res => {
                    if (res.data === 1) {
                        this.$router.replace('/');
                    }
                })
            }else{
                alert("비밀번호가 일치하지 않습니다.");
            }
        },
        getAddress(event) {
            this.result = event;
            console.log(this.result);
            this.dialog = false;
        },
        leave(){
            axios({
                url: `${this.$store.state.serverLocation}/leaveUser`,
                method: 'POST',
                data: {
                    id: this.id,
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
</style>