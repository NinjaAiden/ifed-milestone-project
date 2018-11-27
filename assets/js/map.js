var map;
var service;
var infowindow;
var countryRestrict = { 'country': [] };

// list of coordinates for countries
var countries = {
    'china': {
        center: { lat: 35.8, lng: 104.1 },
        zoom: 5
    },
    'france': {
        center: { lat: 46.2, lng: 2.2 },
        zoom: 5
    },
    'italy': {
        center: { lat: 41.9, lng: 12.6 },
        zoom: 5
    },
    'malaysia': {
        center: { lat: 4.2, lng: 101.9 },
        zoom: 5
    },
    'mexico': {
        center: { lat: 23.6, lng: -102.5 },
        zoom: 5
    },
    'spain': {
        center: { lat: 40.5, lng: -3.7 },
        zoom: 5
    },
    'thailand': {
        center: { lat: 15.8, lng: 10.4 },
        zoom: 5
    },
    'uk': {
        center: { lat: 54.8, lng: -4.6 },
        zoom: 5
    },
    'us': {
        center: { lat: 37.1, lng: -95.7 },
        zoom: 5
    }
};

// initialise map
function initMap() {

    //load map
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,

        // set initial location of map view
        center: {
            lat: 46.619261,
            lng: -33.134766
        },
        // remove unnecessary controls for initial view
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,
        componentRestrictions: countryRestrict
    });

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-90, -180),
        new google.maps.LatLng(90, 180));

    var options = {
        bounds: defaultBounds
    };

    // get HTML element for autocomplete
    var input = document.getElementById("search-bar");

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
        clearResults();
        clearMarkers();
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
            console.log("SUCCESS");
        }
    }
}

function setAutocompleteCountry() {
    var country = document.getElementById('country').value;
    if (country == 'all') {
        autocomplete.setComponentRestrictions({ 'country': [] });
        map.setCenter({ lat: 15, lng: 0 });
        map.setZoom(2);
    }
    else {
        autocomplete.setComponentRestrictions({ 'country': country });
        map.setCenter(countries[country].center);
        map.setZoom(countries[country].zoom);
    }
    clearResults();
    clearMarkers();
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}

function clearResults() {
    var results = document.getElementById('results');
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}
