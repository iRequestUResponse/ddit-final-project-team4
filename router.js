const axios = require('axios');

module.exports = function({ app, db }) {
  app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/index.html');
  });

  // login check
  app.get('/check', (req, res) => {
      res.send(req.session.user);
  });

  // 
  app.post('/login', async (req, res, next) => {
      let sql = db.readSQL('./sql/getUser.sql');
      let result = await db.getData(sql, [req.body.id, req.body.pw]);
      req.session.user = result;
      res.send(result);
  });

  app.get('/logout', (req, res, next) => {
      req.session.user = null;
      res.send('logout');
  });

  app.get('/noticeList', async (req, res, next) => {
      let sql = db.readSQL('./sql/getNoticeList.sql');
      let result = await db.getData(sql, [req.query.page || 1, req.query.size || 5]);
      res.send(result);
  });

  app.get('/newsList', async (req, res, next) => {
    let sql = db.readSQL('./sql/getNewsKeywordList.sql');
    let keywordList = (await db.getData(sql, [])).map(e => e.KEYWORD_NEWS);
    let { display = 10, start = 1 } = req.body;

    let result = await axios({
      url: `https://openapi.naver.com/v1/search/news.json?query=${encodeURI(keywordList.join(','))}&display=${display}&start=${start}`,
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': 'CEyj4bFuxWdJZwhafMkR',
        'X-Naver-Client-Secret': 'khVQnca8ko'
      }
    });

    res.send(result.data.items);
  })

  app.post('/modifyUser', async (req, res, next) => {
    if (req.session.user[0].USERID === req.body.id) {
      let sql = db.readSQL('./sql/modifyUser.sql');
      let result = await db.exec(sql, [req.body.name, req.body.pass, req.body.phone, req.body.addr, req.body.id]);
      
      let sql2 = db.readSQL('./sql/getUser.sql');
      req.session.user = await db.getData(sql2, [req.body.id, req.body.pass]);

      res.send(result + '');
    } else {
      res.send(-1 + '');
    }
  })
};