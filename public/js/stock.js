//query strings, urls, ajax, and such
function getStockChart(stockName) {
    $.ajax({
        url: "/api/time-series-daily/q/" + stockName,
        method: "GET"
    })
        .then((result) => {
            makeGraph(result);
        })
        .catch((error) => {
            console.log(error);
        });
}

function makeGraph(result) {

    //Stock object

    var values = result["Time Series (Daily)"];

    $("#chart-div").empty();

    var x = [];
    var rowsArr = [];
    var dateArr = [];
    var openArr = [];
    var closeArr = [];
    for (var i = 0; i < 30; i++) {
        var day = moment().subtract(i, "days").format("YYYY-MM-DD");

        //fillout undefined values
        if (values[day] === undefined) {
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
    // console.log(rowsArr);

    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {

        var data = new google.visualization.DataTable();
        data.addColumn('date', 'X');
        data.addColumn('number', 'Open');
        data.addColumn('number', 'Close');
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
function getStockTicker(searchTerm) {
    $.ajax({
        url: "api/search/" + searchTerm,
        type: "GET"
    })
        .then((result) => {
            if (result[0]) {
                var stockName = result[0].search_term;
                var symbol = result[0].symbol;
                getStockChart(symbol);
                getHeadlines(stockName);
            }
            else {
                $.ajax({
                    url: "/api/tickers/" + searchTerm,
                    type: "GET"
                }).then((result) => {
                    if (result[0]) {
                        var stockName = result[0].search_term;
                        var symbol = result[0].symbol;
                        getStockChart(symbol);
                        getHeadlines(stockName);
                    }
                    else {
                        $("#article-section").text(" Sorry, We could not find any results for the specific search. Please try again. ");
                    }
                })
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

//on click event
$("#run-search").on("click", function (event) {
    event.preventDefault();
    if (querySearch) {
        var querySearch = $("#search-term").val().toLowerCase();
        console.log(querySearch);
        getStockTicker(querySearch);
        $("#article-section").empty();
        $("#search-term").val("");
        $("#search-term").attr("placeholder", querySearch);
    }
    else {
        $("#article-section").text("Please enter a search term.");
    }

});

$("#search-term").on("click", function () {
    $("#search-term").attr("placeholder", "");
});