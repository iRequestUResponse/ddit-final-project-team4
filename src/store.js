import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    serverLocation: '//localhost:3000/api',
    agentid: '',
    chatVisible: false,
    chatMsgList: [],
    unreadMsgList: [],
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
        url: `//localhost:3000/api/check`,
        method: 'GET',
      });
      
      commit('setUser', result.data.user);
    },
    async chatJoin({ commit }, agentid) {
      commit('setAgentid', agentid);
      let result = await axios({
        url: `${this.state.serverLocation}/chat/room/${agentid}`,
        method: 'GET',
      });
      let msgList = result.data;
      if (typeof msgList === 'string') {
        commit('setMsgList', []);
      } else {
        commit('setMsgList', msgList);
      }
      
      let seq = this.state.chatMsgList.sort((a, b) => a.sent - b.sent).slice(-1)[0].seq;
      let patch = await axios.patch(`${this.state.serverLocation}/chat/msg/${seq}`);
      
      commit('setChatVisible', true);
    },
    chatClose({ commit }) {
      commit('setChatVisible', false);
    },
    async addChatMsg({ commit }, msg) {
      commit('addMsg', msg);
      
      if (this.state.chatVisible) {
        let seq = this.state.chatMsgList.sort((a, b) => a.sent - b.sent).slice(-1)[0].seq;
        let result = await axios.patch(`${this.state.serverLocation}/chat/msg/${seq}`);
        console.log('read?', seq, '...', result);
      }
    },
  },
})
