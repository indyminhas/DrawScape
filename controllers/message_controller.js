const express = require("express");

const router = express.Router();

const db = require("../models");

// turned off for now
// //get all chats where room_id = smth
// router.get('/api/messages/:roomid', (req,res)=>{
//     db.Message.findAll({where:{roomid = req.params.roomid}}).then().catch();
// });

//get all chats
router.get('/api/messages', (req,res)=>{
    db.Message.findAll({}).then(function(allMessages) {
        res.json(allMessages)
    }).catch();
});

//add new chat to database when it is written
router.post('/api/messages', (req,res)=>{
    db.Message.create(req.body).then(function(allMessages) {
        res.json(allMessages)
    }).catch();
});

module.exports = router;