//importing knex so it knows it is talkign to database

const knex = require('knex');

const config = require('../knexfile.js');

module.exports = knex(config.development);