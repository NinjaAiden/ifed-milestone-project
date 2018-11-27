var map;
var service;
var infowindow;

// initialise map
function initMap() {

    //load map
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,

        // set initial location of map view
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });
    
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-90, - 180),
      new google.maps.LatLng(90, 180));
      
    var options ={
      bounds: defaultBounds
    };
    
    // get HTML element for autocomplete
    var input =  document.getElementById("search-bar");
    
    // create autocomplete object
    var autocomplete = new google.maps.places.Autocomplete(input, options);

    var request = {
        location: 'London',
        radius: '500', 
        query: 'restaurant'
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
            console.log("SUCCESS")
        }
    }
}
