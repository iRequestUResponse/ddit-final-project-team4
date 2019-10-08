const express = require('express');
const app = express();

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