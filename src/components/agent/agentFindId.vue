<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar id="toolbar" color="primary" dark flat>
                <router-link class="logo" to="/">중개사 아이디 찾기</router-link>
              </v-toolbar>
              <v-card-text>
                <v-form id="idform">
                  
                    <h3>가입 시 등록한 이름과<br> 휴대폰 번호를 입력해주세요.</h3>
                  
                    <v-row align="center" justify="center">
                        <img id="img1" src="@/assets/img/icon-loginId.png">
                        <v-text-field label="이름" id="user"  v-model="name"/>
                    </v-row>
                  <v-row align="center" justify="center">
                    <img id="img2" src="@/assets/img/phone.png">
                    <v-text-field id="phone" label="휴대폰 번호" name="phone" type="text" v-model="phone"/>
                  </v-row>
                  
                </v-form>
              </v-card-text>
              <v-btn id="btn" @click="findId">아이디 찾기</v-btn>
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
            phone: '',
        }
    },
    methods: {
        findId() {
            axios({
                url: `${this.serverLocation}/agentFindId?name=${this.name}&phone=${this.phone}`,
                method: 'GET',
            })
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    alert(this.name + " 회원님의 아이디는 " + res.data.AGENTID + " 입니다.");
                    this.$router.push('/login/' + this.$route.params.func);
                } else {
                    alert("일치하는 회원정보가 없습니다!!!");
                }
            })
        }
    }
}
</script>

<style>
#img1{
    width: 45px;
    height: 45px;
    margin-right: 20px;
    margin-left: 10px;
}
#img2{
    width: 45px;
    height: 45px;
    margin-right: 15px;
    margin-left: 15px;
}
#cbrow{
    margin-top: 0px;
    margin-left: 1px;
}
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
</style>