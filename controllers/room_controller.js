const express = require("express");

const router = express.Router();

const db = require("../models");


router.get('/api/rooms', (req,res)=>{
    //find all where this user belongs
    db.Room.findAll()
});

router.post('/api/rooms', (req, res)=>{
    db.Room.create(req.body).then(result=> res.json(result))
});

//owner can delete so need destroy to delete room
//how do we add users to rooms or rooms to users
//create room needs a router.create

module.exports = router;