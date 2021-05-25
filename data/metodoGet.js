const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;

async function getUserInicioSesion(email) {
    const clientmongo = await connection.getConnection();

    const usuario = await clientmongo.db('ReservasPuesto').collection('users').findOne({ email: email });
    return usuario;
}

async function getUsers() {
    const clientmongo = await connection.getConnection();
    const usuarios = await clientmongo.db('ReservasPuesto').collection('users').find().toArray();
    return usuarios;
}

async function getUser(id){
    const clientmongo = await connection.getConnection();
    const usuario = await clientmongo.db('ReservasPuesto')
        .collection('users')
        .findOne({_id: new ObjectId(id)});
    return usuario;
}

async function getAreas() {
    const clientmongo = await connection.getConnection();
    const areas = await clientmongo.db('ReservasPuesto').collection('areas').find().toArray();
    return areas;
}

async function getArea(id){
    const clientmongo = await connection.getConnection();
    const area = await clientmongo.db('ReservasPuesto')
        .collection('areas')
        .findOne({_id: new ObjectId(id)});
    return area;
}

async function getPerfiles() {
    const clientmongo = await connection.getConnection();
    const perfiles = await clientmongo.db('ReservasPuesto').collection('perfiles').find().toArray();
    return perfiles;
}

module.exports = { getUsers,getUser, getUserInicioSesion, getAreas, getPerfiles, getArea};