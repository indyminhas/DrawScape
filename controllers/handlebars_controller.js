const express = require("express");

const router = express.Router();

const db = require("../models");

//renders homepage
router.get('/login', (req, res) => {
  res.render('index')
});

// renders the user page 
router.get('/', (req, res) => {
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    res.redirect('/user')
  }
});

// renders the room page 
router.get('/room', (req, res) => {
  res.render('gamewindow')
});
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


// renders the room page with specific room data
router.get('/room/:roomnumber', (req, res) => {
  if (!req.session.user) {
    res.redirect('/room')
  } else {
    res.render('gamewindow', { roomnumber: req.params.roomnumber})
  }
});


module.exports = router;