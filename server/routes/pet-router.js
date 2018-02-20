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
        })    
        .catch(function(error){
            console.log('Could not add owner',error);
            response.sendStatus(500);
        })
})

module.exports = router;