const express = require("express");

const router = express.Router();

const db = require("../models");


router.get('/api/rooms', (req, res) => {
    //find all where this user belongs
    db.Room.findAll()
});

router.get('/api/rooms/:roomroute', (req, res) => {
    //find all where this user belongs
    db.Room.findAll({
        where: {
            route_name: req.params.roomroute
        }
    }).then(data => {
        res.json(data)
        res.status(204).end();
    }).catch(err => {
        res.status(500).end();
    })
});

router.post('/api/rooms', (req, res) => {
    db.Room.create({
        room_name: req.body.name,
        UserId: req.session.user.id,
        route_name: `${req.session.user.id}${req.body.name.trim().replace(/\s+/g, "")}`
    }).then(result => res.json(result)).catch(err => res.status(500).end())
});

//owner can delete so need destroy to delete room
router.delete('/api/rooms', (req,res)=>{
    db.Room.destroy({
        where: {UserId:req.session.user.id}
    })
})



//how do we add users to rooms or rooms to users
//create room needs a router.create

module.exports = router;