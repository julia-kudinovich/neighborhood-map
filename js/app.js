var map, infoWindow, currentMarker;
// Create a new blank array for all the casino markers.
var markers = [];
// Path to the marker icon
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';

var casinos = [
    {
        name: 'MGM Grand',
        address: '3799 S Las Vegas Blvd, Las Vegas, NV 89109',
        phone: '(702) 891-1111',
        rating: 3.9,
        website: 'https://www.mgmgrand.com/',
        location: {
            lat: 36.1026,
            lng: -115.1703
        }
    },{
        name: 'The Venetian',
        address: '3355 S Las Vegas Blvd, Las Vegas, NV 89109',
        phone: '(702) 414-1000',
        rating: 4.5,
        website: 'https://www.venetian.com/',
        location: {
            lat: 36.1212,
            lng: -115.1697
        }
    },{
        name: 'Caesars Palace',
        address: '3570 S Las Vegas Blvd, Las Vegas, NV 89109',
        phone: '(866) 227-5938',
        rating: 4.2,
        website: 'https://www.caesars.com/caesars-palace',
        location: {
            lat: 36.1162,
            lng: -115.1745
        }
    },{
        name: 'Flamingo Las Vegas',
        address: '3555 S Las Vegas Blvd, Las Vegas, NV 89109',
        phone: '(702) 733-3111',
        rating: 3.5,
        website: 'https://www.caesars.com/flamingo-las-vegas',
        location: {
            lat: 36.1164,
            lng: -115.1708
        }
    },{
        name: 'Paris Las Vegas',
        address: '3655 S Las Vegas Blvd, Las Vegas, NV 89109',
        phone: '(702) 946-7000',
        rating: 4,
        website: 'https://www.caesars.com/paris-las-vegas',
        location: {
            lat: 36.1125,
            lng: -115.1707
        }
    },{
        name: 'Bellagio Hotel and Casino',
        address: '3600 S Las Vegas Blvd, Las Vegas, NV 89109',
        phone: '(888) 987-6667',
        rating: 4.3,
        website: 'https://www.bellagio.com',
        location: {
            lat: 36.1126,
            lng: -115.1767
        }
    },{
        name: 'The LINQ',
        address: '3535 S Las Vegas Blvd, Las Vegas, NV 89109',
        phone: '(800) 634-6441',
        rating: 4,
        website: 'https://www.caesars.com/linq',
        location: {
            lat: 36.1182,
            lng: -115.1710
        }
    },{
        name: 'Planet Hollywood Resort & Casino',
        address: '3667 S Las Vegas Blvd, Las Vegas, NV 89109',
        phone: '(866) 919-7472',
        rating: 3.8,
        website: 'https://www.caesars.com/planet-hollywood',
        location: {
            lat: 36.1101,
            lng: -115.1717
        }
    },{
        name: 'The Cosmopolitan of Las Vegas',
        address: '3708 S Las Vegas Blvd, Las Vegas, NV 89109',
        phone: '(702) 698-7000',
        rating: 4.4,
        website: 'https://www.cosmopolitanlasvegas.com/',
        location: {
            lat: 36.1098,
            lng: -115.1739
        }
    },{
        name: 'The Mirage',
        address: '3400 S Las Vegas Blvd, Las Vegas, NV 89109',
        phone: '(702) 791-7111',
        rating: 4.2,
        website: 'https://www.mirage.com/',
        location: {
            lat: 36.1212,
            lng: -115.1741
        }
    },{
        name: 'ARIA Resort & Casino Las Vegas',
        address: '3730 S Las Vegas Blvd, Las Vegas, NV 89158',
        phone: '(866) 359-7111',
        rating: 4.4,
        website: 'https://www.aria.com/',
        location: {
            lat: 36.1075,
            lng: -115.1767
        }
    },{
        name: 'Treasure Island',
        address: '3300 S Las Vegas Blvd, Las Vegas, NV 89109',
        phone: '(702) 894-7111',
        rating: 4,
        website: 'https://www.treasureisland.com',
        location: {
            lat: 36.1247,
            lng: -115.1721
        }
    },{
        name: 'Wynn Las Vegas',
        address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
        phone: '(702) 770-7000',
        rating: 4.6,
        website: 'https://www.wynnlasvegas.com',
        location: {
            lat: 36.1265,
            lng: -115.1657
        }
    },{
        name: 'Hooters Casino Hotel',
        address: '115 E Tropicana Ave, Las Vegas, NV 89109',
        phone: '(702) 739-9000',
        rating: 3.2,
        website: 'https://www.hooterscasinohotel.com/',
        location: {
            lat: 36.1005,
            lng: -115.1677
        }
    }
];


function initMap() {
    // Create a styles array to use with the map.
    var styles = [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}];


        var lv = new google.maps.LatLng(36.1147,-115.1728);
    //Constructor creates a new map centered on Las Vegas Strip
        map = new google.maps.Map(document.getElementById('map'), {
            center: lv,
            zoom: 15,
            styles: styles,
        });

        infoWindow = new google.maps.InfoWindow();

        // Create a marker for each casino, and assign a letter to each marker icon.
        for (var i = 0; i < casinos.length; i++) {
            var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
            var markerIcon = MARKER_PATH + markerLetter + '.png';
            // Use marker animation to drop the icons on the map.
            markers[i] = new google.maps.Marker({
                name: casinos[i].name,
                address: casinos[i].address,
                phone: casinos[i].phone,
                rating: casinos[i].rating,
                website: casinos[i].website,
                position: casinos[i].location,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
            });

            casinos[i].marker = markers[i];
            getApiData(casinos[i]);

            // If the user clicks a casino marker, animate a marker and show the details in an info window.
            google.maps.event.addListener(markers[i], 'click', showInfoWindow);
            setTimeout(dropMarker(i), i * 100);
        }

// Center map on lv point when browser resizes
        var currCenter = map.getCenter();
        google.maps.event.addDomListener(window, 'resize', function() {
            map.setCenter(currCenter);
        });

// Initialize knockout.js bindings
        ko.applyBindings(new ViewModel());
}
// Error handling for google maps
function googleMapsError() {
        document.getElementById('map').textContent = "There was a problem with loading Google Maps. Please try again later.";
}

// Drops markers on a map
function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    };

}

// Animate selected marker and show the information for the casino in an info window.
function showInfoWindow() {
    if (currentMarker){
        currentMarker.setAnimation(null);
    }
    var marker = this;
    currentMarker = this;

    var contentString = '<table> <tr> <td></td><td id="name">' + this.name + '</td></tr><tr><td class="attribute_name">Address:</td><td id="address">' + this.address + '</td></tr><tr><td class="attribute_name">Phone#:</td><td id="phone">' + this.phone + '</td></tr><tr><td class="attribute_name">Rating:</td><td id="rating">' + this.rating + '/5</td></tr><tr><td class="attribute_name">Website:</td><td id="website"><a href="'+ this.website + '"target="_blank">' + this.name + '</a></td></tr><tr><td class="attribute_name">Wikipedia:</td><td id="wiki">' + this.wikiData + '</td></tr><tr><td class="attribute_name"><table><tr><td>Food Spots:</td></tr><tr><td class="small_text">(Provided by Foursquare)</td></tr></table><td id="foursquare">' + this.foursquareData + '</td></tr></table>';

    infoWindow.setContent(contentString);

    this.setAnimation(google.maps.Animation.BOUNCE);
    infoWindow.open(map, marker);

// Stop maker animation of infoWindow is closed
    google.maps.event.addListener(infoWindow, 'closeclick', function() {
        currentMarker.setAnimation(null);
    });
}

// Gets data from external APIs
function getApiData(place) {
    var wikiAPI = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + place.name + '&callback=?';

    $.jsonp({
        url: wikiAPI,
        dataType: 'jsonp',
        contentType: 'application/json; charset=utf-8',
        type: 'GET'
    }).done(function(data) {
        articles = data[1];
        if (articles.length < 1) {
            place.marker.wikiData = 'No articles found';
        }
        else {
            var article = articles[0];
            var url = 'https://en.wikipedia.org/wiki/' + article;
            place.marker.wikiData = '<a href="'+url+'"target="_blank">'+article+'</a>';
        }
    }).fail(function(jqXHR, textStatus) {
        place.marker.wikiData = 'Failed to get Wikipedia resources';
    });

    //Get Foursquare data
    var clientID = 'X14ECGOWZKYSANYXODQ5T5MTISNUXAV0AZOUPIUALBC0JLBL';
    var clientSecret = 'D4QVPYPNAUWHPZJCL0ARYUSHOBZ1TJ1HBD2UL5KSOAF3DPXM';
    var ll = place.location.lat + ',' + place.location.lng;
    var food_string  ='';

    $.ajax({
        url: 'https://api.foursquare.com/v2/venues/search',
        dataType: 'json',
        data: {
            client_id: clientID,
            client_secret: clientSecret,
            ll: ll,
            radius: 100,
            v: '20161219',
            limit: 5,
            categoryId: '4d4b7105d754a06374d81259' //Category id for food
        }
   }).done(function(data) {
        // If api returns error notify the user.
        if(data.meta.code!=200){
            place.marker.foursquareData = 'Failed to get Foursqaure data';
        }
        else {
            for (var i = 0; i < data.response.venues.length; i++) {
                if(data.response.venues[i].menu){
                    food_string += data.response.venues[i].name + ' - <a href="'+data.response.venues[i].menu.url + '"target="_blank">View Menu</a><br>';
                }
                else {
                    food_string += data.response.venues[i].name + '<br>';
                }
            }
            place.marker.foursquareData = food_string;
        }

    }).fail(function(jqXHR, textStatus) {
            place.marker.foursquareData = 'Failed to get Foursqaure data';
});

}

//Show/hide sidebar when hamburger button is clicked
$(document).ready(function() {
    $('[data-toggle=offcanvas]').click(function() {
        $('.row-offcanvas').toggleClass('active');
    });
});


var Model = function(data) {
    this.name = data.name;
    this.icon = data.marker.icon;
    this.marker = data.marker;
   this.visibleMarker = ko.observable(true);
};


var ViewModel = function(){
    var self = this;
    this.locations = ko.observableArray([]);
    this.filter = ko.observable('');

    casinos.forEach(function(casino){
        self.locations.push(new Model(casino));
    });

    this.clickListItem = function(clicked) {
        google.maps.event.trigger(clicked.marker, 'click');
    };

    this.filterMarkers = ko.computed(function(){
        self.locations().forEach(function(loc){
            if(loc.name.toLowerCase().indexOf(self.filter()) >= 0){
                loc.visibleMarker(true);
                loc.marker.setVisible(true);
            }
            else {
                loc.visibleMarker(false);
                loc.marker.setVisible(false);
            }
        });
    });

};


