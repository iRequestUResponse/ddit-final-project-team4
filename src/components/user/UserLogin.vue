<template>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="9" md="6" id="cole">
            <v-card class="elevation-12 bor" tile color="white">
              <v-container fluid class="pa-0">
                <v-row class="ma-0 pa-0">
                  <v-col cols="6" class="ma-0 pa-0">
                    <v-toolbar id="toolbar" color="primary" dark flat>
                      <router-link class="logo" to="/">
                      <v-row>
                      <v-icon size="50" icon color="#FFFDE7" id="aparticon">apartment</v-icon><p id="loginp">회원 로그인</p>
                      </v-row>
                      </router-link>
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
                    <v-row>
                      <v-col>
                        <v-btn id="loginbtn" color="primary" @click="login">로그인</v-btn>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <router-link class="logo1" to="/join/user">회원가입</router-link>
                      <router-link class="logo1" to="/findId/user">아이디 찾기</router-link>
                      <router-link class="logo1" to="/findPass/user">비밀번호 찾기</router-link>
                    </v-card-actions>
                  </v-col>
                  <v-col class="pa-0 ma-0" cols="6">
                    <v-img src="@/assets/img/welcome.jpg"/>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<style scoped>
    a.logo {
        margin-left: 10px;
        color:#FFFDE7;
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
        width: 85%;
        height: 43px;
        margin-left: 30px;
        margin-bottom: 20px;
        margin-top: 129px;
        background: #D84315;
        font-weight: bold;
        font-size: 1.2em;
        color: #FFFDE7;
    }
    #idform{
        padding: 50px;
    }
    #cbrow{
        margin-top: 0px;
        margin-left: 1px;
    }
    .logo1{
        margin-right: 30px;
    }
    #xx{
        cursor: pointer;
    }
    #welcome {
      width: 500px;
      height: 655px;
      margin-top: 7px;
      margin-left: -26px;
    }
    #cole {
      margin-left: 100px;
      width: 400px;
    }
    #aparticon {
      margin-right: 10px; 
    }
    #loginp {
      color: #FFFDE7;
      margin-top: 15px;
    }
    /* 텍스트 필드 줄이는 방법!!! */

</style>

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
          url: `${this.serverLocation}/login`,
          method: 'POST',
          data: {
            id: this.id,
            pw: this.pw,
          },
        })
        .then(async res => {
          if (res.data.USER_WITHDRAWAL === 'Y') {
            this.$swal('탈퇴한 회원입니다.', '고객센터로 연락해주세요.(042-222-8202)','warning');
            return;
          }
          console.log(res.data)
          if (res.data.USERID) {
            this.$store.dispatch('refreshChatList');
            this.$swal({
              type: 'success',
              title: this.id,
              text: '회원님 로그인이 되었습니다.',
              confirmButtonText: '확인',
            })
            .then((result) => {
              this.$router.push('/');
              location.reload();
            })
          } else {
            this.$swal({
              type: 'info',
              title: '일치하는 회원정보가 없습니다',
              text: '아이디 비밀번호를 다시 입력해주세요.',
              confirmButtonText: '확인',
            })
            this.pw = "";
          }
        })
      },
      idX() {
        this.id = "";
      },
      home() {
        router.go(-1);
      },
    }
}
</script>