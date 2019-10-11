<template>
  <header>
    <div class="container">
      <div class="logo">
          <router-link class="logo" to="/">죽방</router-link>

          </div>
          <div class="menu">
            <ul>
              <li><router-link to="/apart">아파트</router-link></li>
              <li><router-link to="/village">빌라+투룸</router-link></li>
              <li><router-link to="/oneRoom">원룸</router-link></li>
              <li><router-link to="/office">오피스텔</router-link></li>
            </ul>
          </div>
          <div class="juk-btn_login">
            <router-link v-if="!isLogin" to="/login" class="button">로그인 / 회원가입</router-link>
            <router-link v-if="isLogin" to="/mypage" class="button">마이페이지</router-link>
            <v-btn v-if="isLogin" @click="logout">로그아웃</v-btn>
          </div>
        <div class="mobile-menu"><i class="fa fa-bars"></i></div>
      </div>
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
a.logo {
    color: #1564f9;
    font-size: 24pt;
    font-weight: bold;
    text-decoration: none;
}
</style>