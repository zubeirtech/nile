const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = {
  serialize(data) {
    const PostSerializer = new JSONAPISerializer('comment', {
      attributes: ['channel_id', 'post_id','comment', 'channel'],
      channel: {
        ref: 'id',
        attributes: ['channelname', 'firstname', 'lastname', 'biography', 'image_url']
      }
    });

    return PostSerializer.serialize(data);
  }
}