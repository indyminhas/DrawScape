//URL of my web server
var url = 'localhost:3000';
var socket = io.connect(url);
// Defining Variables
var user;
let color='#fa8072'
let stroke = 5;
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

//color ans stroke choices
$('.stroke-choice').on('click', function(event){
    stroke= parseInt($(this).data('stroke'))
})
$('.color-choice').on('click', function(event){
    color= $(this).data('color')
})

//Start game button listener
gameButton.on('click', e => {
    e.preventDefault()
    console.log($('#roundsinput'))
    //Object to send through for game play
    //Game boolean flag to true
    gamePlayObj.rounds = parseInt($('#roundsinput').val())
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
            $("#word").text("")
            $("<h5>").text("Word: " + gamePlayObj.wordArr[gamePlayObj.drawingUser].word).appendTo("#word")
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
// Function to Copy Url
function Copy() 
{      
    var Url = document.getElementById("paste-box");
    Url.value = window.location.href;
    Url.focus();
    Url.select();  
    document.execCommand("Copy");
}


$(function(){
    //for modal trigger
    $('.modal').modal();
})