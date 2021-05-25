const express = require('express');
const router = express.Router();
const dataMetodoGet = require('../data/metodoGet');
const dataMetodoPut = require('../data/metodoPut');
const dataMetodoDelete = require('../data/MetodoDelete');

router.get('/api/v1/users', async (req, res) => {
    const user = await dataMetodoGet.getUsers();
    res.json(user);
})

router.get('/api/v1/user', async (req, res) => {
    let idBody = req.body.id;
    let idQuery = req.query.id;

    if (!idBody && !idQuery) {
        res.send('id requerido')
    } else {
        if (idBody) {
            const user = await dataMetodoGet.getUser(idBody);
            res.json(user);
        }
        if (idQuery) {
            const user = await dataMetodoGet.getUser(idQuery);
            res.json(user);
        }
    }
})

router.put('/api/v1/user', async (req, res) => {
    let idBody = req.body._id;
    let idQuery = req.query._id;

    if (!idBody && !idQuery) {
        res.send('id requerido, nombre del campo es "_id"')
    } else {
        if (idBody) {
            let userBody = req.body;
            userBody = await dataMetodoPut.updateUser(userBody, idBody);
            if (!userBody) {
                res.send('No se pudo procesar la solicitud, verificar los valores enviados')
            } else {
                res.json(userBody);
            }
        }

        if (idQuery) {
            let userQuery = req.query;
            userQuery = await dataMetodoPut.updateUser(userQuery, idQuery);
            if (!userQuery) {
                res.send('No se pudo procesar la solicitud, verificar los valores enviados')
            } else {
                res.json(userQuery);
            }
        }
    }
})

router.delete('/api/v1/user', async (req, res) => {
    let idQuery = req.query.id;
    let idBody = req.body.id;
    if (!idBody && !idQuery) {
        res.send('ID requerido')
    } else {
        if (idQuery) {
            await dataMetodoDelete.deleteUser(idQuery);
            res.send('Usuario Eliminado')
        }
        if (idBody) {
            await dataMetodoDelete.deleteUser(idBody);
            res.send('Usuario Eliminado')
        }
    }
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
})

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