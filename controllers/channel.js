const jwt = require('jsonwebtoken');
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const utils = require('../utils/index');
const { channel } = require('../models');
const channelSerializer = require('../serializers/channel');
require('dotenv').config();

module.exports = {
  async add(req, res, next) {
    try {
      const data = await new JSONAPIDeserializer({
        keyForAttribute: 'underscore_case'
      }).deserialize(req.body);
      const {
        channelname, password,
      } = data;
      const record = await channel.findOne({ where: { channelname }});
      if(record === null) {
        const hash = await utils.hash(password);
        const saveChannel = await channel.create({
          channelname, password: hash
        });
        res.status(200).send(channelSerializer.serialize(saveChannel))
      }
    } catch (error) {
      console.error(error);
      next(utils.errorMessage)
    }
  }
}