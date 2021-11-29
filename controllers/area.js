const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;

async function getDBConnection(){
    const mongoClient = await connection.getConnection();
    const DB = connection.getDBName();

    return mongoClient.db(DB).collection('areas');
}


async function getAreas() {
    const collection = await getDBConnection();
    const areas = collection.find().toArray();
    return areas;
}

async function getArea(id) {
    const collection = await getDBConnection();
    let area = undefined;
    try {
        area = collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.log('area not found');
    }
    return area;
}

async function deleteArea(id){
    const collection = await getDBConnection();
    const result = collection.deleteOne({_id: new ObjectId(id)});
    
    return result;
}

async function addArea(area) {
    area.name = area.name.toUpperCase()
    const collection = await getDBConnection();
    const result = collection.insertOne(area);
    return result;
}

async function updateArea(area, id) {

    const areaById = await getArea(id);

    if (!areaById) {
        return null;
    }
    if (Object.keys(areaById).length > 0) {
        const collection = await getDBConnection();
        const query = { _id: new ObjectId(id) };
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
            const result = collection.updateOne(query, newValues);

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

async function verifyArea(area){
    let areasList = await getAreas();
    let result = "";
    if(!areasList) return false;
    areasList.find(function(element) {
        if(element.name == area){
            result = element.name;
        } 
      });
      return result === "" ? false : true;
}

module.exports = {getAreas, getArea, deleteArea, addArea, updateArea, verifyArea}