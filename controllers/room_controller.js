const express = require("express");

const router = express.Router();

const db = require("../models");


router.get('/api/rooms', (req,res)=>{
    //find all where this user belongs
    db.Room.findAll()
});

router.post('/api/rooms', (req, res)=>{
    db.Room.create({
        room_name: req.body.room_name,
        UserId: req.session.user.id
    }).then(result=> res.json(result)).catch(err => res.status(500).end())
});

//owner can delete so need destroy to delete room
router.delete('/api/rooms/:id', (req,res)=>{
    db.Room.destroy({
        // needs completing
    })
})



//how do we add users to rooms or rooms to users
//create room needs a router.create

module.exports = router;