const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = {
  serialize(data) {
    const PostSerializer = new JSONAPISerializer('post', {
      id: 'fe_id',
      attributes: ['channel_id', 'title', 'description', 'thumbnail_url', 'video_url', 'views', 'createdAt', 'channel', 'likes', 'comments'],
      channel: {
        ref: 'id',
        attributes: ['channelname', 'firstname', 'lastname', 'biography', 'image_url']
      },
      likes: {
        ref: 'id', 
        attributes: ['post_id', 'channel_id']
      },
      comments: {
        ref: 'id',
        attributes: ['post_id', 'channel_id', 'comment']
      }
    });

    return PostSerializer.serialize(data);
  }
}