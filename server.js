var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');  // Express logger

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/topics', function (req, res) {
   res.send(require('./server/data/mocktopics.json'));
});

/*app.post('/topics/:topic_name/subscriptions', function (req, res) {

    var categoryName = req.params.categoryName;

    //res.set('Content Type', 'application/json');
    res.send({name: 'Alison', location: 'London'});
});*/



var env = process.env.DEBUG_ENV = process.env.DEBUG_ENV || 'development';
var port = parseInt(process.env.PORT, 10) || 3030;
app.listen(port);
console.log("Listening on port " + port + " in " + env + " mode");