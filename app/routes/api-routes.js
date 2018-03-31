const path = require('path');

var Users = require("../../models/Users.js");

const models = require("../../models");

// pull in the pets variable data file
var pets = require('../data/pets.js');


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

      // if user goes to /api/pets, send them the variable data as json
  app.get("/api/pets", function(req, res) {
    res.json(pets);
  });

  // handle the post request from the survey form
  app.post("/api/pets", function(req, res) {
    
    // begin by setting up the array hoding the user's answers
    var surveyResults = req.body.scores;
    // convert the values in surveyResults to integers
    for (var i=0; i<surveyResults.length; i++) {
      surveyResults[i] = parseInt(surveyResults[i]);
    }

    // bestDifference variable will hold the value
    // difference between a pet in the pets array
    // and user selections, and bestMatch will hold
    // the position in the array of the best match
    var bestDifference = 999999; // start with a high dummy value
    var bestMatch = 0; // assume the first pet is the best match then adjust later

    // cycle through the pets array and hit every pet stored in there
    for (var i=0; i<pets.length; i++) {

      // define a temp value that calculates difference between user selection and
      // the current i-th animal friend being compared against and use the
      // difference function to calculate the difference
      var tempDifference = difference(surveyResults, pets[i].scores);

      // console log the difference between user choices and pet being compared
      console.log("difference between", surveyResults, "and", pets[i].name, pets[i].scores, "=", tempDifference);

      // if the comparison shows that the current animal has a lower difference (hence is
      // a better match) then update the value of the best difference to be the current
      // comparison's difference, and update the best match to the current i-th position which
      // represents the pet being compared. After this loop finishes, bestMatch will reflect
      // the true final best match
      if (tempDifference < bestDifference) {
        bestDifference = tempDifference;
        bestMatch = i;
      }
    }

    // function to calculate the difference between two arrays
    // it cycles through values of each array and subtracts them
    // from values of the other aray, and applies absolute
    // value function, then returns the total tally reflecting
    // the deviation between the two arrays.
    function difference(array1, array2) {

      // differenceAmount holds the tally of the difference between array values
      var differenceAmount=0;
      
      for (var i=0; i<array1.length; i++) {
        differenceAmount += Math.abs(array1[i] - array2[i]);
      }
      
      // return the difference between the two arrays reflecting the deviation
      return differenceAmount;
    }

    // send the bestMatch back to the html page in response to the post
    res.send(pets[bestMatch]);
  });
};
