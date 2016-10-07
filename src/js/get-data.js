;'use strict';

var pokemonData = {};
var pokemonToFetchDataFor = [ 4, 6, 58 ]
var getData = function() {

    pokemonToFetchDataFor.forEach(function(pokemonNumber) {

        $.ajax({
            url: 'http://pokeapi.co/api/v2/pokemon/' + pokemonNumber + '/',
            success: function(data) {
                pokemonData[data.name] = data;
                updateTable();
            },
            error: function() {
                console.log('error with ' + pokemonNumber);
            }
        });

    });

};


var updateTable = function(pokemonName) {

    var tableData = [];
    var tbody = document.querySelector('tbody');
    tbody.innerHTML = "";

    for (var pokemon in pokemonData) {
        var type = pokemonData[pokemon].types.filter(function(type) {
                return type.slot === 1;
            })[0].type.name;
        console.log(type)
        tableData.push({
            number: pokemonData[pokemon].id,
            name: pokemonData[pokemon].name,
            img: pokemonData[pokemon].sprites.front_default,
            type: type
        });
    }


    tableData.sort(function(a, b){
        return a.number - b.number;
    }).forEach(function(pokemonDetails) {
        tbody.innerHTML += '<tr><td><img src="' + pokemonDetails.img + '" /></td><td>' + pokemonDetails.number + '</td><th>' + pokemonDetails.name + '</th><td>' + pokemonDetails.type + '</td></tr>';
    });

};

getData();