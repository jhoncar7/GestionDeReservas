const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const {verifyProfile} = require('../controllers/profile');
const {verifyArea} = require('../controllers/area')
const auth = require('../middleware/auth');
const { /*validateEmail,*/ validateFields } = require('../validator/user-validator')
const { verify } = require('jsonwebtoken');

router.post('/api/v1/login', async (req, res) => {
    let {email, password} = req.body;
    console.log('email y password : ' , email, password);
    if (!email || !password) return res.status(401).send('Datos invalidos')
    try {
        const userLogin = await user.getUserLogin(email, password);
        const token = await user.generateJWT(userLogin);
        return res.send({ userLogin, token })
    } catch (error) {
        return res.status(401).send(error.message)
    }
    
})


//verificado ✔
router.get('/api/v1/users', async (req, res) => {
    const users = await user.getUsers();
    if (users.length == 0) return res.status(204).json({"mensaje:": "No se encontraron usuarios" });

    return res.json({ "count": users.length, users });
})

router.get('/api/v1/user/:id', async (req, res) => {
    let searchUser = await user.getUser(req.params.id);
    if (!searchUser) return res.status(404).json({ "mensaje": "Usuario no encontrado" });
    
    return res.json(searchUser);
})

router.post('/api/v1/user', auth, async (req, res) => {
    let { email, password, profile, area } = req.body;

    if (!validateFields(email, password, profile, area))
        return res.status(400).json({ "error": "Campos requeridos en el body para el alta de usuario: 'email' 'password' 'profile' 'area'" });
    
    //if(!validateEmail(email)) return res.status(400).json({ "error": "El campo email debe seguir el patron de emails. Ej: admin@admin.com"});

    const isAreaValid = await verifyArea(area);
    const isProfileValid = await verifyProfile(profile);
    if(!isAreaValid) return res.status(400).json({"error": "El área enviada no existe o no es correcta"})
    if(!isProfileValid) return res.status(400).json({"error": "El perfil enviado no es correcto"})

    let newUser = await user.addUser(req.body);
    return res.status(201).json({"usuario": newUser.ops[0] });
    
});
//verificado ✔
router.put('/api/v1/user/:id', auth, async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ "error": "el parametro 'id' es requerido en el path" });
    }

    let getUser = await user.getUser(req.params.id);
    if (!getUser) return res.status(404).json({ "mensaje": "Usuario no encontrado" });

    if(req.body.area != undefined){
        const isAreaValid = await verifyArea(req.body.area);
        if(!isAreaValid) return res.status(400).json({"error": "El área enviada no existe o no es correcta"})
    }
    if(req.body.profile != undefined){
        const isProfileValid = await verifyProfile(req.body.profile);
        if(!isProfileValid) return res.status(400).json({"error": "El perfil enviado no es correcto"})
    }

    let updatedUser = await user.updateUser(req.body, req.params.id);
    if (!updatedUser) return res.status(404).json({ "error": "Error al modificar usuario" });

    //ver
    //TODO: devolver el usuario creado en forma de objeto return res.json(updatedUser);
    return res.json({ "mensaje": "actualización exitosa" })
})

router.delete('/api/v1/user/:id', auth, async (req, res) => {

    if (!req.params.id) return res.status(400).json({ "error": "el parametro _id es requerido" });

    let deleteUser = await user.getUser(req.params.id);
    if (!deleteUser) return res.status(404).json({ "error": "usuario no encontrado" });

    await user.deleteUser(req.params.id);
    return res.json({ "mensaje": "El usuario se ha eliminado correctamente" });
});

module.exports = router;