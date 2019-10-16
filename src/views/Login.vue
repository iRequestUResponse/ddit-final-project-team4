<template>
  <v-app id="inspire">
    <component :is="logintype" />
  </v-app>
</template>

<script>
export default {
  props: [
    'func',
  ],
  beforeMount() {
    (async () => {
      if (await this.loginCheck()) this.$router.push('/');
    })();
  },
  data() {
    return {
      logintype: this.$route.params.func,
    }
  },
  methods: {
    login() {
      axios({
        url: `${this.$store.state.serverLocation}/login`,
        method: 'POST',
        data: {
          id: this.id,
          pw: this.pw,
        },
      })
      .then(res => {
        if (res.data[0].USER_WITHDRAWAL === 'Y') {
          alert(this.id + "은 탈퇴한 회원입니다.");
          return;
        }
        if (res.data.length === 1) {
          alert("로그인 되었습니다!!!")
          this.$router.push('/');
        } else {
          alert("일치하는 회원정보가 없습니다!!!");
        }
      })
    },
    idX() {
      this.id = "";
    }
  },
  components: {
    user: () => import('@/components/user/userLogin.vue'),
    agent: () => import('@/components/agent/agentLogin.vue'),
  }
}
</script>

<style>

</style>