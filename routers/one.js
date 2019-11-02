module.exports = function({ app, db }) {
  
  // 원룸 랭크 가져오기
  app.get('/api/getPopulOneRank', async (req, res, next) => {

    let sql = db.readSQL(process.cwd() + '/sql/one/getPopulOneRank.sql');
    console.log('asdf', [req.query.si, req.query.gu, req.query.dong]);
    let result = await db.getData(sql, [req.query.si, req.query.gu, req.query.dong]);

    res.send(result);

  })
}