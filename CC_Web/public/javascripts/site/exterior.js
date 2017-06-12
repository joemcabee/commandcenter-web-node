// Shorthand for $( document ).ready()
$(function () {
    $('.home .leftGarageDoor').click(function () {
        var id = 'LeftGarageDoor';

        $.ajax({
            method: 'POST',
            url: document.URL + 'relays/' + id,
            data: { value: '1' }
        }).done(function (msg) {
            alert('Left Garage Door triggered successfully!');
        });        
    });

    $('.home .rightGarageDoor').click(function () {
        var id = 'RightGarageDoor';

        $.ajax({
            method: 'POST',
            url: document.URL + 'relays/' + id,
            data: { value: '1' }
        }).done(function (msg) {
            alert('Left Garage Door triggered successfully!');
        });
    });
});

function post(id) {

}