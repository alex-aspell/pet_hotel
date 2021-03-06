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
    console.log(new_pet);
    const sqlText = `INSERT INTO pets (name, breed, color, owner_id)
        VALUES($1, $2, $3, $4);`
    pool.query(sqlText,[new_pet.name, new_pet.breed, new_pet.color, new_pet.owner_id])
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
    console.log(id, edits);
    const sqlText = `UPDATE pets SET name=$1, breed=$2, color=$3  WHERE pet_id=$4`
        console.log(sqlText, [edits.name, edits.breed, edits.color, id]) ;
     pool.query(sqlText, [edits.name, edits.breed, edits.color, id])   
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

    pool.query(sqlText, [id]).then((result) => {
        console.log('Deleted Pet', id);
        response.sendStatus(200);
    }) // end success
    .catch((error) => {
        console.log('error in router.delete', error);
        response.sendStatus(500);
    })
  }) // end delete


  router.post('/checkin/:id', function(request,response){
    const new_checkin = request.body;
    console.log(new_checkin);

   const sqlText = `INSERT INTO visits (pet_id, check_in)
        VALUES($1, $2);`
    pool.query(sqlText,[new_checkin.petid, new_checkin.checkin])
        .then(function(result){
            console.log('Check-In added', result);
            response.sendStatus(200);
        })
        .catch(function(error){
            console.log('Could not Check-In', error);
            response.sendStatus(500);
        }) 
})



router.put('/checkout/:id', function(request, response){
    const id = request.params.id;
    const checkOut = request.body;

    console.log(id, checkOut);

    const sqlText = `UPDATE visits SET check_out=$1 WHERE pet_id=$2`
        console.log(sqlText, [checkOut.checkout, id]) ;
     pool.query(sqlText, [checkOut.checkout, id])   
        .then(function(result){
            console.log('check-out updated', result);
            response.sendStatus(200);
        })
        .catch(function(error){
            console.log('check-out failed', error);
            response.sendStatus(500);
        })
})

router.get('/visits', function(request,response){
    const sqlText = `SELECT pets.name, visits.check_in, visits.check_out FROM visits JOIN pets ON visits.pet_id=pets.pet_id ORDER BY visits.check_out DESC;`
    pool.query(sqlText)
        .then(function(result){
            console.log('Visits acquired', result);
            response.send(result.rows);
        })
        .catch(function(error){
            console.log('Visits not get pets');
            response.sendStatus(500);
        })
})

module.exports = router;