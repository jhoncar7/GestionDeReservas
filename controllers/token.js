const jwt = require('jsonwebtoken');

async function generateJWT(user) {
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = { generateJWT };