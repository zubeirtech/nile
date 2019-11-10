require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { channel } = require('../models');
const path = require('path');
const fs = require('fs');
const utils = require('../utils/index');
const { Storage } = require('@google-cloud/storage');
const appRoot = require('app-root-path');
const fileDir = require('@files');

const storage = new Storage({
  projectId: process.env.G_CLOUD_PROJECT_ID,
  keyFilename: process.env.ROOT + 'config/google.json'
});

module.exports = {
  async auth(req, res, next) {
    console.log(req.body);
    const { username, password, grant_type } = req.body;
    if (grant_type === 'password') {
      try {
        const findChannel = await channel.findOne({ where: { channelname: username } });
        if (findChannel !== null) {
          const record = findChannel.dataValues;
          if (bcrypt.compareSync(password, record.password)) {
            const payload = {
              id: record.id,
            };
            const token = await jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: '24h' });
            res.status(200).send(`{ "access_token": "${token}" }`);
            next();
          } else {
            res.status(400).send('{"error": "invalid_grant"}');
            next();
          }
        } else {
          res.status(400).send('{"error": "invalid_grant"}');
          next();
        }
      } catch (error) {
        next(error);
      }
    } else {
      res.status(400).send('{ "error": "unsupported_grant_type" }');
      next();
    }
  },

  async upload(req, res, next){
    try {
      const file = req.files.file;
      if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        next()
        return;
      }
      const uploadPath = fileDir + '/' + file.name;

      file.mv(uploadPath, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send('Error');
          next()
        }
       });

      const bucket = await storage.bucket(process.env.G_BUCKET_NAME);
      
      const savedFile = bucket.file(file.name);

      const blob = await bucket.upload(uploadPath);

      res.status(200).send('File uploaded succesfully');
      next()
    } catch (error) {
      console.error(error);
      next(utils.errorMessage);
    }
  },

  async streamImage(req, res) {
    try {
      const path = `files/${req.query.image}`;
      res.sendFile(process.env.ROOT + path);
    } catch (error) {
      console.error(error);
      next(utils.errorMessage);
    }
  },

  async streamVideo(req, res) {
    try {
      const path = `${process.env.ROOT}files/${req.query.video}`;
      const stat = fs.statSync(path)
      const fileSize = stat.size
      const range = req.headers.range
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
        const chunksize = (end - start) + 1
        const file = fs.createReadStream(path, { start, end })
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head)
        file.pipe(res)
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error')
    }
  }
}