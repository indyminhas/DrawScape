
// Sign Up Handling
// const signUpForm = document.getElementById("sign-up-container")
// const userInput = document.getElementById('userInput')
// const emailInput = document.getElementById('emailInput')
// const passInput = document.getElementById('passInput')

// signUpForm.addEventListener('submit', e => {
//     e.preventDefault()
//     var user = {
//         user_name: userInput.value.trim(),
//         email: emailInput.value.trim(),
//         password: passInput.value.trim(),
//     }
//     // This is the post request to the messages table
//     $.post("/signup", user);
//     userInput.value = ''
//     emailInput.value = ''
//     passInput.value = ''
// })

// Log In Handling
// const logInForm = document.getElementById("log-in-container")
// const emailLogInput = document.getElementById('emailLogInput')
// const passLogInput = document.getElementById('passLogInput')

// logInForm.addEventListener('submit', e => {
//     e.preventDefault()
//     console.log("You got here")
//     var user = {
//         email: emailLogInput.value.trim(),
//         password: passLogInput.value.trim(),
//     }
//     // This is the post request to the messages table
//     $.post("/login", user).then(function(response){
//         window.location.href = "/"
//     }).catch(err=>{
//         alert(err)
//     })
//     emailLogInput.value = ''
//     passLogInput.value = ''
//     //TODO: Redirect to profile page

// })




// do get request from database to get specific user data based on username
// and password
// check to see if the username and password entered matched the data sent back

// if username and password match, redirect user to user's profile page


// Welcome page sign in

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});




