<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar id="toolbar" color="primary" dark flat>
                <router-link class="logo" to="/">죽방</router-link>
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
                      <v-checkbox id="cb"></v-checkbox><p id="ptag">로그인 상태 유지</p>
                  </v-row> 
                </v-form>
              </v-card-text>
              <v-btn id="loginbtn" @click="login">로그인</v-btn>
              <v-card-actions>
                <v-spacer></v-spacer>
                 <router-link class="logo1" to="/join">회원가입</router-link>
                 <router-link class="logo1" to="/findId">아이디 찾기</router-link>
                 <router-link class="logo1" to="/findPass">비밀번호 찾기</router-link>
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
    props: {
      source: String,
    },
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
      }
    },
    methods: {
      login() {
        axios({
            url: `${this.$store.state.serverLocation}/login`,
            method: 'POST',
            data: {
              id: this.id,
              pw: this.pw,
            },
          })
          .then(res => {
            if(res.data[0].USER_WITHDRAWAL === 'Y'){
              alert(this.id + "은 탈퇴한 회원입니다.");
              return;
            }
            if (res.data.length === 1) {
              alert("로그인 되었습니다!!!")
              this.$router.push('/');
            }else {
              alert("일치하는 회원정보가 없습니다!!!");
            }
          })
      },
      idX() {
        this.id = "";
      }
    }
  }
</script>

<style>
  a.logo {
    color: #ffffff;
    font-size: 22pt;
    font-weight: bold;
    text-decoration: none;
  }
  a.logo1 {
    text-decoration: none;
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