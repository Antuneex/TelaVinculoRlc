function filterRLCParams(obj, prefixo) {
  return Object.keys(obj).reduce((filtered, key) => {
    if (key.startsWith(prefixo)) {
      filtered[key] = obj[key];
    }
    return filtered;
  }, {});
}


module.exports = filterRLCParams