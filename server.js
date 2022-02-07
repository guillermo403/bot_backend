const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('./logger');
const mongo = require('./mongodb');
const bodyParser = require('body-parser');
const port = require('./config/config').port || 9000;
const session = require('express-session');
const passport = require('passport');

logger.info('Starting dashboard backend in port ' + port + '...');
mongo.init((error, db) => {
  if (error) logger.error(error);
  setTimeout(() => {
    logger.info('Connected to database');
    init();
  }, 4000);
});

function init() {
  // require discord strategy
  require('./strategies/discord');

  // Set view engine fot rendering templates
  app.set('view engine', 'ejs');
  // MIDDLEWARS
  // Cors
  app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
  }));
  
  // Sessions
  app.use(session({
    secret: 'devergara123!',
    saveUninitialized: false,
    resave: false
  }));

  // Discord passport ffor log in with discord
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Body-parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Save user in global variable
  app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
  });
  
  // Use all routes
  const routes = require('./routes/');
  app.use('/api', routes);

  app.listen(port);
}