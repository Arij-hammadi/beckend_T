var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session"); //session
const { connectToMongoDb } = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const logMiddleware = require('./middlewares/logsMiddleware.js'); //log

const http = require('http'); //1 importation protocole http

var indexRouter = require("./routes/indexRouter");
var usersRouter = require("./routes/usersRouter");
var osRouter = require("./routes/osRouter");
console.log('✅ usersRouter monté');

var reservationRouter = require('./routes/reservationRouter');
var OpenAiRouter = require('./routes/OpenAiRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logMiddleware)  //log

app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,Delete",
  credentials: true,
}))

app.use(session({   //cobfig session
  secret: "net secret pfe",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: {secure: false},
    maxAge: 24*60*60,
  
  },  
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/reservation', reservationRouter);
app.use('/OpenAi', OpenAiRouter);

app.get('/hello', (req, res) => {
  res.send('👋 Hello depuis app.js');
});

// catch 404 and forward to error handler
///app.use(function (req, res, next) {
  ///next(createError(404));
///});

// error handler
///app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  ///res.locals.message = err.message;
  ///res.locals.error = req.app.get('env') === 'development' ? err : {};

  //render the error page
  ///res.status(err.status || 500);
  //res.render('error');
  ///res.status(404).json({ message: "Route non trouvée" });
///});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Erreur interne du serveur',
  });
});


const server = http.createServer(app); //2 snaana serveur
server.listen(process.env.PORT || 5000, () => {
  connectToMongoDb()
  console.log('Serveur en écoute sur le port 5000') 
}); //3 lanci serveur aal port 5000(libre) 
