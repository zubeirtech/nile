require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const channelRouter = require('./routes/channels')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(fileUpload());

//app.use(logger('dev'));

app.use('/api', indexRouter);
app.use('/api/channels', channelRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// cors

// Express-jwt middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   // res.render('error');
// });

module.exports = app;
