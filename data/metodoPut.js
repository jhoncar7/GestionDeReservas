const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;
const dataMetodoGet = require('../data/metodoGet');

async function updateUser(user, id) {
    const existe = await dataMetodoGet.getUser(id);
    console.log('EXISTE: ', Object.keys(existe).length);
    if (Object.keys(existe).length > 0) {
        const clientmongo = await connection.getConnection();
        const query = { _id: new ObjectId(user._id) };
        let clave = Object.keys(user);
        let valor = Object.values(user);
        let objeto = {};
        
        const newValues = { $set: {} };

        for (let j = 0; j < clave.length; j++) {
            if (clave[j] != '_id') {
                objeto[clave[j]] = valor[j];
            }
        }
        newValues.$set = objeto;

        if (Object.keys(objeto).length > 0) {
            const result = await clientmongo.db('ReservasPuesto')
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

async function updateArea(area,id) {
    const e = await dataMetodoGet.getArea(id);
    console.log(e);
    console.log('EXISTE: ', Object.keys(e).length);
    if (Object.keys(e).length > 0) {
        const clientmongo = await connection.getConnection();
        const query = { _id: new ObjectId(area._id) };
        let clave = Object.keys(area);
        let valor = Object.values(area);
        let objeto = {};
        
        const newValues = { $set: {} };

        for (let j = 0; j < clave.length; j++) {
            if (clave[j] != '_id') {
                objeto[clave[j]] = valor[j];
            }
        }
        newValues.$set = objeto;

        if (Object.keys(objeto).length > 0) {
            const result = await clientmongo.db('ReservasPuesto')
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
