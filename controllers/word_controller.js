//importing dependencies
const express = require("express");
const router = express.Router();
const db = require("../models");

// post route to import words to words table in database
// router.post('/api/words', (req, res)=>{
//     db.Word.create(req.body).then(result=> res.json(result))
// });

module.exports = router;
