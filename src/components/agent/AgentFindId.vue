<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar id="toolbar" color="#00ACC1" dark flat>
                <router-link class="logo" to="/">
                 <v-icon size="50" icon color="#FFFDE7" id="email">email</v-icon>
                공인중개사 아이디 찾기</router-link>
              </v-toolbar>
              <v-card-text>
                <v-form id="idform">
                  
                    <h3>가입 시 등록한 공인중개사 사무소 이름과<br> 휴대폰 번호를 입력해주세요.</h3>
                  
                    <v-row align="center" justify="center">
                         <v-icon size="49" icon color="#00ACC1" id="face" class="icon1">face</v-icon>
                        <v-text-field label="사무소 이름" id="user"  v-model="name" class="tf"/>
                    </v-row>
                  <v-row align="center" justify="center">
                     <v-icon size="45" icon color="#00ACC1" id="phone_iphone" class="icon1">phone_iphone</v-icon>
                    <v-text-field id="phone" label="휴대폰 번호" name="phone" type="text" v-model="phone" class="tf"/>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-btn id="btn" color="#00ACC1" dark @click="findId">아이디 찾기</v-btn>
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
                  this.$swal({
                    type: 'success',
                    title: this.name + ' 회원님',
                    text: '아이디는 ' + res.data.AGENTID + ' 입니다.',
                    confirmButtonText: '로그인하기',
                  })
                  .then((result) => {
                     this.$router.push('/login/' + this.$route.params.func);
                  })
                } else if (!res.data) {
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
.tf{
    margin-right: 50px;
}
.icon1 {
  margin-right: 20px;
  margin-left: 20px;
}
#phone_iphone {
  margin-left: 22px;
}

</style>