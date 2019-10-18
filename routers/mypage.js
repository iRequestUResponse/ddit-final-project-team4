module.exports = function({ app, db }) {
    app.get('/api/mpSalesInterList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/mypage/getSalesInterestList.sql');
        let result = await db.getData(sql, [req.session.user.USERID]);
        res.send(result);
    })

    app.get('/api/mpGetAptSalesDetail', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/mypage/getAptSales.sql');
        let result = (await db.getData(sql, [req.query.aptNum]))[0];

        let sql2 = db.readSQL(process.cwd() + '/sql/mypage/getAptSalesPhotoList.sql');
        result = {
            ...result,
            photolist: await db.getData(sql2, [result.APTSALES_NUM])
        };

        let sql3 = db.readSQL(process.cwd() + '/sql/mypage/getApt.sql');
        result = {
            ...result,
            ...(await db.getData(sql3, [result.APT_SEQ]))[0]
        };

        res.send(result);
    })

    app.post('/api/cancelInterest', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/mypage/deleteInterestSale.sql');
        let result = await db.exec(sql, [req.body.seq]);
        res.send(result + '');
    })
};