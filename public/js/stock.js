//query strings, urls, ajax, and such
function buildQueryURL() {

    var queryAPI = "ac6789edc5834e9c95d6ee57b3ac79dd";
    var querySearch = $("#search-term").val().split(' ').join("+").toLowerCase();
    console.log(querySearch);
  
    // queryURL is the url we'll use to query the API
    var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + querySearch + "&apikey=83VRQDZG4I1R308O";
  
    console.log(queryURL);
  
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .done(makeGraph);
}

// graph, arrays, complicated stuff (obj = ajax call response)
function makeGraph(obj){

    //Stock object
    var Stock = {
        openArr: [],
        closeArr: [],
    }

    var values = obj["Time Series (Daily)"];
    console.log(values[moment().subtract(1, "days").format("YYYY-MM-DD")]["1. open"]);

    $("#chart-div").empty();

    // Stock.openArr = [2,3];
    // Stock.closeArr = [0,1];

    for(var i=0; i<30; i++){
        var day = moment().subtract(i, "days").format("YYYY-MM-DD");
        Stock.openArr.push(values[day]);
        console.log(values[day]);
    }
    // console.log(Stock.openArr[3]);

    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {

        var data = new google.visualization.DataTable();
        data.addColumn('date', 'X');
        data.addColumn('number', 'Dogs');

        //ddd MMM DD YYYY HH:mm:ss
        // var d1 = new Date(2010, 3, 10);
        // var d2 = new Date(moment().format("YYYY"), moment().format("D"), moment().format("M"));
        var d1 = moment().subtract(1, "days").toDate();
        var d2 = moment().toDate();
        console.log(d1);
        console.log(d2);
        data.addRows([
        [d1, 0],   [d2, 10]
        ]);

        var options = {
        hAxis: {
            title: 'Time'
        },
        vAxis: {
            title: 'Popularity'
        }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);
    }
}

//on click event
$("#run-search").on("click", function (event) {
    event.preventDefault();
    buildQueryURL();
});