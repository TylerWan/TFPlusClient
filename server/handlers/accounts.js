let accountsModule = {};

let me = require('discord.js')

let _accounts = new Object({});

accountsModule.getAccounts = function() {
    return _accounts;
}

accountsModule.setAccounts = function(accounts) {
    return _accounts = accounts;
}


module.exports = accountsModule;
