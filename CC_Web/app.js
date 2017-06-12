/**
 * Module dependencies.
 */

//require('daemon')();

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var relay = require('./relay');
var gpio = require('onoff');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/exterior', routes.exterior);
app.get('/garage', routes.garage);

//Begin REST functions

//GET
app.get('/relays/:id', function (req, res) {
    console.log('Relays GET Start: ' + req.params.id);
    var currentValue = relay.getValue(req.params.id);
    console.log('Relays GET return value: ' + currentValue);
    var data = { value: currentValue };
    res.status(200).send(data);
    console.log('Relays GET End: ' + req.params.id);
}); 

//PUT - Change pin value
app.put('/relays/:id', function (req, res) {
    console.log('Relays PUT Start: ' + req.params.id + '. Value = ' + req.body.value + '.');
    relay.changeValue(req.params.id, req.body.value);
    var newValue = relay.getValue(req.params.id);
    console.log('Relays PUT return value: ' + newValue);
    var data = { value: newValue };
    res.status(200).send(data);
    console.log('Relays PUT End: ' + req.params.id);
});

//PING
app.get('/ping/', function (requ, res) {
    console.log('Relays ping GET');
    res.status(204);
}

//End REST functions

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
