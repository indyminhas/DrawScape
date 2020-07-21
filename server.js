//* SERVER SETUP

// Dependencies
// =============================================================
const express = require("express")
const exphbs = require("express-handlebars");

// Express App Setup
// =============================================================
const app = express();

// setup for socket.io
const server = require('http').createServer(app);
const io=require('socket.io')(server);

const PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// serve static assets(files) from the public directory
app.use(express.static("public"));

// configure handlebars as the view engine
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
// =============================================================
// require("./app/routes/api-routes.js")(app);

//socket.io setup
//Listen for incoming connections from clients
io.on('connection', function(socket){
  console.log('Client connected...')
  //start listening for mouse move events
  socket.on('mousemove', function(data){
  
      //This line sends the event (broadcasts it) to everyone except the original client.
      socket.broadcast.emit('moving', data);
      
  });
});


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("Server listening on PORT " + PORT);
    });
  });
  