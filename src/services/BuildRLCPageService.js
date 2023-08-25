const getData = require("../utils/getData")
const getPage = require("../utils/getPage")

class BuildRLCPageService {
    async execute() {
        try {
            const data = await getData()
            const page = getPage(data)
            return page
        } catch(err) {
            res.json({error: err})
        }
    }
}

module.exports = BuildRLCPageService