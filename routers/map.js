const axios = require('axios');

module.exports = function({ app, db }) {
  app.get('/api/c2a', async (req, res, next) => {
    try {
      let address = await axios({
        url: `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${req.query.x}&y=${req.query.y}`,
        method: 'GET',
        headers: {
          Authorization: 'KakaoAK 3b0fdc6196cbd2de9db95c5bbf5e3969',
          'Content-Type': 'x-www-form-urlencoded',
        }
      });

      let {
        region_1depth_name: sido,
      } = address.data.documents[0].address;

      let sql = db.readSQL(process.cwd() + '/sql/map/getAptList.sql');
      let result = await db.getData(sql, [sido, req.query.y, req.query.x, req.query.type || null]);
      

      res.send(result);
    } catch (err) {
      res.send(err.toString());
    }
  });

  app.get('/api/searchAptList', async (req, res, next) => {
    let nameSql = db.readSQL(process.cwd() + '/sql/map/getAptListNameQuery.sql');
    let nameList = await db.getData(nameSql, [req.query.lat || 36.3298522, req.query.lng || 127.41475620000001, req.query.query, req.query.number || 12]);

    let areaSql = db.readSQL(process.cwd() + '/sql/map/getAptListAreaQuery.sql');
    areaList = await db.getData(areaSql, [req.query.query]);
    
    res.json({ nameList, areaList });
  });

  app.get('/api/searchApt/:query', async (req, res, next) => {
    let query = req.params.query;
    let sql = db.readSQL(process.cwd() + '/sql/map/getAptListQuery.sql');
    let factor;
    if (query.includes(':')) {
      let [area, name] = query.split(':').map(e => e.trim());
      factor = [area, name];
    } else {
      factor = [query, null];
    }

    let result = await db.getData(sql, factor);

    res.send(result);
  });

  app.get('/api/searchAptCenter/:query', async (req, res, next) => {
    let query = req.params.query;
    let sql = db.readSQL(process.cwd() + '/sql/map/getAgvLatLngQuery.sql');
    let factor;
    if (query.includes(':')) {
      let [area, name] = query.split(':').map(e => e.trim());
      factor = [area, name];
    } else {
      factor = [query, null];
    }

    let result = await db.getData(sql, factor);

    res.send(result[0]);
  });

  app.get('/api/getMapAptSalesList', async (req, res, next) => {
    let sql = db.readSQL(process.cwd() + '/sql/map/getAptSalesList.sql');
    let result = await db.getData(sql, [req.query.seq]);
    res.send(result);
  });

  app.post('/api/insertAptInterest', async (req, res, next) => {
    let sql = db.readSQL(process.cwd() + '/sql/map/insertAptInterest.sql');
    let result = await db.exec(sql, [req.session.user.USERID, req.body.num]);
    res.send(result + '');
  });

  app.post('/api/insertAptReport', async (req, res, next) => {
    let sql = db.readSQL(process.cwd() + '/sql/map/insertAptReport.sql');
    let result = await db.exec(sql, [req.body.num, req.session.user.USERID, req.body.rea, req.body.cont]);
    res.send(result + '');
  });

  app.get('/api/checkAptReport', async (req, res, next) => {
    let sql = db.readSQL(process.cwd() + '/sql/map/checkAptReport.sql');
    let result = (await db.getData(sql, [req.session.user.USERID, req.query.num]))[0].CNT;
    res.send(result + '');
  });

  app.get('/api/checkAptInterest', async (req, res, next) => {
    let sql = db.readSQL(process.cwd() + '/sql/map/checkAptInterest.sql');
    let result = (await db.getData(sql, [req.session.user.USERID, req.query.num]))[0].CNT;
    res.send(result + '');
  });

  //------------------
  app.get('/api/searchNorList', async (req, res, next) => {
    let areaSql = db.readSQL(process.cwd() + '/sql/map/getNorListAreaQuery.sql');
    areaList = await db.getData(areaSql, [req.query.query]);
    
    res.json(areaList);
  });

  app.get('/api/searchEtcCenter/:query', async (req, res, next) => {
    let query = req.params.query;
    let sql = db.readSQL(process.cwd() + '/sql/map/getAgvLatLngEtcQuery.sql');

    let result = await db.getData(sql, query);

    res.send(result[0]);
  });

  app.get('/api/c2n', async (req, res, next) => {
    
    let sql = `select * from NORSALES`;
    let result = await db.getData(sql, []);

    res.send(result);
  });

  app.post('/api/insertNorInterest', async (req, res, next) => {
    let sql = db.readSQL(process.cwd() + '/sql/map/insertNorInterest.sql');
    let result = await db.exec(sql, [req.session.user.USERID, req.body.num]);
    res.send(result + '');
  });

  app.post('/api/insertNorReport', async (req, res, next) => {
    let sql = db.readSQL(process.cwd() + '/sql/map/insertNorReport.sql');
    let result = await db.exec(sql, [req.body.num, req.session.user.USERID, req.body.rea, req.body.cont]);
    res.send(result + '');
  });

  app.get('/api/checkNorReport', async (req, res, next) => {
    let sql = db.readSQL(process.cwd() + '/sql/map/checkNorReport.sql');
    let result = 0;
    if(req.session.user === undefined){
      res.send(99+'');
    }else{
      result = (await db.getData(sql, [req.session.user.USERID, req.query.num]))[0].CNT;
      res.send(result + '');
    }
  });

  app.get('/api/checkNorInterest', async (req, res, next) => {
    let sql = db.readSQL(process.cwd() + '/sql/map/checkNorInterest.sql');
    let result = 0;
    if(req.session.user === undefined){
      res.send(99+'');
    }else{
      result = (await db.getData(sql, [req.session.user.USERID, req.query.num]))[0].CNT;
      res.send(result + '');
    }
  });
};
