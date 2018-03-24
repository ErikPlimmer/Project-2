const path = require('path');


module.exports  = function(app){

  // Routing for the home page 
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  });
  
}