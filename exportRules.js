const readFileSync = require('fs').readFileSync
let originalContent = readFileSync(__dirname + '/public/sw.js', 'utf8')
let registerContent = readFileSync(__dirname + '/public/sw-register.js', 'utf8')
function getRules(match = '') {
  return `
  try {
    match = decodeURIComponent('${match}')
    toolbox.options.cache.name = 'swmock';
    toolbox.options.networkTimeoutSeconds = 1;
    toolbox.options.successResponses = /^200$/;
    // toolbox.router.default = toolbox.networkFirst;
    toolbox.router.get(match, toolbox.networkFirst);
    toolbox.router.post(match, toolbox.networkFirst);
    toolbox.router.delete(match, toolbox.networkFirst);
    toolbox.router.put(match, toolbox.networkFirst);
  } catch (e) {}
  `
}

module.exports = function (req, res, options) {
  let content = ''
  if (req.headers['x-whistle-rule-value']) {
    content = originalContent + getRules(req.headers['x-whistle-rule-value'])
  }

  return JSON.stringify({
    rules: `${req.headers.host} html://public/register.html
    ${req.headers.host}/sw-register.js file://{sw-register}
    ${req.headers.host}/sw.js file://{sw-content}`,
    values: {
      'sw-content': content,
      'sw-register': registerContent
    }
  }, null, 4)
}
