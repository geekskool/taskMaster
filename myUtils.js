function sanitize (form) {
  console.log('---', form)
  for (i in Object.keys(form)) {
    if (form[i] == '')
      return false
  }
  return true
};

const utilFuns = {
  sanitize: sanitize
}

module.exports = utilFuns;
