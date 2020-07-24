//URL of my web server
var url = 'localhost:3000';
var socket = io.connect(url);
var user = "Maria"
var room = $("#room").val()
socket.emit('roomchoice', room)






