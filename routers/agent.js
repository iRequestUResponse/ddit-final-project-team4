const axios = require('axios');
const mailer = require('../js/mailer');

module.exports = function({ app, db }) {
    app.post('/api/agentLogin', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/agent/getAgent.sql');
        let result = (await db.getData(sql, [req.body.id, req.body.pw]))[0];
        req.session.user = {
            ...result,
            type: 'agent'
        };
        res.send(result);
    });
};