// Define global variables
var latitude;
var longitude;
let locations = [];
var searchTerm;

// Click listener for food search submit button
$("#submit-button").on("click", function (event) {
    // Prevent page from reloading when form is submitted
    event.preventDefault();

    // Empty results div so only the current 10 restaurant results will display
    $("#food-results").empty();

    // Empty locations array so that the 10 new lat/long objects can be added
    locations = [];

    // Grab user input from search field and store in variable to be inserted into AJAX queryUrl
    searchTerm = $("#food-input").val().trim();

    // Clear user input from search field after form is submitted
    $("#food-input").val("");

    // If user does not enter anything into search field or if their input begins with numbers (i.e. is an address), then show modal and don't perform AJAX calls
    if (searchTerm === "" || !isNaN(parseInt(searchTerm))) {
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
        }).then(function (response) {
            console.log(response);

            // Loop through the 10 objects in the Yelp API response to pull specific data points and dynamically add them to html page
            for (var i = 0; i < response.businesses.length; i++) {
                
                // Create div for each restaurant from the response
                var foodDiv = $("<div class ='card pt-3 rgba-blue-grey-light'>");

                // Insert restaurant name, Yelp page URL, Yelp image, address, and rating into dynamically created html elements
                var foodName = $("<h3>").text(response.businesses[i].name);
                var foodUrl = $("<a target='blank'>").attr("href", response.businesses[i].url).append(foodName);
                var foodImg = $("<img class='food-image'>").attr("src", response.businesses[i].image_url);
                var foodAddress = $("<p class ='card-body'>").text(response.businesses[i].location.display_address);
                var foodRating = $("<p>").text("Rating: " + response.businesses[i].rating + " out of 5");

                // Assign a unique id to each result div so we can target it later to append crime data
                foodDiv.attr("id", "result-num-" + i);

                // Attach all restaurant info to it's individual div and then attach this div to the html page
                foodDiv.append(foodUrl, foodImg, foodAddress, foodRating);
                $("#food-results").append(foodDiv);

                // Organize latitude and longitude for each restaurant as an object
                    // Each lat/long object is then pushed into an array to use later in the OPD Crimes API call
                locations.push(
                    {
                        lat: response.businesses[i].coordinates.latitude,
                        long: response.businesses[i].coordinates.longitude
                    });
            }

            console.log(locations);
            
            // Map over each object in locations array and run OPD Crimes API call for each lat/long pair
                // We then append the crime data to the page with dynamically created html elements
            locations.map((location, i) => {
               
                // AJAX call for OPD Crimes API
                var queryOPDUrl = "https://cors-anywhere.herokuapp.com/https://data.cityoforlando.net/resource/4y9m-jbmz.json?$where=within_circle(location," + location.lat + "," + location.long + ",5000) and case_date_time > '2017-06' and case_offense_charge_type = 'Committed' and case_offense_category = 'Assault' and case_deposition = 'Arrest'";

                $.ajax({
                    url: queryOPDUrl,
                    method: "GET"
                }).then(function (response) {

                    // Response.length will give us the number of crime reports in the specified area
                    console.log(response.length);

                    // Create new p tag
                    var p = document.createElement("p");

                    // Insert the crime data for each restaurant into new p tag
                    p.innerText = "Number of crimes in area: " + response.length;

                    // Append each new p tag with crime data to its respective restaurant div on html page
                    document.getElementById("result-num-" + i).appendChild(p);
                });

            });

        });

    }

});