const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const utils = require('../utils/index');
const { post } = require('../models');
const { upvote } = require('../models');
const jwt = require('jsonwebtoken');
const upvoteSerializer = require('../serializers/upvote');

module.exports = {
  async add(req, res, next) {
    try {
      const record = await new JSONAPIDeserializer({
        keyForAttribute: 'underscore_case',
      }).deserialize(req.body);
      console.log(record);
      const postRecord = await post.findOne({ where: { fe_id: record.post_id }})
      const data = {
        post_id: postRecord.id,
        channel_id: record.channel_id
      }
      const saveupvote = await upvote.create(data);
      res.status(200).send(upvoteSerializer.serialize(saveupvote));
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage)
    }
  },

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const findupvote = await upvote.findOne({ where: { channel_id: id}});
      res.status(200).send(upvoteSerializer.serialize(findupvote));
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage)
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const upvoteRecord = await upvote.findByPk(id);
      await upvoteRecord.destroy();
      res.status(204).send({});
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage)
    }
  },

  async get(req, res, next) {
    try {
      const { channel_id } = req.query
      console.log(channel_id);
      
      const record = await upvote.findOne({
        where: {
          channel_id
        }
      });
      res.status(200).send(upvoteSerializer.serialize(record));
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage)
    }
  }
}