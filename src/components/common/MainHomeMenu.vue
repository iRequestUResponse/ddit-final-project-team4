<template>
<div>
    <v-toolbar 
        absolute
        color="transparent"
        width="100%"
        height="110px" 
        flat
    >
      <v-container fluid>
        <v-layout align-center>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <v-icon size="50" icon color="yellow">apartment</v-icon>&nbsp;&nbsp;
          <router-link class="logo mr-10" to="/">죽방</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link to="/map/apart" class="juk-mainmenu mx-12">아파트</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link to="/map/village" class="juk-mainmenu mx-12">원룸/투룸</router-link>
          <v-spacer />
          <!-- <router-link v-if="!loginUser" to="/login" class="button">로그인 / 회원가입</router-link> -->
          <router-link v-if="!loginUser" to="/login/user" class="juk-mainmenu mx-4">로그인 / 회원가입</router-link>
          <router-link v-if="!loginUser" to="/login/agent" class="juk-mainmenu mx-4">공인중개사 회원전용</router-link>
  
            <router-link v-if="(loginUser || {}).type === 'user'" to="/mypage" class="juk-mainmenu mx-4">마이페이지</router-link>
            <router-link v-if="(loginUser || {}).type === 'agent'" to="/agentpage" class="juk-mainmenu mx-4">중개사페이지</router-link>
            <a v-if="loginUser" style="cursor: pointer" @click="logout" class="juk-mainmenu mx-4">로그아웃</a>
        </v-layout>
      </v-container>
    </v-toolbar>
</div>
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
      
      this.$store.dispatch('refreshChatList');
      this.$store.dispatch('clear');
      
      this.loginUser = undefined;

      this.$swal({
        type: 'success',
        title: '로그아웃',
        text: '로그아웃이 정상적으로 되었습니다.',
      })
      .then((result) => {
        this.$router.push('/');
        location.reload();
      })
    },
  },
  components: {

  },
 
}
</script>

<style scoped>
header {
  border-bottom: 1px solid #dedede;
}

a.logo {
    color:  yellow;
    font-size: 32pt;
    text-decoration: none;
}

a.juk-mainmenu {
  font-size: 19pt;
  color: white;
  text-decoration: none;
}
a.juk-mainmenu:hover{
  color: lightskyblue;
}
</style>