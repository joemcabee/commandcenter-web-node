$(function () {
    $('.webcamPiGarage')[0].href = baseUrlNoProxy + 'pigarage/webcam';

    $('.garageDoor').click(function () {
        showLoader();

        $.ajax({
            method: 'POST',
            url: baseUrl + 'GarageDoor',
        }).complete(function (data, status) {
            hideLoader();
        });
    });
});