var initRulesServer = require('./lib/rules-server')

module.exports.rulesServer = function (server, options) {
  initRulesServer(server, options)
}
