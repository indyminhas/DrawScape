
// Sign Up Handling
const signUpForm = document.getElementById("sign-up-container")
const userInput = document.getElementById('userInput')
const emailInput = document.getElementById('emailInput')
const passInput = document.getElementById('passInput')
const roomNumber = document.getElementById('room-number').value
const signUpErr = document.getElementById('signup-error')
const container = document.getElementById('container');


signUpForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log("this button works")
    var user = {
        user_name: userInput.value.trim(),
        email: emailInput.value.trim(),
        password: passInput.value.trim(),
    }
    // This is the post request to the messages table
    $.post("/signup", user).then(response=>{
        signUpErr.textContent = "Sign Up Success"
        container.classList.remove('right-panel-active');
    }).catch(err=>{
        signUpErr.textContent = "Sign Up Failed"
    });
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


// Welcome page sign in

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

