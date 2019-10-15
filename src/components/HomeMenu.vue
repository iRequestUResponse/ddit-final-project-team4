<template>
  <header>
    <v-toolbar height="110px" fixed="true" flat>
      <v-container
        mx-auto
        py-0
      >
        <v-layout align-center>
          <router-link class="logo" to="/">죽방</router-link>
          <router-link to="/apart" class="offset-md-1 juk-menu">아파트</router-link>
          <router-link to="/village" class="offset-md-1 juk-menu">빌라+투룸</router-link>
          <router-link to="/oneRoom" class="offset-md-1 juk-menu">원룸</router-link>
          <router-link to="/office" class="offset-md-1 juk-menu">오피스텔</router-link>
          <v-spacer />
          <!-- <router-link v-if="!isLogin" to="/login" class="button">로그인 / 회원가입</router-link> -->
          <v-btn v-if="!isLogin" to="/login">로그인 / 회원가입</v-btn>
          <v-btn v-if="!isLogin" to="/agentLogin">공인중개사 회원전용</v-btn>
          <v-btn v-if="isLogin" to="/mypage" class="button">마이페이지</v-btn>
          <v-btn v-if="isLogin" @click="logout">로그아웃</v-btn>
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
        url: `${this.$store.state.serverLocation}/check`
      });

      this.isLogin = !!result.data;
    })();
  },
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    async logout() {
      await axios({
        url: `${this.$store.state.serverLocation}/logout`
      });

      this.isLogin = false;
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