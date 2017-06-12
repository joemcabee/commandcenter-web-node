var serverURL = urlRpi1;

$(function () {
    getStatus('ExteriorLights', '.statusLights');

    $('.leftDoor').click(function () {
        showLoader();
        var id = 'LeftGarageDoor';

        $.ajax({
            method: 'PUT',
            url: serverURL + 'relays/' + id,
            data: { value: '1' }
        }).complete(function (data, status) {
            hideLoader();
        });
    });

    $('.rightDoor').click(function () {
        showLoader();
        var id = 'RightGarageDoor';

        $.ajax({
            method: 'PUT',
            url: serverURL + 'relays/' + id,
            data: { value: '1' }
        }).complete(function (data, status) {
            hideLoader();
        });
    });

    $('.lights').click(function () {
        showLoader();
        var id = 'ExteriorLights';
        var newValue = -1;

        $.ajax({
            method: 'PUT',
            url: serverURL + 'relays/' + id,
            data: { value: '1' }
        }).complete(function (data, status) {
            var label = "Unknown";

            if (data.statusText == "OK") {
                var val = data.responseJSON.value;

                if (val == 0)
                    label = "Off";
                else if (val == 1)
                    label = "On";
            }
            else {
                label = "Error";
            }

            $('.statusLights').text(label);
            hideLoader();
        });
    });
});

function getStatus(id, selector) {
    $.ajax({
        method: 'GET',
        url: serverURL + 'relays/' + id
    }).complete(function (data, status) {
        var label = 'Unknown';
        var textClass = 'text-success';

        if (data.statusText == "OK") {
            var val = data.responseJSON.value;

            if (val == 0) {
                label = 'Off';
                textClass = 'text-info';
            }
            else if (val == 1)
                label = 'On';
        }
        else {
            label = 'Unknown - Error';
            textClass = 'text-warning';
        }

        $(selector).text(label).removeClass('text-info').addClass(textClass);
    });
}