console.log('JS Sourced');

$(document).ready(onReady);

function onReady() {
    console.log('JQ Sourced');
    getOwner();
<<<<<<< HEAD
    $('#ownerBttn').on('click', ownerPost);
    getPets();
=======
    $('#ownerBtn').on('click', ownerPost);
    $('#petBtn').on('click', petPost);
>>>>>>> 2a647c3ef1244cefab20c26bb9ecd404d45fb7da
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
<<<<<<< HEAD
        let ownerShow = `<option value="">${owner.firstname} ${owner.lastname}</option>`
        $('#ownerName').append(ownerShow);
    }
}
=======
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
>>>>>>> 2a647c3ef1244cefab20c26bb9ecd404d45fb7da
