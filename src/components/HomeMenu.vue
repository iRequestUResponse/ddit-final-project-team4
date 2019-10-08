<template>
  <header>
    <div class="container">
      <div class="logo">
          <router-link class="logo" to="/">죽방</router-link>
          <v-icon>mdi-anchor</v-icon>
          <button @click="choi">test</button>

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
            <router-link to="/login" class="button">로그인 / 회원가입</router-link>
          </div>
        <div class="mobile-menu"><i class="fa fa-bars"></i></div>
      </div>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    choi() {
      axios({
        url: 'http://localhost:8081',
      })
      .then(res => {
        console.log(res);
      })
    }
  }
}
</script>

<style>

</style>