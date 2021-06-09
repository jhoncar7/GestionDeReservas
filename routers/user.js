const express = require('express');
const router = express.Router();
const getDataMethod = require('../data/getMethod');
const putDataMethod = require('../data/putMethod');
const deleteDataMethod = require('../data/deleteMethod');
const postDataMethod = require('../data/postMethod');

router.get('/api/v1/users', async (req, res) => {
    const users = await getDataMethod.getUsers();
    if (users.length == 0) {
        res.status(204);
    }
    return res.json({ "count": users.length, users });

})

router.get('/api/v1/users/:id', async (req, res) => {
    let { id } = req.params;
    let user = await getDataMethod.getUser(id);
    if (!user) {
        return res.status(404).json({ "error": "usuario no encontrado" });
    }
    return res.json(user);
})

router.post('/api/v1/users', async (req, res) => {
    let { email, password, profile, area } = req.body;
    if (!email || !password || !profile || !area) {
        return res.status(400)
            .json({ "error": "parametros requeridos en POST 'email' 'contrasena' 'perfil' 'area', los parametros deben enviarse por el body" });
    } else {
        let user = await postDataMethod.addUser(req.body);
        return res.status(201).json({ "success": true, "usuario": user.ops[0] });
    }
});

router.put('/api/v1/users/:id', async (req, res) => {
    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let updatedUser = await putDataMethod.updateUser(req.body, id);
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
    let user = await getDataMethod.getUser(id);
    if (!user) {
        return res.status(404).json({ "error": "usuario no encontrado" });
    }
    await deleteDataMethod.deleteUser(id);
    return res.json({ "success": true, "deletedUser": user });
});

module.exports = router;