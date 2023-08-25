const filterVinculoRLC = require('../helpers/filterVinculoRLC')
const filterDesvinculoRLC = require('../helpers/filterDesvinculoRLC')
const mountResponseMessage = require('../helpers/mountResponseMessage')

const runProcVinculo = require('../utils/runProcVinculo')
const runProcDesvinculo = require('../utils/runProcDesvinculo')
const getData = require('../utils/getData')

class RLCService {
    async execute(rlcObject) {
        try {
            const {rlc, DesvinculoRlc} = rlcObject

            if(rlc) {
                const vinculoRLC = filterVinculoRLC(rlcObject)
                console.log(vinculoRLC, 'VINCULA!!!')
                //await runProcVinculo(vinculoRLC)
            }

            if(DesvinculoRlc) {
                const desvinculoRLC = filterDesvinculoRLC(rlcObject)
                console.log(desvinculoRLC, 'DESVINCULA!!!')
                //await runProcDesvinculo(desvinculoRLC)
            }
            
            const data = await getData()
            const responseMessage = mountResponseMessage(rlcObject)

            return {data, responseMessage}
		} catch(err) {
			res.json({error: err})
		}
    }
}

module.exports = RLCService