require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.PG_LOCAL_USERNAME,
    "password": process.env.PG_LOCAL_PASSWORD,
    "database": process.env.PG_LOCAL_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres",
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": true
    },
    "use_env_variable": process.env.DB_URI
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": true
    },
    "use_env_variable": process.env.DB_URI
  }
}
