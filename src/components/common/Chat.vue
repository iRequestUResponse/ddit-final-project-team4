<template>
  <div
    class="chat"
  >
    <ChatPopup
      v-show="visible"
      :agentid="agentid"
    />
    <!-- <div class="unread">
      unread : {{ unread }}
    </div> -->
    <!-- <v-btn @click="joinRoom">join</v-btn> -->
  </div>
</template>

<script>
export default {
  beforeMount() {
    socket.on('msg', msg => {
      this.$store.dispatch('addChatMsg', msg);
    });
  },
  data: () => ({
    chatRoomList: [],
  }),
  computed: {
    visible() {
      return this.$store.state.chatVisible;
    },
    agentid() {
      return this.$store.state.agentid;
    },
    unread() {
      return this.$store.state.unread;
    }
  },
  methods: {
    // async joinRoom() {
    //   // this.visible = true;

    //   // let result = await axios({
    //   //   url: `${this.serverLocation}/chat/room/${this.agentid}`,
    //   //   method: 'GET',
    //   // });

    //   // this.loaded = true;
    // },
  },
  components: {
    ChatPopup: () => import('@/components/common/chat/ChatPopup.vue'),
  }
}
</script>

<style scoped>
.chat {
  position: absolute;
  z-index: 999;
}

.unread {
  position: fixed;
  z-index: 9999;
  background: #FFF;
}
</style>