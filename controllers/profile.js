const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;

async function getDBConnection(){
    const mongoClient = await connection.getConnection();
    const DB = connection.getDBName();

    return mongoClient.db(DB).collection('perfiles');
}

async function getProfiles() {
    const collection = await getDBConnection();
    const profiles = collection.find().toArray();
    return profiles;
}

async function addProfile(obj) {
    obj.profile = obj.profile.toUpperCase();
    const collection = await getDBConnection();
    const result = collection.insertOne(obj);
    return result;
}

async function getProfileByProfileId(id) {
    const collection = await getDBConnection();
    const profile = collection.findOne({ _id: new ObjectId(id) });
    return profile;
}

async function updateProfile(profile, id) {

    const profileById = await getProfileByProfileId(id);

    if (!profileById) {
        return null;
    }
    if (Object.keys(profileById).length > 0) {
        const collection = await getDBConnection();
        const query = { _id: new ObjectId(id) };
        let key = Object.keys(profile);
        let value = Object.values(profile);
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

async function deleteProfile(id) {
    const collection = await getDBConnection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
}

async function verifyProfile(profile){
    let profileList = await getProfiles();
    let result = "";
    profileList.find(function(element) {
        if(element.profile === profile){
            result = element.profile;
        }
    });
  return result == "" ? false : true;
}


module.exports = { getProfiles, addProfile, getProfileByProfileId, deleteProfile, verifyProfile, updateProfile }