// app index.js

const express = require('express')
var routes = require('./routes/index');

//require('dotenv').load();

const app = express()
const port = process.env.PORT || '3000'

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) { // eslint-disable-line no-unused-vars
    res.status(err.status || 500);
    res.send(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.send(err);
});

app.listen(port, function() {
    console.log("App is running on port " + port);
});