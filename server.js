
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

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
var handlebarRoute = require("./controllers/handlebars_controller.js")
var messageRoute = require("./controllers/message_controller.js")
var roomRoute = require("./controllers/room_controller.js")
var userRoute = require("./controllers/user_controller.js")
var wordRoute = require("./controllers/word_controller.js")

app.use(handlebarRoute);
app.use(messageRoute);
app.use(roomRoute);
app.use(userRoute);
app.use(wordRoute);

// Syncing our sequelize models and then starting our Express and socket.io app
// =============================================================
var server;
db.sequelize.sync({ force: false }).then(function () {
  server = app.listen(PORT, function () {
    console.log("Server listening on PORT " + PORT);
  });
  //socket.io setup
  var io = require('socket.io')(server);

  //Listen for incoming connections from clients
  io.on('connection', function (socket) {
    console.log('Client connected...')
    socket.on('roomchoice', function (room) {
      let game = false;
      socket.join(room)
      socket.on('mousemove', function (mouse) {
        //This line sends the event (broadcasts it) to everyone except the original client.
        socket.to(room).broadcast.emit('moving', mouse);
      });
      // start listening for chat messages
      socket.on('send-chat-message', message => {
        // Broadcasts the message to everyone else
        //TODO: listen to chat messages in room to see if someone guessed it
        if (game) {

          let rounds = 6;
          let wordArr = await db.Word.findAll();
    
    
          gamePlayObj.word = wordArr.shift()
          gamePlay(gamePlayObj)
          //TODO: need to know all users in room to loop through them
          //TODO: need to get a random word
          //TODO: send to that user that they are the one drawing
          let gamePlay = (obj) => {
            
            if (rounds > 0) {
              obj.word = wordArr.shift()
              gamePlay(obj)
              rounds--;
    
            } else if (rounds = 6) {
              io.to(room).emit('game-play', obj)
            } else {
              obj.game = false;
              io.to(room).emit('game-play', obj)
            }
          }
    
          //TODO: if correct guess, call scoring function and move to next user + emit that new round has started
          //TODO: if all rounds done, emit scores to whole room and send game=false
        } else {
          
          io.to(room).emit('chat-message', message)
        }

      });
      //server listens to game start socket.on 'game-start' 
      socket.on('game-start', gamePlayObj => {
        // receives game=true 
        game = gamePlayObj.game;
      });
    });


  });
});
