const sql = require("mssql");
const databaseConfig = require('../config/databaseConfigVariables')

module.exports = async function runProcDesvinculo(form) {
	try{
		const conn = await sql.connect(databaseConfig);
		await conn.query(`EXEC [dbo].[GKSSP_DesvincularNfRLC] '${form.nota}', '${form.cpf_cnpj}', ${form.Desvinculoempresa}, ${form.DesvinculoFilial}, ${form.DesvinculoAno}, ${form.DesvinculoMes}, ${form.DesvinculoLinha}, ${form.DesvinculoRlc}`);
		conn.close();
	} catch (err) {
		console.error(err);
	}
}