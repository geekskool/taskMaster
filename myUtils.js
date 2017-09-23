function sanitize (form) {
  let keys = Object.keys(form);
  let val = keys.filter((k) => form[k] !== '' );
  if(keys.length == val.length)
    return true
  return false
};

function authenticate(username, password) {
  if(username === 'alen' && password === 'thomas')
    return true
  return false
}

const utilFuns = {
  sanitize: sanitize,
  authenticate: authenticate
}

module.exports = utilFuns;
