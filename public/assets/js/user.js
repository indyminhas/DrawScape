// On connection, get data for user with that id
$(function () {
    const roomList = $("#roomList")
    $.get("/api/user", function (data, status) {
        console.log(data)
        data.Rooms.forEach(room => {
            $(`<li class="collection-item">
      
            <div>
                ${room.room_name}
                <a href="#modal${room.id}" data-target="#modal${room.id}" class="modal-trigger deleteRoomTrigger secondary-content" id="deleteRooms${room.id}">
                  <i class="material-icons grey-text text-darken-3"
                    >delete_outline</i>
                </a>
                
                <a href="/room/${room.route_name}" class="secondary-content"
                  ><i class="material-icons grey-text text-darken-3">launch</i></a
                >
              </div>
            </li>`).appendTo(roomList);
            $(`<div id="modal${room.id}" class="modal">
            <div class="modal-content">
              <h4>Delete This Room?</h4>
              <p>Are you sure you want to delete this room? This action cannot be reversed. All message content will be erased.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="deleteRoomButton button" data-id="${room.id}" id="finalDeleteButton">Final Delete Room</button>
            </div>
          </div>`).appendTo("body");
        })
        data.playroom.forEach(room => {
            $(`<li class="collection-item"><div> ${room.room_name}<a href="/room/${room.route_name}" class="secondary-content"><i class="material-icons grey-text text-darken-3">launch</i></a></div></li>`).appendTo(roomList)
        })

        // Delete rooms by data-id function
        $('.deleteRoomButton').on('click', function (e) {
            e.preventDefault();
            console.log("delete button clicked")
            roomIdToDelete = $(this).attr('data-id')
            console.log("delete button for room" + roomIdToDelete);
            // console.log(this)
            $.ajax({
                method: "DELETE",
                url: '/api/rooms/' + roomIdToDelete
            }).then(function () {
                location.reload()
            });
        });
    })
})

// initialization for accordian element and modal
$(document).ready(function () {
    $('.collapsible').collapsible();
    $('.modal').modal();
});

// Update Details functionality
const updateUsernameForm = document.getElementById("updateUsernameForm");
const updateUsernameInput = document.getElementById("updateUsernameInput");

updateUsernameForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log("update username button clicked")
    var newUsername = { user_name: updateUsernameInput.value }
    $.ajax({
        method: "PUT",
        url: "/api/user/username",
        data: newUsername
    }).then(function () {
        location.reload()
    })
})

// Delete User Account functionality
const deleteUser = document.getElementById("finalDeleteButton");

deleteUser.addEventListener('click', e => {
    e.preventDefault();
    console.log("delete")
    $.ajax({
        method: "DELETE",
        url: '/api/user'
    }).then(function () {
        window.location.href = "/logout"
    });
});

// Create Room functionality
const createRoomForm = document.getElementById("createRoomForm");
const createRoomInput = document.getElementById("createRoomInput");


createRoomForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log(createRoomInput.value)
    console.log("createRoom button working")
    var room = { name: createRoomInput.value }
    // post request to the room table
    $.post('/api/rooms', room).then(function () {
        location.reload()
    }).catch(err => {
        console.log(err)
        $('#createRoomError').text('Insert a unique name!')
    })
    createRoomForm.value = ''
});


