const express = require('express');
const router = express.Router();
const dataMetodoGet = require('../data/metodoGet');
const dataMetodoPut = require('../data/metodoPut');
const dataMetodoDelete = require('../data/MetodoDelete');
const dataMetodoPost = require('../data/metodoPost');

router.get('/abm-usuario', async (req, res) => {
    const user = await dataMetodoGet.getUsers();
    const usuario = req.session.usuario;
    res.render('abmUsuario',{usuario : req.session.usuario, users : user})
});

router.get('/abm-area', async(req, res) => {
    const areas = await dataMetodoGet.getAreas();
    res.render('abmArea',{usuario : req.session.usuario, area : areas})
});

router.get('/registroUsuario', async(req, res) => {
    const areas = await dataMetodoGet.getAreas();
    const perfiles = await dataMetodoGet.getPerfiles();
    res.render('registroAbmUsuario',{usuario : req.session.usuario, areas, perfiles})
});

router.get('/crearArea', (req, res) => {
    res.render('crearArea',{usuario : req.session.usuario})
});

router.get('/editar/:id', async(req, res) => {
    const user = await dataMetodoGet.getUser(req.params.id);
    const areas = await dataMetodoGet.getAreas();
    const perfiles = await dataMetodoGet.getPerfiles();
    res.render('editar',{usuario : req.session.usuario, usuario_id: user, areas, perfiles})
});

router.post('/procesar_registro_Area', async(req, res) => {
    let name = req.body.area;
    if(!name){
        res.redirect('/admin/abm-area')
    }else{
        name = req.body;
        a = await dataMetodoPost.addArea(name);
        res.redirect('/admin/abm-area')
    }
});

router.post('/procesar_editar', async(req, res) => {
    console.log(req.body);
    let usuario = req.body;
    const update = await dataMetodoPut.updateUser(usuario);
    console.log(update);
    res.redirect('/admin/abm-usuario');
});

router.get('/procesar_eliminar/:id', async (req, res) => {
    let id = req.params.id;
    await dataMetodoDelete.deleteUser(id);
    res.redirect('/admin/abm-usuario');
});

module.exports = router;