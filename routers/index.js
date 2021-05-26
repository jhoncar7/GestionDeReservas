const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
  res.render('index', { usuario: req.session.usuario })
})

router.get('/reservar-lugar',(req,res)=>{
  res.send(`<h1>EN COnstruccion</h1>`)
})

module.exports = router;