const express = require("express");

const router = express.Router();

const db = require("../models");


//get all chats for a particular room id
router.get('/api/messages/:roomid', (req, res) => {
    db.Message.findAll({
        where: {
            RoomId: req.params.roomid,
        },
        include: [db.User]
    }).then(allRoomMessages => {
        res.json(allRoomMessages)
        res.status(204).end();
    }).catch(err => {
        res.status(500).end();
    });
});

//add new chat to database when it is written
router.post('/api/messages', (req, res) => {
    db.Message.create({
        message: req.body.message,
        UserId: req.session.user.id,
        RoomId: req.body.roomId
    }).then(postMessage => {
        res.json(postMessage)
        res.status(204).end();
    }).catch(err => {
        res.status(500).end();
    });
});

module.exports = router;