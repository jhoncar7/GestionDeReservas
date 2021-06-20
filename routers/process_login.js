const express = require('express');
const router = express.Router();
const data = require('../data/getMethod');
const generateToken = require('../data/token');


router.post('', async (req, res) => {
    
    try {
        const user = await data.getUserLogin(req.body.email, req.body.password);
        const token = await generateToken.generateJWT(user);
        console.log(token);
        //res.send({user,token}); //le envio al front las dos variables
        req.session.user = user;
        res.redirect('/index')
    } catch (error) {
        //res.status(401).send(error.message)
        req.flash('message', '❌Email o Password incorrecto❌')
        res.redirect('/')
    }
})

module.exports = router;