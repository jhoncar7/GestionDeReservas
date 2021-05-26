const express = require('express');
const router = express.Router();
const data = require('../data/metodoGet');


router.post('', async (req, res) => {
    const usuario = await data.getUserInicioSesion(req.body.email);
    if (usuario && req.body.password == usuario.password) {
        req.session.usuario = usuario;
        res.redirect('/index')
    } else {
        req.flash('mensaje', '❌Email o Password incorrecto❌')
        res.redirect('/')
    }
})

module.exports = router;