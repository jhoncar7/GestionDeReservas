const express = require('express');
const router = express.Router();
const data = require('../data/getMethod');


router.post('', async (req, res) => {
    const user = await data.getUserLogin(req.body.email);
    if (user && req.body.password == user.password) {
        req.session.user = user;
        res.redirect('/index')
    } else {
        req.flash('message', '❌Email o Password incorrecto❌')
        res.redirect('/')
    }
})

module.exports = router;