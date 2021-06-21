const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;

async function getAreas() {
    const mongoClient = await connection.getConnection();
    const areas = await mongoClient.db('ReservasPuesto').collection('areas').find().toArray();
    return areas;
}

async function getArea(id) {
    const mongoClient = await connection.getConnection();
    let area = undefined;
    try {
        area = await mongoClient.db('ReservasPuesto').collection('areas').findOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.log('area not found');
    }
    return area;
}

async function deleteArea(id){
    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db('ReservasPuesto')
        .collection('areas')
        .deleteOne({_id: new ObjectId(id)});
    
    return result;
}

async function addArea(area) {
    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db('ReservasPuesto')
        .collection('areas')
        .insertOne(area);
    return result;
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

module.exports = {getAreas, getArea, deleteArea, addArea, updateArea}