const { CreateAccount } = require('./register');
const { Login } = require('./login');

const Auth = {
    CreateAccount,
    Login,
}

module.exports = Auth;