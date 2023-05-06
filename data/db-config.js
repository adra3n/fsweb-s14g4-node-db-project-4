const knex = require('knex')
const configFile = require('../knexfile')
const env = 'development'
module.exports = knex(configFile[env])
