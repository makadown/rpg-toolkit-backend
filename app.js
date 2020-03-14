/*jshint esversion: 6 */

// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var dbConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/rpgtoolkitDB';
// Inicializar variables
var app = express();

// middleware for CORS (ver https://enable-cors.org/server_expressjs.html)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});
/* Considerar también: https://github.com/expressjs/cors */

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Importing routes
var appRoutes = require('./routes/app');
var heroRoutes = require('./routes/heroes');
var monsterRoutes = require('./routes/monsters');
var searchRoutes = require('./routes/search');
var heroClassRoutes = require('./routes/classes');
var firstnameRoutes = require('./routes/firstnames');
var lastnameRoutes = require('./routes/lastnames');
var monsterpowerRoutes = require('./routes/monsterpowers');
var monsterraceRoutes = require('./routes/monsterraces');
var raceRoutes = require('./routes/races');
var weaponRoutes = require('./routes/weapons');

// DB Connect
console.log('CONECTANDO');
console.log(dbConnection);
mongoose.connect(dbConnection, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('RPGToolkit Database is now online.');
});

// Rutas
app.use('/heroclasses', heroClassRoutes);
app.use('/heroes', heroRoutes);
app.use('/monsters', monsterRoutes);
app.use('/search', searchRoutes);
app.use('/firstnames', firstnameRoutes);
app.use('/lastnames', lastnameRoutes);
app.use('/monsterpowers', monsterpowerRoutes);
app.use('/monsterraces', monsterraceRoutes);
app.use('/races', raceRoutes);
app.use('/weapons', weaponRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(process.env.PORT || 3000, function() {
    console.log("RPG Toolkit backend server. Running online...");
});