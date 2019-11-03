require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  async auth(req, res, next) {
    const { channelname, password, grant_type } = req.body;
    if (grant_type === 'password') {
      try {
        const findAccount = await account.findOne({ where: { channelname } });
        if (account !== null) {
          const record = findAccount.dataValues;
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
  }
}