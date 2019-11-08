const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const utils = require('../utils/index');
const { post } = require('../models');
const { like } = require('../models');
const jwt = require('jsonwebtoken');
const likeSerializer = require('../serializers/like');

module.exports = {
  async add(req, res, next) {
    try {
      const { channel } = req.body.data.relationships;      
      const pRec = req.body.data.relationships.post;
      const postRecord = await post.findOne({ where: { fe_id: pRec.data.id}})
      const data = {
        post_id: postRecord.id,
        channel_id: channel.data.id
      }
      const saveLike = await like.create(data);
      res.status(200).send(likeSerializer.serialize(saveLike));
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage)
    }
  },

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const findLike = await like.findOne({ where: { channel_id: id}});
      res.status(200).send(likeSerializer.serialize(findLike));
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage)
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const likeRecord = await like.findByPk(id);
      await likeRecord.destroy();
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
      
      const record = await like.findOne({
        where: {
          channel_id
        }
      });
      console.log(record);
      res.status(200).send(likeSerializer.serialize(record));
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage)
    }
  }
}