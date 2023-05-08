const express = require('express')
const server = express()

server.use(express.json())

const TariflerRouter = require('./tarifler/router')
server.use('/api/tarifler', TariflerRouter)

module.exports = server
