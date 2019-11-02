<template>
  <div @click="openChatList">
    {{ unreadCnt }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ unreadCnt: 'unreadMsgCnt' }),
  },
  methods: {
    openChatList() {
      this.$store.dispatch('openChatList');
    },
  }
}
</script>

<style>

</style>