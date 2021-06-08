const express = require('express');
const router = express.Router();
const dataMetodoGet = require('../data/metodoGet');
const dataMetodoPut = require('../data/metodoPut');
const dataMetodoDelete = require('../data/MetodoDelete');
const dataMetodoPost = require('../data/metodoPost');

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

module.exports = router;