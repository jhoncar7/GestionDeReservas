const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
    if(req.session.user){
        res.redirect('/index')
    }else{
        res.render('login', { message: req.flash('message') })
    }
});

module.exports = router;