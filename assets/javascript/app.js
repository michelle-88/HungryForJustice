// AJAX for OPD Crimes
var latitude = "28.4329306890688";
var longitude = "-81.4713156759186";

var queryOPDUrl = "https://data.cityoforlando.net/resource/4y9m-jbmz.json?$where=within_circle(location," + latitude + "," + longitude + ",5000) and case_date_time > '2017-06' and case_offense_charge_type = 'Committed' and case_offense_category = 'Assault' and case_deposition = 'Arrest'"

$.ajax({
    url: queryOPDUrl,
    method: "GET"
}).then(function(response){
    console.log(response);
    // This will give us the number of crime reports in the specified area. Need to determine criteria of what's low/medium/high crime.
    console.log(response.length); 
});

// AJAX call for Yelp Fusion API
var queryYelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=10&term=maggianos&location=orlando";
$.ajax({
    url: queryYelpUrl,
    headers: {
        'Authorization': 'Bearer nl17aOPr0p08nsjDyHPMrCNjgsc_8voZGJx1XttGzc0lhnb8EMhdl9UDgJH6szJH9wrv877dVxlBYbRjkr0AoZMu2_T9r0-0NJgkY2WwnSQMcZc0ZWw1YwJLwIqBXXYx'
    },  
    method: "GET"
}).then(function(response){
    console.log(response);
    console.log(response.businesses[0].name);
    console.log(response.businesses[0].url);
    console.log(response.businesses[0].location.display_address);
    console.log(response.businesses[0].rating);
    console.log(response.businesses[0].image_url);
    console.log(response.businesses[0].coordinates.latitude);
    console.log(response.businesses[0].coordinates.longitude);
});

// Parameters needed for OPD Crimes API
    // API endpoint: https://data.cityoforlando.net/resource/4y9m-jbmz.json?
    // "$$app_token": rooCFXkjf9sgOxm15EGlRNlfE
    // Use location (point data) OR location_zip parameter to find # of crimes in specified area?
    // when using location parameter, syntax is as follows: $where=within_circle(location,28.422239271,-81.332723878,1000)
        // This will pull crime cases with locations within the specified radius, which is in meters (we need to determine this radius)
        // Coordinates are Latitude, Longitude
    // Need to limit API results to crimes in last year

// Parameters needed for Yelp API
    // API endpoint: https://api.yelp.com/v3/businesses/search
    // API key: nl17aOPr0p08nsjDyHPMrCNjgsc_8voZGJx1XttGzc0lhnb8EMhdl9UDgJH6szJH9wrv877dVxlBYbRjkr0AoZMu2_T9r0-0NJgkY2WwnSQMcZc0ZWw1YwJLwIqBXXYx
    // Client ID: meg6MAQBLat4qpPNcZCiUw
