const express = require("express");

const router = express.Router();

const db = require("../models");

//get all chats where room_id = smth
router.get('/api/messages/:roomid', (req,res)=>{
    db.message.findAll({where:{roomid = req.params.roomid}}).then().catch();
});

//add new chat to database when it is written
router.post('/api/messages', (req,res)=>{
    db.message.create(req.body).then().catch();
});

module.exports = router;