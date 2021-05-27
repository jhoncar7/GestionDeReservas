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
        return res.status(404)
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
        return res.status(404).json({ "error": "el parametro _id es requerido" });
    }
    let user = await dataMetodoGet.getUser(id);
    if (!user) {
        return res.status(404).json({ "error": "usuario no encontrado" });
    }
    await dataMetodoDelete.deleteUser(id);
    return res.json({ "success": true, "deletedUser": user });
});

router.get('/api/v1/areas', async (req, res) => {
    const areas = await dataMetodoGet.getAreas();
    res.json(areas);
})

router.get('/api/v1/area', async (req, res) => {
    let idQuery = req.query.id;
    let idBody = req.body.id;
    if (!idQuery && !idBody) {
        res.send('id requerido')
    } else {
        if (idQuery) {
            const area = await dataMetodoGet.getArea(idQuery);
            res.json(area);
        }
        if (idBody) {
            const area = await dataMetodoGet.getArea(idBody);
            res.json(area);
        }
    }
});

router.post('/api/v1/area', async (req, res) => {
    let area = req.body.area;
    if (!area) {
        res.send('parametro requerido en POST "area", los parametros deben enviarse por el body')
    } else {
        area = await dataMetodoPost.addArea(req.body);
        res.json(area.ops)
    }
});

router.put('/api/v1/area', async (req, res) => {

    let idBody = req.body._id;
    let idQuery = req.query._id;

    if (!idBody && !idQuery) {
        res.send('id requerido, nombre del campo es "_id"')
    } else {
        if (idBody) {
            let userBody = req.body;
            userBody = await dataMetodoPut.updateArea(userBody, idBody);
            if (!userBody) {
                res.send('No se pudo procesar la solicitud, verificar los valores enviados')
            } else {
                res.json(userBody);
            }
        }

        if (idQuery) {
            let userQuery = req.query;
            userQuery = await dataMetodoPut.updateArea(userQuery, idQuery);
            if (!userQuery) {
                res.send('No se pudo procesar la solicitud, verificar los valores enviados')
            } else {
                res.json(userQuery);
            }
        }
    }
})

router.delete('/api/v1/area', async (req, res) => {

    let idQuery = req.query.id;
    let idBody = req.body.id;

    if (!idBody && !idQuery) {
        res.send('ID requerido')
    } else {
        if (idQuery) {
            await dataMetodoDelete.deleteArea(idQuery);
            res.send('Usuario Eliminado')
        }
        if (idBody) {
            await dataMetodoDelete.deleteArea(idBody);
            res.send('Usuario Eliminado')
        }
    }
})

router.get('/api/v1/perfiles', async (req, res) => {
    const perfiles = await dataMetodoGet.getPerfiles();
    res.json(perfiles);
})

module.exports = router;