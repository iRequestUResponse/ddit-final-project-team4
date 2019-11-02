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

    res.send(result);
  })

  // 아파트 인기순위 정하기 (동별)
  app.get('/api/getPopulAptDong', async (req, res, next) => {

    let sql = db.readSQL(process.cwd() + '/sql/apt/getPopulAptDong.sql');
    let result = (await db.getData(sql, [req.query.addr]));

    res.send(result);
  })

  // 아파트 월별 평균가격 가져오기
  app.get('/api/getChartPrice', async (req, res, next) => {

    let sql = db.readSQL(process.cwd() + '/sql/apt/getChartPrice.sql');
    let result = (await db.getData(sql, [req.query.aptNo]));

    res.send(result);
  })

  // 아파트 월별 거래 건수 가져오기
  app.get('/api/getAptGunsu', async (req, res, next) => {

    let sql = db.readSQL(process.cwd() + '/sql/apt/getAptGunsu.sql');
    let result = (await db.getData(sql, [req.query.aptNo]));

    res.send(result);
  })

  // 검색시 아파트 인기순위 가져오기
  app.get('/api/getPopulAptRank', async (req, res, next) => {

    let sql = db.readSQL(process.cwd() + '/sql/apt/getPopulAptRank.sql');
    let result = await db.getData(sql, [req.query.si, req.query.gu, req.query.dong]);
    res.send(result);

  })
  
  // 지도에 아파트정보
  app.get('/api/getMapApt', async (req, res, next) => {
    let sql = db.readSQL(process.cwd() + '/sql/mypage/getApt.sql');
    let result = (await db.getData(sql, [req.query.aptNo]))[0];
    res.send(result);
  })
}
  