<template>
  <header>
    <v-toolbar height="110px" fixed="true" flat>
      <v-container
        mx-auto
        py-0
      >
        <v-layout align-center>
          <router-link class="logo" to="/">죽방</router-link>
          <a class="offset-md-1 juk-menu" @click="sendPage('AgentSalesManage')">매물등록</a>
          <a class="offset-md-1 juk-menu" @click="sendPage('AgentOfferedList')">내놓은방</a>
          <a class="offset-md-1 juk-menu" @click="sendPage('AgentModify')">개인정보수정</a>
          <v-spacer />
          <!-- <router-link v-if="!loginUser" to="/login" class="button">로그인 / 회원가입</router-link> -->
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
    },
    sendPage(e) {
      this.$emit('agtPage', e);
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