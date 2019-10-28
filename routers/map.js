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
      let result = await db.getData(sql, [req.query.type || null, sido, req.query.y, req.query.x]);

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

    console.log(factor);

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

    console.log(factor);

    let result = await db.getData(sql, factor);

    res.send(result[0]);
  });
};

