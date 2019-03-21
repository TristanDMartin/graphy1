var db = require("../models");
const https = require('https');
const html = require("./htmlRoutes.js");


module.exports = function (app, passport) {
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
  app.get("/getUser", function (req, res) {
    if (req.isAuthenticated()) {
      db.User.findOne({where: {id: req.user.id}}).then(function(dbUser) {
        console.log(dbUser);
        res.json(dbUser);
      })
    } else {
      res.json(null);
    }
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/signin');
  };

  // search for company name by stock symbol
  app.get("/api/tickers/:symbol", function (req, res) {
    db.Stock_master.findAll({ where: { symbol: req.params.symbol } }).then(function (dbStock) {
      res.json(dbStock);
    });
  })
  //search for company name by search term
  app.get("/api/search/:search", function (req, res) {
    db.Stock_master.findAll({ where: { search_term: req.params.search } }).then(function (dbStock) {
      res.json(dbStock);
    });
  });

  app.get("/api/everything/q/:term", function (req, res) {
    https.get('https://newsapi.org/v2/everything?q=' + req.params.term + '&sortBy=popularity&apiKey=' + process.env.newsAPI, (result) => {

      let data = '';

      // A chunk of data has been recieved.
      result.on('data', (chunk) => {
        // console.log(data);
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
    https.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + req.params.term + '&apikey=' + process.env.stocksAPI, (result) => {
      let data = '';
      // A chunk of data has been recieved.
      result.on('data', (chunk) => {
        // console.log(data);
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      result.on('end', () => {
        res.type('json');
        res.end(data);

      });
    });
  });

  app.post("/api/pin", (req, res) => {
    req.isAuthenticated();
    console.log(req.body);
    db.Pin.create({
      user_id: req.user.id,
      symbol: req.body.symbol,
      date: req.body.date,
      text: req.body.text
    }).then(function(pin) {
      res.redirect("/")
    })
  })

  //User routes
  //Sign in
  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/user',
    failureRedirect: '/signin'
  }
  ));

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/user',
    failureRedirect: '/signup'
  }
  ));
};
