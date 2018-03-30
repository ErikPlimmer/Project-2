const path = require('path');

var Users = require("../../models/Users.js");

const models = require("../../models");

// const models = require("../models");

module.exports = app => {
    
    app.post("/api/newPet", (req, res) => {
        // Create an Pet with the data available to us in req.body
        console.log(req.body);
        models.Pets
          .create(req.body)
          .then(dbPets => res.json(dbPets))
    });

    app.post("/api/newUsers", (req, res) => {
        // Create an User with the data available to us in req.body
        console.log(req.body);
       var name = req.body.name.replace(/\s+/g, "").toLowerCase();

        models.Users
          .create({
              name: req.body.name,
              petName: req.body.petName,
              petType: req.body.petType,
              photo: req.body.photo,
              location: req.body.location,
              email: req.body.email,
              password: req.body.password
          })
          .then(dbUsers => res.json(dbUsers))
    });
};
