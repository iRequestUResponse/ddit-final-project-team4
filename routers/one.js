module.exports = function({ app, db }) {
  
  // 원룸 랭크 가져오기
  app.get('/api/getPopulOneRank', async (req, res, next) => {

    let sql = db.readSQL(process.cwd() + '/sql/one/getPopulOneRank.sql');
    let result = await db.getData(sql, [req.query.si, req.query.gu, req.query.dong]);

    console.log("원룸랭크",result)
    res.send(result);

  })
}