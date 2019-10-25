<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar id="toolbar" color="primary" dark flat>
                <router-link class="logo" to="/">비밀번호 찾기</router-link>
              </v-toolbar>
              <v-card-text>
                <v-form id="idform">
                  
                    <h3>가입 시 등록한 이름과<br> 아이디를 입력해주세요.</h3>
                  
                    <v-row align="center" justify="center">
                        <img id="img1" src="@/assets/img/icon-loginId.png">
                        <v-text-field label="이름" id="user"  v-model="name"/>
                    </v-row>
                  <v-row align="center" justify="center">
                    <img id="img2" src="@/assets/img/icon-loginId.png">
                    <v-text-field id="id" label="아이디(이메일형식)" name="id" type="text" v-model="id"/>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-btn id="btn" @click="findPass">비밀번호 찾기</v-btn>
              <v-card-actions>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
export default {
  props: [
    'func',
  ],
  data() {
        return {
            id: '',
            name: '',
        }
    },
    methods: {
        findPass() {
            axios({
                url: `${this.serverLocation}/findPass?id=${this.id}&name=${this.name}`,
                method: 'GET',
            })
            .then(res => {
                if (res.data === 'success') {
                  this.$swal({
                    type: 'success',
                    title: this.name + ' 회원님',
                    text: '메일주소로 임시비밀번호가 전송되었습니다.',
                    confirmButtonText: '로그인하기',
                  })
                  .then((result) => {
                    this.$router.push('/login/' + this.$route.params.func);
                  })
                } else if (this.id == '' && this.name == '') {
                  this.$swal('공백을 입력해주세요.', ' ', 'info');
                } else {
                  this.$swal('일치하는 회원정보가 없습니다.', ' ', 'error');
                }
            })
        }
    }
}
</script>

<style>

</style>