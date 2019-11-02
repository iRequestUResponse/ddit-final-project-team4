module.exports = function({ app, db }) {
    // 리뷰 평균점수(아파트)
    app.get('/api/getAptAvgScore', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/getAptAvgScore.sql');
        let result = (await db.getData(sql, [req.query.seq]))[0];
        res.send(result);
    })

    // 리뷰 평균점수(원룸/투룸)
    app.get('/api/getNorAvgScore', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/getNorAvgScore.sql');
        let result = (await db.getData(sql, [req.query.num]))[0];
        res.send(result);
    })

    // 리뷰 리스트 출력(아파트)
    app.get('/api/getAptReivewList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/getAptReviewList.sql');
        let result = await db.getData(sql, [req.query.seq]);
        res.send(result);
    })

    // 리뷰 리스트 출력(원룸/투룸)
    app.get('/api/getNorReivewList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/getNorReviewList.sql');
        let result = await db.getData(sql, [req.query.num]);
        res.send(result);
    })

    // 리뷰삽입(아파트)
    app.post('/api/insertAptReview', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/insertAptReivew.sql');
        let result = await db.exec(sql, [req.body.seq, req.session.user.USERID, req.body.trarat, req.body.surrat, req.body.resrat, req.body.cont]);
        res.send(result + '');
    })

    // 리뷰삽입(원룸/투룸)
    app.post('/api/insertNorReview', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/insertNorReview.sql');
        let result = await db.exec(sql, [req.body.num, req.session.user.USERID, req.body.trarat, req.body.surrat, req.body.resrat, req.body.cont]);
        res.send(result + '');
    })

    // 리뷰수정
    app.post('/api/updateAptReview', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/updateAptReview.sql');
        let result = await db.exec(sql, [req.body.trarat, req.body.surrat, req.body.resrat, req.body.cont, req.body.seq]);
        res.send(result + '');
    })

    // 리뷰삭제
    app.post('/api/deleteAptReview', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/deleteAptReview.sql');
        let result = await db.exec(sql, [req.body.seq]);
        res.send(result + '');
    })
}