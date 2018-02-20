console.log('JS Sourced');

$(document).ready(onReady);

function onReady() {
    console.log('JQ Sourced');
    getOwner();
    $('#ownerBttn').on('click', ownerPost);
    getPets();
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
        let ownerShow = `<option value="">${owner.firstname} ${owner.lastname}</option>`
        $('#ownerName').append(ownerShow);
    }
}
