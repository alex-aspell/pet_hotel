console.log('JS Sourced');

$(document).ready(onReady);

function onReady() {
    console.log('JQ Sourced');
    getOwner();
    $('#ownerBtn').on('click', ownerPost);
    getPets();
    $('#petBtn').on('click', petPost);

    $('#viewPets').on('click', '.checkBtn', function() {
        const id = $(this).data('id');
        if ($(`#checkBtn-${id}`).val() === 'in') {
            visitIn(id);
            $(this).text("Check Out").val('out');
        } else if (($(`#checkBtn-${id}`).val() === 'out')) {
            visitOut(id);
            $(`#checkBtn-${id}`).text("Check In").val('in');
        } 
    }) 


    $('#viewPets').on('click', '.updateBtn', petsUpdate);


    $('#viewPets').on('click', '.deleteBtn', function() {
        const petId = $(this).data('id');
        deletePet(petId);
      }) // end .deleteBtn click
      

} // end onReady

function ownerPost(){
    $.ajax({
        type: 'POST',
        url: '/hotel/owner',
        data: { firstname: $('#ownerFirstName').val(),
                lastname: $('#ownerLastName').val()
        } 
    }).done((response) => {
        console.log('owner added');
        clearOwner();
        getOwner(); 
    }).fail((response) => {
        console.log('owner not added');
    })
}

function getOwner(){
    $.ajax({
        type: 'GET',
        url: '/hotel/owner'
    }).done((response) => {
        console.log('got owner', response);
        showOwnerDropdown(response);
    }).fail((response) => {
        console.log('owner get failed');
    })
}

function showOwnerDropdown(owners){
    $('#ownerName').empty();
    for (let owner of owners){
        let ownerShow = `<option value="${owner.owner_id}" data-id="${owner.owner_id}">${owner.first_name} ${owner.last_name}</option>`
        $('#ownerName').append(ownerShow);
    }
}

function petPost(){
    $.ajax({
        type: 'POST',
        url: '/hotel/pets',
        data: { name: $('#petName').val(),
                breed: $('#petBreed').val(),
                color: $('#petColor').val(),
                owner_id: $('#ownerName').val()
        } 
    }).done((response) => {
        console.log('pets added');
        clearPets();
        getPets(); 
    }).fail((response) => {
        console.log('pets added');
    })
}


function showPetTable(pets){
    console.log(pets);
    $('#viewPets').empty();
    for (let pet of pets){
         let showPet = `<tr><td>${pet.first_name} ${pet.last_name}</td>
         <td><input type="text" id="name-${pet.pet_id}" value="${pet.name}" placeholder="Pet Name"></td>
         <td><input type="text"  id="breed-${pet.pet_id}" value="${pet.breed}" placeholder="Pet Breed"></td>
         <td><input type="text"  id="color-${pet.pet_id}" value="${pet.color}" placeholder="Pet Color"></td>
         <td><button type="button" class="updateBtn" data-id=${pet.pet_id}>Update</button></td>
         <td><button type="button" class="deleteBtn" data-id=${pet.pet_id}>Delete</button></td>
         <td><button type="button" id="checkBtn-${pet.pet_id}" class="checkBtn" value="in" data-id=${pet.pet_id}>Check In</button></td></tr>`
        $('#viewPets').append(showPet);
    }
}

function getPets(){
    $.ajax({
        type: 'GET',
        url: '/hotel/pets'
    }).done((response) => {
        console.log('got pets', response);
        showPetTable(response);
    }).fail((response) => {
        console.log('pets get failed');
    })
}
function clearPets() {
    $('#petName').val('');
    $('#petBreed').val('');
    $('#petColor').val('');
    $('#ownerName').val();
} // end clearPets


function clearOwner() {
    $('#ownerFirstName').val('');
    $('#ownerLastName').val('');
} // end clearOwner

function visitIn(id) {
    console.log('In Visit In');
    var nowIn = new Date().toUTCString();
    $.ajax({
        type: 'POST',
        url:`/hotel/checkin/${id}`,
        data: { petid: id,
                checkin: nowIn
        } 
    }).done((response) => {
        console.log('checkin added');
    }).fail((response) => {
        console.log('checkin failed');
    })
} // end visitToggle

//start update
function petsUpdate(){
    const id = $(this).data('id');
    console.log(name);
    $.ajax({
        type: 'PUT',
        url: `/hotel/update/${id}`,
        data: { name: $(`#name-${id}`).val(),
                breed: $(`#breed-${id}`).val(),
                color: $(`#color-${id}`).val()
        }   
    }).done((response) => {
        console.log('update', response);
        getPets();
    }).fail((response) => {
        console.log('update failed');
    })
}//end update

function deletePet(id) {
    $.ajax({
        type: 'DELETE',
        url: `/hotel/pets/${id}`,
      }) // end AJAX
      .done((response) => {
        console.log('pet deleted');
        getPets();
      }) // end done
      .fail((error) => {
        console.log('error', error);
      }) // end fail
} // end deletePet


function visitOut(id) {
    console.log('In Visit Out');
    var newOut = new Date().toUTCString();
    $.ajax({
        type: 'PUT',
        url: `/hotel/checkout/${id}`,
        data: { checkout: newOut
        }   
    }).done((response) => {
        console.log('Checked Out', response);
    }).fail((response) => {
        console.log('Check Out failed');
    })
} // end visitOut
