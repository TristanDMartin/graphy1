//nytCode.js is implemented on our index.handlebars page. 

//getHeadlines is grabbing the user input
function getHeadlines(fixString) {
  //Ajax call here to pass our search term (company/stock name) through our news article API Query. 
  $.ajax({
    url: "/api/everything/q/" + fixString,
    method: "GET"
  })
    .then((result) => {
      //passing the result through our updatePage function..
      updatePage(result);
    })
    .catch((error) => {
      console.log(error);
    });
}


function updatePage(result) {
  // Log the newsAPI to console, where it will show up as an object
  console.log("------------------------------------");

  // Loop through and build elements for the defined number of articles
  for (var i = 0; i < 5; i++) {
    // Get specific article info for current index
    var article = result.articles[i];
    if (article) {
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
      else {
        publishedDate = "Cannot find published date.";
      }
      // Append and log url
      $articleListItem.append("<a href='" + article.url + "'>URL Here!</a>");
      console.log(article.url);

      // Append the article
      $articleList.append($articleListItem);
    }
    $('#hidden_articles').show();
  }
}

//  .on("click") function associated with the clear button
$("#clear-all").on("click", function (event) {
  event.preventDefault();
  $("#article-section").empty();
  $("#chart_div").empty();
});
