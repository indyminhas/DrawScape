const express = require("express");

const router = express.Router();

const db = require("../models");

//renders homepage
router.get('/',(req, res)=>{
    res.render('index')
  });
// renders the room page 
router.get('/room', (req,res) =>{
  res.render('gamewindow')
});

// renders the room page with specific room data
router.get('/room/:roomnumber', (req,res) =>{
  if(!req.session.user){
    res.redirect('/room')
  } else{
    res.render('gamewindow', {roomnumber: req.params.roomnumber})
  }
});

//renders the user page in the future
router.get('/user', (req,res)=>{
  res.render('user')
});

module.exports = router;