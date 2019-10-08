const express = require('express');
const app = express();
const db = require('easy-oracledb');

app.set('trust proxy', 1);
app.use(require('body-parser').json());

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
        secure: false,
        maxAge: 1000 * 60 * 60,
    }
}));

app.listen(port, () => {
    console.log(`listening ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/index.html');
});

app.get('/check', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(req.session.user);
    console.log(req.session.id);
})

app.post('/login', async (req, res, next) => {
    let sql = db.readSQL('./sql/getUser.sql');
    let result = await db.getData(sql, [req.body.id, req.body.pw]);
    req.session.user = result;
    console.log(req.session.id);
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8081/*');
    res.send(result);
})

app.options('/*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.send();
})