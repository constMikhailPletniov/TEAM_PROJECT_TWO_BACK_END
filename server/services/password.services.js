const bcrypt = require('bcrypt');
const {CONFIG} = require('../configurations');

const hash = (password) => bcrypt.hash(password, CONFIG.SALT);

const compare = async (password, hashPassword) => {
    try {
        const isMatched = await bcrypt.compare(password, hashPassword);
        if (!isMatched) {
            return {error: 'Invalid data'}
        }
return isMatched;
    } catch (err) {
        console.error('compare: ', err);
    }
};

module.exports = {
    hash,
    compare
}