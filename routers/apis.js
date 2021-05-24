const express = require('express');
const router = express.Router();
const dataMetodoGet = require('../data/metodoGet');
const dataMetodoPut = require('../data/metodoPut');
const dataMetodoDelete = require('../data/MetodoDelete');

router.get('/api/v1/users', async (req, res) => {
    const user = await dataMetodoGet.getUsers();
    res.json(user);
})

router.get('/api/v1/user/:id', async (req, res) => {
    const user = await dataMetodoGet.getUser(req.params.id);
    res.json(user);
})

router.get('/api/v1/perfiles', async (req, res) => {
    const perfiles = await dataMetodoGet.getPerfiles();
    res.json(perfiles);
})

router.get('/api/v1/areas', async (req, res) => {
    const areas = await dataMetodoGet.getAreas();
    res.json(areas);
})

router.put('/api/v1/user/:id', async (req, res) => {
    let id = req.params.id;
    let user = req.body;
    user._id = id;
    user = await dataMetodoPut.updateUser(user);
    res.json(user);
})

router.post('/api/v1/clientes', (req, res) => {
    const n = req.body.nombre;
    res.json(n)
});

router.delete('/api/v1/user', async (req, res) => {
    let id = req.query.id;
    if (!id) {
        res.send('ID requerido')
    } else {
        await dataMetodoDelete.deleteUser(id);
        res.send('Usuario Eliminado')
    }
});

module.exports = router;