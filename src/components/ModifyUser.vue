<template>
    <section>
        <v-app>
            <p>개인정보수정 페이지</p>
            <v-form>
                <v-container>
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
                    </v-row>
                </v-container>
            </v-form>
        </v-app>
    </section>
</template>

<script>
export default {
    beforeMount() {
        (async () => {
        let result = await axios({
            url: `${this.$store.state.serverLocation}/check`
        });

        this.id = result.data[0].USERID;
        this.name = result.data[0].USER_NAME;
        this.pass = result.data[0].USER_PASS;
        this.conpass = result.data[0].USER_PASS;
        this.phone = result.data[0].USER_PHONE;
        this.addr = result.data[0].USER_ADDR;
        })();
    },
    data() {
        return {
            name: '',
            pass: '',
            conpass: '',
            phone: '',
            addr: '',
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