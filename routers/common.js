// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, process.cwd() + '/uploads');
//   },
//   filename(req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   }
// });

// const upload = multer({ storage });

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

  // app.post('/api/file', upload.any(), (req, res, next) => {
  //   console.log('files', req.files);
  //   res.send({
  //     fieldname, originalname, filename
  //   } = req.files);
  // });
      
  // app.get('/api/file/:filename', async (req, res, next) => {
  //   if (/.html$/.test(req.params.filename)) {
  //     res.send(`failed to load ${req.params.filename} try again`);
  //     return;
  //   }
  //   res.sendFile(`${process.cwd()}/uploads/${req.params.filename}`);
  // });

};

