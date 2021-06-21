const express = require('express');
const router = express.Router();
const user = require('../data/user');
const profiles = require('../data/profile');
const reservation = require('../data/reservation');

// funcionando
router.get('/api/v1/users', async (req, res) => {
    const users = await user.getUsers();
    if (users.length == 0) {
        res.status(204);
    }
    return res.json({ "count": users.length, users });
})

//funcionando
router.get('/api/v1/user/:id', async (req, res) => {
    let { id } = req.params;
    let searchUser = await user.getUser(id);
    if (!searchUser) {
        return res.status(404).json({ "error": "usuario no encontrado" });
    }
    return res.json(searchUser);
})

// funcionando
router.post('/api/v1/user', async (req, res) => {
    //el perfil estaria bueno machearlo con la tabla y validar que sea cualqueir valor ingresado
    let { email, password, profile, area } = req.body;

    if (!email || !password || profile > profiles_id.length || profile <= 0 || !area) {
        return res.status(400)
            .json({ "error": "parametros requeridos en POST 'email' 'password' 'profile' 'area', los parametros deben enviarse por el body" });
    } else {
        let newUser = await user.addUser(req.body);
        return res.status(201).json({ "success": true, "usuario": newUser.ops[0] });
    }
});

//funcionando
router.put('/api/v1/user/:id', async (req, res) => {
    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let updatedUser = await user.updateUser(req.body, id);
    console.log('updatedUser:', updatedUser);
    if (!updatedUser) {
        return res.status(404).json({ "error": "el usuario no existe" });
    } else if (updatedUser.result.ok == 1) {
        // TODO: devolver el usuario creado en forma de objeto
        //return res.json(updatedUser);
        return res.json({"status" : "ok", "message" : "actualizacion exitosa"})
    }
})

//Funcinando
router.delete('/api/v1/user/:id', async (req, res) => {
    console.log('parametros : ', req.params);
    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let deleteUser = await user.getUser(id);
    if (!deleteUser) {
        return res.status(404).json({ "error": "usuario no encontrado" });
    }
    await user.deleteUser(id);
    return res.json({ "success": true, "deletedUser": deleteUser });
});

module.exports = router;