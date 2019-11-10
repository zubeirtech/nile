const jwt = require('jsonwebtoken');
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const JSONAPISerializer = require('jsonapi-serializer').Serializer;
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
          channelname, password: hash, image_url: 'Potrait_Placeholder.png'
        });
        res.status(200).send(channelSerializer.serialize(saveChannel.dataValues))
        next();
      } else {
        res.status(409).send({message: "Account exists"});
        next();
      }
      next();
    } catch (error) {
      console.error(error);
      next(utils.errorMessage)
    }
  },

  async get(req, res, next) {
    try {
      const payload = await jwt.verify(req.query.access_token, process.env.JWT_PRIVATE_KEY);
      const { id } = payload;
      const record = await channel.findByPk(id);
      res.status(200).send(channelSerializer.serialize(record));
      next();
    } catch (error) {
      console.error(error);
      next(utils.errorMessage)
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = await new JSONAPIDeserializer({
        keyForAttribute: 'underscore_case',
      }).deserialize(req.body);
      const getChannel = await channel.findByPk(id);
      const updateChannel = await getChannel.update(data);
      res.status(200).send(channelSerializer.serialize(updateChannel));
      next();
    } catch (error) {
      console.error(error);
      next(utils.errorMessage)
    }
  }
}