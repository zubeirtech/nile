const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = {
  serialize(data) {
    return new JSONAPISerializer('comment', {
      attributes: ['channel_id', 'post_id', 'comment', 'createdAt',  'channel'],
      channel: {
        ref: 'id',
        attributes: ['channelname', 'firstname', 'lastname', 'biography', 'image_url']
      }
    }).serialize(data);
  }
}