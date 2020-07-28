const express = require("express");

const router = express.Router();

const db = require("../models");


//find all where this user belongs
router.get('/api/rooms/:roomroute', (req, res) => {
    db.Room.findAll({
        where: {
            route_name: req.params.roomroute
        }
    }).then(data => {
        res.json(data)
        res.status(204).end();
    }).catch(err => {
        res.status(500).end();
    });
});

// user can create a room and is then the room owner.
router.post('/api/rooms', (req, res) => {
    db.Room.create({
        room_name: req.body.name,
        UserId: req.session.user.id,
        route_name: `${req.session.user.id}${req.body.name.trim().replace(/\s+/g, "")}`
    }).then(result => res.json(result)).catch(err => res.status(500).end())
});

//owner can delete a room they are owner of.
router.delete('/api/rooms/:id', (req, res) => {
    db.Room.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbroomdelete) {
        res.json(dbroomdelete);
        res.status(204).end();
    }).catch(function (err) {
        res.status(500).end();
    });
});


module.exports = router;