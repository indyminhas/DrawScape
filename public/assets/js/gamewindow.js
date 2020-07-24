//URL of my web server
var url = 'http://darwscape.herokuapp.com/';
var socket = io.connect(url);
// Defining Variables
var user;
var room = {}
var canvas, stage;
var drawing = true;
const gameButton = $("#Game-Start-Button")
let gamePlayObj = {
    game: false,
    word: '',
    drawingUser: '',
    scores: {}
}

//Start game button listener
gameButton.on('click', e => {
    e.preventDefault()
    //Object to send through for game play
    //Game boolean flag to true
    gamePlayObj.game = true
    //Socket.emit gamePlayObj
    socket.emit('game-start', gamePlayObj)
})

socket.on('game-start', object => {
    if (object.game) {
        drawing = false
        stage.removeEventListener("stagemousemove", handleMouseMove);
        gamePlayObj = object
        stage.clear()
        $("#word").text("")
        gameButton.css("display", "none")
        // When you are the drawer, then drawing = true
        if (gamePlayObj.users[gamePlayObj.drawingUser % gamePlayObj.users.length] === room.user_name) {
            drawing = true;
            $("#word").text(gamePlayObj.wordArr[gamePlayObj.rounds].word)
        }
    } else {
        drawing = true
        gamePlayObj.game = false
        $("#word").text("")
        gameButton.css("display", "inline-block")
    }
    //update scores
    $("#scores").empty()
    $("<h5>").text("Scores:").appendTo("#scores")
    for (let i in object.scores) {
        console.log(i)
        $(`<p>`).text(`${i}: ${object.scores[i]}`).appendTo("#scores")
    }


})






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





