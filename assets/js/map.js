// initialise map
function initMap() {
    //load map
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        // set initial location of map view
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
}