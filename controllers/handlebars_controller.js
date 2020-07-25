const express = require("express");

const router = express.Router();

const db = require("../models");

//renders homepage
router.get('/', (req, res) => {
  res.render('index')
});

// renders the user page 
router.get('/user', (req, res) => {
  db.User.findOne({
    where: { id: req.session.user.id },
    include: [db.Room]
  }
  ).then(result => {
    console.log(result.Rooms[0].room_name)
    res.render('user', {user_name: result.user_name, email: result.email, Rooms: result.Rooms[0]})
    // res.status(204).end();
  }).catch(err => {
    res.status(500).end();
  })
  
});

// renders the room page 
router.get('/room', (req, res) => {
  res.render('gamewindow')
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