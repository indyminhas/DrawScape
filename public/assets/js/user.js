// On connection, get data for user with that id
$(function () {
    const roomList = $("#roomList")
    $.get("/api/user", function (data, status) {
        console.log(data)
        data.Rooms.forEach(room => {
            $(`<li class="collection-item">
               <a href="/room/${room.id}" class="secondary-content"> ${room.room_name}</a>
                </li>`).appendTo(roomList)
        })
    })
})

