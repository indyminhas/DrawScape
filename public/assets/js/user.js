const roomList = $("#roomList")

// On connection, get data for user with that id
$(function () {
    $.get("/api/user", function (data, status) {
        console.log(data)
        data.Rooms.forEach(room => {
            $(`<button>
               <a href="/room/${room.id}" class="secondary-content"> ${room.room_name}</a>
                </button>
                <br>`).appendTo(roomList)
        })
    })
})

