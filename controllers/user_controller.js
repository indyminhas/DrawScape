const express = require("express");

const router = express.Router();

const db = require("../models");

//get request to get all user info for the user page
router.get('/api/user/:id', (req, res) => {
    db.User.findOne({ where: { id: req.params.id } }).then().catch();
});

//post request when user signs up for a username/password, etc
router.post('/api/user', (req, res) => {
    db.User.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    }).then(dbCreateUser => {
        res.json(dbCreateUser)
    }).catch(err => {
        res.json(err)
    });
}) 

//put request for updating user info on user page
// (have to think about what the user is allowed to/can update and adjust accordingly)
router.put('/api/user/:id', (req, res) => {
    db.User.update({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    }, {
        where: {
            id: req.body.id
        }
    }).then(dbUpdateUser => {
        res.json(dbUpdateUser)
    }).catch(err => {
        res.json(err)
    });
})

//delete request to shut down user's profile
router.delete('/api/user/:id', (req,res) => {
    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbPost) {
        res.json(dbPost);
    }).catch(function (err) {
        res.json(err);
    });
})

module.exports = router;