const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;
const getDataMethod = require('./getMethod');

async function updateUser(user, id) {
    let userById = await getDataMethod.getUser(id);
    if (!userById) {
        return null;
    }
    if (Object.keys(userById).length > 0) {
        const mongoClient = await connection.getConnection();
        const query = { _id: new ObjectId(id) };
        let key = Object.keys(user);
        let value = Object.values(user);
        let object = {};

        const newValues = { $set: {} };

        for (let j = 0; j < key.length; j++) {
            if (key[j] != '_id') {
                object[key[j]] = value[j];
            }
        }
        newValues.$set = object;
        if (Object.keys(object).length > 0) {
            const result = await mongoClient.db('ReservasPuesto')
                .collection('users')
                .updateOne(query, newValues);

            return result;
        } else {
            console.log('set esta totalmente vacio');
            return null;
        }


    } else {
        console.log('no existe el id enviado');
        return null;
    }
}

async function updateArea(area, id) {
    const e = await getDataMethod.getArea(id);
    console.log(e);
    console.log('EXISTE: ', Object.keys(e).length);
    if (Object.keys(e).length > 0) {
        const mongoClient = await connection.getConnection();
        const query = { _id: new ObjectId(area._id) };
        let key = Object.keys(area);
        let value = Object.values(area);
        let object = {};

        const newValues = { $set: {} };

        for (let j = 0; j < key.length; j++) {
            if (key[j] != '_id') {
                object[key[j]] = value[j];
            }
        }
        newValues.$set = object;

        if (Object.keys(object).length > 0) {
            const result = await mongoClient.db('ReservasPuesto')
                .collection('areas')
                .updateOne(query, newValues);

            return result;
        } else {
            console.log('set esta totalmente vacio');
            return null;
        }


    } else {
        console.log('no existe el id enviado');
        return null;
    }
}

module.exports = { updateUser, updateArea };
