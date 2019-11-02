<template>
  <div @click="openChatList" style="color: white; font-size: 20pt; margin-right: 20px;">
    채팅({{ unreadCnt }})
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