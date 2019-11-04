<template>
  <div @click="openChatList" style="color: white; font-size: 20pt; margin-right: 20px; cursor: pointer">
    <v-icon
      :class="{chat: true, unread: unreadCnt > 0}"
      :data-count="unreadCnt"
    >fa-comments</v-icon>
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

<style scoped>
.chat {
  font-size: 1.2em;
  color: #FFF;
  transition: 0.4s ease;
}

.chat.unread {
  font-size: 1.5em;
  color: #ce5e75;
}

.chat.unread:after {
  content: attr(data-count);
  font-size: 0.4em;
  color: #FFF;
  position: relative;
  font-weight: bold;
  left: -1.8em;
  top: -4px;
}
</style>