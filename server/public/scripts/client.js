console.log('JS Sourced');

$(document).ready(onReady);

function onReady() {
    console.log('JQ Sourced');
    getOwner();
    $('#ownerBtn').on('click', ownerPost);
    getPets();
    $('#petBtn').on('click', petPost);
    $('#viewPets').on('click', '.checkBtn', visitToggle);

    $('#viewPets').on('click', '.updateBtn', petsUpdate);


    $('#viewPets').on('click', '#deleteBtn', function() {
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
         let showPet = `<tr><td>${pet.first_name} ${pet.last_name}</td><td><input type="text" value="${pet.name}" placeholder="Pet Name">
         </td><td><input type="text" value="${pet.breed}" placeholder="Pet Breed"></td>
         <td><input type="text" value="${pet.color}" placeholder="Pet Color"></td><td><button type="button" class="updateBtn">Update</button></td>
         <td><button type="button" id="deleteBtn">Delete</button></td><td><button type="button" class="checkBtn">Check In</button></td></tr>`
         <td><input type="text" value="${pet.color}" placeholder="Pet Color"></td><td><button type="button" id="updateBtn">Update</button></td>
         <td><button type="button" id="deleteBtn" data-id=${pet.pet_id}>Delete</button></td><td><button type="button" class="checkBtn">Check In</button></td></tr>`
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
    $('#ownerName').val('');
} // end clearPets


function clearOwner() {
    $('#ownerFirstName').val('');
    $('#ownerLastName').val('');
} // end clearOwner

function visitToggle() {
    $(this).text("Check Out");
} // end visitToggle

//start update
function petsUpdate(){
    const id = $(this).data('id');
    $.ajax({
        type: 'PUT',
        url: `/hotel/update/${id}`,
        data: { name: $('#petName').val(),
                breed: $('#petBreed').val(),
                color: $('#petColor').val()
        }   
    }).done((response) => {
        console.log('update', response);
        showPetTable(response);
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

