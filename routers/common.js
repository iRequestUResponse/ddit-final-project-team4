module.exports = function({ app, db }) {
  // login check
  app.get('/api/check', (req, res) => {
      res.send(req.session);

      console.log(req.session.id);
  });

  app.get('/api/logout', (req, res, next) => {
      req.session.user = undefined;
      res.send('logout');
  });
};

