
//* SERVER SETUP

// Dependencies
// =============================================================
const express = require("express")
const exphbs = require("express-handlebars");
const session = require("express-session");

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

// session setup
app.use(session({
  secret: "dimm stealth",
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 7200000
  }
}))

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
db.sequelize.sync({ force: true}).then(function () {
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
      socket.join(room.room)
      console.log(socket.session)
      //tell the room that someone joined
      io.to(room.room).emit('chat-message', room.user_name + " joined the room.room.")
      // Pushes room.user_name into user Array
      if(allUsers[room.room]){
        allUsers[room.room].push(room.user_name)
        scores[room.room][room.user_name] = 0
        console.log(allUsers)
        
        
      }else{
        allUsers[room.room] = []
        scores[room.room] = {}
        allUsers[room.room].push(room.user_name)
        scores[room.room][room.user_name] = 0
        console.log(allUsers)
      }

      //server listens to game start socket.on 'game-start' 
      socket.on('game-start', async gamePlayObj => {
        // receives game=true 
        gamePlayObj.rounds = 0
        gamePlayObj.users = allUsers[room.room]
        gamePlayObj.scores = scores[room.room]
        console.log("Looking for Word")
        //TODO: Randomize the words
        gamePlayObj.wordArr = await db.Word.findAll();
        console.log("Done Looking for Word")
        gamePlayObj.drawingUser = gamePlayObj.rounds
        io.to(room.room).emit('game-start', gamePlayObj)
      });
      // Listens for Drawing Function
      socket.on('mousemove', function (mouse) {
        //This line sends the event (broadcasts it) to everyone except the original client.
        socket.to(room.room).broadcast.emit('moving', mouse);
      });
      // start listening for chat messages
      socket.on('send-chat-message', data => {
        //Listen to chat messages in room.room if the game is in play
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
            io.to(room.room).emit('chat-message', data.user + ": " + data.message)
            //check if we have reached the end of the game
            //TODO: have user set this variable
            if (data.rounds === 3) {
              data.game = false
              console.log("game is over")
              io.to(room.room).emit('game-start', data)
            } else {
              io.to(room.room).emit('game-start', data)
            }
          } else {
            //if the chat message was not the correct answer, emit as usual
            io.to(room.room).emit('chat-message', data.user + ": " + data.message)
          }
          
        } else {
          //if game play is not on, emit chat messages as usual
          io.to(room.room).emit('chat-message', data.user + ": " + data.message)
        }
      });
      //When user disconnects take user out of allUsers and scores 
      socket.on('disconnect', ()=>{
        console.log(room.user_name + " disconnected")
        delete scores[room.room][room.user_name]
        allUsers[room.room]=allUsers[room.room].filter(element => element !== room.user_name)
        io.to(room.room).emit('chat-message', room.user_name + " left the room.")
      })
    });
  });
});
