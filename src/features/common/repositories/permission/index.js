const sqliteRepository = require('./sqlite.repository');

function getRepository() {
    return sqliteRepository;
}

module.exports = {
    markKeychainCompleted: (...args) => getRepository().markKeychainCompleted(...args),
    checkKeychainCompleted: (...args) => getRepository().checkKeychainCompleted(...args),
}; 