const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');

router.get('/api/v1/profiles', async (req, res) => {
    const profiles = await profileController.getProfiles();
    res.json(profiles);
})

router.get('/api/v1/profile/:id', async (req, res) => {
    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let searchProfile = await profileController.getProfileByProfileId(id);
    if (!searchProfile) {
        return res.status(404).json({ "error": "perfil no encontrado" });
    }
    return res.json(searchProfile);
})

router.post('/api/v1/profile', async (req, res) => {
    let { profile, profile_id } = req.body;
    if (!profile || !profile_id) {
        return res.status(400)
            .json({ "error": "parametros requeridos en POST 'profile' 'profile_id', los parametros deben enviarse por el body" });
    }
    let obj = { profile, profile_id };
    let newProfile = await profileController.addProfile(obj);
    return res.status(201).json({ "success": true, "usuario": newProfile.ops[0] });
})

router.delete('/api/v1/profile/:id', async (req, res) => {
    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let deleteProfile = await profileController.getProfileByProfileId(id);
    if (!deleteProfile) {
        return res.status(404).json({ "error": "perfil no encontrado" });
    }
    await profileController.deleteProfile(id);
    return res.json({ "success": true, "deletedProfile": deleteProfile });
})

module.exports = router;