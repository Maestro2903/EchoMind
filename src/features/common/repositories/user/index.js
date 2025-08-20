const sqliteRepository = require('./sqlite.repository');
const firebaseRepository = require('./firebase.repository');

let authService = null;

function getAuthService() {
    if (!authService) {
        authService = require('../../services/authService');
    }
    return authService;
}

function getBaseRepository() {
    const service = getAuthService();
    if (!service) {
        throw new Error('AuthService could not be loaded for the user repository.');
    }
    const user = service.getCurrentUser();
    if (user && user.isLoggedIn) {
        return firebaseRepository;
    }
    return sqliteRepository;
}

const userRepositoryAdapter = {
    findOrCreate: (user) => {
        
        return getBaseRepository().findOrCreate(user);
    },
    
    getById: () => {
        const uid = getAuthService().getCurrentUserId();
        return getBaseRepository().getById(uid);
    },

    update: (updateData) => {
        const uid = getAuthService().getCurrentUserId();
        return getBaseRepository().update({ uid, ...updateData });
    },

    deleteById: () => {
        const uid = getAuthService().getCurrentUserId();
        return getBaseRepository().deleteById(uid);
    }
};

module.exports = {
    ...userRepositoryAdapter
}; 