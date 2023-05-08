const express = require('express')
const server = express()

server.use(express.json())

const TariflerRouter = require('./tarifler/router')
server.use('/tarifler', TariflerRouter)

module.exports = server
