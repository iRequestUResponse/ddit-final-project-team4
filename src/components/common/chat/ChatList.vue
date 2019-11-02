<template>
  <div
    class="wrap chatlist container"
    @click.stop="close"
  >
    <div class="box">
      <div v-for="chat in chatList" :key="chat.CHATTING_SEQ" @click="openChat(chat)">
        {{ chat | partnerId }}와의 채팅 / (안 읽은 메시지: {{ chat.CNT }} 개)
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  mounted() {
  },
  filters: {
    partnerId(v) {
      return v.USERID === v.ID ? v.AGENTID : v.USERID;
    }
  },
  computed: {
    ...mapState({ chatList: 'chatRoomList' }),
  },
  methods: {
    openChat(chat) {
      let partner = chat.USERID === chat.ID ? chat.AGENTID : chat.USERID;
      this.$store.dispatch('chatJoin', partner);
    },
    close(event) {
      if (event.target.classList.contains('container'))
        this.$store.dispatch('closeChatList');
    },
  }
}
</script>

<style>

</style>