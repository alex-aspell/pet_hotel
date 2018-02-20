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
    const sqlText = `SELECT owners.first_name, owners.last_name, pets.pet_id, pets.name, pets.breed, pets.color FROM pets JOIN owners ON pets.owner_id=owners.owner_id;`
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
    const new_pet = request.body;
    const sqlText = `INSERT INTO pets (name, breed, color, owner_id)
        VALUES($1, $2, $3, $4);`
    pool.query(sqlText[new_pet.name, new_pet.breed, new_pet.color, new_pet.owner_id])
        .then(function(result){
            console.log('Pet added', result);
            response.sendStatus(200);
        })
        .catch(function(error){
            console.log('Could not add pet', error);
            response.sendStatus(500);
        })
})

router.put('/update/:id', function(request, response){
    const id = request.params.id;
    const edits = request.body;
    const sqlText = `UPDATE pets SET name=$2, breed=$3, color=$4  WHERE owner_id=$1
        VALUES($1, $2, $3, $4);`
     pool.query(sqlText, [edits.owner_id, edits.name, edits.breed, edits.color])   
        .then(function(result){
            console.log('Pet updated', result);
            response.sendStatus(200);
        })
        .catch(function(error){
            console.log('Cannot update pet', error);
            response.sendStatus(500);
        })
})

router.delete('/pets/:id', (request, response) => {
    const id =  request.params.id;
  

    
    const sqlText = `DELETE FROM pets WHERE pet_id=$1`;
    console.log(sqlText, [id]);

    pool.query(sqlText, [id]).then((result) => {
        console.log('Deleted Pet', id);
        response.sendStatus(200);
    }) // end success
    .catch((error) => {
        console.log('error in router.delete', error);
        response.sendStatus(500);
    })
  }) // end delete


module.exports = router;