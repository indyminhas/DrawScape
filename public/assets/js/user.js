

// On connection, get data for user with that id
$(function () {
    $.get("/api/user", function (data, status) {
        console.log(data)
    })
})

