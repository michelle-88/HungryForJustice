// Define global variables
var latitude;
var longitude;
let locations = [];
var searchTerm;

// AJAX call for Yelp Fusion API
var queryYelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=10&term=pizza&location=orlando";

$.ajax({
    url: queryYelpUrl,
    headers: {
        'Authorization': 'Bearer nl17aOPr0p08nsjDyHPMrCNjgsc_8voZGJx1XttGzc0lhnb8EMhdl9UDgJH6szJH9wrv877dVxlBYbRjkr0AoZMu2_T9r0-0NJgkY2WwnSQMcZc0ZWw1YwJLwIqBXXYx'
    },  
    method: "GET"
}).then(function(response){
    console.log(response);

    // Loop through the Yelp API response to pull specific data points and dynamically add them to html page
    for(var i = 0; i < response.businesses.length;i++){

        // Create div for each restaurant from the response
        var foodDiv = $("<div>");

        // Insert restaurant name, Yelp URL, Yelp image, address, and rating into dynamically created html elements
        var foodName = $("<h3>").text(response.businesses[i].name);
        var foodUrl = $("<a>").attr("href", response.businesses[i].url).append(foodName);
        var foodImg = $("<img class='food-image'>").attr("src", response.businesses[i].image_url);
        var foodAddress = $("<p>").text(response.businesses[i].location.display_address);
        var foodRating = $("<p>").text("Rating: " + response.businesses[i].rating + " out of 5");

        // Assign a unique id to each result div so we can target it to append crime data later
        foodDiv.attr("id", "result-num-" + i);

        // Attach all restaurant info to it's individual div and then attach this div to the html page
        foodDiv.append(foodUrl, foodImg, foodAddress, foodRating);
        $("#food-results").append(foodDiv);

        // Push the latitude and longitude for each restaurant into arrays to use later in the OPD Crimes API call
        // latArray.push(response.businesses[i].coordinates.latitude);
        // longArray.push(response.businesses[i].coordinates.longitude);
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
            //everything goes in here
            //build the element
            //make the call
            //append to page
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


            
        })
    
}) 


// .then(function(){
    
   

//     // Create for loop that will iterate 10 times
//     for(var i = 0; i < 10; i++){
//         //function
//         uopdatePage(i);
//         // Store latitude and longitude at each array index and store in variables to be used in OPD Crimes API call
//         latitude = latArray[i];
//         longitude = longArray[i];

        
 

//         var queryOPDUrl = "https://data.cityoforlando.net/resource/4y9m-jbmz.json?$where=within_circle(location," + latitude + "," + longitude + ",5000) and case_date_time > '2017-06' and case_offense_charge_type = 'Committed' and case_offense_category = 'Assault' and case_deposition = 'Arrest'";
        
//         // AJAX call for OPD Crimes API
//         $.ajax({
//             url: queryOPDUrl,
//             method: "GET"
//         }).then(function(response){
//             // console.log(response);

//             // Response.length is the number of crime reports in the specified area
//             // console.log(response.length);

           

//             // Append number of crimes to each restaurant's div
//             p.innerText = "Number of crimes in area: " + response.length; 
//             // $("#food-results").prepend(crimeNum);

//             console.log("p tag; ", p);
          
//             document.getElementById("result-num-" + i).appendChild(p); 
            // $(document).find("#result-num-" + i).append(p);
//         });
//     }
// })

// Parameters needed for OPD Crimes API
    // API endpoint: https://data.cityoforlando.net/resource/4y9m-jbmz.json?
    // "$$app_token": rooCFXkjf9sgOxm15EGlRNlfE
    // when using location parameter, syntax is as follows: $where=within_circle(location,28.422239271,-81.332723878,1000)
        // This will pull crime cases with locations within the specified radius, which is in meters (we need to determine this radius)

// Parameters needed for Yelp API
    // API endpoint: https://api.yelp.com/v3/businesses/search
    // API key: nl17aOPr0p08nsjDyHPMrCNjgsc_8voZGJx1XttGzc0lhnb8EMhdl9UDgJH6szJH9wrv877dVxlBYbRjkr0AoZMu2_T9r0-0NJgkY2WwnSQMcZc0ZWw1YwJLwIqBXXYx
    // Client ID: meg6MAQBLat4qpPNcZCiUw