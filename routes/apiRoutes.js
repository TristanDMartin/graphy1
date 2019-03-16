var db = require("../models");
const https = require('https');


module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // search for company name by stock symbol
  app.get("/api/stocks/:symbol", function (req, res) {
    db.Stock_master.findAll({ where: { symbol: req.params.symbol } }).then(function (dbStock) {
      res.json(dbStock);
    });
  })

  app.get("/api/top-headlines/q/:term", function (req, res) {
    https.get('https://newsapi.org/v2/top-headlines?q=' + req.params.term + '&apiKey=' + process.env.newsAPI, (result) => {
      let data = '';

      // A chunk of data has been recieved.
      result.on('data', (chunk) => {
        console.log(data);
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      result.on('end', () => {
        //console.log(JSON.parse(data).explanation);
        res.type('json');
        res.end(data);
      });
    });
  });

  app.get("/api/time-series-daily/q/:term", function (req, res) {
    console.log("IN THE APP GET FOR STOCKS2");

    https.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + req.params.term + '&apikey=' + process.env.stocksAPI, (result) => {
      let data = '';
      console.log("IN THE APP GET FOR STOCKS");

      // A chunk of data has been recieved.
      result.on('data', (chunk) => {
        console.log(data);
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      result.on('end', () => {
        res.type('json');
        res.end(data);

      });
    });
  });
};
