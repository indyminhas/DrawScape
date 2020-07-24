// when the user is passed through to their user page, GET request for that users data
// need to also GET request for all the rooms that user is a part of, and admin of

// On connection, get data for user with that id
$(function () {
    $.get('/api/user/:id', function (data) {
        res.render("user", data)
    })
})

