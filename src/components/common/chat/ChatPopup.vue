<template>
  <v-container
    class="container"
    fluid
    @click.stop="close"
  >
    <div class="box">
      <div class="messageList">
        <p v-for="msg in msgList" :key="msg.seq">
          <span>{{ msg.msg }}</span>
          / time: 
          <span>{{ msg.sent }}</span>
        </p>
      </div>
      <div class="inputbox">
        <input
          type="text"
          v-model="message"
          @keydown="sendMessage"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  props: ['agentid'],
  data: () => ({
    message: '',
    loaded: false,
  }),
  computed: {
    msgList() {
      return this.$store.state.chatMsgList.slice(0).sort((a, b) => a.sent - b.sent);
    }
  },
  methods: {
    async sendMessage(event) {
      if (event.code !== 'Enter') return;

      let result = await axios({
        url: `${this.serverLocation}/chat/room/${this.agentid}`,
        method: 'POST',
        data: {
          msg: this.message,
        }
      });

      this.message = '';
    },
    close(event) {
      if (event.target.classList.contains('container'))
        this.$store.dispatch('chatClose');
    },
    async getPreviousMsg(agentid) {
      let result = await axios({
        url: `${this.serverLocation}/chat/room/${agentid}`,
        method: 'GET',
      });
    },
    leaveRoom(agentid) {
      this.loaded = false;
      this.messageList = [];
      this.visible = false;
    },
  }
}
</script>

<style scoped>
.container {
  position: fixed;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.box {
  background: #FFF;

  width: 400px;
  height: 700px;
}

header {
  cursor: move;
  width: 100%;
  height: 32px;
}
</style>