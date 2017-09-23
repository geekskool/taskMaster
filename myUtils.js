function sanitize (form) {
  let keys = Object.keys(form);
  let val = keys.filter((k) => 
    form[k] !== '' 
  )
  console.log(val)
  console.log(keys)
  if(keys.length == val.length)
    return true
  return false
};

const utilFuns = {
  sanitize: sanitize
}

module.exports = utilFuns;
