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
      let result = await db.getData(sql, [sido, req.query.y, req.query.x]);

      res.send(result);
    } catch (err) {
      res.send(err.toString());
    }
  });

  app.get('/api/searchApt', async (req, res, next) => {
    let nameCntSql = db.readSQL(process.cwd() + '/sql/map/getCountAptNameQuery.sql');
    let nameCnt = await db.getData(nameCntSql, [req.query.query]);
    nameCnt = nameCnt[0].CNT;
    
    let result;

    if (nameCnt > 0) {
      // let sql = 
      res.json()
    }
  });
};

