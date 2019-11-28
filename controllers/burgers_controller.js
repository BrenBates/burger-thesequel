// Inside the burgers_controller.js file, import the following:

// Express
// burger.js

// Create the router for the app, and export the router at the end of the file.


var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
// var burger = require("../models/burger.js");

var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    // burger.selectAll(function(data) {
    //   var hbsObject = {
    //     burgers: data
    //   };
    //   console.log(hbsObject);
    //   res.render("index", hbsObject);
    // });

    db.Burger.findAll({}).then(function(data) {
      var hbsObject = {
        burgers: data
      }
      res.render("index",hbsObject);
      
    })

  });

  router.get("/api/burgers", function(req, res) {
    // burger.selectAll(function(data) {
    //   var hbsObject = {
    //     burgers: data
    //   };
    //   console.log(hbsObject);
    //   res.render("index", hbsObject);
    // });

    db.Burger.findAll({}).then(function(dbBurger) {
      res.json(dbBurger);
    })

  });
  
  router.post("/api/burgers", function(req, res) {

    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(dbBurger) {
      res.json(dbBurger);
    }).catch(function(err) {
      res.status(500).json(err)
    });


    // burger.insertOne([
    //   "burger_name", "devoured"
    // ], [
    //   req.body.burger_name, req.body.devoured
    // ], function(result) {
    //   // Send back the ID of the new quote
    //   res.json({ id: result.insertId });
    // });

  });
  
  router.put("/api/burgers/:id", function(req, res) {
   db.Burger.update({
     burger_name: req.body.burger_name,
     devoured: req.body.devoured},
     {where: {
       id: req.params.id
     }}
   ).then(function(dbBurger){
     res.json(dbBurger);
   })
  });

  // Export routes for server.js to use.
module.exports = router;

