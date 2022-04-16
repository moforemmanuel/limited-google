const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const nocache = require('nocache');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

//routes
const index = require('./routes/index');
const search = require('./routes/search');

//set views
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'the new google',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60 }
}));

app.use(flash());
// app.use(nocache());

// set global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

const URI = process.env.MongoURI || "mongodb://localhost:27017/results";
mongoose.connect(URI, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/', index);
app.use('/search', search);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));