const express = require('express');
const router = express.Router();
const dataMetodoGet = require('../data/metodoGet');
const dataMetodoPut = require('../data/metodoPut');
const dataMetodoDelete = require('../data/MetodoDelete');
const dataMetodoPost = require('../data/metodoPost');

router.get('/abm-usuario', async (req, res) => {
    const user = await dataMetodoGet.getUsers();
    const usuario = req.session.usuario;
    res.render('abmUsuario',{usuario : req.session.usuario, users : user, error:req.flash('error')})
});

router.get('/abm-area', async(req, res) => {
    const areas = await dataMetodoGet.getAreas();
    res.render('abmArea',{usuario : req.session.usuario, area : areas})
});

router.get('/registroUsuario', async(req, res) => {
    const areas = await dataMetodoGet.getAreas();
    const perfiles = await dataMetodoGet.getPerfiles();
    res.render('registroAbmUsuario',{usuario : req.session.usuario, areas:areas, perfiles:perfiles})
});

router.post('/procesar_registro_usuario', async(req, res) => {
    let email = req.body.email;
    let password = req.body.contrasena;
    let perfil = req.body.perfil;
    let area = req.body.area;
    if(!email || !password || perfil=='' || area==''){
        req.flash('error', 'Error en los datos ingresados')
        res.redirect('/admin/abm-usuario')
    }else{
        usuario = await dataMetodoPost.addUsuario(req.body);
        res.redirect('/admin/abm-usuario')
    }
});

router.get('/crearArea', (req, res) => {
    res.render('crearArea',{usuario : req.session.usuario})
});

router.get('/editar/:id', async(req, res) => {
    const user = await dataMetodoGet.getUser(req.params.id);
    const areas = await dataMetodoGet.getAreas();
    const perfiles = await dataMetodoGet.getPerfiles();
    res.render('editar',{usuario : req.session.usuario, usuario_id: user, areas:areas, perfiles:perfiles})
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
    let usuario = req.body;
    let id = req.body._id;
    const update = await dataMetodoPut.updateUser(usuario, id);
    res.redirect('/admin/abm-usuario');
});

router.get('/editarArea/:id', async(req, res) => {
    const area = await dataMetodoGet.getArea(req.params.id);
    res.render('editarArea',{usuario : req.session.usuario, area_id: area})
});

router.post('/procesar_editar_area', async(req, res) => {
    let area = req.body;
    let id = req.body._id;
    const update = await dataMetodoPut.updateArea(area,id);
    res.redirect('/admin/abm-area');
});

router.get('/procesar_eliminar/:id', async (req, res) => {
    let id = req.params.id;
    await dataMetodoDelete.deleteUser(id);
    res.redirect('/admin/abm-usuario');
});

router.get('/procesar_eliminar_area/:id', async (req, res) => {
    let id = req.params.id;
    await dataMetodoDelete.deleteArea(id);
    res.redirect('/admin/abm-area');
});

module.exports = router;