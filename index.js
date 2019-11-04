const express = require('express');
const app = express();
const session = require('express-session');
const db = require('easy-oracledb');
const cors = require('cors');
const fs = require('fs');

const port = 3000;

// session
let mSession = session({
  secret: 'hello world',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60,
  }
});
app.use(mSession);

// app.set('trust proxy', 1); // 필요 없는 설정인듯

// body parser
app.use(require('body-parser').json());

// cors
app.use(cors({
    origin: ['http://localhost:8081', 'http://localhost:8082', 'http://localhost:80', 'http://localhost', 'http://192.168.0.169:8081', 'http://192.168.0.91:8081', 'http://192.168.0.121:8081', 'http://192.168.0.121:3000'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH', 'CONNECT', 'TRACE'],
    credentials: true
}));

// use static
app.use(express.static('static'));

// db config
db.config({
  user: 'team4_201904F',
  pass: 'java',
  conn: '112.220.114.130:1521/xe'
});

// -----------
// app.listen(port, () => {
//   console.log(`listening ${port}`);
// });

app.set('sessionList', []);

// socket.io
const http = require('http').createServer(app);
http.listen(port, () => {
  console.log(`liseten on *:${port}`);
});
const io = require('socket.io')(http);
io.use((socket, next) => {
  mSession(socket.request, socket.request.res, next);
})
require('./chat')({ app, db, io, http });

app.get('/:id*', (req, res, next) => {
  app.set('sessionList', [...new Set([...app.settings.sessionList, req.sessionID])]);
  // console.log(app.settings.sessionList);
  if (req.params.id === 'api') next();
  else if (req.params.id === 'chat') res.sendFile(process.cwd() + '/chat/index.html');
  else res.sendFile(process.cwd() + '/static/index.html');
});

fs.readdirSync('./routers').forEach(e => {
  let router = require(`./routers/${e}`);
  router({ app, db });
});