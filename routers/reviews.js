module.exports = function({ app, db }) {
    app.get('/api/getAptReivewList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/reviews/getAptReviewList.sql');
        let result = await db.getData(sql, [req.query.seq]);
        console.log(result);
        res.send(result);
    })

}