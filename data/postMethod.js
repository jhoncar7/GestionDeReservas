const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');

async function addUser(user){
    const mongoClient = await connection.getConnection();
    user.password = bcrypt.hashSync(user.password, 8);
    const result = await mongoClient.db('ReservasPuesto')
        .collection('users')
        .insertOne(user);
    return result;
}

async function addArea(area){
    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db('ReservasPuesto')
        .collection('areas')
        .insertOne(area);
    return result;
}

module.exports = { addUser,addArea };