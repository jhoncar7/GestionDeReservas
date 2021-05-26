const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://reservas:reservas@gestionreservas.are8g.mongodb.net/ReservasPuesto?retryWrites=true&w=majority';

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

module.exports = { getConnection };