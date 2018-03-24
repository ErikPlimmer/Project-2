const express = require("express");
const bodyParser = require("body-parser"); 
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/app/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);




const port = process.env.PORT || process.argv[2] || 80;

app.listen(port, function() { 
        console.log(`Started server on  ${port}...`); 
});


  module.exports = app;


