// Define global variables
var latitude;
var longitude;
let locations = [];
var searchTerm;

// Click listener for food search submit button
$("#submit-button").on("click", function(event){
    // Prevent page from reloading when form is submitted
    event.preventDefault();

    // Empty results div so only current 10 restaurant results will display
    $("#food-results").empty();

    // Empty locations array so that the new 10 lat/long objects can be added
    locations = [];
    
    // Grab user input from search field and store in variable to be inserted into AJAX queryUrl
    searchTerm = $("#food-input").val().trim();

    // Clear user input from search field after form is submitted
    $("#food-input").val("");
    
    // If user does not enter anything into search field or if the their input includes numbers (i.e. is an address), then show modal and don't perform AJAX calls
    if(searchTerm === "" || !isNaN(parseInt(searchTerm))){
        $("#errorModal").modal('show');
    }

    else {

// AJAX call for Yelp Fusion API
var queryYelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=10&term=" + searchTerm + "&location=orlando";

$.ajax({
    url: queryYelpUrl,
    headers: {
        'Authorization': 'Bearer nl17aOPr0p08nsjDyHPMrCNjgsc_8voZGJx1XttGzc0lhnb8EMhdl9UDgJH6szJH9wrv877dVxlBYbRjkr0AoZMu2_T9r0-0NJgkY2WwnSQMcZc0ZWw1YwJLwIqBXXYx'
    },  
    method: "GET"
}).then(function(response){
    console.log(response);

    // Loop through the Yelp API response to pull specific data points and dynamically add them to html page
    for(var i = 0; i < response.businesses.length; i++){
        // Create div for each restaurant from the response
        var foodDiv = $("<div class ='card rgba-blue-grey-light'>");

        // Insert restaurant name, Yelp URL, Yelp image, address, and rating into dynamically created html elements
        var foodName = $("<h3>").text(response.businesses[i].name);
        var foodUrl = $("<a target='blank'>").attr("href", response.businesses[i].url).append(foodName);
        var foodImg = $("<img class='food-image'>").attr("src", response.businesses[i].image_url);
        var foodAddress = $("<p class ='card-body'>").text(response.businesses[i].location.display_address);
        var foodRating = $("<p>").text("Rating: " + response.businesses[i].rating + " out of 5");

        // Assign a unique id to each result div so we can target it to append crime data later
        foodDiv.attr("id", "result-num-" + i);

        // Attach all restaurant info to it's individual div and then attach this div to the html page
        foodDiv.append(foodUrl, foodImg, foodAddress, foodRating);
        $("#food-results").append(foodDiv);

        // Push the latitude and longitude for each restaurant into arrays to use later in the OPD Crimes API call
        locations.push(
            {
                lat:response.businesses[i].coordinates.latitude,
                long:response.businesses[i].coordinates.longitude
            })
         //locations array with locations[{lat:lat,long:long},{lat:lat,long:long},{lat:lat,long:long},{lat:lat,long:long}]
        //getCrimesFunction that makes the call to the crimes api and builds the element
    }
        console.log(locations)
        locations.map((location, i) => {
            console.log(location.lat, location.long);
        var queryOPDUrl = "https://data.cityoforlando.net/resource/4y9m-jbmz.json?$where=within_circle(location," + location.lat + "," + location.long + ",5000) and case_date_time > '2017-06' and case_offense_charge_type = 'Committed' and case_offense_category = 'Assault' and case_deposition = 'Arrest'";
        
        // AJAX call for OPD Crimes API
        $.ajax({
            url: queryOPDUrl,
            method: "GET"
        }).then(function(response){
            console.log(response.length);

            // Response.length is the number of crime reports in the specified area
            // console.log(response.length);

            var p = document.createElement("p");

            // Append number of crimes to each restaurant's div
            p.innerText = "Number of crimes in area: " + response.length; 
            // $("#food-results").prepend(crimeNum);

            console.log("p tag; ", p);
          console.log(i);
          
            document.getElementById("result-num-" + i).appendChild(p); 
            // $(document).find("#result-num-" + i).append(p);
        });
            
    });
    
});

}

});