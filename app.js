var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var authenticationMiddleware = require('./middlewares/authentication');
var adminAuthorisationMiddleware = require('./middlewares/adminAuthorisation');
var { check } = require('express-validator');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);

app.use('/users', [
  authenticationMiddleware, 
  adminAuthorisationMiddleware,
  check('username')
    .isLength({ min: 5 }).withMessage("must be minimum 5 charas")
    .custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the username'),
  check('password').isLength({ min: 8 }).withMessage("Password should be 8 characters"),
  check('email').isEmail().withMessage("email not valid")
], usersRouter);

app.use('/register',[
  check("username")
    .isLength({ min: 5 }).withMessage("must be minimum 5 charas")
    .custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the username'),
  check("password")
    .isLength({ min: 8 }).withMessage("Password should be 8 characters"),
  check('email').isEmail().withMessage("email not valid")
], registerRouter);

app.use('/login',loginRouter);


























//---------ERRORS---------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
