<template>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar id="toolbar" color="primary" dark flat>
                <router-link class="logo" to="/">죽방</router-link>
                <v-spacer></v-spacer>
                <div class="juk-agent_title">중개사</div>
              </v-toolbar>
              <v-card-text>
                <v-form id="idform">
                  <v-row align="center" justify="center">
                    <img id="img1" src="@/assets/img/icon-loginId.png">
                    <v-text-field label="ID" id="user"  v-model="id" name="login"/>
                    <img id="xx" src="@/assets/img/iconX.png" @click="idX">
                  </v-row>
                  <v-row align="center" justify="center">
                    <img id="img2" src="@/assets/img/iconloginKey.png">
                    <v-text-field id="pass" label="PASSWORD" name="pass" type="password" v-model="pw"/>
                  </v-row>
                  <v-row id="cbrow">
                      <v-checkbox id="cb" v-model="checked"></v-checkbox><p id="ptag">로그인 상태 유지</p> {{ checked }}
                  </v-row> 
                </v-form>
              </v-card-text>
              <v-btn id="loginbtn" @click="login">로그인</v-btn>
              <v-card-actions>
                <v-spacer></v-spacer>
                 <router-link class="logo1" to="/join/agent">회원가입</router-link>
                 <router-link class="logo1" to="/findId/agent">아이디 찾기</router-link>
                 <router-link class="logo1" to="/findPass/agent">비밀번호 찾기</router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
export default {
  props: {
    source: String,
  },
  props: [
    'func',
  ],
  beforeMount() {
    (async () => {
      if (await this.loginCheck()) this.$router.push('/');
    })();
  },
  data() {
    return {
      id: '',
      pw: '',
      drawer: null,
      checked: false,
    }
  },
  methods: {
    login() {
      axios({
        url: `${this.serverLocation}/agentLogin`,
        method: 'POST',
        data: {
          id: this.id,
          pw: this.pw,
        },
      })
      .then(res => {
        if (res.data.AGENT_WITHDRAWAL === 'Y') {
          this.$swal( this.id , '아이디는 탈퇴한 회원입니다.', 'info');
          return;
        }
        if (res.data.AGENT_APPR === 'N') {
          this.$swal( this.id , '아이디는 승인 처리중입니다.', 'info');
          return;
        }
        if (res.data.AGENTID) {
          // if(this.checked === true){

          // }
          // this.$swal(this.id , '회원님 로그인 성공', 'success');
          this.$swal({
            type: 'success',
            title: this.id + '님',
            text: '로그인이 정상적으로 되었습니다.',
            confirmButtonText: '시작하기',
          })
          .then((result) => {
             this.$router.push('/');
          })

        } else {
          this.$swal({
            type: 'error',
            title: '일치하는 정보가 없습니다.',
            text: "아이디 비밀번호를 다시 확인해주세요.",
            confirmButtonText: 'OK',
          })
          this.pw = "";
        }
      })
    },
    idX() {
      this.id = "";
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
    a.logo1 {
        text-decoration: none;
    }
    .juk-agent_title {
        color: #fff;
        font-size: 18pt;
    }
    #img1{
        width: 45px;
        height: 45px;
        margin-right: 20px;
        margin-left: 10px;
    }
    #img2{
        width: 40px;
        height: 40px;
        margin-right: 23px;
        margin-left: 10px;
    }
    #ptag{
        font-weight: bold;
        margin-top: 22px;
    }
    #loginbtn{
        width: 82%;
        height: 50px;
        margin-left: 60px;
        margin-bottom: 20px;
        margin-top: 130px;
        background: rgb(228, 223, 223);
        font-weight: bold;
        font-size: 1.2em;
    }
    #idform{
        padding: 50px;
    }
    #cbrow{
        margin-top: 0px;
        margin-left: 1px;
    }
    .logo1{
        margin-left: 25px;
    }
    #xx{
        cursor: pointer;
    }
    /* 텍스트 필드 줄이는 방법!!! */
</style>
