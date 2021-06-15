const express = require('express');
const router = express.Router();
const getDataMethod = require('../data/getMethod');

router.get('/api/v1/profiles', async (req, res) => {
    const profiles = await getDataMethod.getProfiles();
    res.json(profiles);
})

module.exports = router;