/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Home', year: new Date().getFullYear() });
};

exports.exterior = function (req, res) {
    res.render('exterior', { title: 'Exterior', year: new Date().getFullYear(), message: 'Exterior Controls' });
};

exports.garage = function (req, res) {
    res.render('garage', { title: 'Garage', year: new Date().getFullYear(), message: 'Garage Controls' });
};