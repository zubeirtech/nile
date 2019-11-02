require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.PG_LOCAL_USERNAME,
    "password": process.env.PG_LOCAL_PASSWORD,
    "database": process.env.PG_LOCAL_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false,
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  }
}