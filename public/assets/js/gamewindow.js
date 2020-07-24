//URL of my web server
var url = 'https://darwscape.herokuapp.com/';
var socket = io.connect(url);

// Defining Variables
var user = socket.id
var room = $("#room").val()
var canvas, stage;
var drawing = true;
const gameButton = $("#Game-Start-Button")

//Puts user into correct Room
socket.emit('roomchoice', room)

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
        gamePlayObj = object
        stage.clear()
        $("#word").text("")
        gameButton.css("display", "none")
        // When you are the drawer, then drawing = true
        if (gamePlayObj.users[gamePlayObj.drawingUser % gamePlayObj.users.length] === socket.id) {
            drawing = true;
            $("#word").text(gamePlayObj.wordArr[gamePlayObj.rounds].word)
        }
    }else{
        drawing = true
        gamePlayObj.game = false
        $("#word").text("")
        gameButton.css("display","inline-block")
    }
    //update scores
    $("#scores").empty()
    $("<h5>").text("Scores:").appendTo("#scores")
    for(let i in object.scores){
        console.log(i)
        $(`<p>`).text(`${i}: ${object.scores[i]}`).appendTo("#scores")
    }
    

})










