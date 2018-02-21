$(document).ready(onReady);

function onReady() {
    console.log('JS JQ');
    getVisits();

} // end onReady

function getVisits() {
        $.ajax({
            type: 'GET',
            url: '/hotel/visits'
        }).done((response) => {
            console.log('got visits', response);
            displayVisits(response);
        }).fail((response) => {
            console.log('get visits failed');
        })
}

function displayVisits(visits) {
    console.log(visits);
    $('#viewVisits').empty();
    for (let visit of visits){
         let showVisits = `<tr><td>${visit.name}</td>
         <td>${visit.check_in}</td>
         <td>${visit.check_out}</td>`
        $('#viewVisits').append(showVisits);
    }
} // end display Visits