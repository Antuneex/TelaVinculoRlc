const sql = require("mssql");
const express = require('express');
const fs = require("fs");

const css = fs.readFileSync("./page.css");

const app = express();
app.use(express.urlencoded());

const config = {
	user: 'homolog',
	password: 'Homo1452@',
	server: '10.30.26.4', 
	database: 'GrupoKasilHomolog' 
};

async function getData() {
	try{
		const conn = await sql.connect(config);
		const { recordset } = await conn.query('SELECT f.Cod_Fil, f.Nom_Fil, e.Cod_Emp, e.Nom_Emp FROM [dbo].[GKS_Empresas] e WITH(NOLOCK) INNER JOIN [dbo].[GKS_Filiais] f WITH(NOLOCK) ON f.Cod_Emp = e.Cod_Emp');

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

async function runProcVinculo(form) {
	try{
		const conn = await sql.connect(config);
		await conn.query(`EXEC [dbo].[GKSSP_VinculaNfRLC] '${form.nota}', '${form.cpf_cnpj}', ${form.empresa}, ${form.filial}, ${form.ano}, ${form.mes}, ${form.linha}, ${form.rlc}`);
		conn.close();
	} catch (err) {
		console.error(err);
	}
}

async function runProcDesvinculo(form) {
	try{
		const conn = await sql.connect(config);
		await conn.query(`EXEC [dbo].[GKSSP_DesvincularNfRLC] '${form.nota}', '${form.cpf_cnpj}', ${form.empresa}, ${form.filial}, ${form.ano}, ${form.mes}, ${form.linha}, ${form.rlc}`);
		conn.close();
	} catch (err) {
		console.error(err);
	}
}

function getPage(data) {
	return `
		<!DOCTYPE html>
	
		<html lang="pt-BR"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
			<title>SCK - Vincula RLC</title>
			<style>${css}</style>
		</head>
		<body>
	
		<div style="max-width: 1280px; margin: 0 auto;">
        <form method="POST" class="ui-card" action="http://localhost:5516/vincula-rlc" style="margin: 16px;">
		<div class="ui-card-title">Vinculo / Desvinculo RLC</div>
			<div class="ui-card" style="margin: 16px; margin: 16px; margin-top: 40px;">
            <div class="ui-card-content">
                <div class="ui-input-container">
                    <div class="ui-input-wrap">
                        <input type="text" class="ui-control required" id="nota" name="nota" data-type="number" required="">
                        <label for="nota">Nota Fiscal</label>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="ui-input-container">
                    <div class="ui-input-wrap">
                        <input type="text" class="ui-control required" id="cpf_cnpj" name="cpf_cnpj" data-type="number" required="">
                        <label for="cpf_cnpj">CPF/CNPJ</label>
                        <div class="line"></div>
                    </div>
                </div>
            </div>
			</div>
			<div class="ui-card select-like" id="vinculo" style="display: none; margin: 16px; margin-top: 60px;">
				<div class="ui-card-title" onclick="toggleExpand()">Vincular</div>
			</div>
			<div class="ui-card-content expandable" style="display: none; margin: 16px;">
				<div class="ui-flex-container break-on-s600">
					<div class="ui-input-container" style="max-width: 100%;"><div class="ui-input-wrap">
						<input type="text" class="ui-control required" id="rlc" name="rlc" data-type="number" required="">
						<label for="rlc">Nº RLC</label>
					<div class="line"></div></div></div>
				</div>
				<div class="ui-input-container"><div class="ui-input-wrap">
					<select class="ui-control required ui-dirty" id="empresa" name="empresa" onchange="changeOptions(false)" required=""><option value="15">15 - MOMENTUM EMPREENDIMENTOS IMOBILIARIOS LTDA.</option><option value="16">16 - SLIM</option><option value="13">13 - PRAIA VERDE EMP. E PART. LTDA.</option><option value="17">17 - PERSPECTIVA EMP. E PARTIC. LTDA</option><option value="18">18 - SERRAMBI INVESTIMENTOS IMOBILIARIOS LTDA</option><option value="19">19 - URBANIZADORA MONTREAL LTDA</option><option value="28">28 - MODO CRÉDITO E COBRANÇA LTDA</option><option value="30">30 - KASIL PARTICIPACOES LTDA.</option><option value="36">36 - BIG LAKE CO.</option><option value="37">37 - KANAZAWA CO.</option><option value="40">40 - RVM EMPREENDIMENTOS IMOBILIÁRIOS LTDA.</option><option value="50">50 - EVEREST EMPREENDS.IMOBS.LTDA.</option><option value="60">60 - BTP PARTICIPAÇÕES LTDA</option><option value="70">70 - M5 EMPREENDIMENTOS IMOBILIARIOS LTDA</option><option value="90">90 - INSTITUTO RUBENS MENEGHETTI</option><option value="91">91 - POSTO SANTA BARBARA</option><option value="95">95 - PICK MONEY CIA SECURI DE CRÉDITOS FINANCEIROS</option><option value="96">96 - MMH HOLDING S.A.</option></select>
					<label for="empresa">Empresa</label>
				<div class="line"></div></div></div>
				<div class="ui-input-container"><div class="ui-input-wrap">
					<select class="ui-control required ui-dirty" id="filial" name="filial" required=""><option value="1">1 - MATRIZ</option><option value="2">2 - FILIAL PARANAPANEMA</option><option value="4">4 - NINHO VERDE I ECO RESIDENCE</option><option value="5">5 - TERRAS DE STA. CRISTINA III</option><option value="6">6 - TERRAS DE STA. CRISTINA V</option><option value="7">7 - SANTA BARBARA RESORT RESIDENCE</option><option value="8">8 - RIVIERA DE SANTA CRISTINA XIII - SETOR IATE</option><option value="9">9 - TERRAS DE STA. CRISTINA IV</option><option value="10">10 - RIVIERA DE SANTA CRISTINA XIII - SETOR MARINAS</option><option value="11">11 - RIVIERA DE SANTA CRISTINA II</option><option value="12">12 - TERRAS DE STA. CRISTINA I</option><option value="14">14 - NINHO VERDE II ECO RESIDENCE</option></select>
					<label for="filial">Filial</label>
				<div class="line"></div></div></div>
				<div class="ui-flex-container break-on-s600">
					<div class="ui-input-container" style="max-width: 65%;"><div class="ui-input-wrap">
						<select class="ui-control required" id="mes" name="mes" required="">
								<option value="1">
									Janeiro
								</option>
								<option value="2">
									Fevereiro
								</option>
								<option value="3">
									Março
								</option>
								<option value="4">
									Abril
								</option>
								<option value="5">
									Maio
								</option>
								<option value="6">
									Junho
								</option>
								<option value="7">
									Julho
								</option>
								<option value="8">
									Agosto
								</option>
								<option value="9">
									Setembro
								</option>
								<option value="10">
									Outubro
								</option>
								<option value="11">
									Novembro
								</option>
								<option value="12">
									Dezembro
								</option>
						</select>
						<label for="mes">Mês</label>
					<div class="line"></div></div></div>
					<div class="ui-input-container" style="max-width: 35%; margin-left: 0; padding-left: 16px;"><div class="ui-input-wrap">
						<input type="text" class="ui-control required" id="ano" name="ano" data-type="number" maxlength="4" minlength="4" value="2023" required="">
						<label for="ano">Ano</label>
					<div class="line"></div></div></div>
				</div>
				<div class="ui-flex-container break-on-s600">
					<div class="ui-input-container" style="max-width: 100%;"><div class="ui-input-wrap">
						<select class="ui-control required" id="linha" name="linha" required="">
								<option value="1">
									1
								</option>
								<option value="2">
									2
								</option>
								<option value="3">
									3
								</option>
						</select>
						<label for="linha">Nº Linha</label>
					<div class="line"></div></div></div>
				</div>
			</div>

			<div class="ui-card select-like" id="desvinculo" style="display: none; margin: 16px; margin-top: 60px;">
				<div class="ui-card-title" onclick="desvinculoExpand()">Desvincular</div>
			</div>
			<div class="ui-card-content desvinculo-expand" style="display: none; margin: 16px;">
				<div class="ui-flex-container break-on-s600">
					<div class="ui-input-container" style="max-width: 100%;"><div class="ui-input-wrap">
						<input type="text" class="ui-control required" id="DesvinculoRlc" name="DesvinculoRlc" data-type="number" required="">
						<label for="DesvinculoRlc">Nº RLC</label>
					<div class="line"></div></div></div>
				</div>
				<div class="ui-input-container"><div class="ui-input-wrap">
					<select class="ui-control required ui-dirty" id="Desvinculoempresa" name="Desvinculoempresa" onchange="changeOptions(false)" required=""><option value="15">15 - MOMENTUM EMPREENDIMENTOS IMOBILIARIOS LTDA.</option><option value="16">16 - SLIM</option><option value="13">13 - PRAIA VERDE EMP. E PART. LTDA.</option><option value="17">17 - PERSPECTIVA EMP. E PARTIC. LTDA</option><option value="18">18 - SERRAMBI INVESTIMENTOS IMOBILIARIOS LTDA</option><option value="19">19 - URBANIZADORA MONTREAL LTDA</option><option value="28">28 - MODO CRÉDITO E COBRANÇA LTDA</option><option value="30">30 - KASIL PARTICIPACOES LTDA.</option><option value="36">36 - BIG LAKE CO.</option><option value="37">37 - KANAZAWA CO.</option><option value="40">40 - RVM EMPREENDIMENTOS IMOBILIÁRIOS LTDA.</option><option value="50">50 - EVEREST EMPREENDS.IMOBS.LTDA.</option><option value="60">60 - BTP PARTICIPAÇÕES LTDA</option><option value="70">70 - M5 EMPREENDIMENTOS IMOBILIARIOS LTDA</option><option value="90">90 - INSTITUTO RUBENS MENEGHETTI</option><option value="91">91 - POSTO SANTA BARBARA</option><option value="95">95 - PICK MONEY CIA SECURI DE CRÉDITOS FINANCEIROS</option><option value="96">96 - MMH HOLDING S.A.</option></select>
					<label for="Desvinculoempresa">Desvinculoempresa</label>
				<div class="line"></div></div></div>
				<div class="ui-input-container"><div class="ui-input-wrap">
					<select class="ui-control required ui-dirty" id="DesvinculoFilial" name="DesvinculoFilial" required=""><option value="1">1 - MATRIZ</option><option value="2">2 - FILIAL PARANAPANEMA</option><option value="4">4 - NINHO VERDE I ECO RESIDENCE</option><option value="5">5 - TERRAS DE STA. CRISTINA III</option><option value="6">6 - TERRAS DE STA. CRISTINA V</option><option value="7">7 - SANTA BARBARA RESORT RESIDENCE</option><option value="8">8 - RIVIERA DE SANTA CRISTINA XIII - SETOR IATE</option><option value="9">9 - TERRAS DE STA. CRISTINA IV</option><option value="10">10 - RIVIERA DE SANTA CRISTINA XIII - SETOR MARINAS</option><option value="11">11 - RIVIERA DE SANTA CRISTINA II</option><option value="12">12 - TERRAS DE STA. CRISTINA I</option><option value="14">14 - NINHO VERDE II ECO RESIDENCE</option></select>
					<label for="DesvinculoFilial">Filial</label>
				<div class="line"></div></div></div>
				<div class="ui-flex-container break-on-s600">
					<div class="ui-input-container" style="max-width: 65%;"><div class="ui-input-wrap">
						<select class="ui-control required" id="DesvinculoMes" name="DesvinculoMes" required="">
								<option value="1">
									Janeiro
								</option>
								<option value="2">
									Fevereiro
								</option>
								<option value="3">
									Março
								</option>
								<option value="4">
									Abril
								</option>
								<option value="5">
									Maio
								</option>
								<option value="6">
									Junho
								</option>
								<option value="7">
									Julho
								</option>
								<option value="8">
									Agosto
								</option>
								<option value="9">
									Setembro
								</option>
								<option value="10">
									Outubro
								</option>
								<option value="11">
									Novembro
								</option>
								<option value="12">
									Dezembro
								</option>
						</select>
						<label for="DesvinculoMes">Mês</label>
					<div class="line"></div></div></div>
					<div class="ui-input-container" style="max-width: 35%; margin-left: 0; padding-left: 16px;"><div class="ui-input-wrap">
						<input type="text" class="ui-control required" id="DesvinculoAno" name="DesvinculoAno" data-type="number" maxlength="4" minlength="4" value="2023" required="">
						<label for="DesvinculoAno">Ano</label>
					<div class="line"></div></div></div>
				</div>
				<div class="ui-flex-container break-on-s600">
					<div class="ui-input-container" style="max-width: 100%;"><div class="ui-input-wrap">
						<select class="ui-control required" id="DesvinculoLinha" name="DesvinculoLinha" required="">
								<option value="1">
									1
								</option>
								<option value="2">
									2
								</option>
								<option value="3">
									3
								</option>
						</select>
						<label for="DesvinculoLinha">Nº Linha</label>
					<div class="line"></div></div></div>
				</div>
			</div>

            <div class="ui-button-container cover" id="divButtonsConsultaRlc">
                <button type="reset" class="ui-button" onclick="resetForm()">Limpar</button>
                <button type="submit" class="ui-button primary raised">Confirmar</button>
            </div>
        </form>
    </div>
		</body></html>

		<script>
		function resetForm() {
            document.getElementById("nota").value = "";
            document.getElementById("cpf_cnpj").value = "";
            hideRestOfForm();
        }

        function showRestOfForm() {
            const notaValue = document.getElementById("nota").value;
            const cpfCnpjValue = document.getElementById("cpf_cnpj").value;
            const vinculo = document.getElementById("vinculo");
			const desvinculo = document.getElementById("desvinculo");

            if (notaValue !== "" && cpfCnpjValue !== "") {
                vinculo.style.display = "block";
				desvinculo.style.display = "block";
				NOVODESvinculo.style.display="block";
            }
        }
		
		function toggleExpand() {
            const expandableContent = document.querySelector(".expandable");
            const vinculoCard = document.getElementById("vinculo");
            const expandedClass = "expanded";

            if (expandableContent.style.display === "block") {
                expandableContent.style.display = "none";
                vinculoCard.classList.remove(expandedClass);
            } else {
                expandableContent.style.display = "block";
                vinculoCard.classList.add(expandedClass);
            }
        }
		
		function desvinculoExpand() {
            const expandableContent = document.querySelector(".desvinculo-expand");
            const desvinculoCard = document.getElementById("desvinculo");
            const expandedClass = "expanded";

            if (expandableContent.style.display === "block") {
                expandableContent.style.display = "none";
                desvinculoCard.classList.remove(expandedClass);
            } else {
                expandableContent.style.display = "block";
                desvinculoCard.classList.add(expandedClass);
            }
        }

        function hideRestOfForm() {
            document.getElementById("vinculo").style.display = "none";
			document.getElementById("desvinculo").style.display = "none";
        }
		hideRestOfForm();

        document.getElementById("nota").addEventListener("input", showRestOfForm);
        document.getElementById("cpf_cnpj").addEventListener("input", showRestOfForm);
			const options = ${JSON.stringify(data.filial)}
			let temp = ""

			function changeOptions(reset) {
				const empresa = document.getElementById("empresa");
				const filial = document.getElementById("filial");
				const cod = empresa.value;

				if(!temp) {
					temp = options[cod];
				}

				if(reset) {
					filial.innerHTML = temp;
				}
				else {
					filial.innerHTML = options[cod];
				}
			}
			changeOptions(false);
		</script>
	`
}

app.get('/vincula-rlc', (_req, res) => {
	getData().then((data) => {
		res.send(getPage(data));
	});
});

app.post('/vincula-rlc', (req, res) => {
	console.log(req.body);
	getData().then((data) => {
		res.send(getPage(data));
	});

	// runProcVinculo(req.body).then(() => getData().then((data) => {
	// 	res.send(getPage(data) + '<script>alert("RLC vinculada com sucesso!")</script>');
	// }));
});

app.listen(5516);
