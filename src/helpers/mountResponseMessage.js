function mountResponseMessage(rlcObject) {
    const {rlc, DesvinculoRlc} = rlcObject

    if(rlc && !DesvinculoRlc) return 'RLC Vinculada com sucesso!'
    if(DesvinculoRlc && !rlc) return 'RLC Desvinculada com sucesso!'
    if(DesvinculoRlc && rlc) return 'RLC Vinculada e desvinculada com sucesso!'
}

module.exports = mountResponseMessage