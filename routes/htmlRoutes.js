var db = require("../models");

module.exports = function (app, passport) {
  // Load index page
  app.get("/", function (req, res) {
    if (req.isAuthenticated()){
      res.render("index", {
        user: req.user
      })
    } else {
      res.render("index", {
        // msg: "Welcome!",
        // examples: dbExamples
      });
    }
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  //User pages
  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/signin", (req, res) => {
    res.render("signin");
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");;
  })

  // app.get("/user", (req, res) => {
  //   res.rednder("user");
  // });

  app.get('/user', isLoggedIn, (req, res, {user}) => {
    if(req.isAuthenticated()){
      db.Pin.findAll({where: {user_id: req.user.id}}).then( (dbPins) => {
        res.render("user", {
          pin: dbPins 
        });
      });
    } else {
      res.redirect("/");
    }
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/signin');
  };

  app.get('/pins', (req, res) => {
    if(req.isAuthenticated()){
      db.Pin.findAll({where: {user_id: req.user.id}}).then( (dbPins) => {
        res.render("pins", {
          pin: dbPins 
        });
      });
    } else {
      res.redirect("/");
    }
  });

   // Render 404 page for any unmatched routes
 app.get("*", function (req, res) {
  res.render("404");
});
};