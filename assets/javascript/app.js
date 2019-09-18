// Define global variables
// AJAX for OPD Crimes
var latitude;
var longitude;
// Search radius is 35,000 meters (20 miles)
var queryUrl = "https://data.cityoforlando.net/resource/4y9m-jbmz.json?$$app_token=rooCFXkjf9sgOxm15EGlRNlfE&$where=within_circle(location," + latitude + "," + longitude + ",35000";

$.ajax({
    url: queryUrl,
    method: "GET",
    headers: {

    }
}).then(function(response){
    console.log(response);
    // This will give us the number of crime reports in the specified area. Need to determine criteria of what's low/medium/high crime.
    console.log(response.length);
    
    
})

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
    // include orlando in hard coded queryUrl
    // determine a limit for number of responses - 10
    // sort by rating?
