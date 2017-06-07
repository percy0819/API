// SETUP VARIABLES
// ==========================================================

// This variable will be pre-programmed with our authentication key
// (the one we received when we registered)
// var queryURL = "https://api.jambase.com/events?zipCode=11357&radius=50&page=1&api_key=7u9bzuxs8jwk4r8xtbrhufrh";
var authKey = "7u9bzuxs8jwk4r8xtbrhufrh";

// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = document.getElementById("search-term");
var numResults = 0;
var startYear = 0;
var endYear = 0;

// queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// the user hits the search button
// https://api.seatgeek.com/2
// var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
// authKey + "&q="; 

// Counter to keep track of article numbers as they come in
var articleCounter = 0;

// FUNCTIONS
// ==========================================================

// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)
function runQuery() {
    console.log(searchTerm.value);
    var queryURLBase = "http://api.jambase.com/events?zipCode=" + searchTerm.value + "&api_key=7u9bzuxs8jwk4r8xtbrhufrh";

    // The AJAX function uses the queryURL and GETS the JSON data associated with it.
    // The data then gets stored in the variable called: "NYTData"

    $.ajax({
        url: queryURLBase,
        method: "GET"
    }).done(function(response) {

        // Logging the URL so we have access to it for troubleshooting
        console.log("------------------------------------");
        console.log("URL: " + queryURLBase);
        console.log("------------------------------------");

        // Log the NYTData to console, where it will show up as an object
        console.log(response.Events);
        // for (var i = 0; i < 10; i++) {
    for (var i = 0; i < 10; i++) {

      // Add to the Article Counter (to make sure we show the right number)
      articleCounter++;

      // Create the HTML well (section) and add the article content for each
      var wellSection = $("<div>");
      wellSection.addClass("well");
      // wellSection.attr("id", "article-well-" + articleCounter + );
      wellSection.attr("id", "article-well-" + articleCounter);
      $("#well-section").append(wellSection);

      // Confirm that the specific JSON for the article isn't missing any details
      // If the article has a headline include the headline in the HTML
      if (response.Events[i].Venue.Url !== "null") {
        $("#article-well-" + articleCounter)
          .append(
            "<h3 class='articleHeadline'><span class='label label-primary'>" +
            articleCounter + "</span><strong> " +
            response.Events[i].Venue.Url + "</strong></h3>"
          );

        // Log the first article's headline to console
        console.log(response.Events[i].Venue.Url);
      }

      // If the article has a byline include the headline in the HTML
      //if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
      //  $("#article-well-" + articleCounter)
      //    .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

        // Log the first article's Author to console.
       // console.log(NYTData.response.docs[i].byline.original);
      //}
      console.log(response.Events[i])
            console.log(response.Events[i].TicketUrl.search("https://www.ticketfly.com"))
            var urlStart = response.Events[i].TicketUrl.search("https://www.ticketfly.com")
            var TicketUrlValue = response.Events[i].TicketUrl.slice(urlStart)

      // Then display the remaining fields in the HTML (Section Name, Date, URL)
      //$("#articleWell-" + articleCounter)
       // .append("<h5>Section: " + response.Events[i].Venue.Url + "</h5>");

      //$("#articleWell-" + articleCounter)
      //  .append("<h3>" + $("#well-section").append("<h3>" + response.Events[i].Venue.Address + " " + response.Events[i].Venue.City + " " + response.Events[i].Venue.StateCode + " " + response.Events[i].Venue.ZipCode + "</h3>")
      $("#well-section").append("<h5>" + response.Events[i].Venue.Address + " " + response.Events[i].Venue.City + " " + response.Events[i].Venue.StateCode + " " + response.Events[i].Venue.ZipCode + "</h5>");    
      $("#article-well-" + articleCounter)
        .append("<a href='" + response.Events[i].Venue.Url  + "' ><button>Buy ticket</button></a>"
        );
      // TicketUrlValue
      $("#well-section").append("<H5>" + response.Events[i].Venue.Name + "</h5>");
      $("#well-section").append("<h5>" + response.Events[i].Date + "</h5>");
      $("#well-section").append("<h5>" + response.Events[i].Venue.Url + "</h5>");
      $("#well-section").append("<h5>" + TicketUrlValue + "</h5>");
      $("#well-section").append("<h5>" + urlStart + "<h5>");
      // Log the remaining fields to console as well
      console.log(response.Events[i].Date);
      console.log(response.Events[i].Venue.Url);
      console.log(response.Events[i].Artists[0].Name);
    }





     //   for (var i = 0; i < 10; i++) {
     //       console.log(response.Events[i])
     //       console.log(response.Events[i].TicketUrl.search("https://www.ticketfly.com"))
     //       var urlStart = response.Events[i].TicketUrl.search("https://www.ticketfly.com")
     //       var TicketUrlValue = response.Events[i].TicketUrl.slice(urlStart)

                //  $("#well-section").append("<h1>"+ response.Events[i].Artists[0].Name + "</h1>");
     //      $("#well-section").append("<h5>" + response.Events[i].Artists[0].Name + "</h5>");

     //      $("#well-section").append("<h5>" + response.Events[i].Date + "</h5>");
     //       $("#well-section").append("<h5>" + response.Events[i].Venue.Url + "</h5>");
     //       $("#well-section").append("<h5>" + TicketUrlValue + "</h5>");
     //       $("#well-section").append("<h5>" + urlStart + "<h5>");
     //       $("#well-section").append("<h5>" + response.Events[i].Venue.Address + " " + response.Events[i].Venue.City + " " + response.Events[i].Venue.StateCode + " " + response.Events[i].Venue.ZipCode + "</h5>");
     //   }
     //   console.log("------------------------------------");

    });
}


// METHODS
// ==========================================================

// on.("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks).
    //alert (searchTerm.value)
    
    event.preventDefault();
    runQuery();

});

// This button clears the top articles section
$("#clear-all").on("click", function() {
    articleCounter = 0;
    $("#well-section").empty();
});
