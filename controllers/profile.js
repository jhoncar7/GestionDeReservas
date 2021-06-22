const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;

async function getProfiles() {
    const mongoClient = await connection.getConnection();
    const profiles = await mongoClient.db('ReservasPuesto').collection('perfiles').find().toArray();
    return profiles;
}

module.exports = {getProfiles}