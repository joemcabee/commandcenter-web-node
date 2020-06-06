'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./database');

// Begin Firebase
var firebaseAdmin = require('firebase-admin');
var serviceAccount = require('./firebase.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://command-center-fedce.firebaseio.com"
});

// This registration token comes from the client FCM SDKs (i.e. the mobile apps)
var registrationToken = 'empty';
//End Firebase

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.route('/proxy/:service')
    .get(function (req, res) {
        console.log('GET Proxy request for: ' + req.params.service);

        var service = database.getService(req.params.service);
        var node = database.getNodeById(service.nodeId);

        console.log('Service: ' + service.svcName + ', Node: ' + node.serverName);

        //modify the url in any way you want
        var endpoint = node.protocol + node.ipAddress + node.port + service.api + service.pin + service.act + service.arg;
        console.log('New proxy url: ' + endpoint);

        request(endpoint, function (error, response, body) {
            if (error) {
                res.status(500).send();
                return console.error('Get failed for ' + req.params.service + ':', error);
            }

            console.log('Get Successful for ' + req.params.service);
        }).pipe(res);
    })
    .post(function (req, res) {
        console.log('POST Proxy request for: ' + req.params.service);

        var service = database.getService(req.params.service);
        var node = database.getNodeById(service.nodeId);

        console.log('Service: ' + service.svcName + ', Node: ' + node.serverName);

        //modify the url in any way you want
        var endpoint = node.protocol + node.ipAddress + node.port + service.api + service.pin + service.act + service.arg;
        console.log('New proxy url: ' + endpoint);

        request.post({ url: endpoint }, function callback(err, httpResponse, body) {
            if (err) {
                res.status(500).send();
                return console.error('Post failed for ' + req.params.service + ':', err);
            }

            res.status(200).send();
            console.log('Post successful for ' + req.params.service + '.  Server responded with:', body);
        });
    });

app.route('/notification')
    .post(function (req, res) {
        console.log('Alert received. ' + req.body.title + ': ' + req.body.body);

        if (registrationToken == 'empty') {
            res.status(500).send();
            return;
        }

        var payload = {
            notification: {
                title: req.body.title,
                body: req.body.body
            }
        };

        // Send a message to the device corresponding to the provided
        // registration token.
        firebaseAdmin.messaging().sendToDevice(registrationToken, payload)
            .then(function (response) {
                // See the MessagingDevicesResponse reference documentation for
                // the contents of response.
                console.log("Firebase Response:", response);
                if (response.failureCount > 0) {
                    console.log('Error sending firebase message: ', response.results[0].error)
                    res.status(500).send();
                }
                else if (response.successCount > 0 && response.failureCount <= 0) {
                    console.log('Firebase message sent successfully.');
                    res.status(200).send();
                }
                else {
                    console.log('Potential error sending firebase message.');
                    console.log("Firebase Response:", response);
                    res.status(500).send();
                }
            })
            .catch(function (error) {
                console.log("Error sending firebase message:", error);
                res.status(500).send();
            });
    });

app.route('/firebasetoken')
    .post(function (req, res) {
        console.log('Token received: ' + req.body.token);
        registrationToken = req.body.token;
    });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
