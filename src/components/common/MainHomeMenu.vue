<template>
<div @click.stop="hideModal">
    <v-toolbar 
        absolute
        color="transparent"
        width="100%"
        height="110px" 
        flat
    >
      <v-container fluid>
        <v-layout align-center>
          <router-link class="logo mr-10" to="/">죽방</router-link>
          <router-link to="/map/apart" class="juk-mainmenu mx-10">아파트</router-link>
          <router-link to="/map/village" class="juk-mainmenu mx-10">투룸</router-link>
          <router-link to="/map/oneRoom" class="juk-mainmenu mx-10">원룸</router-link>
          <a v-if="(loginUser || {}).type === 'user'" class="juk-mainmenu mx-4" style="cursor: pointer" @click="showModal">우리집내놓기</a>
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
    <modal
      id="modal"
      v-show="isModalVisible"
      @close="closeModal"
    />
</div>
</template>

<script>
import axios from 'axios';
import modal from '@/components/user/OfferHouseModal.vue';

export default {
  beforeMount() {
    (async () => {
      let result = await axios({
        url: `${this.serverLocation}/check`
      });

      this.loginUser = result.data.user;
      console.log(this.$route);
    })();
  },
  data() {
    return {
      loginUser: undefined,
      modalVisibility: false,
      isModalVisible: false,
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
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    hideModal(event) {
      if (event.target === document.querySelector('#modal')) {
        this.isModalVisible = false;
      }
    },
  },
  components: {
    modal,
  },
 
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

a.juk-mainmenu {
  font-size: 14pt;
  font-weight: 500;
  color: white;
  text-decoration: none;
}
</style>