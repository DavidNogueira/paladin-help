const knex = require("knex");
const configuration = require("../../knexfile");

connection = knex(configuration.development);

module.exports=connection;
