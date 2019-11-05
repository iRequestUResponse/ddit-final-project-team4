// fs
const fs = require('fs');

// settings
let config = JSON.parse(fs.readFileSync('config.json'));
let root = config.root;
let noimage = `${process.cwd()}/src/noimage.png`;

// express
const express = require('express');
const app = express();
const port = 9000;

// body parser
const bodyParser = require('body-parser');

// cors
const cors = require('cors');

// multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, cb) {
    let path = `${root}/${req.params.path}`;

    if (!fs.existsSync(path)) fs.mkdirSync(path);
    cb(null, path);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  }
});
const upload = multer({ storage });

// middleware
app.use(cors());

// listen
app.listen(port, () => {
  console.log(`listening ${port}...`);
});

// ------------------------------
app.get('/api/file/:path?/:filename?', (req, res, next) => {
  let path;

  if (req.params.filename) {
    path = `${root}/${req.params.path}/${req.params.filename}`;
  } else {
    path = `${root}/${req.params.path}`;
  }

  if (!fs.existsSync(path)) {
    res.sendFile(noimage);
    return;
  }
  
  if (/\.(png|jpg|gif)$/.test(req.params.filename) && !fs.existsSync(path)) {
    res.sendFile(noimage);
    return;
  }
  
  if (/\.html$/.test(req.params.filename)) {
    res.sendFile(noimage);
    // res.send(`failed to load ${req.params.path}/${req.params.filename} try again`);
    return;
  }
  res.sendFile(path);
});

app.post('/api/file/:path?', upload.any(), (req, res, next) => {
  res.setHeader('path-test', 'test');
  console.log('hello?', req.files);
  res.send({ files: req.files, path: req.params.path });
});

app.delete('/api/file/:path?', bodyParser.text(), (req, res, send) => {
  let targetList = JSON.parse(req.body).files;
  targetList.forEach(e => {
    try {
      let target = e.filename;
      fs.unlinkSync(`${root}/${req.params.path}/${target}`);
    } catch (e) {}
  });
  res.send({
    targetList,
    path: req.params.path,
  });
});