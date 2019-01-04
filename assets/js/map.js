// variables for map and google references
var map, autocomplete, place, places, infoWindow;
// variables for search criteria
var searchRequest, search;
var markers = [];
var countryRestrict = {
    'country': []
};
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');




// list of coordinates for countries
var countries = {
    // China
    'cn': {
        center: {
            lat: 35.8,
            lng: 104.1
        },
        zoom: 4
    },
    // France
    'fr': {
        center: {
            lat: 46.2,
            lng: 2.2
        },
        zoom: 5
    },
    // Italy
    'it': {
        center: {
            lat: 41.9,
            lng: 12.6
        },
        zoom: 5
    },
    // Malaysia
    'my': {
        center: {
            lat: 3.6,
            lng: 101.9
        },
        zoom: 6
    },
    // Mexico
    'mx': {
        center: {
            lat: 24.0,
            lng: -102.5
        },
        zoom: 5
    },
    // Spain
    'es': {
        center: {
            lat: 40.5,
            lng: -3.7
        },
        zoom: 5
    },
    // Thailand
    'th': {
        center: {
            lat: 15.8,
            lng: 100.9
        },
        zoom: 5
    },
    //United Kingdom
    'uk': {
        center: {
            lat: 54.8,
            lng: -4.6
        },
        zoom: 5
    },
    // United States
    'us': {
        center: {
            lat: 38.1,
            lng: -95.7
        },
        zoom: 4
    }
};

//initialise map function
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: countries['fr'].center,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false
    });

    // initialise info window object
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
    });

    // Create the autocomplete object and associate it with the UI input control.
    // Restrict the search to the default country, and to place type "cities".
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (
            document.getElementById('search-bar')), {
            types: ['(cities)'],
            componentRestrictions: countryRestrict
        });
    places = new google.maps.places.PlacesService(map);

    // add event listeners for elements
    autocomplete.addListener('place_changed', onPlaceChanged);
    document.getElementById('hotelBtn').addEventListener('click', onPlaceChanged);
    document.getElementById('restaurantBtn').addEventListener('click', onPlaceChanged);
    document.getElementById('barBtn').addEventListener('click', onPlaceChanged);

    // Add a DOM event listener to react when the user selects a country.
    document.getElementById('country-picker').addEventListener(
        'change', setAutocompleteCountry);
}

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged(type) {
    detectButton();
    getPlace();
}

// return information on which button was clicked to allow propogation of results table
function detectButton(btnSelected) {

    switch (btnSelected) {

        case "hotelBtn":
            searchRequest = 'lodging';
            break;

        case "restaurantBtn":
            searchRequest = 'restaurant';
            break;

        case "barBtn":
            searchRequest = 'bar';
            break;
    }
    return searchRequest;
}

// function to detect input form search bar and focus on chosen city
function getPlace() {
    place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
        if (searchRequest != null) {
            searchForEstablishment();
        }
    }
    else {
        document.getElementById('search-bar').placeholder = 'Select A City';
    }
}

// function to search for establishments in chosen city and fill results table
function searchForEstablishment() {
    clearResults();
    clearMarkers();
    search = {
        bounds: map.getBounds(),
        types: [searchRequest]
    };

    createMarkers();
}

function createMarkers() {
    places.nearbySearch(search, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Create a marker for each establishment found, and
            // assign a letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {
                var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                var markerIcon = MARKER_PATH + markerLetter + '.png';
                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon
                });
                // If the user clicks a marker, show the details of that establishment
                // in an info window.
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);
            }
        }
    });

}

// clear markers from map
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}

// Set the country restriction based on user input.
// Also center and zoom the map on the given country.
function setAutocompleteCountry() {
    var country = document.getElementById('country-picker').value;
    if (country == 'all' || country == 'select') {
        autocomplete.setComponentRestrictions({
            'country': []
        });
        map.setCenter({
            lat: 46.2,
            lng: 2.2
        });
        map.setZoom(2);
    }
    else {
        autocomplete.setComponentRestrictions({
            'country': country
        });
        map.setCenter(countries[country].center);
        map.setZoom(countries[country].zoom);
    }
    clearResults();
    clearMarkers();
}

function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    };

}

function addResult(result, i) {
    var results = document.getElementById('results');
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    var markerIcon = MARKER_PATH + markerLetter + '.png';

    var tr = document.createElement('tr');
    tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
    tr.onclick = function() {
        google.maps.event.trigger(markers[i], 'click');
    };

    var iconTd = document.createElement('td');
    var nameTd = document.createElement('td');
    var icon = document.createElement('img');
    icon.src = markerIcon;
    icon.setAttribute('class', 'placeIcon');
    icon.setAttribute('className', 'placeIcon');
    var name = document.createTextNode(result.name);
    iconTd.appendChild(icon);
    nameTd.appendChild(name);
    tr.appendChild(iconTd);
    tr.appendChild(nameTd);
    results.appendChild(tr);
}

function clearResults() {
    var results = document.getElementById('results');
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}

// Get the place details for a hotel. Show the information in an info window,
// anchored on the marker for the hotel that the user selected.
function showInfoWindow() {
    var marker = this;
    places.getDetails({
            placeId: marker.placeResult.place_id
        },
        function(place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
            infoWindow.open(map, marker);
            buildIWContent(place);
        });
}

// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
    document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
        'src="' + place.icon + '"/>';
    document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
        '">' + place.name + '</a></b>';
    document.getElementById('iw-address').textContent = place.vicinity;

    if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent =
            place.formatted_phone_number;
    }
    else {
        document.getElementById('iw-phone-row').style.display = 'none';
    }

    // Assign a five-star rating to the hotel, using a black star ('&#10029;')
    // to indicate the rating the hotel has earned, and a white star ('&#10025;')
    // for the rating points not achieved.
    if (place.rating) {
        var ratingHtml = '';
        for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
                ratingHtml += '&#10025;';
            }
            else {
                ratingHtml += '&#10029;';
            }
            document.getElementById('iw-rating-row').style.display = '';
            document.getElementById('iw-rating').innerHTML = ratingHtml;
        }
    }
    else {
        document.getElementById('iw-rating-row').style.display = 'none';
    }

    // The regexp isolates the first part of the URL (domain plus subdomain)
    // to give a short URL for displaying in the info window.
    if (place.website) {
        var fullUrl = place.website;
        var website = hostnameRegexp.exec(place.website);
        if (website === null) {
            website = 'http://' + place.website + '/';
            fullUrl = website;
        }
        document.getElementById('iw-website-row').style.display = '';
        document.getElementById('iw-website').textContent = website;
    }
    else {
        document.getElementById('iw-website-row').style.display = 'none';
    }
}
