const BuildRLCPageService = require('../services/BuildRLCPageService')

const buildRLCPageService = new BuildRLCPageService()

class BuildRLCPageController {
    async execute(_req, res) {
	    try {
            const page = await buildRLCPageService.execute()
            res.send(page);
        } catch (err) {
            res.json({error: err});
        }
    }
}

module.exports = BuildRLCPageController