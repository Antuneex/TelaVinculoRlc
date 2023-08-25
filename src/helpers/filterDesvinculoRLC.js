function filterDesvinculoRLC(parameters) {
  return {
    nota: parameters.nota,
    cpf_cnpj: parameters.cpf_cnpj,
    DesvinculoRlc: parameters.DesvinculoRlc,
    Desvinculoempresa: parameters.Desvinculoempresa,
    DesvinculoFilial: parameters.DesvinculoFilial,
    DesvinculoMes: parameters.DesvinculoMes,
    DesvinculoAno: parameters.DesvinculoAno,
    DesvinculoLinha: parameters.DesvinculoLinha
  }
}

module.exports = filterDesvinculoRLC
