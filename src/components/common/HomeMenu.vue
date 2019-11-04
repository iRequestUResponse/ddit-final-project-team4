<template>
<div @click.stop="hideModal">
  <header>
    <v-toolbar height="110px" flat>
      <v-container
        mx-auto
        py-0
      >
        <v-layout align-center>
          <v-icon size="50" icon color="#1564f9" @click="home" id="homeicon">apartment</v-icon>&nbsp;&nbsp;
          <router-link class="logo" to="/">죽방</router-link>
          <router-link to="/map/apart" class="offset-md-1 juk-menu">아파트</router-link>
          <router-link to="/map/village" class="offset-md-1 juk-menu">투룸/투룸</router-link>
          <v-spacer />
          <!-- <router-link v-if="!loginUser" to="/login" class="button">로그인 / 회원가입</router-link> -->
          <v-btn v-if="!loginUser" outlined tile to="/login/user">로그인 / 회원가입</v-btn>
          <v-btn v-if="!loginUser" outlined tile to="/login/agent" class="ml-4">공인중개사 회원전용</v-btn>
  
          <!-- <v-btn 
            v-if="(loginUser || {}).type === 'user'" 
            to="/mypage"
            color="grey darken-3"
            outlined
            tile
          >
            마이페이지
          </v-btn> -->
          <v-btn 
            v-if="(loginUser || {}).type === 'agent'" 
            to="/agentpage"
            color="grey darken-3"
            outlined
            tile
          >
            중개사페이지
          </v-btn>
          <v-btn 
            v-if="loginUser" 
            @click="logout"
            color="grey darken-3"
            outlined
            tile
          >
            로그아웃
          </v-btn>

        </v-layout>
      </v-container>
    </v-toolbar>
  </header>
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
    home(){
      this.$router.push('/');
    }
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

a.juk-menu {
  font-size: 19pt;
  color: black;
  text-decoration: none;
}

#homeicon {
  cursor: pointer;
}

</style>