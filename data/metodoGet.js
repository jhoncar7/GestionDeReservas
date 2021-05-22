const connection = require('./connection');


async function getUserInicioSesion(email) {
    const clientmongo = await connection.getConnection();

    const usuario = await clientmongo.db('ReservasPuesto').collection('users').findOne({ email: email });
    return usuario;
}

async function getUser() {
    const clientmongo = await connection.getConnection();

    const usuarios = await clientmongo.db('ReservasPuesto').collection('users').find().toArray();
    return usuarios;
}

module.exports = { getUser, getUserInicioSesion };