const getData = require('../utils/getData')
const getPage = require('../utils/getPage')
const runProcVinculo = require('../utils/runProcDesvinculo')

class DesvinculaRLCController {
    async execute(req, res) {
        try {
			console.log(req.body);			
			// await runProcDesvinculo(req.body)
            
			const data = await getData()
            Console.log(data);
			// res.send(getPage(data) + '<script>alert("RLC Desvinculada com sucesso!")</script>');
            res.send(data);

		} catch(err) {
			res.json({error: err})
		}
    }
}

module.exports = VinculaRLCController