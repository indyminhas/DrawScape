const express = require("express");

const router = express.Router();

const db = require("../models");

//renders homepage
router.get('/',(req, res)=>{
    res.render('index')
});

// renders the user page 
router.get('/user', (req,res) =>{
  res.render('user')
});
//renders the user page in the future
router.get('/user', (req,res)=>{
  res.json('This will be the user page')
  //TODO: and it will render the user.handlebars file
});  
// renders the room page 
router.get('/room', (req,res) =>{
  res.render('gamewindow')
});
// renders the room page with specific room data
router.get('/:room', (req,res) =>{
  res.json('This is a room ' + req.params.room)
  //TODO: must render the room.handlebars in the future
});



module.exports = router;