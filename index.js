const express = require('express');
const app = express();
const db = require('easy-oracledb');

db.config({
    user: 'team4_201904F',
    pass: 'java',
    conn: '112.220.114.130:1521/xe'
});

const session = require('express-session');

const port = 3000;

app.use(session({
    secret: 'hello world',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

app.listen(port, () => {
    console.log(`listening ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/index.html');
});

app.get('/check', (req, res) => {
    res.send(req.session.id);
})

app.post('/login', async (req, res, next) => {
    console.log(req.body);
    let sql = db.readSQL('./sql/getUser.sql');
    let result = await db.getData(sql, ['neo@daum.com']);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(result);
})

app.options('/*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 
    'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send();
})