function pickOne(atributo)  {
	return atributo[parseInt(Math.random() * atributo.length)];
}

function telaEdicao() {
	let htminput = "<input id=nome value=\"" + localStorage.getItem("logo-nome") + "\">";
	let htmbotao = "<a onclick='geraStilo(false, false, false, false);'>stylize</a>";
	document.body.innerHTML = "<div id=edicao>" + htminput + "<br>" + htmbotao + "</div>";
}

function geraStilo(cor, fonte, quadro, icone) {
	if(document.getElementById('nome')) {
		localStorage.setItem("logo-nome", document.getElementById('nome').value);
	}

	if(cor) {
		localStorage.setItem("logo-bgcolor", pickOne(cores));

		let valorR = parseInt(localStorage.getItem("logo-bgcolor")[0], 16);
		let valorG = parseInt(localStorage.getItem("logo-bgcolor")[2], 16);
		let valorB = parseInt(localStorage.getItem("logo-bgcolor")[4], 16);

		if(valorR + valorG + valorB > 24)
			localStorage.setItem("logo-fontcolor", true);
		else
			localStorage.setItem("logo-fontcolor", false);
	}

	if(fonte) {
		localStorage.setItem("logo-font-family", pickOne(["Architects Daughter", "Montserrat", "Poppins", "Roboto Mono", "Rubik", "Secular One"]));
		localStorage.setItem("logo-font-size", pickOne([15, 18, 21, 24, 27, 30, 33]));
		localStorage.setItem("logo-text-transform", pickOne(["lowercase", "uppercase", "capitalize", "none"]));
	}

	if(quadro) {
		localStorage.setItem("logo-border-radius", pickOne([3, 6, 9, 12, 15, 18]));
		localStorage.setItem("logo-padding", pickOne([14, 18, 22, 26, 30, 34, 38]));
		localStorage.setItem("logo-frame-preenchido", Math.random() < .7);
		localStorage.setItem("logo-tracado-borda", Math.random() < .5);
		localStorage.setItem("logo-estilo-borda", pickOne(["solid", "dashed"]));
		localStorage.setItem("logo-inclinacao", Math.random() > .8);
		localStorage.setItem("logo-angulo", pickOne(["346", "353", "7", "14"]));
		localStorage.setItem("logo-sombra", Math.random() > .8);
	}

	if(icone) {
		localStorage.setItem("logo-logo", parseInt(Math.random() * 38));
		localStorage.setItem("logo-logopos", parseInt(Math.random() * 2));
	}

	let bgcolor = localStorage.getItem("logo-bgcolor");
	let fontcolor = localStorage.getItem("logo-fontcolor");

	let moldura = "\n<div style='";
	moldura += "border-radius:" + localStorage.getItem("logo-border-radius") + "px;";
	moldura += " padding:" + localStorage.getItem("logo-padding") + "px;";

	if(localStorage.getItem("logo-frame-preenchido") == "true") {
		moldura += " background-color:#" + ototom(bgcolor[0]) + bgcolor[1] + ototom(bgcolor[2]) + bgcolor[3] + ototom(bgcolor[4]) + bgcolor[5] + ";";

		if(fontcolor == "true" && localStorage.getItem("logo-sombra") == "true") {
			moldura += " box-shadow: 8px 8px 0px 0px  #" + (fontcolor == "true" ? "222222" : "dddddd") + ";";
		}
	}
	else {
		if(localStorage.getItem("logo-tracado-borda") == "true") {
			moldura += " border:2px " + localStorage.getItem("logo-estilo-borda") + " #" + (fontcolor == "true" ? "222222" : "dddddd") + ";";
		}
	}

	if(localStorage.getItem("logo-inclinacao") == "true") {
		moldura += " transform:rotate(" + localStorage.getItem("logo-angulo") + "deg);";
	}

	let nome = "\n\t<span style=\"";
	nome += "color:#" + (fontcolor == "true" ? "222222" : "dddddd") + ";";
	nome += " font-family:'" + localStorage.getItem("logo-font-family") + "';";
	nome += " font-size:" + localStorage.getItem("logo-font-size") + "px;";
	nome += " text-transform:" + localStorage.getItem("logo-text-transform") + ";";
	nome += "\">" + localStorage.getItem("logo-nome").replace(/\</g, '&lt;').replace(/\n/g, '<br>').replace(/  /g, ' &nbsp;') + "</span>";

	let logo = "\n\t<img src='https://stylish-gen.web.app/" + (fontcolor == "true" ? "iconesescuros" : "iconesclaros") + "/" + localStorage.getItem("logo-logo") + ".svg'>";

	let attrContainer = "padding:0px 34px; width:100%; height:100%; background-color:#" + bgcolor + "; display:flex; align-items:center; justify-content:center;";
	importFont = "<style>@import url('https://fonts.googleapis.com/css2?family=" + localStorage.getItem("logo-font-family") + "&display=swap');</style>\n";
	container = "<div style='" + attrContainer + "'>" + moldura + "'>";
	container += localStorage.getItem("logo-logopos") == '0' ? logo + nome : nome + logo;
	container += "\n</div></div>";

	botoes = "<div id=botoes>";
	botoes += "<button style='position:fixed; bottom:69px; height:30px; right:128px; width:122px;' onclick=\"geraStilo(true, true, true, true);\">outro</button>";
	botoes += "<button style='position:fixed; bottom:69px; height:30px; right:4px; width:122px;' onclick=\"telaEdicao();\">editar</button>";

	botoes += "<button style='position:fixed; bottom:36px; height:30px; right:190px; width:60px;' onclick=\"geraStilo(true, false, false, false);\">cor</button>";
	botoes += "<button style='position:fixed; bottom:36px; height:30px; right:128px; width:60px;' onclick=\"geraStilo(false, true, false, false);\">text</button>";
	botoes += "<button style='position:fixed; bottom:36px; height:30px; right:66px; width:60px;' onclick=\"geraStilo(false, false, true, false);\">frame</button>";
	botoes += "<button style='position:fixed; bottom:36px; height:30px; right:4px; width:60px;' onclick=\"geraStilo(false, false, false, true);\">icon</button>";

	botoes += "<button style='position:fixed; bottom:3px; height:30px; right:4px; width:80px;' onclick=\"document.body.requestFullscreen();\">full</button>";
	botoes += "<button style='position:fixed; bottom:3px; height:30px; right:86px; width:82px;' onclick=\"location='index.html';\">frase</button>";
	botoes += "<button style='position:fixed; bottom:3px; height:30px; right:170px; width:80px;' onclick=\"navigator.clipboard.writeText(importFont + container); alert('Copied to Clipboard');\">source</button></div>";

	document.body.innerHTML = container + botoes;
}

let hexas = "0123456789abcdef";
let hclara = "5567899abcddefff";
let hescura = "00012234566789aa";

function ototom(c) {
	for(let x = 0; x < 16; x++) {
		if(c == hexas[x]) {
			return localStorage.getItem("logo-fontcolor") == "true" ? hclara[x] : hescura[x];
		}
	}
}

document.body.onfullscreenchange = function() {
	document.getElementById('botoes').style.display = document.fullscreenElement ? 'none' : '';
}

if(localStorage.getItem("logo-nome"))geraStilo(false, false, false, false);
else {
	localStorage.setItem("logo-nome", "Stylish Gen");
	geraStilo(true, true, true, true);
}
