$(function () {
  
    //=======================================================================================
    //chat
        // Grabbing HTML Elements
        const messageContainer = document.getElementById('message-container')
        const messageForm = $('#send-container')
        const messageInput = document.getElementById('message-input')
        
     
        // On connection it appends all previous messages to the chat room
        $.get(`/api/messages/${room}`, function (data) {
            console.log(data)
            data.forEach(element => {
                appendMessage(element.User.user_name + ": " + element.message)
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
                roomId: room,
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