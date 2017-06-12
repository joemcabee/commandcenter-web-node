$(function () {
    $.ajax({
        method: 'GET',
        url: urlRpi1 + 'ping/'
    }).complete(function (data, status) {
        var statusLabel = $('.statusRP1');

        if (status == 204) {
            statusLabel.text('Online');
        }
        else {
            statusLabel.text('Offline');
        }
    });
    
    $.ajax({
        method: 'GET',
        url: urlRpi2 + 'ping/'
    }).complete(function (data, status) {
        var statusLabel = $('.statusRP1');
        var cls = 'text-success';
        var txt = 'Online';

        if (status != 204) {
            cls = 'text-warning';
            txt = 'Offline';
        }

        statusLabel.text(txt).removeClass('text-info').addClass(cls);
    });
}