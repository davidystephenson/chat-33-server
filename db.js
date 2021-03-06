const Sequelize = require('sequelize')

const databaseUrl = 'postgres://postgres:password@localhost:5432/postgres'

const db = new Sequelize(databaseUrl)

db
  .sync({ force: false })
  .then(() => {
    console.log('DB connect')
  })

module.exports = db
