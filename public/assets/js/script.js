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

// JS for sticky header
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}






