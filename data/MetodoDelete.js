const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;

async function deleteUser(id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('ReservasPuesto')
        .collection('users')
        .deleteOne({_id: new ObjectId(id)});
    
    return result;
}

async function deleteArea(id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('ReservasPuesto')
        .collection('areas')
        .deleteOne({_id: new ObjectId(id)});
    
    return result;
}

module.exports = { deleteUser, deleteArea };