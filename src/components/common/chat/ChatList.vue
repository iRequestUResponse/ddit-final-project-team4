<template>
  <v-container class="fill-height container" fluid @click.stop="close">
  <!-- <v-container class="fill-height container" fluid> -->
    <v-card width="400" height="700" class="juk-chattingflame">
      <v-system-bar color="indigo darken-2" dark>
        <v-spacer></v-spacer>

        <v-icon>mdi-window-minimize</v-icon>

        <v-icon>mdi-window-maximize</v-icon>

        <v-icon>mdi-close</v-icon>
      </v-system-bar>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>채팅리스트</v-toolbar-title>
      </v-toolbar>
      <v-content class="messagecont">
        <v-row v-for="chat in chatList" :key="chat.CHATTING_SEQ" class="messagerow" @click="openChat(chat)">
          <!-- <div class="wrap chatlist container"> -->
          <div class="list">
            <div class="title">{{ chat | partnerId }}와의 채팅</div>
            <div class="unreadCount" v-show="chat.CNT > 0">{{ chat.CNT }}</div>
          </div>
        </v-row>
      </v-content>
    </v-card>
  </v-container>
</template>

<script>
  import {
    mapState,
    mapGetters
  } from "vuex";

  export default {
    mounted() {},
    filters: {
      partnerId(v) {
        return v.USERID === v.ID ? v.AGENTID : v.USERID;
      },
    },
    computed: {
      ...mapState({
        chatList: 'chatRoomList'
      }),
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

<style scoped>
.container {
  position: fixed;
  z-index: 98;
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
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;
}

.messagerow {
  margin: 0;
  padding: 4px 12px;
  background: #c9d1ce;
  cursor: pointer;
}

.messagerow:hover {
  background: #d7e9e1;
}

.juk-chattingflame {
  margin: auto;
}

.juk-msg {
  margin-left: 6px;
}

.juk-msgsub {
  font-size: 9pt;
  margin-left: 12px;
}

.bor {
  border: 2px solid red;
}

.list {
  position: relative;
  width: 100%;
}

.list .unreadCount {
  position: absolute;
  right: 0;
  top: 0;
  background: #ce5e75;
  color: #FFF;
  display: block;
  width: 1.5em;
  height: 1.5em;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  border-radius: 2em;
}
</style>