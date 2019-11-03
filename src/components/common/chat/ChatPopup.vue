<template>
    <v-container
      class="fill-height container"
      fluid
      @click.stop="close"
    >
      <!-- <v-row align="center" justify="center" @click.stop="close">
        <v-col cols="12" sm="9" md="6" @click.stop="close"> -->
          <v-card
            width="400"
            height="700"
            class="juk-chattingflame"
          >
            <v-system-bar
              color="indigo darken-2"
              dark
            >
              <v-spacer></v-spacer>
    
              <v-icon>mdi-window-minimize</v-icon>
        
              <v-icon>mdi-window-maximize</v-icon>
        
              <v-icon>mdi-close</v-icon>
            </v-system-bar>
            <v-toolbar
              color="indigo"
              dark
            >
              <v-toolbar-title>채팅방</v-toolbar-title>
            </v-toolbar>
            <v-content class="messagecont" id="chatMsgContainer">
              <v-row v-for="msg in msgList" :key="msg.seq">
                <v-col :class="{ msgCol: true, isMe: isMe(msg) }">
                  <div :class="{ 'juk-msg': true, isMe: isMe(msg) }">
                    {{ msg.msg }}
                  </div>
                  <div class="juk-msgsub">
                    {{ msg.sent | regdate }}
                  </div>
                </v-col>
              </v-row>
            </v-content>
            <v-footer
              absolute
              class="ma-0 pa-0 px-4"
            >
              <v-col cols="12" class="ma-0 pa-0">
                <v-text-field
                  type="text"
                  v-model="message"
                  label="입력하세요"
                  @keyup.enter.exact="sendMessage"
                />
              </v-col>
            </v-footer>
          </v-card>
        <!-- </v-col>
      </v-row> -->
      <!-- <div class="box">
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
      </div> -->
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
  watch: {
    msgList(nv) {
      setTimeout(function() {
        chatMsgContainer.scrollTo({ top: chatMsgContainer.scrollHeight });
      }, 10);
    }
  },
  filters: {
    regdate(value) {
      let dt = new Date(value);

      return `${dt.getHours()}:${dt.getMinutes()}`
    },
  },
  methods: {
    isMe(v) {
      return v.me === v.writer;
    },
    async sendMessage(event) {
      if (event.code !== 'Enter' || !this.message.trim()) return;

      let msg = this.message;
      this.message = '';

      let result = await axios({
        url: `${this.serverLocation}/chat/room/${this.agentid}`,
        method: 'POST',
        data: {
          msg,
        }
      });

      if (typeof result.data === 'object') {
        let seq = result.data.seq;
        await axios.patch(`${this.state.serverLocation}/chat/msg/${seq}`);
        await this.$store.dispatch('refreshChatList');
      }
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

.messagecont {
  height: 73%;
  overflow-y: auto;
  overflow-x: hidden;
}

.juk-chattingflame {
  margin: auto;
}

.msgCol.isMe {
  text-align: right;
}

.juk-msg {
  display: inline-block;
  text-align: left;
  margin-left: 6px;
}

.juk-msg {
  background: #727272;
  color: #FFF;
  padding: 0.25em 1em;
  border-radius: 1em 1em 1em 0;
}

.juk-msg.isMe {
  background: #4e7063;
  color: #FFF;
  padding: 0.25em 1em;
  border-radius: 1em 1em 0 1em;
}

.juk-msgsub {
  font-size: 9pt;
  margin-left: 12px;
}

.bor {
  border: 2px solid red;
}
</style>