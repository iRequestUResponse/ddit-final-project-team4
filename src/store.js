import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { VuexPersistence } from "vuex-persist";

Vue.use(Vuex)

const vuexSession = new VuexPersistence({
  storage: sessionStorage,
})

export default new Vuex.Store({
  state: {
    user: {},
    serverLocation,
    agentid: '',
    chatVisible: false,
    listVisible: false,
    chatMsgList: [],
    chatRoomList: [],
    unreadMsgList: [],
  },
  getters: {
    unreadMsgCnt(state) {
      return state.chatRoomList.reduce((p, c) => p + (c.CNT || 0), 0);
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = {};
    },
    setAgentid(state, agentid) {
      state.agentid = agentid;
    },
    setChatVisible(state, visible) {
      state.chatVisible = visible;
    },
    setListVisible(state, visible) {
      state.listVisible = visible;
    },
    refreshList(state, chatRoom) {
      state.chatRoomList = chatRoom.chatList;
      // state.chatRoomList.me = chatRoom.me;
      // alert(JSON.stringify(chatRoom));
    },
    addMsg(state, msg) {
      state.chatMsgList = [...state.chatMsgList, msg];
    },
    setMsgList(state, msgList) {
      state.chatMsgList = msgList;
    },
  },
  actions: {
    async refreshUser({ commit }) {
      let result = await axios({
        url: `${serverLocation}/check`,
        method: 'GET',
      });
      
      commit('setUser', result.data.user);
    },
    async chatJoin({ commit }, agentid) {
      commit('setAgentid', agentid);
      let result = await axios({
        url: `${serverLocation}/chat/room/${agentid}`,
        method: 'GET',
      });
      let msgList = result.data;
      if (typeof msgList === 'string') {
        commit('setMsgList', []);
      } else {
        let seq = msgList.reduce((p, c) => p > c.seq ? p : c.seq, -1);
        await axios.patch(`${serverLocation}/chat/msg/${seq}`);

        // refresh;
        let list = await axios.get(`${serverLocation}/chat/list`);
        if (list.data.chatList) {
          commit('refreshList', list.data);
        } else {
          commit('refreshList', []);
        }
        commit('setMsgList', msgList);
      }
      
      // let seq = this.state.chatMsgList.sort((a, b) => a.sent - b.sent).slice(-1)[0].seq;
      // let patch = await axios.patch(`${serverLocation}/chat/msg/${seq}`);
      
      commit('setChatVisible', true);
    },
    chatClose({ commit }) {
      commit('setChatVisible', false);
    },
    async addChatMsg({ commit }, msg) {
      commit('addMsg', msg);
      
      if (this.state.chatVisible) {
        let seq = this.state.chatMsgList.sort((a, b) => a.sent - b.sent).slice(-1)[0].seq;
        let result = await axios.patch(`${serverLocation}/chat/msg/${seq}`);
        console.log('read?', seq, '...', result);
      }
    },
    async refreshChatList({ commit }) {
      let list = await axios.get(`${serverLocation}/chat/list`);
      if (list.data.chatList) {
        commit('refreshList', list.data);
      } else {
        commit('refreshList', []);
     }
    },
    openChatList({ commit }) {
      commit('setListVisible', true);
    },
    closeChatList({ commit }) {
      commit('setListVisible', false);
    },
    clear({ commit }) {
      commit('refreshList', []);
      commit('setMsgList', []);
      commit('setListVisible', false);
    }
  },
  plugins: [vuexSession.plugin],
})
