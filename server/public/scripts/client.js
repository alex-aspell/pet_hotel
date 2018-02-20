console.log('JS Sourced');

$(document).ready(onReady);

function onReady() {
    console.log('JQ Sourced');
    getOwner();
    $('#ownerBttn').on('click', ownerPost);
    getPets();
    $('#petBtn').on('click', petPost);
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
        getOwner(); 
    }).fail((response) => {
        console.log('pets added');
    })
}

function showPetTable(pets){
    $('#viewPets').empty();
    for (let pet of pets){
         let showPet = `<tr><td>${pet.owner_id}</td><td><input type="text" placeholder="${pet.name}>
         </td><td><input type="text" placeholder="${pet.breed}></td>
         <td><input type="text" placeholder="${pet.color}></td><td><button type="button" id="updateBtn">Update</button></td>
         <td><button type="button" id="deleteBtn">Delete</button></td><td><button type="button" id="checkBtn">Check In</button></td></tr>`
        $('#viewPets').append(showPet);
    }
}
