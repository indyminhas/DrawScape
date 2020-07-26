// On connection, get data for user with that id
$(function () {
    const roomList = $("#roomList")
    $.get("/api/user", function (data, status) {
        console.log(data)
        data.Rooms.forEach(room => {
            $(`<button>
               <a href="/room/${room.route_name}" class="secondary-content"> ${room.room_name}</a>
                </button>
                <br>`).appendTo(roomList)
        })
    })
})

// initialization for accordian element
$(document).ready(function(){
    $('.collapsible').collapsible();
  });

//   modal initialization for delete account
  $(document).ready(function(){
    $('.modal').modal();
  });

// Create Room functionality
const createRoomForm = document.getElementById("createRoomForm");
const createRoomInput = document.getElementById("createRoomInput");


createRoomForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log(createRoomInput.value)
    console.log("createRoom button working")
    var room = {name: createRoomInput.value}
    // post request to the room table
    $.post('/api/rooms', room).then(function(){
        location.reload()
    }).catch(err=>{
        alert(err)
    })
    createRoomForm.value = ''
});


// Update Details functionality
const updateDetailsForm = document.getElementById("updateDetailsForm");
const updateUserInput = document.getElementById("updateUserInput");
const updateEmailInput = document.getElementById("updateEmailInput");
const updatePassInput = document.getElementById("updatePassInput");

updateDetailsForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log("you attempted to updated a user")
    var updatedUser = {
        user_name: updateUserInput.value,
        email: updateEmailInput.value,
        password: updatePassInput.value
    }
    // update request to the user table
    $.put('/api/user/:id', updatedUser => {
        console.log("you updated a user");
        location.reload();
    }).catch(err => {
        alert(err)
    })
    updateDetailsForm.value = ''
});

// Delete Room functionality
const deleteUser = document.getElementById("finalDeleteButton");

deleteUser.addEventListener('click', e => {
    e.preventDefault();
    console.log("you clicked final delete")
})



