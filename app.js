var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var pdf1 = require('./routes/pdf1');

var service = require('./routes/api/v1.0/services');
var service1 = require('./routes/api/v1.0/servicio');
var servi = require('./routes/api/v1.0/servi');
var prod1 = require('./routes/api/v1.0/products');
var orde1 = require('./routes/api/v1.0/orders');
var orde2 = require('./routes/api/v1.0/total');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/acrob', pdf1);

app.use('/api/v1.0/', service);
app.use('/api/v1.0/', service1);
app.use('/api/v1.0/', servi);

app.use('/api/v1.0/', prod1);
app.use('/api/v1.0/', orde1);
app.use('/api/v1.0/', orde2);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
var port = 7777;
app.listen(port, () => {
  console.log("server running in " + port);
});
