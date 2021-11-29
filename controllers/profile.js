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

async function deleteProfile(id) {
    const collection = await getDBConnection();
    const result = await collection.deleteOne({ _id: id });
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


module.exports = { getProfiles, addProfile, getProfileByProfileId, deleteProfile, verifyProfile }