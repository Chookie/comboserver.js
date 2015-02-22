var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');  // Express logger
var mockTopicData = require('./server/data/mocktopics.json');
var mockMessageData = require('./server/data/mockMessages.json');

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
   res.send(mockTopicData);
});
app.get('/messages', function (req, res) {
    res.send(mockMessageData);
});

/*app.post('/topics/:topic_name/subscriptions', function (req, res) {

    var categoryName = req.params.categoryName;

    //res.set('Content Type', 'application/json');
    res.send({name: 'Alison', location: 'London'});
});*/

// Angular requests for views get redirected
// path is relative to views directory above
app.get('/partials/*', function (req, res) {
    console.log('get partial %s', req.params[0]);
    res.render('../../public/app/' + req.params[0]) ;
});

// Always route to index and let angular route client side
app.get('*', function (req, res) {
    res.render('index', {
        mockData: JSON.stringify(mockTopicData)
    });
});


var env = process.env.DEBUG_ENV = process.env.DEBUG_ENV || 'development';
var port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port);
console.log("Listening on port " + port + " in " + env + " mode");