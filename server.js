const express = require("express");
const bodyParser = require("body-parser"); 
const path = require("path");

var db = require("./models");
const app = express();

app.use(express.static(__dirname + "/app/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./app/routes/api-routes")(app);
require("./app/routes/html-routes")(app);



const port = process.env.PORT || process.argv[2] || 80;

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log(`Started server on  ${port}...`);
  });
});


