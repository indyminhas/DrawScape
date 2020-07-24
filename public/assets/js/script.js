// Need to direct to /localhost:3000/room on submit of username

const userForm = document.getElementById("user-send-container")
const userInput = document.getElementById('userInput')
let userName = ""

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
    window.location.href = "/room"
})








