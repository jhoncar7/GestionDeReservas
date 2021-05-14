const express = require('express');
const router = express.Router();

router.get('/api/v1',(req, res) => {
    res.send('esto es una ruta de api rest')
})

module.exports = router;