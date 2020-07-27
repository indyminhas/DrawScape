const express = require("express");

const router = express.Router();

const db = require("../models");

router.get('/api/junctiontable/:roomId', (req, res) => {
    //find all where this user belongs
    db.Room.findAll({where:{id:req.params.roomId}, include: db.User}).then(data =>
        res.json(data)

    ).catch(err => {
        res.status(500).end();
    })
});

router.post('/api/junctiontable/:roomId', async (req,res)=>{
    
    let room = await db.Room.findOne({where:{id:req.params.roomId}});
    room.addPlayroom(req.session.user.id);
    res.json(room)
});

module.exports = router;