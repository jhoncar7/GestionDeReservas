const express = require('express');
const router = express.Router();
const area = require('../controllers/area');

//verificado ✔
router.get('/api/v1/areas', async (req, res) => {
    const areas = await area.getAreas();
    res.json(areas);
})

//verificado ✔
router.get('/api/v1/area/:id', async (req, res) => {

    let { id } = req.params;

    let searchArea = await area.getArea(id);
    if (!searchArea) {
        return res.status(404).json({ "error": "Area no encontrada" });
    }
    return res.json(searchArea);
});

//verificado ✔
router.post('/api/v1/area', async (req, res) => {

    let { name, seat_availability } = req.body;

    if (!name || !seat_availability) {
        return res.status(400)
            .json({ "error": "parametros requeridos en POST son: 1.'name' 2.'seat_availability'(valor entero), los parametros deben enviarse por el body" });
    } else {
        let newArea = await area.addArea(req.body);
        return res.status(201).json({ "success": true, "usuario": newArea.ops[0] });
    }
});

//verificado ✔
router.put('/api/v1/area/:id', async (req, res) => {

    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let updatedArea = await area.updateArea(req.body, id);

    if (!updatedArea) {
        return res.status(404).json({ "error": "el area no existe" });
    } else if (updatedArea.result.ok == 1) {
        return res.json({ "status": "ok", "message": "actualizacion exitosa" })
    }
})

//verificado ✔
router.delete('/api/v1/area/:id', async (req, res) => {

    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let deleteArea = await area.getArea(id);
    if (!deleteArea) {
        return res.status(404).json({ "error": "Area no encontrado" });
    }
    await area.deleteArea(id);
    return res.json({ "success": true, "deletedArea": deleteArea });
})

module.exports = router;