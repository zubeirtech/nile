require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { channel } = require('../models');

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

  async videoUpload(req, res, next){
    try {
      const video = req.file.buffer

    } catch (error) {
      console.error(error);
      
    }
  }
}