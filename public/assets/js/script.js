// Need to direct to /localhost:3000/room on submit of username
// For now just type in localhost:3000/room
const userForm = document.getElementById("user-send-container")
const userInput = document.getElementById('userInput')

userForm.addEventListener('submit', e => {
    e.preventDefault()
    var user = {
        username: userInput.value.trim(),
        email: "test@gmail.com",
        password: "password"
    }
    console.log(postMessage)
    // This is the post request to the messages table
    $.post("/api/user/", user);
    userInput.value = ''
    window.location.href = "/room"
})