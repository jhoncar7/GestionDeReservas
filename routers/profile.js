const express = require('express');
const router = express.Router();
const profile = require('../data/profile');

router.get('/api/v1/profiles', async (req, res) => {
    const profiles = await profile.getProfiles();
    res.json(profiles);
})

module.exports = router;