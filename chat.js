const axios = require('axios');
const fs = require('fs');

module.exports = function({ app, db, io, http }) {
  let socketPool = [];
  io.on('connection', socket => {
    socketPool.push(socket);
    console.log('a user connected', socketPool.map(e => e.id));
    socket.on('disconnect', () => {
      socketPool.splice(socketPool.indexOf(socket), 1);
      console.log('user disconnected', socketPool.map(e => e.id));
    });
  });
};

