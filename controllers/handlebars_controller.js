const express = require("express");

const router = express.Router();

const db = require("../models");



// If user is not signed in, send to login, if they are send to user page.
router.get('/', (req, res) => {
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    res.redirect('/user')
  }
});

//renders login
router.get('/login', (req, res) => {
  res.render('index')
});

// renders the room page 
router.get('/room', (req, res) => {
  res.render('gamewindow')
});

// If not signed in, send to log in otherwise render user page
router.get('/user', (req, res) => {
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    db.User.findOne({
      where: { id: req.session.user.id },
    }
    ).then(result => {
      res.render('user', {user_name: result.user_name, email: result.email})
      // res.status(204).end();
    }).catch(err => {
      res.status(500).end();
    })
  }
  
  
});


// Renders the room page with specific room data
router.get('/room/:roomnumber', (req, res) => {
  if (!req.session.user) {
    res.redirect('/login/' + req.params.roomnumber)
  } else {
    res.render('gamewindow', { roomnumber: req.params.roomnumber})
  }
});

//renders login
router.get('/login/:roomnumber', (req, res) => {
  res.render('index', {roomnumber: req.params.roomnumber})
});


module.exports = router;