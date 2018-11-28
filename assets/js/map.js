var map;
var service;
var autocomplete;
var countryRestrict = { 'country': [] };

// list of coordinates for countries
var countries = {
    'china': {
        center: { lat: 35.8, lng: 104.1 },
        zoom: 4
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
        center: { lat: 3.6, lng: 101.9 },
        zoom: 6
    },
    'mexico': {
        center: { lat: 24.0, lng: -102.5 },
        zoom: 5
    },
    'spain': {
        center: { lat: 40.5, lng: -3.7 },
        zoom: 5
    },
    'thailand': {
        center: { lat: 15.8, lng: 100.9 },
        zoom: 5
    },
    'uk': {
        center: { lat: 54.8, lng: -4.6 },
        zoom: 5
    },
    'us': {
        center: { lat: 38.1, lng: -95.7 },
        zoom: 4
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
        // resctrict to country selector
        componentRestrictions: countryRestrict
    });

    // define bounds for search area
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-90, -180),
        new google.maps.LatLng(90, 180));

    var options = {
        bounds: defaultBounds
    };

    // // get HTML element for autocomplete
    // var input = document.getElementById("search-bar");

    // create autocomplete object
    autocomplete = new google.maps.places.Autocomplete();
    
    // set event listener for country picker dropbox
    document.getElementById('country-picker').addEventListener('change', setAutocompleteCountry);
}


// function for the country dropdown
function setAutocompleteCountry() {
    var country = document.getElementById('country-picker').value;
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
