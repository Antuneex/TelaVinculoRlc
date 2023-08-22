const dotenv = require('dotenv')

dotenv.config()

module.exports = databaseConfig = {
	user: process.env.DATABASE_USER_HML,
	password: process.env.DATABASE_PASS_HML,
	server: process.env.DATABASE_SERVER_HML, 
	database: process.env.DATABASE_HML 
};