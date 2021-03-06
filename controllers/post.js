const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const jwt = require('jsonwebtoken');
const short = require('short-uuid');
const utils = require('../utils/index');
const { post } = require('../models');
const { channel } = require('../models');
const { upvote } = require('../models');
const { comment } = require('../models');
const postSerializer = require('../serializers/post');

module.exports = {
  async add(req, res, next) {
    try {
      const accessToken = utils.getAccessToken(req);
      const payload = await jwt.verify(accessToken, process.env.JWT_PRIVATE_KEY);
      const { id } = payload;
      const data = await new JSONAPIDeserializer({
        keyForAttribute: 'underscore_case',
      }).deserialize(req.body);
      data.fe_id = short.generate();
      data.channel_id = id;
      data.views = 0;
      const savePost = await post.create(data);
      res.status(200).send(postSerializer.serialize(savePost));
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage);
    }
  },

  async getAll(req, res, next) {
    try {
      const findPosts = await post.findAll({
        include: [
          {
            model: channel,
            as: 'channel'
          }
        ],
      });
      res.status(200).send(postSerializer.serialize(findPosts));
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage);
    }
  },

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const findPost = await post.findOne({ 
        where: { 
          fe_id: id
        },
        include: [
          {
            model: channel,
            as: 'channel'
          },
          {
            model: upvote,
            as: 'upvotes'
          },
          {
            model: comment,
            as: 'comments',
            include: [
              {
                model: channel,
                as: 'channel'
              }
            ]
          }
        ],
        order: [
          [{model: comment , as: 'comments'}, 'created_at', 'DESC']
        ]
      });

      findPost.views += 1;
      await findPost.save();
      res.status(200).send(postSerializer.serialize(findPost));
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const getPost = await post.findOne({ where: { fe_id: id}});
      await comment.destroy({ where: { post_id: getPost.id}});
      await upvote.destroy({ where: { post_id: getPost.id}});
      await getPost.destroy();
      res.status(204).send({});
      next();
    } catch (error) {
      console.log(error);
      next(utils.errorMessage);
    }
  }
}