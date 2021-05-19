const connection = require('./connection');

async function getUser(){
    const clientmongo = await connection.getConnection();

    const usuarios = await clientmongo.db('ReservasPuesto').collection('users').find().toArray();
    return usuarios;
}

module.exports = {getUser};