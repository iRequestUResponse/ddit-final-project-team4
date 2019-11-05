const axios = require('axios');
const fs = require('fs');

module.exports = function({ app, db, io, http }) { 
  io.on('connection', socket => {
    console.log('a user connected:', socket.id);
    socket.emit('hello', 'hello');
    // console.log('==============================');
    // // console.log('khs user: ', getUserSocket(io, 'khs'));
    // console.log('my id :', socket.id);
    // console.log('socket list:', getConnected(io));
    for (let e in io.sockets.connected) {
      io.sockets.connected[e].emit('test', 'hello world');
    }
    // console.log('socket-session-id :', socket.request.session.id);
    // console.log('==============================');
    socket.on('disconnect', () => {
      // console.log('==============================');
      // console.log('user disconnected', socket.id);
      // console.log('socket list:', Object.getOwnPropertyNames(io.sockets.connected));
      // console.log('==============================');
    });

    socket.on('connect to', ({user, agent}) => {
      // console.log('connect to', user, agent);

      socket.emit('agent', (getUserSocket(io, agent) || {}).id);
    });
  });

  // get previous messages
  app.get('/api/chat/room/:partner', async (req, res, next) => {
    if (!req.session.user) {
      res.send('login required');
      return;
    }

    let me = req.session.user.USERID || req.session.user.AGENTID;
    let partner = req.params.partner;
    let type = req.session.user.type;

    let userid, agentid;
    if (type === 'user') {
      userid = me;
      agentid = partner;
    } else {
      userid = partner;
      agentid = me;
    }

    let sql = db.readSQL(process.cwd() + '/sql/chat/getPreviousMsg.sql');
    let result = await db.getData(sql, [userid, agentid]);
  
    res.send(result.map(e => ({
      seq: e.CHAT_SEQ,
      msg: e.CHAT_CONT,
      me,
      writer: e.WRITERID,
      writer_type: e.USER_TYPE,
      sent: +new Date(e.CHATTING_DATE),
    })));
  });
  
  // send message to chat room
  app.post('/api/chat/room/:partner', async (req, res, next) => {
    if (!req.session.user) {
      res.send('login required');
      return;
    }

    let me = req.session.user.USERID || req.session.user.AGENTID;
    let partner = req.params.partner;
    let type = req.session.user.type;

    let userid, agentid;
    if (type === 'user') {
      userid = me;
      agentid = partner;
    } else {
      userid = partner;
      agentid = me;
    }

    let isValidRoom = (await db.getData('select count(1) cnt from chatroom where userid = :userid and agentid = :agentid', [userid, agentid]))[0].CNT === 1;

    if (!isValidRoom) {
      let isExistsPartnerSql = db.readSQL(process.cwd() + '/sql/chat/isExistsPartner.sql');
      let isExistsPartner = (await db.getData(isExistsPartnerSql, [partner]))[0].CNT;
      if (isExistsPartner !== 1) {
        res.send('not exists user(agent)');
        return;
      }

      let sql = db.readSQL(process.cwd() + '/sql/chat/joinRoom.sql');
      let result = await db.exec(sql, [userid, agentid]);
      if (result !== 1) {
        res.send('no valid room exists');
        return;
      }
    }

    let chattingRoomNumber = (await db.getData('select chatting_seq seq from chatroom where userid = :userid and agentid = :agentid', [userid, agentid]))[0].SEQ;

    let sql = db.readSQL(process.cwd() + '/sql/chat/newMsg.sql');
    let result = await db.getData(sql, [chattingRoomNumber, req.body.msg, me, type]);
    let seq = result[0].SEQ;

    let readMsgSql = db.readSQL(process.cwd() + '/sql/chat/readMsg.sql');
    let readResult = await db.exec(readMsgSql, [me, seq]);

    let socketList = getUserSocketList(io, me, partner);
    emitToList(socketList, 'msg', {
      seq,
      writer: me,
      writer_type: type,
      msg: req.body.msg,
      sent: Date.now(),
    });
    res.send({
      state: 'success',
      seq,
    });
  });

  // leave chat room
  app.delete('/api/chat/room/:partner', async (req, res, next) => {
    res.send('you cannot leave this chat room');
  });

  // 읽음 표시
  app.patch('/api/chat/msg/:seq', async (req, res, next) => {
    if (!req.session.user) {
      res.send('login required');
      return;
    }

    let me = req.session.user.USERID || req.session.user.AGENTID;
    let seq = req.params.seq;
    let sql = db.readSQL(process.cwd() + '/sql/chat/readMsg.sql');

    let result = await db.exec(sql, [me, seq]);
    res.send(result + '');
  });

  app.get('/api/chat/unread', async (req, res, next) => {
    if (!req.session.user) {
      res.send('login required');
      return;
    }

    let me = req.session.user.USERID || req.session.user.AGENTID;

    let sql = db.readSQL(process.cwd() + '/sql/chat/unreadMsg.sql');
    let result = await db.getData(sql, [me]);

    res.send(result);
  });

  app.get('/api/chat/list', async (req, res, next) => {
    if (!req.session.user) {
      res.send('login required');
      return;
    }

    let me = req.session.user.USERID || req.session.user.AGENTID;

    let sql = db.readSQL(process.cwd() + '/sql/chat/chatList.sql');
    let chatList = await db.getData(sql, [me]);
    
    res.send({ chatList, me: req.session.user.type });
  });

  app.get('/api/getAgentname/:agentid', async (req, res, next) => {
    let sql = `select agent_name name from agent where agentid = :agentid`;
    let agentname = await db.getData(sql, [req.params.agentid]);
    
    res.send(agentname[0].NAME);
  });
};

/**
 * 유저(중개사 포함)의 id에 해당하는 소켓 리스트를 얻는다
 * @param {object} io io
 * @param {string} id userid or agentid
 */
function getUserSocketList(io, ...ids) {
  let result = [];
  for (let socketid in io.sockets.sockets) {
    let socket = io.sockets.sockets[socketid];

    let user = socket.request.session.user || {};
    
    if (ids.includes(user.AGENTID) || ids.includes(user.USERID)) {
      result.push(socket);
    }
  }
  
  return result;
}

/**
 * 배열에 담긴 모든 소켓에 데이터를 보낸다
 * @param {array} socketList 한 유저의 소켓 목록
 * @param {string} event 이벤트명
 * @param {any} data 보낼 내용
 */
function emitToList(socketList, event, data) {
  for (let socket of socketList) {
    let _data = {
      ...data,
      me: socket.request.session.user.USERID || socket.request.session.user.AGENTID,
    }
    socket.emit(event, _data);
  }
}