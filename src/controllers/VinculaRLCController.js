const getData = require('../utils/getData')
const getPage = require('../utils/getPage')
const runProcVinculo = require('../utils/runProcVinculo')

class VinculaRLCController {
    async execute(req, res) {
        try {
			console.log(req.body);

			// await runProcVinculo(req.body)
			const data = await getData()
			// res.send(getPage(data) + '<script>alert("RLC vinculada com sucesso!")</script>');
			//res.send(data);

		} catch(err) {
			res.json({error: err})
		}
    }
}

module.exports = VinculaRLCController