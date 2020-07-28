const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const { route } = require("./handlebars_controller");

// request to get all user info for the user page
router.get('/api/user', (req, res) => {
    db.User.findOne({
        where: { id: req.session.user.id },
        include: [db.Room, { model: db.Room, as: 'playroom' }]
    }).then(result => {
        res.json(result)
        // res.status(204).end();
    }).catch(err => {
        console.log(err)
        res.status(500).end();
    });
});

// request to log user out, ending their session.
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login')
});

// request to grab user session data.
router.get('/loggedinuser', (req, res) => {
    res.json(req.session.user)
});

//post request when user signs up for an account
router.post('/signup', (req, res) => {
    db.User.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    }).then(dbCreateUser => {
        res.json(dbCreateUser)
        res.status(204).end();
    }).catch(err => {
        return res.status(500).end();
    });
});

//post request to log user into account, or deny if login unsuccessful
router.post('/login', (req, res) => {
    db.User.findOne({ where: { email: req.body.email } }).then(data => {
        if (!data) {
            return res.status(404).send('no such user')
        } else {
            if (bcrypt, bcrypt.compareSync(req.body.password, data.password)) {
                req.session.user = {
                    id: data.id,
                    user_name: data.user_name
                }
                console.log(req.session.user)
                return res.send('login successful')
            } else {
                return res.status(401).send('wrong password')
            }
        }
    }).catch(err => {
        return res.status(500).end()
    });
});

//put request for updating username
router.put('/api/user/username', (req, res) => {
    db.User.update({
        user_name: req.body.user_name
    }, {
        where: {
            id: req.session.user.id
        }
    }).then(dbUpdateUsername => {
        res.json(dbUpdateUsername)
        res.status(204).end();
    }).catch(err => {
        res.status(500).end();
    });
});

//delete request to shut down user's profile
router.delete('/api/user', (req, res) => {
    db.User.destroy({
        where: {
            id: req.session.user.id
        }
    }).then(function (dbPost) {
        res.json(dbPost);
        res.status(204).end();
    }).catch(function (err) {
        console.log(err)
        res.status(500).end();
    });
});

module.exports = router;