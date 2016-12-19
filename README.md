#Sin City Casinos Map

### How to run the app

Go <a href="https://julia-kudinovich.github.io/neighborhood-map/" target="_blank">here</a> and run the app directly from my GitHub page.

### About the app

- The application displays a list of casinos located on the Las Vegas Strip
- Each casino has a marker associated with it.
- After clicking the marker info window pops up displaying the data for the casino: address, phone, rating, website, Wikipedia article, and data from Foursquare (5 food spots and links to their menu if applicable)
- Left sidebar displays the list of the casinos which can be filtered. It includes a text input field that filters the map markers and list items to locations matching the text input or selection.
- A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied. Clicking a location on the list displays unique information about the location, and animates its associated map marker.
- App uses 3 APIs: Google Maps API, Wikipedia API and Foursquare API. All data requests are retrieved in an asynchronous manner.
- App implements KnockoutJS.
- All app components render on-screen in a responsive manner.



