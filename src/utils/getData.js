const sql = require("mssql");
const databaseConfig = require('../config/databaseConfigVariables')

module.exports = async function getData() {
	try{
		const conn = await sql.connect(databaseConfig);
		const { recordset } = await conn.query('SELECT f.Cod_Fil, f.Nom_Fil, e.Cod_Emp, e.Nom_Emp FROM [dbo].[GKS_Empresas] e WITH(NOLOCK) INNER JOIN [dbo].[GKS_Filiais] f WITH(NOLOCK) ON f.Cod_Emp = e.Cod_Emp');
		console.log(recordset, 'RECORDSET AQUI!!');
		let empresa = '';
		const filial = {};
		for(const item of recordset) {
			const temp = `<option value="${item.Cod_Emp}">${item.Cod_Emp} - ${item.Nom_Emp}</option>`;
			if (!empresa.includes(temp)) {
				empresa += temp
			}

			if (!filial[item.Cod_Emp]) {
				filial[item.Cod_Emp] = '';
			}
			filial[item.Cod_Emp] += `<option value="${item.Cod_Fil}">${item.Cod_Fil} - ${item.Nom_Fil}</option>`;
		}

		conn.close();

		return {
			empresa,
			filial
		};
	} catch (err) {
		console.log(err);
	}
}
