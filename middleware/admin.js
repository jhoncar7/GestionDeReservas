const express = require('express');
const router = express.Router();

router.use('/admin', (req, res, next) => {
  console.log('peticion admin');
    if (!req.session.usuario) {
      req.flash('mensaje', '❌Inicie Sesion❌')
      res.redirect("/")
    }else if(req.session.usuario.perfil != 'admin'){
      req.flash('mensaje', '❌ acceso invalido ❌')
      res.redirect("/index")
    }
    else {
      next()
    }
  })

  module.exports = router;