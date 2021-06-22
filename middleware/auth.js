const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        //const token = req.header('Token');
        const token = req.header('Authorization').replace('Bearer ', '');
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        res.status(401).send({error: error.message})
    }
}

module.exports = auth;