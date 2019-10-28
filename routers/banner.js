module.exports = function({ app, db }) {
    app.get('/api/bannerList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/banner/getBannerList.sql');
        let result = await db.getData(sql);
        res.send(result);
    });
}