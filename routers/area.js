const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const area = require('../controllers/area');
const {verifyUsersArea, updateAreaUsers} = require('../controllers/user')

//verificado ✔
router.get('/api/v1/areas', async (req, res) => {
    const areas = await area.getAreas();

    if(areas.length == 0) return res.status(204).json({"mensaje": "No se encontraron áreas"});

    res.status(200).json(areas);
})

//verificado ✔ chequear
router.get('/api/v1/area/:id', async (req, res) => {

    let searchArea = await area.getArea(req.params.id);
    if (!searchArea) {
        return res.status(404).json({ "error": "Área no encontrada" });
    }
    return res.status(200).json(searchArea);
});

//verificado ✔ //NAME AREA TO UPPER CASE
router.post('/api/v1/area', async (req, res) => {

    let { name, seat_availability } = req.body;

    if (!name || !seat_availability) {
        return res.status(400)
            .json({ "error": "Campos que requieren ser enviados por body: 1.'name'(String) 2.'seat_availability'(valor entero)" });
    } else {
        let isCreated = await area.verifyArea(name.toUpperCase());
        if(isCreated) return res.status(400).json({"mensaje": "El nombre del área ya existe"})
        let newArea = await area.addArea(req.body);
        return res.status(201).json({ "area": newArea.ops[0] }); //ver
    }
});

//verificado ✔
router.put('/api/v1/area/:id', async (req, res) => {

    if (!req.params.id) {
        return res.status(400).json({ "error": "el parametro id es requerido" });
    }
    if(req.body.name != undefined){
        req.body.name= req.body.name.toUpperCase()
        let isCreated = await area.verifyArea(req.body.name);
        if(isCreated) return res.status(400).json({"mensaje": "El nombre del área ya existe"})
        let usersWithArea = await verifyUsersArea(req.body.name);
        console.log(usersWithArea);
        await updateAreaUsers(usersWithArea, req.body.name);
    }
   
    let updatedArea = await area.updateArea(req.body, req.params.id);

    if (!updatedArea) {
        return res.status(404).json({ "error": "Error al querer modificar el área." });
    } else if (updatedArea.result.ok == 1) {
        return res.status(200).json({ "mensaje": "actualización exitosa" })
    }
})

//verificado ✔
router.delete('/api/v1/area/:id', async (req, res) => {

    if (!req.params.id) {
        return res.status(400).json({ "error": "el parametro id es requerido" });
    }
    let deleteArea = await area.getArea(req.params.id);
    if (!deleteArea) return res.status(404).json({ "error": "Área no encontrada" });

    let isUserUsingArea = await verifyUsersArea(deleteArea.name);
    if(isUserUsingArea.length > 0){
        return res.status(404).json({ "error": "No pudo eliminarse el área. Hay usuarios con esta área asociada. Modifique el área de los usuarios antes de eliminarla." });
    }
    
    await area.deleteArea(req.params.id);
    return res.json({ "mensaje": "El área fue eliminada exitosamente" });
})

module.exports = router;