const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });

let instance = null;

async function getConnection() {
    if (instance == null) {
        try {
            instance = await client.connect();
        } catch (error) {
            console.log(error);
        }
    }

    return instance;
};

function getDBName(){
    return 'ReservasPuesto';
}

module.exports = { getConnection, getDBName };