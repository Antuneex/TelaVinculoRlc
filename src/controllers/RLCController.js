const RLCService = require('../services/RLCService');
const getData = require('../utils/getData');
const getPage = require('../utils/getPage');
const rlcService = new RLCService()

class RLCController {
	constructor() {}
    async execute(req, res) {
        try {
			const {responseMessage, data} = await rlcService.execute(req.body)			
			res.send(getPage(data) + `<script>alert('${responseMessage}')</script>`);
		} catch(err) {
			res.json({error: err})
		}
    }
}

module.exports = RLCController