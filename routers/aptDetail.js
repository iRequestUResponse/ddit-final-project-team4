module.exports = function({ app, db }) {
  // 아파트에 대한 3개월 평균값 가져오기
  app.get('/api/getAptPrice', async (req, res, next) => {

    let sql = db.readSQL(process.cwd() + '/sql/apt/getAptPrice.sql');
    let result = (await db.getData(sql, [req.query.aptNo]))[0];

    res.send(result.AVGPRICE + '');
  })

  // 매물에 대한 1개월 평균값 가져오기
  app.get('/api/getSalesPrice', async (req, res, next) => {

    let sql = db.readSQL(process.cwd() + '/sql/apt/getSalesPrice.sql');
    let result = (await db.getData(sql, [req.query.aptNo]))[0];

    res.send(result.CNT + '');
  })

  // 아파트 인기순위 정하기 (구별)
  app.get('/api/getPopulApt', async (req, res, next) => {

    let sql = db.readSQL(process.cwd() + '/sql/apt/getPopulApt.sql');
    let result = (await db.getData(sql, [req.query.addr, req.query.addr]));
    console.log("----------------------")
    console.log("populresult" , result)

    res.send(result);
  })
}
  