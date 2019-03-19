const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');

const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news');
const userRouter = require('./routes/user');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const adminRouter = require('./routes/admin');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Session
app.use(session({
  secret: 'nothingReallySecretHere',
  resave: true,
  saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
require(path.join(__dirname, '/config/passport'));

app.use((req, res, next) => {
  // User authentication and role handler for templates
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user || {};

  // Some settings
  req.session.newsPerPage = 10;
  req.session.usersPerPage = 10;
  
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/user', userRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;
  
  if (req.app.get('env') === 'production') {
    delete res.locals.error.stack;
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
