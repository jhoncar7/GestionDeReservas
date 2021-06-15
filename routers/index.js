const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
  res.render('index', { user: req.session.user })
})

router.get('/reserve-place',(req,res)=>{
  res.send(`<h1>En Construccion</h1>`)
})

module.exports = router;