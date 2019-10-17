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
  components: {
    user: () => import('@/components/user/userFindPass.vue'),
    agent: () => import('@/components/agent/agentFindPass.vue'),
  }
}
</script>

<style>

</style>