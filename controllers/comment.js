const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const utils = require('../utils/index');
const { comment } = require('../models');
const { post } = require('../models');
const { channel } = require('../models');
const jwt = require('jsonwebtoken');
const commentSerializer = require('../serializers/comment');

module.exports = {
  async add(req, res, next) {
    try {
      const record = await new JSONAPIDeserializer({
        keyForAttribute: 'underscore_case',
      }).deserialize(req.body);
      const postRecord = await post.findOne({ where: { fe_id: record.post_id } })
      const data = {
        post_id: postRecord.id,
        channel_id: record.channel_id,
        comment: record.comment
      }
      const saveComment = await comment.create(data);
      res.status(200).send(commentSerializer.serialize(saveComment));
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage)
    }
  },

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const findupvote = await upvote.findOne({ where: { channel_id: id } });
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
      const { post_id } = req.query
      const postRecord = await post.findOne({ where: { fe_id: post_id }});

      const record = await comment.findAll({
        where: {
          post_id: postRecord.id
        },
        include: [
          {
            model: channel,
            as: 'channel'
          }
        ],
        order: [
          ['created_at', 'DESC']
        ]
      });
      res.status(200).send(commentSerializer.serialize(record));
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage)
    }
  }
}