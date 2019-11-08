const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = {
  serialize(data) {
    const likeSerializer = new JSONAPISerializer('like', {
      attributes: ['post_id', 'channel_id', 'created_at'],
    })
    return likeSerializer.serialize(data);
  }
}