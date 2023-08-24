const filterRLCParams = require('../helpers/filterRLCParams')
const filterVinculoRLCParams = require('../helpers/filterVinculoRLCParams')
const runProcVinculo = require('../utils/runProcVinculo')

class RLCService {
    async execute(rlcParameters) {
        try {
            const vinculaRLCParams = filterRLCParams(rlcParameters, '')
            let desvinculaRLCParams = filterRLCParams(rlcParameters, 'Desvinculo')

            if(Object.keys(vinculaRLCParams).length > 0) {
                console.log('VINCULA!!!', vinculaRLCParams)
            }

            if(Object.keys(desvinculaRLCParams).length > 0) {
                desvinculaRLCParams = {
                    nota: rlcParameters.nota, 
                    cpf_cnpj: rlcParameters.cpf_cnpj, 
                    ...desvinculaRLCParams
                }
                console.log('DESVINCULA!!!', desvinculaRLCParams)
            }

		} catch(err) {
			res.json({error: err})
		}
    }
}

module.exports = RLCService