var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const auth = require("./validations/auth");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// ============products===============

var product = require('./routes/products');
// ============ category ===================

var category = require('./routes/categoryRoute');
// ==================  sub category =================

var subCategory = require('./routes/subCategory');

// ============ cart ===================

var cart = require('./routes/cartroute');


var app = express();

// cors=========
const cors = require('cors');

const dotenv = require('dotenv');
const db = require("./config/db");
dotenv.config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

var userAPI = require('./routes/userSignUp');

//





app.use(cors());
// app.use(cors({
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/user',userAPI);
// ==================== product ============
app.use('/product',product);
// ================ category ===================

app.use('/category',category)
//  ==================  subCategory =================

app.use('/subCategory',subCategory);

// ==================== cart =========================

app.use('/addcart',cart);




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
let port = process.env.PORT || 5000
app.listen(port, () => console.log("EXPRESS Server Started at Port No: "+port));

module.exports = app;
