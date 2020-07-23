//URL of my web server
var url = 'localhost:3000';
var socket = io.connect(url);
var user = "Test User"
//canvas function
$(function () {
    //error handling in case user browser doesn't support canvas element
    if (!('getContext' in document.createElement('canvas'))) {
        alert('Sorry, it looks like your browser does not support canvas!');
        return false;
    }

    var doc = $(document);
    var win = $(window);
    var canvas = $('#paper');
    var ctx = canvas[0].getContext('2d');
    var instructions = $('#instructions');

    //generate a unique id
    var id = Math.round($.now() * Math.random());

    //a flag for drawing activity
    var drawing = false;

    var clients = {};
    var cursors = {};

    socket.on('moving', function (data) {
        if (!(data.id in clients)) {
            //a new user has come online. create a cursor for them
            cursors[data.id] = $('<div class="cursor">').appendTo('#cursor');
        }

        //move the mouse pointer
        cursors[data.id].css({
            'left': data.x,
            'right': data.y
        });

        //is the user drawing?
        if (data.drawing && clients[data.id]) {
            //Draw a line on the canvas. clients[data.id] holds the previous position of this user's mouse pointer
            drawLine(clients[data.id].x, clients[data.id].y, data.x, data.y);
        }

        //saving the curretn client state
        clients[data.id] = data;
        clients[data.id].updated = $.now();
    });

    var prev = {};
    canvas.on('mousedown', function (e) {
        e.preventDefault();
        drawing = true;
        prev.x = e.pageX;
        prev.y = e.pageY;

        //Hide the instructions
        instructions.fadeOut();
    });

    doc.bind('mouseup mouseleave', function () {
        drawing = false;
    });

    var lastEmit = $.now();

    doc.on('mousemove', function (e) {
        if ($.now() - lastEmit > 10) {
            socket.emit('mousemove', {
                'x': e.pageX,
                'y': e.pageY,
                'drawing': drawing,
                'id': id
            });
            lastEmit = $.now();
        }

        //Draw a line for the current user's movement, as it is not recieved in the socket.on('moving') event above
        if (drawing) {
            drawLine(prev.x, prev.y, e.pageX, e.pageY);
            prev.x = e.pageX;
            prev.y = e.pageY
        }
    });

    //remove inactive clients after 10sec of inactivity
    setInterval(function () {
        for (ident in clients) {
            if ($.now() - clients[ident].updated > 10000) {
                cursors[ident].remove();
                delete clients[ident];
                delete cursors[ident];
            }
        }
    }, 10000); //checking every 10 seconds

    //define the drawing function here for ease of reference
    function drawLine(fromx, fromy, tox, toy) {
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
    }

    // Grabbing HTML Elements
    const messageContainer = document.getElementById('message-container')
    const messageForm = $('#send-container')
    const messageInput = document.getElementById('message-input')
    // On connection it appends all previous messages to the chat room
    $.get("/api/messages/", function (data) {
        console.log(data)
        data.forEach(element => {
            appendMessage(element.UserId + ": " + element.message)
        })
    });

    //Temp User Message
    appendMessage(user + " Joined")

    messageForm.on('submit', e => {
        e.preventDefault()
        console.log("you got here")
        //Sends chat value to server
        const message = messageInput.value
        socket.emit('send-chat-message', user + ": " + message)
        // RoomId and UserId are placeholder values for now.
        var postMessage = {
            message: message,
            roomId: 1,
            userId: 1
        }
        console.log(postMessage)
        // This is the post request to the messages table
        $.post("/api/messages/", postMessage);
        messageInput.value = ''
    })
    // Appends each new chat message to the page
    socket.on('chat-message', data => {
        appendMessage(data)
    })

    function appendMessage(message) {
        const messageElement = document.createElement('p')
        messageElement.innerText = message
        messageContainer.append(messageElement)
    }
})



