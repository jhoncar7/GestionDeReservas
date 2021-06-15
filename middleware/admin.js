const express = require('express');
const router = express.Router();

router.use('/admin', (req, res, next) => {
  console.log('peticion admin');
    if (!req.session.user) {
      req.flash('message', '❌Inicie Sesion❌')
      res.redirect("/")
    }else if(req.session.user.profile != 'admin'){
      req.flash('mensaje', '❌ acceso invalido ❌')
      res.redirect("/index")
    }
    else {
      next()
    }
  })

  module.exports = router;