const path = require('path');


module.exports  = function(app){

  // Routing for the home page 
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
  });
  
  app.get("/findPetSurvey", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/findPetSurvey.html'));
  });

  app.get("/petfinder", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/petfinder.html'));
  });
};