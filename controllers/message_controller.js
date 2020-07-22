const express = require("express");

const router = express.Router();

const db = require("../models");

//TODO: responses cleaned up

//get all chats where room_id = smth
router.get('/api/messages/:roomid', (req,res)=>{
    db.Message.findAll({where:{RoomId: req.params.roomid}}).then(result=>{
        res.json(result)
    }).catch(err=>err);
});

//get all chats
router.get('/api/messages', (req,res)=>{
    db.Message.findAll({}).then(function(allMessages) {
        res.json(allMessages)
    }).catch(err=>err);
});

//add new chat to database when it is written
router.post('/api/messages', (req,res)=>{
    db.Message.create(req.body).then(function(allMessages) {
        res.json(allMessages)
    }).catch(err=>err);
});

module.exports = router;