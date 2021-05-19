const express = require('express');
const router = express.Router();
const dataMetodoGet = require('../data/metodoGet');

router.get('/api/v1/users',async (req, res) => {
    const user = await dataMetodoGet.getUser();
    res.json(user);
})

router.post('/api/v1/clientes',(req,res)=>{

    const n = req.body.nombre;

    console.log(n);

    res.json(n)
});
module.exports = router;