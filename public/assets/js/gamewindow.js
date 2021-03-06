//URL of my web server
var url = 'localhost:3000';
var socket = io.connect(url);
// Defining Variables
var user;
let color = '#fa8072'
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
// Updates if Game is in Progress when Joining
socket.on('update-game', value => {
   drawing = false
})
// materialize initialization for modal and tooltips
$(document).ready(function () {
    $('.modal').modal();
    $('.tooltipped').tooltip();
});
//color and stroke choices
$('.stroke-choice').on('click', function (event) {
    stroke = parseInt($(this).data('stroke'))
    $(this).css("background-color","black")
})
$('.color-choice').on('click', function (event) {
    color = $(this).data('color')
})

//Start Game Button On Click
gameButton.on('click', e => {
    e.preventDefault()
    console.log($('#roundsinput'))
    //Object to send through for game play
    //Game boolean flag to true
    gamePlayObj.rounds = Math.max(1,Math.min(10,parseInt($('#roundsinput').val())))
    gamePlayObj.game = true
    //Socket.emit gamePlayObj
    socket.emit('game-start', gamePlayObj)
})

// Listening for Game Start
socket.on('game-start', object => {
    //When the Game Starts
    if (object.game) {
        drawing = false
        stage.removeEventListener("stagemousemove", handleMouseMove);
        gamePlayObj = object
        stage.clear()
        $("#word").text("")
        $('#roundsdiv').addClass('hide')
        $('#roundsdiv2').addClass('hide')
        $('#startbtndiv').addClass('hide')
        $('#worddiv').removeClass('hide')
        $("#current-drawer").text("")
        $("<h5>").text(gamePlayObj.users[gamePlayObj.drawingUser % gamePlayObj.users.length] + ' is drawing...').appendTo("#current-drawer")
        $(".scores").empty()
        $(`<h5 class = "scoreHeading">`).text("Scores:").appendTo(".scores")
        for (let i in object.scores) {
            $(`<p>`).text(`${i}: ${object.scores[i]}`).appendTo(".scores")
        }
        // When you are the drawer, then drawing = true
        if (gamePlayObj.users[gamePlayObj.drawingUser % gamePlayObj.users.length] === room.user_name) {
            drawing = true;
            $("#word").text("")
            $("<h5>").text("Word: " + gamePlayObj.wordArr[gamePlayObj.drawingUser].word).appendTo("#word")
        } else {
            $("#word").text("")
        }
    } 
    //When the Game Stops
    else {      
        drawing = true
        gamePlayObj.game = false
        $("#current-drawer").empty()
        $(".scores").empty()
        $(`<h5 class="scoreHeading">To Play Game</h5>`).appendTo(".scores")
        $(`<h5 class="scoreHeading"> Select Total Rounds</h5>`).appendTo(".scores")
        $(`<h5 class="scoreHeading">Hit Start Button!</h5>`).appendTo(".scores")
        $("#word").text("")
        $('#roundsdiv').removeClass('hide')
        $('#roundsdiv2').removeClass('hide')
        $('#startbtndiv').removeClass('hide')
        $('#worddiv').addClass('hide')
        console.log(object.scores)
        $(".scores1").empty()
        var scoreArr = []
        for (let i in object.scores) {
           scoreArr.push([i, object.scores[i]])
        }
        scoreArr.sort(function(a, b) {
            return a[1] - b[1];
        });
        scoreArr.forEach(element => {
            $("<p>").text(element[0] + ": " + element[1]).appendTo(".scores1")
        })
        $("<h5>").text("Scores:").prependTo(".scores1")
        $("<h5>").text("GAME OVER").prependTo(".scores1")
        $("#modal-activator")[0].click()
    }

    //update scores



})
// Function to Copy Url
function Copy() {
    var Url = document.getElementById("paste-box");
    Url.value = window.location.href;
    Url.focus();
    Url.select();
    document.execCommand("Copy");
}





