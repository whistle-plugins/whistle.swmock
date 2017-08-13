var express = require('express')
var app = express()

function initHttpServer (app, options) {
  app.use(function (req, res) {
    res.end(require('../exportRules')(req, res, options))
  })
}

module.exports = function (server, options) {
  server.on('request', app)
  initHttpServer(app, options)
}
