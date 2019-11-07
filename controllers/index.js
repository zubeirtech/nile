require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { channel } = require('../models');
const fs = require('fs');
const utils = require('../utils/index')

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

      const uploadPath = '/home/zumo/GIT/zumo/webapps/nile/nile/files/' + file.name;

      file.mv(uploadPath, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send('Error');
          next()
        }

        res.status(200).send('File uploaded succesfully');
        next()
      })
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
  }
}