$(function () {

    //=======================================================================================
    //chat
    // Grabbing HTML Elements
    const messageContainer = document.getElementById('message-container')
    const messageForm = $('#send-container')
    const messageInput = document.getElementById('message-input')
    const roomRoute = $("#room").val()
  


    function appendMessage(message) {
        const messageElement = document.createElement('p')
        messageElement.innerText = message
        messageContainer.append(messageElement)
    }
    $.get(`/api/rooms/${roomRoute}`, function (data, status) {
        console.log(data[0])
        if(!data[0]){
            window.location.href = "/user"
        }
        const roomNumber = data[0].id
        $("#room-heading").text(`${data[0].room_name}`)



        //This is where we want to assign username and/or ID to user for all socket transmission action
        $.get("/loggedinuser", function (data, status) {
            user = data.user_name
            //Creates Room Object
            room = {
                room: roomRoute,
                user_name: user
            }
            //Puts user into correct Room
            socket.emit('roomchoice', room)
            // On connection it appends all previous messages to the chat room
            $.get(`/api/messages/${roomNumber}`, function (data) {
                data.forEach(element => {
                    appendMessage(element.User.user_name + ": " + element.message)
                })
                messageContainer.scrollTop = messageContainer.scrollHeight;
            });
            $.post('/api/junctiontable/'+roomNumber, () => {
                console.log('done')
            })

        })



        messageForm.on('submit', e => {
            e.preventDefault()
            //Sends chat value to server
            const message = messageInput.value
            gamePlayObj.message = message
            gamePlayObj.user = user
            socket.emit('send-chat-message', gamePlayObj)
            // RoomId and UserId are placeholder values for now.
            //TODO: room.room is the routename but we don't want that to be the room id
            var postMessage = {
                message: message,
                roomId: roomNumber
            }
            // This is the post request to the messages table
            $.post("/api/messages/", postMessage);
            messageInput.value = ''
        })
        // Appends each new chat message to the page
        socket.on('chat-message', data => {
            appendMessage(data)
            messageContainer.scrollTop = messageContainer.scrollHeight;
        })

    })
})