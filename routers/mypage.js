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

    app.get('/api/getMyOfferHouseList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/mypage/getMyOfferHouse.sql');
        let result = await db.getData(sql, [req.session.user.USERID]);

        res.send(result);
    })

    app.get('/api/getMyEstimateList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/mypage/getEstimateList.sql');
        let result = await db.getData(sql, [req.query.seq]);
        res.send(result);
    })

    app.get('/api/mpAptReviewList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/mypage/getMyAptReviewList.sql');
        let result = await db.getData(sql, [req.session.user.USERID]);
        res.send(result);
    })

    app.get('/api/mpReportList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/mypage/getMyReportList.sql');
        let result = await db.getData(sql, [req.session.user.USERID]);
        res.send(result);
    })

    app.get('/api/mpNorSalesInterList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/mypage/getNorSalesInterestList.sql');
        let result = await db.getData(sql, [req.session.user.USERID]);
        res.send(result);
    })

    app.get('/api/mpGetNorSalesDetail', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/mypage/getNorSales.sql');
        let result = (await db.getData(sql, [req.query.num]))[0];

        let sql2 = db.readSQL(process.cwd() + '/sql/mypage/getNorSalesPhotoList.sql');
        result = {
            ...result,
            photolist: await db.getData(sql2, [result.NORSALES_NUM])
        };

        let sql3 = db.readSQL(process.cwd() + '/sql/mypage/getNorSalesOption.sql');
        result = {
            ...result,
            optionlist: await db.getData(sql3, [result.NORSALES_NUM])
        };

        res.send(result);
    })

    app.get('/api/mpCompareNorSalesInterList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/mypage/getNorSalesInterestList.sql');
        var result = (await db.getData(sql, [req.session.user.USERID]));

        let sql2 = db.readSQL(process.cwd() + '/sql/mypage/getNorSalesOption.sql');

        for (let i in result) {
            let e = result[i];
            let optionlist = await db.getData(sql2, [e.NORSALES_NUM]);
            result[i] = {
                ...e,
                optionlist,
            };
        }
        // await result.forEach(async (element,i) => {
        //     result[i] = {
        //         ...element,
        //         optionlist: await db.getData(sql2, [element.NORSALES_NUM])
        //     }
        // });

        console.log(result.filter(e => e.optionlist).length);

        res.send(result);
    })
};