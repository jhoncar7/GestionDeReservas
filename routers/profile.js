const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const { verifyUsersProfile, updateProfileUsers } = require('../controllers/user');

router.get('/api/v1/profiles', async (req, res) => {
    const profiles = await profileController.getProfiles();
    res.status(200).json(profiles);
})

router.get('/api/v1/profile/:id', async (req, res) => {
    if (!req.params.id) return res.status(400).json({ "error": "El parametro _id es requerido" });
    let searchProfile = await profileController.getProfileByProfileId(req.params.id);
    if (!searchProfile) return res.status(404).json({ "error": "Perfil no encontrado" });
    
    return res.json(searchProfile);
})

router.post('/api/v1/profile', async (req, res) => {
    let { profile, profile_id } = req.body;
    if (!profile || !profile_id) {
        return res.status(400)
            .json({ "error": "Campos requeridos en el body para crear un perfil 'profile' 'profile_id'" });
    }
    let obj = { profile, profile_id };
    let newProfile = await profileController.addProfile(obj);
    return res.status(201).json({"profile": newProfile.ops[0] });
})

//verificado ✔
router.put('/api/v1/profile/:id', async (req, res) => {

    if (!req.params.id) {
        return res.status(400).json({ "error": "el parametro id es requerido" });
    }
    if(req.body.profile != undefined){
        req.body.profile= req.body.profile.toUpperCase()
        let isCreated = await profileController.verifyProfile(req.body.profile);
        if(isCreated) return res.status(400).json({"mensaje": "El nombre del perfil ya existe"})
        let oldName = await profileController.getProfileByProfileId(req.params.id);
        let usersWithProfile = await verifyUsersProfile(oldName.profile);
        await updateProfileUsers(usersWithProfile, req.body.profile);
    }
   
    let updatedProfile = await profileController.updateProfile(req.body, req.params.id);

    if (!updatedProfile) {
        return res.status(404).json({ "error": "Error al querer modificar el perfil." });
    } else if (updatedProfile.result.ok == 1) {
        return res.status(200).json({ "mensaje": "actualización exitosa" })
    }
})

router.delete('/api/v1/profile/:id', async (req, res) => {
    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let deleteProfile = await profileController.getProfileByProfileId(id);
    if (!deleteProfile) {
        return res.status(404).json({ "error": "Perfil no encontrado" });
    }

    let isUserUsingProfile = await verifyUsersProfile(deleteProfile.profile);
    if(isUserUsingProfile.length > 0){
        return res.status(404).json({ "error": "No pudo eliminarse el perfil. Hay usuarios con este perfil asociado. Modifique el perfil de los usuarios antes de eliminarlo." });
    }

    await profileController.deleteProfile(id);
    return res.json({ "mensaje": "Se eliminó el perfil exitosamente" });
})

module.exports = router;