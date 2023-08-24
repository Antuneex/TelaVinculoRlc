const getData = require('../utils/getData')
const getPage = require('../utils/getPage')
const runProcVinculo = require('../utils/runProcDesvinculo')

class DesvinculaRLCController {
    async execute(req, res) {
        try {
			console.log(req.body);			
	    	const data = await getData()
			res.send(getPage(data));

			//await runProcVinculo(req.body)
			//const data = await getData()
			//res.send(getPage(data) + '<script>alert("RLC vinculada com sucesso!")</script>');
		} catch(err) {
			res.json({error: err})
		}
    }
}

module.exports = DesvinculaRLCController