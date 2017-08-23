var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var router = require('./routes.js');


var app = express();
mongoose.connect('mongodb://localhost:27017/test');

app.engine('handlebars', handlebars({'defaultLayout': 'base'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

router(app);

app.listen(3000);
