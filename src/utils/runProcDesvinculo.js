const sql = require("mssql");
const databaseConfig = require('../config/databaseConfigVariables')

module.exports = async function runProcDesvinculo(form) {
	try{
		const conn = await sql.connect(databaseConfig);
		await conn.query(`EXEC [dbo].[GKSSP_DesvincularNfRLC] '${form.nota}', '${form.cpf_cnpj}', ${form.empresa}, ${form.filial}, ${form.ano}, ${form.mes}, ${form.linha}, ${form.rlc}`);
		conn.close();
	} catch (err) {
		console.error(err);
	}
}