
function getHeadlines() {

  var querySearch = $("#search-term").val().split(' ').join("+").toLowerCase();

function buildQueryURL(querySearch) {

  var queryAPI = "ac6789edc5834e9c95d6ee57b3ac79dd";

  console.log(querySearch);

  // queryURL is the url we'll use to query the API

  //CREATE A CUSTOM AJAX CALL TO GRAB THE APIKEY CALL IN API ROUTES 
  //THIS WILL GRAB THE API KEY 

  $.ajax({

    url: "/api/top-headlines/q/" + querySearch,
    method: "GET"
  })
    .then((result) => {
      console.log(result);
      updatePage(result);
    })
    .catch((error) => {
      console.log(error);
    });

    url: queryURL,
    method: "GET"
  })
    .then(updatePage);

}


function updatePage(newsAPI) {
  // Get from the form the number of results to display
  // API doesn't have a "limit" parameter, so we have to do this ourselves
  // var numArticles = $("#article-count").val(); 

  // Log the newsAPI to console, where it will show up as an object
  // console.log(newsAPI);
  console.log("------------------------------------");

  // Loop through and build elements for the defined number of articles
  for (var i = 0; i < 5; i++) {
    // Get specific article info for current index
    var article = newsAPI.articles[i];
    console.log(article);

    // Increase the articleCount (track article # - starting at 1)
    var articleCount = i + 1;

    // Create the  list group to contain the articles and add the article content for each
    var $articleList = $("<ul>");
    $articleList.addClass("list-group");

    // Add the newly created element to the DOM
    $("#article-section").append($articleList);

    // If the article has a headline, log and append to $articleList
    var headline = article.title;
    // console.log("HEADLINE ========= : " + headline);
    var $articleListItem = $("<li class='list-group-item articleHeadline'>");

    if (headline  != ("null" || "undefined")) {
      // console.log(headline);
      $articleListItem.append(
        "<span class='label label-primary'>" +
        articleCount +
        "</span>" +
        "<strong> " +
        headline +
        "</strong>"
      );
    }
    else {
      headline = "Sorry, No Title";
      $articleListItem.append(
        "<span class='label label-primary'>" +
        articleCount +
        "</span>" +
        "<strong> " +
        headline +
        "</strong>"
      );
    }

    // Log section, and append to document if exists
    var description = article.description;
    console.log(article.description);
    if (description != ("null" || "undefined")) {
      $articleListItem.append("<h5>Description: " + description + "</h5>");
    }
    else {
      description = "Sorry, no description found.";
      $articleListItem.append("<h5>Description: " + description + "</h5>");
    }

    // Log published date, and append to document if exists
    var publishedDate = article.publishedAt;
    console.log(article.publishedAt);

    if (publishedDate != ("null" || "undefined")) {
      publishedDate = moment(publishedDate).calendar();
      console.log("NEW MOMENT DATE/TIME: " + publishedDate);
      $articleListItem.append("<h5>" + publishedDate + "</h5>");
    }
    else {
      publishedDate = "Cannot find published date.";
      $articleListItem.append("<h5>" + publishedDate + "</h5>");
    }


    // Append and log url
    $articleListItem.append("<a href='" + article.url + "'>URL Here!</a>");
    console.log(article.url);

    // Append the article
    $articleList.append($articleListItem);
  }
}

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}

// Get name from symbol

function getName(symbol) {
  return $.ajax({
    url: "api/stocks/" + symbol,
    type: "GET"

function getName(symbol){
    return $.ajax({
      url: "api/stocks/" + symbol,
      type: "GET"

  });
}

<<<<<<< HEAD
=======
// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button

// $("#run-search").on("click", function (event) {
//   // This line allows us to take advantage of the HTML "submit" property
//   // This way we can hit enter on the keyboard and it registers the search
//   // (in addition to clicks). Prevents the page from reloading on form submit.
//   event.preventDefault();
  
// });

$("#run-search").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();
  getChartURL();
  // // Empty the region associated with the articles
  // clear();

  // // Build the query URL for the ajax request to the NYT API
  // var queryURL = buildQueryURL();

  // console.log("In Run search CLICK EVENT");

  // // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // // The data then gets passed as an argument to the updatePage function
  
  var test = $("#search-term").val().split(' ').join("+").toLowerCase();
  getName(test).then( (data) => {
    var fixString = data[0].search_term.split(' ').join("+").toLowerCase();
    buildQueryURL(fixString);
  });

});


>>>>>>> 8f89edf9ecd29aa857ef83585d7b7b73dc6a94c6
//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
