<template>
  <div
    class="chat"
  >
    <ChatPopup
      v-show="visible"
      :agentid="agentid"
      :agentname="agentname"
    />
    <ChatList
      v-show="listVisible"
    />
  </div>
</template>

<script>
export default {
  beforeMount() {
    socket.on('msg', msg => {
      this.$store.dispatch('addChatMsg', msg);
      this.$store.dispatch('refreshChatList');
    });
    // socket.on('hello', async msg => {
    //   this.$store.dispatch('refreshChatList');
    // });
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
    agentname() {
      return this.$store.state.agentname;
    },
    unread() {
      return this.$store.state.unread;
    },
    listVisible() {
      return this.$store.state.listVisible;
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
    Badge: () => import('@/components/common/chat/Badge.vue'),
    ChatPopup: () => import('@/components/common/chat/ChatPopup.vue'),
    ChatList: () => import('@/components/common/chat/ChatList.vue'),
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