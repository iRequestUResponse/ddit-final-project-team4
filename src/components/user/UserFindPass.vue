<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar id="toolbar" color="primary" dark flat>
                  <router-link class="logo" to="/">
                    <v-row>
                      <v-icon size="50" icon color="#FFFDE7" id="https">https</v-icon>
                      <p id="pp">비밀번호 찾기</p>
                    </v-row>
                  </router-link>
              </v-toolbar>
              <v-card-text>
                <v-form id="idform">
                  
                    <h3>가입 시 등록한 아이디와<br> 이름을 입력해주세요.</h3>
                  
                  <v-row align="center" justify="center">
                    <v-icon size="49" icon color="#039BE5" id="email" class="icon1">email</v-icon>
                    <v-text-field id="id" label="아이디(이메일형식)" name="id" type="text" v-model="id" class="tf"/>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-icon size="49" icon color="#039BE5" id="face" class="icon1">face</v-icon>
                    <v-text-field label="이름" id="user"  v-model="name" class="tf"/>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-btn color="primary" id="btn" @click="findPass">비밀번호 찾기</v-btn>
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

<style scoped>

a.logo {
    color: #ffffff;
    font-size: 22pt;
    font-weight: bold;
    text-decoration: none;
}
h3{
    text-align: center;
    color: black;
    margin-top: 20px;
    margin-bottom: 20px;
}
#btn{
    width: 82%;
    height: 50px;
    margin-left: 60px;
    margin-bottom: 20px;
    margin-top: 150px;
    background: rgb(228, 223, 223);
    font-weight: bold;
    font-size: 1.2em;
}
  #pp {
    margin-top: 20px;
    margin-left: 10px;
    color: white;
  }
  .icon1 {
    margin-right: 20px;
    margin-left: 20px;
  }
  #https {
    margin-left: 20px;
  }
  .tf{
    margin-right: 50px;
  }
</style>