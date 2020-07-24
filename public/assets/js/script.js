// Need to direct to /localhost:3000/room on submit of username

// grabs container from index page
const userForm = document.getElementById("user-send-container")
// grabs value of username input on index page
const userInput = document.getElementById('userInput')
let userName = ""

// submit event listener attached to username input form
userForm.addEventListener('submit', e => {
    e.preventDefault()
    var user = {
        user_name: userInput.value.trim(),
        email: "test@gmail.com",
        password: "password"
    }
    // This is the post request to the messages table
    userName = userInput.value.trim()
    $.post("/api/user", user);
    userInput.value = ''
    // window.location.href = "/room"
    window.location.href = "/user"
})



// do get request from database to get specific user data based on username
// and password
// check to see if the username and password entered matched the data sent back

// if username and password match, redirect user to user's profile page








