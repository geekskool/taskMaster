let bcrypt = require('bcrypt')
function sanitize (form) {
  let keys = Object.keys(form)
  let val = keys.filter((k) => form[k] !== '')
  if (keys.length == val.length) { return true }
  return false
};

function authenticate (username, password) {
  if (username === 'alen' && password === 'thomas') { return true }
  return false
}

function displayError (errMsg, errData) {
  if (errData) { return {error_message: errMsg, data: errData} }
  return {error_message: errMsg}
}
function hashPassword (password) {
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(password, salt)
  return hash
}
function compareHash (password, hash) {
  return bcrypt.compareSync(password, hash) === true
}
const utilFuns = {
  sanitize: sanitize,
  authenticate: authenticate,
  displayError: displayError
}

module.exports = utilFuns
