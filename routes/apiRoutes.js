var db = require("../models");

module.exports = function(app, passport) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // search for company name by stock symbol
  app.get("/api/stocks/:symbol", function(req, res) {
    db.Stock_master.findAll({ where: {symbol: req.params.symbol} }).then(function(dbStock) {
      res.json(dbStock);
    });
  });

  app.get("/api/search/:search", function(req, res) {
    db.Stock_master.findAll({ where: {search_term: req.params.search} }).then(function(dbStock) {
      res.json(dbStock);
    });
  });

  //User routes
  //Sign in
  app.post('/signin', passport.authenticate('local-signin',  {
    successRedirect: '/user',
    failureRedirect: '/signin'}
  ));

  app.post('/signup', passport.authenticate('local-signup',  { 
    successRedirect: '/user',
    failureRedirect: '/signup'}
  ));


};
