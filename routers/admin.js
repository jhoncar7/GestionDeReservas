const express = require('express');
const router = express.Router();
const dataMetodoGet = require('../data/metodoGet');

router.get('/abm-usuario', (req, res) => {
    res.render('abmUsuario',{usuario : req.session.usuario})
})

router.get('/abm-area', (req, res) => {
    res.render('abmArea',{usuario : req.session.usuario})
})

module.exports = router;