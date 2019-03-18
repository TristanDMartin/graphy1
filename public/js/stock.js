//query strings, urls, ajax, and such

function getStockChart() {

function getChartURL() {


    var querySearch = $("#search-term").val().split(' ').join("+").toLowerCase();
    console.log("ASJDLASLDJHASJDHASJDHASKJD" + querySearch);


    $.ajax({
        url: "/api/time-series-daily/q/" + querySearch,
        method: "GET"
    })
        .then((result) => {
            makeGraph(result);
        })
        .catch((error) => {
            console.log(error);
        });
}

function makeGraph(obj) {

    //Stock object

    var values = obj["Time Series (Daily)"];
    // console.log("OBJECCTTTTT: " + JSON.stringify(obj));
    console.log(values[moment().subtract(1, "days").format("YYYY-MM-DD")]);

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
    console.log(rowsArr);

    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {

        var data = new google.visualization.DataTable();
        data.addColumn('date', 'X');
        data.addColumn('number', 'Open');
        data.addColumn('number', 'Close');

        //ddd MMM DD YYYY HH:mm:ss
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

console.log("read stock.js");
//on click event
$("#chart").on("click", function (event) {
    event.preventDefault();

    getStockChart();
    console.log("my onclick");
    getHeadlines();

    getURL();

});