const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/owner', function(request,response){
    const sqlText = `SELECT * FROM owners`
    pool.query(sqlText)
        .then(function(result){
            console.log('Owners acquired', result);
            response.send(result.rows);
        })
        .catch(function(error){
            console.log('Could not get owners');
            response.sendStatus(500);
        })
})  

router.post('/owner', function(request,response){
    const new_owner = request.body;
    const sqlText = `INSERT INTO owners (first_name, last_name)
        VALUES($1, $2);`
    pool.query(sqlText,[new_owner.firstname, new_owner.lastname])
        .then(function(result){
            console.log('Owner added', result);
            response.sendStatus(200);
        })    
        .catch(function(error){
            console.log('Could not add owner',error);
            response.sendStatus(500);
        })
})

router.get('/pets', function(request,response){
    const sqlText = `SELECT * FROM pets;`
    pool.query(sqlText)
    .then(function(result){
        console.log('Pets acquired', result);
        response.send(result.rows);
    })
    .catch(function(error){
        console.log('Could not get pets');
        response.sendStatus(500);
    })
})

router.post('/pets', function(request,response){
    const new_pet = request.body
    const sqlText = `INSERT INTO pets (name, breed, color, ownerid)
        VALUES($1, $2, $3, $4);`
    pool.query(sqlText[new_pet.name, new_pet.breed, new_pet.color, new_pet.ownerid])
        .then(function(result){
            console.log('Pet added', result);
            response.sendStatus(200);
        })
        .catch(function(error){
            console.log('Could not add pet', error);
            response.sendStatus(500);
        })
})

module.exports = router;