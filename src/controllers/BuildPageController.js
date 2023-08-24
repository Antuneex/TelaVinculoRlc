const getData = require('../utils/getData')
const getPage = require('../utils/getPage')

class BuildPageController {
    async execute(_req, res) {
	    try {
            const data = await getData()
		    console.log(data);
            res.send(getPage(data));
        } catch (err) {
            res.json({error: err});
        }
    }
}

module.exports = BuildPageController