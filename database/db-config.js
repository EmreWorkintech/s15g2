const knex = require('knex')

const configs = require('../knexfile.js')

const NODE_ENV = "development"
 
module.exports = knex(configs[NODE_ENV])
