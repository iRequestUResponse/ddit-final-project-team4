const axios = require('axios');

module.exports = function({ app, db }) {
  app.get('/api/noticeList', async (req, res, next) => {
      let sql = db.readSQL(process.cwd() + '/sql/board/getNoticeList.sql');
      let result = await db.getData(sql, [req.query.page || 1, req.query.size || 5]);
      res.send(result);
  });

  app.get('/api/newsList', async (req, res, next) => {
    let sql = db.readSQL(process.cwd() + '/sql/board/getNewsKeywordList.sql');
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
};

