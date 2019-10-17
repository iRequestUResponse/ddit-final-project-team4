<template>
  <header>
    <v-toolbar height="110px" fixed="true" flat>
      <v-container
        mx-auto
        py-0
      >
        <v-layout align-center>
          <router-link class="logo" to="/">죽방</router-link>
          <router-link to="/map/apart" class="offset-md-1 juk-menu">아파트</router-link>
          <router-link to="/map/village" class="offset-md-1 juk-menu">빌라+투룸</router-link>
          <router-link to="/map/oneRoom" class="offset-md-1 juk-menu">원룸</router-link>
          <router-link to="/map/office" class="offset-md-1 juk-menu">오피스텔</router-link>
          <v-spacer />
          <!-- <router-link v-if="!loginUser" to="/login" class="button">로그인 / 회원가입</router-link> -->
          <v-btn v-if="!loginUser" to="/login/user">로그인 / 회원가입</v-btn>
          <v-btn v-if="!loginUser" to="/login/agent">공인중개사 회원전용</v-btn>
          <v-btn v-if="(loginUser || {}).type === 'user'" to="/mypage">마이페이지</v-btn>
          <v-btn v-if="(loginUser || {}).type === 'agent'" to="/agentpage">중개사페이지</v-btn>
          <v-btn v-if="loginUser" @click="logout">로그아웃</v-btn>
        </v-layout>
      </v-container>
    </v-toolbar>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  beforeMount() {
    (async () => {
      let result = await axios({
        url: `${this.serverLocation}/check`
      });

      this.loginUser = result.data.user;
    })();
  },
  data() {
    return {
      loginUser: undefined,
    };
  },
  methods: {
    async logout() {
      await axios({
        url: `${this.serverLocation}/logout`
      });
      
      this.loginUser = undefined;
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
header {
  border-bottom: 1px solid #dedede;
}

a.logo {
    color: #1564f9;
    font-size: 32pt;
    font-weight: bold;
    text-decoration: none;
}

a.juk-menu {
  font-size: 18pt;
  font-weight: 500;
  color: black;
  text-decoration: none;
}
</style>