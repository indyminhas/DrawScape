const express = require("express");
const router = express.Router();
const db = require("../models");

//get all user info for the user page
router.get('/api/user/:id', (req,res)=>{
    db.User.findOne({where:{id:req.params.id}}).then().catch();
});

//put request for uipdating user info on user page


//delete to shut down your profile


module.exports = router;