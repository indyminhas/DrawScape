
// Sign Up Handling
const signUpForm = document.getElementById("sign-up-container")
const userInput = document.getElementById('userInput')
const emailInput = document.getElementById('emailInput')
const passInput = document.getElementById('passInput')

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

logInForm.addEventListener('submit', e => {
    e.preventDefault()
    var user = {
        email: emailLogInput.value.trim(),
        password: passLogInput.value.trim(),
    }
    // This is the post request to the messages table
    $.post("/login", user).then(function(response){
        console.log(response)
    }).catch(err=>err)
    emailLogInput.value = ''
    passLogInput.value = ''
})










