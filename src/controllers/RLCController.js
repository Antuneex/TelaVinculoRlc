const RLCService = require('../services/RLCService');
const getData = require('../utils/getData');
const getPage = require('../utils/getPage');
const rlcService = new RLCService()

class RLCController {
	constructor() {}
    async execute(req, res) {
        try {
			//console.log(req.body);
			await rlcService.execute(req.body)			
			// await runProcDesvinculo(req.body)
            
			const data = await getData()
			res.send(getPage(data));
			// res.send(getPage(data) + '<script>alert("RLC Desvinculada com sucesso!")</script>');
            //res.send(data);

		} catch(err) {
			res.json({error: err})
		}
    }
}

module.exports = RLCController