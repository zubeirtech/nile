require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const channelRouter = require('./routes/channels');
const postRouter = require('./routes/posts');
const upvoteRouter = require('./routes/upvotes');
const commentRouter = require('./routes/comments');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(fileUpload());

//app.use(logger('dev'));

app.use('/api', indexRouter);
app.use('/api/channels', channelRouter);
app.use('/api/posts', postRouter);
app.use('/api/upvotes', upvoteRouter);
app.use('/api/comments', commentRouter);

// Express-jwt middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});

module.exports = app;
