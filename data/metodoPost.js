const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');

async function addUsuario(usuario){
    const clientmongo = await connection.getConnection();
    usuario.password = bcrypt.hashSync(usuario.password, 8);
    const result = await clientmongo.db('ReservasPuesto')
        .collection('users')
        .insertOne(usuario);
    return result;
}

async function addArea(area){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('ReservasPuesto')
        .collection('areas')
        .insertOne(area);
    return result;
}

module.exports = { addUsuario,addArea };