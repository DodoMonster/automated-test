module.exports = {
  development: {
    "dialect": 'mysql',
    "database": 'automatic_test',
    "username": 'root',
    "password": 'root',
    "host": '127.0.0.1',
    "port": 3306,
    "option": {
      "dialect": "mysql",
      "define": {
        "timestamps": false,
        "freezeTableName": true
      }
    }
  },
  production: {
    "dialect": 'mysql',
    "database": 'automatic_test',
    "username": 'root',
    "password": 'root',
    "host": '127.0.0.1',
    "port": 3306,
    "option": {
      "dialect": "mysql",
      "define": {
        "timestamps": false,
        "freezeTableName": true
      }
    }
  },
  test: {
    "dialect": 'mysql',
    "database": 'automatic_test',
    "username": 'root',
    "password": 'root',
    "host": '127.0.0.1',
    "port": 3306,
    "option": {
      "dialect": "mysql",
      "define": {
        "timestamps": false,
        "freezeTableName": true
      }
    }
  }
}