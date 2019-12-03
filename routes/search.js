/* For filtering according to SRAX Test specifications */
/*jshint esversion: 6 */
var express = require('express');

var app = express();

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Request ok (search API under construction)'
    });
});

module.exports = app;