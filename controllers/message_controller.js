const express = require("express");

const router = express.Router();

const db = require("../models");

//TODO: responses cleaned up

//get all chats where room_id = smth
router.get('/api/messages/:room_id', (req,res)=>{
    db.Message.findAll({
        where: {
            RoomId: req.params.room_id
        }
    }).then(allRoomMessages=>{
        res.json(allRoomMessages)
    }).catch(err=> {
        res.status(500).end();
    })
    res.status(204).end();
});

//get all chats
router.get('/api/messages', (req,res)=>{
    db.Message.findAll({}).then(function(allMessages) {
        res.json(allMessages)
    }).catch(err=> {
        res.status(500).end();
    })
    res.status(204).end();
});

//add new chat to database when it is written
router.post('/api/messages', (req,res)=>{
    db.Message.create({
        message: req.body.message,
        UserId: req.body.userId,
        RoomId: req.body.roomId
    }).then(postMessage => {
        res.json(postMessage)
    }).catch(err => {
        res.status(500).end();
    })
    res.status(204).end();
});

module.exports = router;