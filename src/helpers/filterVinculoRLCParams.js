function filterVinculoRLCParams(obj) {
    const keys = Object.keys(obj);
    const vinculoParams = {};
  
    for (const key of keys) {
      if (!key.startsWith('Desvinculo')) {
        vinculoParams[key] = obj[key];
      }
    }

    return vinculoParams;
}

module.exports = filterVinculoRLCParams