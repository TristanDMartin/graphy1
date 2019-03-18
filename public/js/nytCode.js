function getHeadlines(fixString) {
  // queryURL is the url we'll use to query the API

  //CREATE A CUSTOM AJAX CALL TO GRAB THE APIKEY CALL IN API ROUTES 
  //THIS WILL GRAB THE API KEY 

  $.ajax({
    url: "/api/everything/q/" + fixString,
    method: "GET"
  })
    .then((result) => {
      console.log(result);
      updatePage(result);
    })
    .catch((error) => {
      console.log(error);
    });
}


function updatePage(result) {
  // Get from the form the number of results to display
  // API doesn't have a "limit" parameter, so we have to do this ourselves
  // var numArticles = $("#article-count").val(); 

  // Log the newsAPI to console, where it will show up as an object
  // console.log(newsAPI);
  console.log("------------------------------------");

  // Loop through and build elements for the defined number of articles
  for (var i = 0; i < 5; i++) {
    // Get specific article info for current index
    var article = result.articles[i];
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
    console.log("HEADLINE ========= : " + headline);
    var $articleListItem = $("<li class='list-group-item articleHeadline'>");

    if (headline) {
      console.log(headline);
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
      headline = "No Title";
    }

    // Log section, and append to document if exists
    var description = article.description;
    console.log(article.description);
    if (description) {
      $articleListItem.append("<h5>Description: " + description + "</h5>");
    }

    // Log published date, and append to document if exists
    var publishedDate = article.publishedAt;
    console.log(article.publishedAt);

    if (publishedDate) {
      publishedDate = moment(publishedDate).calendar();
      console.log("NEW MOMENT DATE/TIME: " + publishedDate);
      $articleListItem.append("<h5>" + publishedDate + "</h5>");
    }
    else{
      publishedDate = "Cannot find published date.";
    }


    // Append and log url
    $articleListItem.append("<a href='" + article.url + "'>URL Here!</a>");
    console.log(article.url);

    // Append the article
    $articleList.append($articleListItem);
  }
}
// =====================================================================================================
// TICKER SEARCH HERE
//======================================================================================================

// function getStockByTicker(stockTicker) {
//   return $.ajax({
//       url: "/api/stocks/" + stockTicker,
//       type: "GET"
//   })
// }
// Function to empty out the articles
function clear() {
  $("#article-section").empty();
};

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
