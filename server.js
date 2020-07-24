
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
var handlebarRoute = require("./controllers/handlebars_controller.js");
var messageRoute = require("./controllers/message_controller.js");
var roomRoute = require("./controllers/room_controller.js");
var userRoute = require("./controllers/user_controller.js");
var wordRoute = require("./controllers/word_controller.js");

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
  var allUsers = {}
  var scores = {}
  //Listen for incoming connections from clients
  io.on('connection', function (socket) {
    console.log('Client connected...')
    // Listens for room choice
    // socket.nickname = Math.random()
    socket.on('roomchoice', function (room) {
      //TODO: When a user joins an in progress game, they have drawing capability
      // User joins specific room
      socket.join(room)
      //tell the room that someone joined
      io.to(room).emit('chat-message', socket.id + " joined the room.")
      // Pushes socket.id into user Array
      if(allUsers[room]){
        allUsers[room].push(socket.id)
        scores[room][socket.id] = 0
        
      }else{
        allUsers[room] = []
        scores[room] = {}
        allUsers[room].push(socket.id)
        scores[room][socket.id] = 0
      }

      //server listens to game start socket.on 'game-start' 
      socket.on('game-start', async gamePlayObj => {
        // receives game=true 
        gamePlayObj.rounds = 0
        gamePlayObj.users = allUsers[room]
        gamePlayObj.scores = scores[room]
        gamePlayObj.wordArr = await db.Word.findAll();
        gamePlayObj.drawingUser = gamePlayObj.rounds
        io.to(room).emit('game-start', gamePlayObj)
      });
      // Listens for Drawing Function
      socket.on('mousemove', function (mouse) {
        //This line sends the event (broadcasts it) to everyone except the original client.
        socket.to(room).broadcast.emit('moving', mouse);
      });
      // start listening for chat messages
      socket.on('send-chat-message', data => {
        //Listen to chat messages in room if the game is in play
        if (data.game) {
          //check chat messages if the correct answer is guessed
          if (data.message.trim() === data.wordArr[data.rounds].word) {
            //if drawer guesses their own word, PUNISH, everyone else gets 30 pnts
            if(data.users[data.drawingUser % data.users.length] === data.user){
              for (let player in data.scores){
                if(player !== data.user) data.scores[player] +=30
              }
            } else {
              data.scores[data.user] += 30
            }
            //Notify the players that a round has ended
            data.message = `Gussed the word ${data.wordArr[data.rounds].word}`
            data.rounds++
            data.drawingUser = data.rounds
            io.to(room).emit('chat-message', data.user + ": " + data.message)
            //check if we have reached the end of the game
            if (data.rounds === 3) {
              data.game = false
              console.log("game is over")
              io.to(room).emit('game-start', data)
            } else {
              io.to(room).emit('game-start', data)
            }
          } else {
            //if the chat message was not the correct answer, emit as usual
            io.to(room).emit('chat-message', data.user + ": " + data.message)
          }
          
        } else {
          //if game play is not on, emit chat messages as usual
          io.to(room).emit('chat-message', data.user + ": " + data.message)
        }
      });
      //When user disconnects take user out of allUsers and scores 
      socket.on('disconnect', ()=>{
        delete scores[room][socket.id]
        allUsers[room]=allUsers[room].filter(element => element !== socket.id)
        io.to(room).emit('chat-message', socket.id + " left the room.")
      })
    });
  });
});
