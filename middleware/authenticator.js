const express = require('express');
const router = express.Router();

router.use('/index', (req, res, next) => {
  /* if (!req.session.user) {
    req.flash('message', '❌ Debe iniciar sesión ❌')
    res.redirect("/")
  }
  else {
    next()
  } */
  console.log('api');
  next();
})

module.exports = router;