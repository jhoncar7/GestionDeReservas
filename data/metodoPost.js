const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;

async function addArea(area){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('ReservasPuesto')
        .collection('areas')
        .insertOne(area);
    return result;
}

module.exports = { addArea };