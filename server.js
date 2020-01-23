// *** main dependencies *** //
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
errorHandler = require('./middleware/error');

// load env variables
dotenv.config({path: './config/config.env'});

// connect to mongoDB
// connectDB();

// *** routes *** //
const passportRoutes = require('./routes/passport');


// *** express instance *** //
const app = express();
app.use(express.json());
// *** config middleware *** //
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


// *** main routes *** //
app.use('/api/v1/auth', passportRoutes);

// Using errorHandler methods (must puse below the URL routers)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handling unhandled promise rejections -- ONLY USE DURING DEV MODE
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // close server and exit process
    server.close(() => process.exit(1));
});