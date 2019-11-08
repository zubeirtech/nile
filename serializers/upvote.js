const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = {
  serialize(data) {
    const upvoteSerializer = new JSONAPISerializer('upvote', {
      attributes: ['post_id', 'channel_id', 'created_at'],
    })
    return upvoteSerializer.serialize(data);
  }
}