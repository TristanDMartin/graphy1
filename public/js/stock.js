//query strings, urls, ajax, and such
function getChartURL() {

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
    var priceArr = [];

    var values = obj["Time Series (Daily)"];
    console.log(values[moment().subtract(1, "days").format("YYYY-MM-DD")]);

    $("#chart-div").empty();

    // Stock.openArr = [2,3];
    // Stock.closeArr = [0,1];

    var x = [];
    var rowsArr = [];
    var dateArr = [];
    var openArr = [];
    var closeArr = [];
    for(var i=0; i<30; i++){
        var day = moment().subtract(i, "days").format("YYYY-MM-DD");

        //fillout undefined values
        if(values[day] === undefined){
            dateArr.unshift(moment().subtract(i, "days").toDate());
            openArr.unshift(parseFloat(x["1. open"]));
            closeArr.unshift(parseFloat(x["4. close"]));
        } else {
            dateArr.unshift(moment().subtract(i, "days").toDate());
            openArr.unshift(parseFloat(x["1. open"]));
            closeArr.unshift(parseFloat(x["4. close"]));
            x = values[day];
        }
        //populate array to be added to graph
        rowsArr.unshift([dateArr[0], openArr[0], closeArr[0]])
    }
    console.log(rowsArr);

    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {

        var data = new google.visualization.DataTable();
        data.addColumn('date', 'X');
        data.addColumn('number', 'Open');
        data.addColumn('number', 'Close');

        //ddd MMM DD YYYY HH:mm:ss
        // var d1 = new Date(2010, 3, 10);
        // var d2 = new Date(moment().format("YYYY"), moment().format("D"), moment().format("M"));
        var d1 = moment().subtract(1, "days").toDate();
        var d2 = moment().toDate();
        console.log(d1);
        console.log(d2);
        data.addRows(rowsArr);

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
$("#chart").on("click", function (event) {
    event.preventDefault();
    getURL();
});