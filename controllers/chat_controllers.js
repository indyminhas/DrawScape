const express = require("express");

const router = express.Router();

const db = require("../models");

//get all chats where room_id = smth
router.get('/api/chats', (req,res)=>{

});

//add new chat to database when it is written
router.post('/api/chats', (req,res)=>{

});

module.exports = router;