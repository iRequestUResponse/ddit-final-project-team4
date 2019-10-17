const axios = require('axios');

module.exports = function({ app, db }) {
    app.get('/api/mpSalesInterList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/mypage/getSalesInterestList.sql');
        let result = await db.getData(sql, [req.session.user.USERID]);
        res.send(result);
    })
};