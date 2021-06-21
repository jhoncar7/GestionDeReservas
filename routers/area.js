const express = require('express');
const router = express.Router();
const area = require('../data/area');

router.get('/api/v1/areas', async (req, res) => {
    const areas = await area.getAreas();
    res.json(areas);
})

router.get('/api/v1/area', async (req, res) => {
    let idQuery = req.query.id;
    let idBody = req.body.id;
    if (!idQuery && !idBody) {
        res.send('id requerido')
    } else {
        if (idQuery) {
            const searchArea = await area.getArea(idQuery);
            res.json(searchArea);
        }
        if (idBody) {
            const searchArea = await area.getArea(idBody);
            res.json(searchArea);
        }
    }
});

router.post('/api/v1/area', async (req, res) => {
    let newArea = req.body.area;
    if (!newArea) {
        res.send('parametro requerido en POST "area", los parametros deben enviarse por el body')
    } else {
        newArea = await area.addArea(req.body);
        res.json(newArea.ops)
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
            userBody = await area.updateArea(userBody, idBody);
            if (!userBody) {
                res.send('No se pudo procesar la solicitud, verificar los valores enviados')
            } else {
                res.json(userBody);
            }
        }

        if (idQuery) {
            let userQuery = req.query;
            userQuery = await area.updateArea(userQuery, idQuery);
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
            await area.deleteArea(idQuery);
            res.send('Usuario Eliminado')
        }
        if (idBody) {
            await area.deleteArea(idBody);
            res.send('Usuario Eliminado')
        }
    }
})

module.exports = router;