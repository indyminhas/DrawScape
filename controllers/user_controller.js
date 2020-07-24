const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");

//get request to get all user info for the user page
router.get('/api/user/:id', (req, res) => {
    db.User.findOne({ where: { id: req.params.id } }).then(result => {
        res.json(result)
        res.status(204).end();
    }).catch(err => {
        res.status(500).end();
    })
    
});

//post request when user signs up for a username/password, etc
router.post('/api/user', (req, res) => {
    db.User.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    }).then(dbCreateUser => {
        res.json(dbCreateUser)
        res.status(204).end();
    }).catch(err => {
        return res.status(500).end();
    })    
})

//check if user exists
router.post('/login',(req,res)=>{
    db.User.findOne({where: {email:req.body.email}}).then(data =>{
        if(!data){
            return res.status(404).send('no such user')
        } else {
            if (bcrypt,bcrypt.compareSync(req.body.password, data.password)){
                req.session.user = {
                    id: data.id,
                    user_name: data.user_name
                }
                res.send('login successful')
            } else {
                res.status(401).send('wrong password')
            }
        }
    }).catch(err=>{
        return res.status(500).end()
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
            id: req.params.id
        }
    }).then(dbUpdateUser => {
        res.json(dbUpdateUser)
        res.status(204).end();
    }).catch(err => {
        res.status(500).end();
    })
    
})

//delete request to shut down user's profile
router.delete('/api/user/:id', (req, res) => {
    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbPost) {
        res.json(dbPost);
        res.status(204).end();
    }).catch(function (err) {
        res.status(500).end();
    })
    
})

module.exports = router;