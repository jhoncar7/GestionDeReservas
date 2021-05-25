const express = require('express');
const router = express.Router();

router.use('/index', (req, res, next) => {
  if (!req.session.usuario) {
    req.flash('mensaje', '❌ Debe iniciar sesión ❌')
    res.redirect("/")
  }
  else {
    next()
  }
})

module.exports = router;