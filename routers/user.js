const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const auth = require('../middleware/auth')

router.post('/api/v1/login', async (req, res) => {
    let {email, password} = req.body;
    console.log('email y password : ' , email, password);
    if (!email || !password) {
        return res.status(401).send('Datos invalidos')
    } else {
        try {
            const userLogin = await user.getUserLogin(email, password);
            const token = await user.generateJWT(userLogin);
            res.send({ userLogin, token })
        } catch (error) {
            return res.status(401).send(error.message)
        }
    }
})

router.get('/api/v1/users', async (req, res) => {
    const users = await user.getUsers();
    if (users.length == 0) {
        res.status(204);
    }
    return res.json({ "count": users.length, users });
})

router.get('/api/v1/user/:id', async (req, res) => {
    let { id } = req.params;
    let searchUser = await user.getUser(id);
    if (!searchUser) {
        return res.status(404).json({ "error": "usuario no encontrado" });
    }
    return res.json(searchUser);
})

router.post('/api/v1/user', auth, async (req, res) => {
    //el perfil estaria bueno machearlo con la collection de perfil y validar que haya ingresado un valor valido
    let { email, password, profile, area } = req.body;

    if (!email || !password || !profile || !area) {
        return res.status(400)
            .json({ "error": "parametros requeridos en POST 'email' 'password' 'profile' 'area', los parametros deben enviarse por el body" });
    } else {
        let newUser = await user.addUser(req.body);
        return res.status(201).json({ "success": true, "usuario": newUser.ops[0] });
    }
});

router.put('/api/v1/user/:id', auth, async (req, res) => {
    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let updatedUser = await user.updateUser(req.body, id);
    if (!updatedUser) {
        return res.status(404).json({ "error": "el usuario no existe" });
    } else if (updatedUser.result.ok == 1) {
        // TODO: devolver el usuario creado en forma de objeto
        //return res.json(updatedUser);
        return res.json({ "status": "ok", "message": "actualizacion exitosa" })
    }
})

router.delete('/api/v1/user/:id', auth, async (req, res) => {

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