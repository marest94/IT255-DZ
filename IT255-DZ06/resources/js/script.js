$(document).ready(function() {
    $.ajax({
        url: "https://api.ipify.org?format=json"
    }).then(function(data) {
       $('.json-ip').append(data.ip);
    });
});