/* ************************************************************************** */

/**
 * Server config for Joose Table Component Data
 * Author: Phil Gibbins
 */

/* DEPENDENCIES */

// node framework
var express = require('express');

/* ************************************************************************** */

/* APP SETUP */

var app = express();
app.use( express.static(__dirname) );

// enable CORS for Pokémon API
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://pokeapi.co");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* ************************************************************************** */

/* SERVER */

var server = app.listen(7481, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Pokémon Joose table app listening @ http://%s:%s", host, port);

});

/* ************************************************************************** */