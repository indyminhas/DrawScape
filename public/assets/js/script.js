
// Sign Up Handling
const signUpForm = document.getElementById("sign-up-container")
const userInput = document.getElementById('userInput')
const emailInput = document.getElementById('emailInput')
const passInput = document.getElementById('passInput')
const roomNumber = document.getElementById('room-number').value

console.log(roomNumber)



signUpForm.addEventListener('submit', e => {
    e.preventDefault()
    var user = {
        user_name: userInput.value.trim(),
        email: emailInput.value.trim(),
        password: passInput.value.trim(),
    }
    // This is the post request to the messages table
    $.post("/signup", user);
    userInput.value = ''
    emailInput.value = ''
    passInput.value = ''
})

// Log In Handling
const logInForm = document.getElementById("log-in-container")
const emailLogInput = document.getElementById('emailLogInput')
const passLogInput = document.getElementById('passLogInput')
const passBox = document.getElementById('password-box')

logInForm.addEventListener('submit', e => {
    e.preventDefault()
    var user = {
        email: emailLogInput.value.trim(),
        password: passLogInput.value.trim(),
    }
    // This is the post request to the messages table
    $.post("/login", user).then(function(response){
        if(roomNumber === ""){
            window.location.href = "/"
        }else{
            window.location.href = `/room/${roomNumber}`
        }      
    }).catch(err=>{
        passBox.textContent = "Username or Password Incorrect"
    })
    emailLogInput.value = ''
    passLogInput.value = ''
    //TODO: Redirect to profile page

})




// do get request from database to get specific user data based on username
// and password
// check to see if the username and password entered matched the data sent back

// if username and password match, redirect user to user's profile page







