const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = {
  serialize(data) {
    const ChannelSerializer = new JSONAPISerializer('channel', {
      attributes: ['channelname', 'firstname', 'lastname', 'biography', 'image_url'],
      posts: {
        ref: 'fe_id',
        attributes: ['creator', 'title', 'description', 'thumbnail_url', 'video_url', 'views']
      }
    })
    return ChannelSerializer.serialize(data);
  }
}