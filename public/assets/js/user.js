// On connection, get data for user with that id
$(function () {
    const roomList = $("#roomList")
    $.get("/api/user", function (data, status) {
        console.log(data)
        data.user.Rooms.forEach(room => {
            $(`<li class="collection-item"><div> ${room.room_name}<btn class="deleteRoomButton secondary-content" data-id="${room.id}"><i class="material-icons grey-text text-darken-3">delete_outline</i></btn><a href="/room/${room.route_name}" class="secondary-content"><i class="material-icons grey-text text-darken-3">launch</i></a></div></li>`).appendTo(roomList)
        })
        // Delete rooms by data-id function
        $('.deleteRoomButton').on('click', function(e) {
            e.preventDefault();
            console.log("delete button clicked")
            roomIdToDelete = $(this).attr('data-id')
            console.log("delete button for room"+ roomIdToDelete);
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
        alert(err)
    })
    createRoomForm.value = ''
});


