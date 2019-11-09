const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = {
  serialize(data) {
    return new JSONAPISerializer('post', {
      id: 'fe_id',
      attributes: ['channel_id', 'title', 'description', 'thumbnail_url', 'video_url', 'views', 'createdAt', 'channel', 'upvotes', 'comments'],
      channel: {
        ref: 'id',
        attributes: ['channelname', 'firstname', 'lastname', 'biography', 'image_url']
      },
      upvotes: {
        ref: 'id', 
        attributes: ['post_id', 'channel_id']
      },
      comments: {
        ref: 'id',
        attributes: ['post_id', 'channel_id', 'comment', 'channel'],
        channel: {
          ref: 'id',
          attributes: ['channelname', 'firstname', 'lastname', 'biography', 'image_url']
        }
      }
    }).serialize(data);
  }
}