function filterVinculoRLC(parameters) {
    return {
      nota: parameters.nota,
      cpf_cnpj: parameters.cpf_cnpj,
      rlc: parameters.rlc,
      empresa: parameters.empresa,
      filial: parameters.filial,
      mes: parameters.mes,
      ano: parameters.ano,
      linha: parameters.linha
    }
}

module.exports = filterVinculoRLC