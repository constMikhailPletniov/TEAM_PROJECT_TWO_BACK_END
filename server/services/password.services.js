const bcrypt = require('bcrypt');
const { CONFIG } = require('../configurations');

const hash = (password) => bcrypt.hash(password, CONFIG.SALT);

const compare = async (password, hashPassword) => {
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch (err) {
        console.error('compare: ', err);
        return false;
    }
};

module.exports = {
    hash,
    compare
}
