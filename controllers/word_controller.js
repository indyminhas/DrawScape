//importing dependencies
const express = require("express");
const router = express.Router();
const db = require("../models");

router.post('/api/words', (req, res)=>{
    db.Word.create(req.body).then(result=> res.json(result))
});

module.exports = router;
