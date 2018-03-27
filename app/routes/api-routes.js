const path = require('path');
// const models = require("../models");

module.exports = app => {
    
    app.post("/api/newPet", (req, res) => {
        // Create an Pet with the data available to us in req.body
        console.log(req.body);
        models.Pets
          .create(req.body)
          .then(dbPets => res.json(dbPets))
    });
};
