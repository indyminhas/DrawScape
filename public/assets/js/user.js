// On connection, get data for user with that id
$(function () {
    const roomList = $("#roomList")
    $.get("/api/user", function (data, status) {
        console.log(data)
        data.Rooms.forEach(room => {
            $(`<li class="collection-item"><div>${room.room_name}<a href="/room/${room.route_name}" class="secondary-content"><i class="material-icons red-text">delete</i></a><a href="/room/${room.route_name}" class="secondary-content"><i class="material-icons">launch</i></a></div></li>`).appendTo(roomList)
        })
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

// Delete Room functionality
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