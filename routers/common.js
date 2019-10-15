module.exports = function({ app, db }) {
  // login check
  app.get('/api/check', (req, res) => {
      res.send(req.session.user);
  });

  app.get('/api/logout', (req, res, next) => {
      req.session.user = null;
      res.send('logout');
  });
};

