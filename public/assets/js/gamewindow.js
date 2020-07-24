//URL of my web server
var url = 'localhost:3000';
var socket = io.connect(url);
var user = "Maria"
var room = $("#room").val()
socket.emit('roomchoice', room)


//Object to send through for game play
// let gamePlayObj= {
//     game: true,
//     word: '',
//     drawingUser: '',
//     scores: {'user1': 100, 'user2': 50}
// }

//TODO: start game button listener
//TODO: game boolean flag to true + socket.emit gamePlayObj that + drawing = false

//TODO: when you are the drawer, then drawing = true
//TODO: when new round drawing = false + stage.clear + update scores on page
//TODO: when game over then drawing = true again
//TODO: when game over display scores





