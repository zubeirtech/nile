const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = {
  serialize(data) {
    const PostSerializer = new JSONAPISerializer('post', {
      id: 'fe_id',
      attributes: ['channel_id', 'title', 'description', 'thumbnail_url', 'video_url', 'views', 'created_at', 'channel'],
      channel: {
        ref: 'id',
        attributes: ['channelname', 'firstname', 'lastname', 'biography', 'image_url']
      },
      likes: {
        ref: 'id', 
        attributes: ['p_id', 'c_id']
      },
      comments: {
        ref: 'id',
        attributes: ['p_id', 'author', 'comment']
      }
    });

    return PostSerializer.serialize(data);
  }
}