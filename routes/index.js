'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Home', year: new Date().getFullYear() });
});

router.get('/robot', function (req, res) {
    res.render('robot', { title: 'Robot', year: new Date().getFullYear(), message: 'Robot' });
});

router.get('/garage', function (req, res) {
    res.render('garage', { title: 'Garage', year: new Date().getFullYear()});
});

router.get('/about', function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear() });
});

module.exports = router;