const axios = require('axios');

module.exports = function({ app, db }) {
  app.get('/api/aptListSearchArea', async (req, res, next) => {
    let sql = db.readSQL(process.cwd() + '/sql/board/getNoticeList.sql');
    let result = await db.getData(sql, [req.query.page || 1, req.query.size || 5]);
    res.send(result);
  });
};

