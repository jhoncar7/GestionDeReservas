const express = require('express');
const router = express.Router();
const dataMetodoGet = require('../data/metodoGet');
const dataMetodoPut = require('../data/metodoPut');
const dataMetodoDelete = require('../data/MetodoDelete');
const dataMetodoPost = require('../data/metodoPost');

router.get('/api/v1/perfiles', async (req, res) => {
    const perfiles = await dataMetodoGet.getPerfiles();
    res.json(perfiles);
})

module.exports = router;