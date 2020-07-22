const express = require("express");

const router = express.Router();

const db = require("../models");


router.get('/api/rooms/:userid', (req,res)=>{
    //find all where this user belongs
});

//owner can delete so need destroy to delete room
//how do we add users to rooms or rooms to users
//create room needs a router.create

module.exports = router;