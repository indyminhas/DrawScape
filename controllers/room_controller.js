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
        //TODO: this is not great, cos strictly speaking allows duplicates. WE would really like the route name to be room id + room name
        route_name: `${req.session.user.id}${req.body.name.trim().replace(/\s+/g, "")}`
    }).then(result => res.json(result)).catch(err => res.status(500).end())
});

//owner can delete so need destroy to delete room
router.delete('/api/rooms/:id', (req,res)=>{
    db.Room.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbroomdelete) {
        res.json(dbroomdelete);
        res.status(204).end();
    }).catch(function (err) {
        res.status(500).end();
    })
})



//how do we add users to rooms or rooms to users
//create room needs a router.create

module.exports = router;