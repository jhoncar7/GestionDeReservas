const express = require('express');
const router = express.Router();
const dataMetodoGet = require('../data/metodoGet');
const dataMetodoPut = require('../data/metodoPut');
const dataMetodoDelete = require('../data/MetodoDelete');
const dataMetodoPost = require('../data/metodoPost');

router.get('/api/v1/users', async (req, res) => {
    const users = await dataMetodoGet.getUsers();
    if (users.length == 0) {
        res.status(204);
    }
    return res.json({ "count": users.length, users });

})

router.get('/api/v1/users/:id', async (req, res) => {
    let { id } = req.params;
    let user = await dataMetodoGet.getUser(id);
    if (!user) {
        return res.status(404).json({ "error": "usuario no encontrado" });
    }
    return res.json(user);
})

router.post('/api/v1/users', async (req, res) => {
    let { email, password, perfil, area } = req.body;
    if (!email || !password || !perfil || !area) {
        return res.status(400)
            .json({ "error": "parametros requeridos en POST 'email' 'contrasena' 'perfil' 'area', los parametros deben enviarse por el body" });
    } else {
        let usuario = await dataMetodoPost.addUsuario(req.body);
        return res.status(201).json({ "success": true, "usuario": usuario.ops[0] });
    }
});

router.put('/api/v1/users/:id', async (req, res) => {
    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let updatedUser = await dataMetodoPut.updateUser(req.body, id);
    console.log('updatedUser:', updatedUser);
    if (!updatedUser) {
        return res.status(404).json({ "error": "el usuario no existe" });
    } else if (updatedUser.result.ok == 1) {
        // TODO: devolver el usuario creado en forma de objeto
        return res.json(updatedUser);
    }
})

router.delete('/api/v1/users/:id', async (req, res) => {
    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let user = await dataMetodoGet.getUser(id);
    if (!user) {
        return res.status(404).json({ "error": "usuario no encontrado" });
    }
    await dataMetodoDelete.deleteUser(id);
    return res.json({ "success": true, "deletedUser": user });
});

module.exports = router;