var express = require("express");
var app = express();

// set port
var port = process.env.PORT || 3000;

//import
require("./config/express")(app);
require("./routes")(app);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Listening on ${port}!`))