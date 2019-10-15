const axios = require('axios');

module.exports = function({ app, db }) {
  app.get('/:id*', (req, res, next) => {
    if (req.params.id === 'api') next();
    else res.sendFile(process.cwd() + '/static/index.html');
  });

  // login check
  app.get('/api/check', (req, res) => {
      res.send(req.session.user);
  });

  // 
  app.post('/api/login', async (req, res, next) => {
      let sql = db.readSQL('./sql/getUser.sql');
      let result = await db.getData(sql, [req.body.id, req.body.pw]);
      req.session.user = result;
      res.send(result);
  });

  app.get('/api/logout', (req, res, next) => {
      req.session.user = null;
      res.send('logout');
  });

  app.get('/api/noticeList', async (req, res, next) => {
      let sql = db.readSQL('./sql/getNoticeList.sql');
      let result = await db.getData(sql, [req.query.page || 1, req.query.size || 5]);
      res.send(result);
  });

  app.get('/api/newsList', async (req, res, next) => {
    let sql = db.readSQL('./sql/getNewsKeywordList.sql');
    let keywordList = (await db.getData(sql, [])).map(e => e.KEYWORD_NEWS);
    let { display = 10, start = 1 } = req.query;

    let result = await axios({
      url: `https://openapi.naver.com/v1/search/news.json?query=${encodeURI(keywordList.join(','))}&display=${display}&start=${start}`,
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': 'CEyj4bFuxWdJZwhafMkR',
        'X-Naver-Client-Secret': 'khVQnca8ko'
      }
    });

    res.send(result.data.items.map(e => {
      e.title = e.title.replace(/<\/?b>/g, '');
      return e;
    }));
  });

  app.get('/api/aptList/coord', async (req, res, next) => {
    try {
      let address = await axios({
        url: `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${req.query.x}&y=${req.query.y}`,
        method: 'GET',
        headers: {
          Authorization: 'KakaoAK 3b0fdc6196cbd2de9db95c5bbf5e3969',
          'Content-Type': 'x-www-form-urlencoded',
        }
      });
      res.send(address.data);
    } catch (err) {
      res.send(err.toString());
    }
  });

  app.post('/api/modifyUser', async (req, res, next) => {
    if (req.session.user[0].USERID === req.body.id) {
      let sql = db.readSQL('./sql/modifyUser.sql');
      let result = await db.exec(sql, [req.body.name, req.body.pass, req.body.phone, req.body.addr, req.body.id]);
      
      let sql2 = db.readSQL('./sql/getUser.sql');
      req.session.user = await db.getData(sql2, [req.body.id, req.body.pass]);

      res.send(result + '');
    } else {
      res.send(-1 + '');
    }
  });

  app.post('/api/join', async (req, res, next) => { 
    let sql = db.readSQL('./sql/insertUser.sql');
    let result = await db.exec(sql, [req.body.id, req.body.pass, req.body.name, req.body.phone, req.body.addr]);

    res.send(result + '');
  })

  app.get('/api/checkId', async (req, res, next) => { 
    console.log(req.query.id);
    // 정규식 처리 || 
    if (!req.query.id) {
      res.send('2');
      return;
    }

    let sql = db.readSQL('./sql/checkUserId.sql');
    let result = await db.getData(sql, [req.query.id]);
    // console.log(result[0].CNT);

    res.send(result[0].CNT + '');
  });

  app.get('/api/findId', async (req, res, next) => { 
    
    let sql = db.readSQL('./sql/findUserId.sql');
    let result = await db.getData(sql, [req.query.name, req.query.phone]);

    res.send(result[0]);
  })

};

