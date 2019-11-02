module.exports = function({ app, db }) {
    app.get('/api/getAptAvgScore', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/getAptAvgScore.sql');
        let result = (await db.getData(sql, [req.query.seq]))[0];
        res.send(result);
    })

    app.get('/api/getNorAvgScore', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/getNorAvgScore.sql');
        let result = (await db.getData(sql, [req.query.num]))[0];
        res.send(result);
    })

    app.get('/api/getAptReivewList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/getAptReviewList.sql');
        let result = await db.getData(sql, [req.query.seq]);
        res.send(result);
    })

    app.post('/api/insertAptReview', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/insertAptReivew.sql');
        let result = await db.exec(sql, [req.body.seq, req.session.user.USERID, req.body.trarat, req.body.surrat, req.body.resrat, req.body.cont]);
        res.send(result + '');
    })

    app.post('/api/updateAptReview', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/updateAptReview.sql');
        let result = await db.exec(sql, [req.body.trarat, req.body.surrat, req.body.resrat, req.body.cont, req.body.seq]);
        res.send(result + '');
    })

    app.post('/api/deleteAptReview', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/deleteAptReview.sql');
        let result = await db.exec(sql, [req.body.seq]);
        res.send(result + '');
    })
}