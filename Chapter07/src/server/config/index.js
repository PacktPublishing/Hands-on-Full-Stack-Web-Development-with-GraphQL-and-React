module.exports = {
  "development": {
    "username": "devuser",
    "password": "Test1234%",
    "database": "graphbook_dev",
    "host": "192.168.2.107",
    "dialect": "mysql",
    "operatorsAliases": false,
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  },
  "production": {
    "host": process.env.host,
    "username": process.env.username,
    "password": process.env.password,
    "database": process.env.database,
    "logging": false,
    "dialect": "mysql",
    "operatorsAliases": false,
    "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
    }
  }
}