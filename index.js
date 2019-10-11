const express = require('express');
const app = express();
const session = require('express-session');
const db = require('easy-oracledb');
const cors = require('cors');

const port = 3000;

// session
app.use(session({
    secret: 'hello world',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60,
    }
}));

// app.set('trust proxy', 1); // 필요 없는 설정인듯

// body parser
app.use(require('body-parser').json());

// cors
app.use(cors({
    origin: ['http://localhost:8081', 'http://localhost:80', 'http://localhost'],
    methods: ['*'],
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
app.listen(port, () => {
    console.log(`listening ${port}`);
});

require('./router.js')({
    app, db
});