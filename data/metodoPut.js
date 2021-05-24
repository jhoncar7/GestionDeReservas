const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;
const dataMetodoGet = require('../data/metodoGet');

async function updateUser(user) {
    const clientmongo = await connection.getConnection();
    const query = { _id: new ObjectId(user._id) };
    const newvalues = {
        $set: {
            email: user.email,
            perfil: user.perfil,
            area: user.area
        }
    };
    const result = await clientmongo.db('ReservasPuesto')
        .collection('users')
        .updateOne(query, newvalues);
        
    return result;
}

module.exports = { updateUser };