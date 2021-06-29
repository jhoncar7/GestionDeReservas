const connection = require('./connection');

async function getProfiles() {
    const mongoClient = await connection.getConnection();
    const profiles = await mongoClient.db('ReservasPuesto').collection('perfiles').find().toArray();
    return profiles;
}

async function addProfile(obj) {
    obj.profile = obj.profile.toUpperCase();
    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db('ReservasPuesto').collection('perfiles').insertOne(obj);
    return result;
}

async function getProfileByProfileId(id) {
    const mongoClient = await connection.getConnection();
    const profile = await mongoClient.db('ReservasPuesto').collection('perfiles').findOne({ _id: id });
    return profile;
}

async function deleteProfile(id) {
    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db('ReservasPuesto').collection('perfiles').deleteOne({ _id: id });
    return result;
}

module.exports = { getProfiles, addProfile, getProfileByProfileId, deleteProfile }