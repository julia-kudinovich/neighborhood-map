var map, infoWindow;
// Create a new blank array for all the restaurant markers.
var markers = [];
//path to the marker icon
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';

function initMap() {
    // Create a styles array to use with the map.
    var styles = [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}];


        var lv = new google.maps.LatLng( 36.1147,-115.1728);
    //Constructor creates a new map centered on Las Vegas Strip
        map = new google.maps.Map(document.getElementById('map'), {
            center: lv,
            zoom: 15,
            styles: styles,
        });

        var request = {
            location: lv,
            radius: '5000',
            type: ['restaurant']
        };

        places = new google.maps.places.PlacesService(map);
        places.nearbySearch(request, search);

        infoWindow = new google.maps.InfoWindow({
            content: document.getElementById('info-content')
        });
}


// Search for restaurants within the radius specified.
function search(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Create a marker for each restaurants found, and assign a letter to each marker icon.
        for (var i = 0; i < results.length; i++) {
            var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
            var markerIcon = MARKER_PATH + markerLetter + '.png';
            // Use marker animation to drop the icons on the map.
            markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
            });
            // If the user clicks a restaurant marker, animate a marker and show the details in an info window.
                  markers[i].placeResult = results[i];
                  google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                  setTimeout(dropMarker(i), i * 100);
                  addResult(results[i], i);
        }
    }
}

// Initialize the current marker
var currentMarker = null;

// Frops markers on a map
function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    };
}

// Add search results to the left pane of the app
function addResult(result, i) {
    var results = document.getElementById('results');
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    var markerIcon = MARKER_PATH + markerLetter + '.png';
    var tr = document.createElement('tr');
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


// Animate selected marker and show the information for the restaurants in an info window.
function showInfoWindow() {
    if (currentMarker){
        currentMarker.setAnimation(null);
    }
    var marker = this;
    currentMarker = this;
    this.setAnimation(google.maps.Animation.BOUNCE);

    places.getDetails({placeId: marker.placeResult.place_id},
            function(place, status) {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    return;
                }
                infoWindow.open(map, marker);
                buildIWContent(place);
            });
// Stop maker animation of infoWindow is closed
    google.maps.event.addListener(infoWindow, 'closeclick', function() {
    currentMarker.setAnimation(null);
});
}

// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
    document.getElementById('iw-icon').innerHTML = '<img class="restaurantIcon" ' + 'src="' + place.icon + '"/>';
    document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url + '">' + place.name + '</a></b>';
    document.getElementById('iw-address').textContent = place.vicinity;

    if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent = place.formatted_phone_number;
    } else {
        document.getElementById('iw-phone-row').style.display = 'none';
    }

    if (place.rating) {
        document.getElementById('iw-rating-row').style.display = '';
        document.getElementById('iw-rating').innerHTML = place.rating + '/5';
    } else {
        document.getElementById('iw-rating-row').style.display = 'none';
    }

    if (place.website) {
        var website = place.website;
        document.getElementById('iw-website-row').style.display = '';
        document.getElementById('iw-website').innerHTML = '<a href="'+website+'"target="_blank">'+place.name+'</a> ';
        } else {
            document.getElementById('iw-website-row').style.display = 'none';
        }
}