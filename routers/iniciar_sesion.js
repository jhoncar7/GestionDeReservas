const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
    if(req.session.usuario){
        res.redirect('/index')
    }else{
        res.render('inicio_sesion', { mensaje: req.flash('mensaje') })
    }
});

module.exports = router;