const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;

async function deleteUser(id){
    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db('ReservasPuesto')
        .collection('users')
        .deleteOne({_id: new ObjectId(id)});
    
    return result;
}

async function deleteArea(id){
    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db('ReservasPuesto')
        .collection('areas')
        .deleteOne({_id: new ObjectId(id)});
    
    return result;
}

module.exports = { deleteUser, deleteArea };