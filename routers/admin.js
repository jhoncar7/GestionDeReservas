const express = require('express');
const router = express.Router();
const getDataMethod = require('../data/getMethod');
const putDataMethod = require('../data/putMethod');
const deleteDataMethod = require('../data/deleteMethod');
const postDataMethod = require('../data/postMethod');

router.get('/abm-user', async (req, res) => {
    const user = await getDataMethod.getUsers();
    res.render('abmUser', { user: req.session.user, user: user, error: req.flash('error') })
});

router.get('/abm-area', async (req, res) => {
    const areas = await getDataMethod.getAreas();
    res.render('abmArea', { user: req.session.user, area: areas })
});

router.get('/userRegister', async (req, res) => {
    const areas = await getDataMethod.getAreas();
    const profiles = await getDataMethod.getProfiles();
    res.render('registerAbmUser', { user: req.session.user, areas: areas, profiles: profiles })
});

router.post('/user_register_process', async (req, res) => {
    let { email, password, profile, area } = req.body;
    if (!email || !password || !profile || !area) {
        req.flash('error', 'Error en los datos ingresados')
        res.redirect('/admin/abm-user')
    } else {
        user = await postDataMethod.addUser(req.body);
        res.redirect('/admin/abm-user')
    }
});

router.get('/createArea', (req, res) => {
    res.render('createArea', { user: req.session.user })
});

router.get('/edit/:id', async (req, res) => {
    const user = await getDataMethod.getUser(req.params.id);
    const areas = await getDataMethod.getAreas();
    const profiles = await getDataMethod.getProfiles();
    res.render('edit', { user: req.session.user, user_id: user, areas: areas, profiles: profiles })
});

router.post('/area_register_process', async (req, res) => {
    let name = req.body.area;
    if (!name) {
        res.redirect('/admin/abm-area')
    } else {
        name = req.body;
        await postDataMethod.addArea(name);
        res.redirect('/admin/abm-area')
    }
});

router.post('/edit_process', async (req, res) => {
    let user = req.body;
    let id = req.body._id;
    const update = await putDataMethod.updateUser(user, id);
    res.redirect('/admin/abm-user');
});

router.get('/editArea/:id', async (req, res) => {
    const area = await getDataMethod.getArea(req.params.id);
    res.render('editArea', { user: req.session.user, area_id: area })
});

router.post('/edit_area_process', async (req, res) => {
    let area = req.body;
    let id = req.body._id;
    const update = await putDataMethod.updateArea(area, id);
    res.redirect('/admin/abm-area');
});

router.get('/delete_process/:id', async (req, res) => {
    let id = req.params.id;
    await deleteDataMethod.deleteUser(id);
    res.redirect('/admin/abm-user');
});

router.get('/delete_area_process/:id', async (req, res) => {
    let id = req.params.id;
    await deleteDataMethod.deleteArea(id);
    res.redirect('/admin/abm-area');
});

module.exports = router;