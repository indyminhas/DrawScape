//* SERVER SETUP

// Dependencies
// =============================================================
const express = require("express")
const exphbs = require("express-handlebars");

// Express App Setup
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static assets(files) from the public directory
app.use(express.static("public"));

// configure handlebars as the view engine
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
// =============================================================
// require("./app/routes/api-routes.js")(app);
var handlebarRoute = require("./controllers/handlebars_controller.js")
var messageRoute = require("./controllers/message_controller.js")

app.use(handlebarRoute);
app.use(messageRoute);

// Syncing our sequelize models and then starting our Express and socket.io app
// =============================================================
var server;
db.sequelize.sync({force:false}).then(function() {
  server = app.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
  });
  //socket.io setup
  var io = require('socket.io')(server);
  
  //Listen for incoming connections from clients
  io.on('connection', function(socket){
    console.log('Client connected...')
    //start listening for mouse move events
    socket.on('mousemove', function(data){
        //This line sends the event (broadcasts it) to everyone except the original client.
        socket.broadcast.emit('moving', data);      
    });
    // start listening for chat messages
    socket.on('send-chat-message', message =>{
      // Broadcasts the message to everyone else
      io.emit('chat-message', message)
    })
  });
});
