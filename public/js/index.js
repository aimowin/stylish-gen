let lngPtBr = false;

function pickOne(atributo) {
	return atributo[parseInt(Math.random() * atributo.length)];
}

function telaEdicao() {
	let htmtextarea = "<textarea id=frase>"+localStorage.getItem("frase-userfrase")+"</textarea>";
	let htmbotao = "<a onclick='geraStilo(false, false, false, false);'>stylize</a>";
	document.body.innerHTML="<div id=edicao>" + htmtextarea + "<br>" + htmbotao + "</div>";
}

function geraStilo(randomfrase, cor, fonte, quadro){
	if(document.getElementById('frase')) {
		localStorage.setItem("frase-frase", document.getElementById('frase').value);
	}

	if(document.getElementById('frase')) {
		localStorage.setItem("frase-userfrase", document.getElementById('frase').value);
	}

	if(randomfrase) {
		if(lngPtBr) {
			localStorage.setItem("frase-frase", pickOne(citacoes));
		}
		else {
			localStorage.setItem("frase-frase", pickOne(quotes));
		}
	}

	if(cor) {
		localStorage.setItem("frase-bgcolor", pickOne(cores));

		let valorR = parseInt(localStorage.getItem("frase-bgcolor")[0], 16);
		let valorG = parseInt(localStorage.getItem("frase-bgcolor")[2], 16);
		let valorB = parseInt(localStorage.getItem("frase-bgcolor")[4], 16);

		if(valorR + valorG + valorB > 24)
			localStorage.setItem("frase-fontcolor", true);
		else
			localStorage.setItem("frase-fontcolor", false);
	}

	if(fonte) {
		localStorage.setItem("frase-font-family", pickOne(["Architects Daughter", "Montserrat", "Poppins", "Roboto Mono", "Rubik", "Secular One"]));
		localStorage.setItem("frase-font-size", pickOne([15, 18, 21, 24, 27, 30, 33]));
		localStorage.setItem("frase-text-align", pickOne(["left", "right", "center"]));
		localStorage.setItem("frase-text-transform", pickOne(["lowercase", "uppercase", "capitalize", "none"]));
	}

	if(quadro) {
		localStorage.setItem("frase-border-radius", pickOne([3, 6, 9, 12, 15, 18]));
		localStorage.setItem("frase-padding", pickOne([14, 18, 22, 26, 30, 34, 38]));
		localStorage.setItem("frase-frame-preenchido", Math.random() < .7);
		localStorage.setItem("frase-tracado-borda", Math.random() < .5);
		localStorage.setItem("frase-estilo-borda", pickOne(["solid", "dashed"]));
		localStorage.setItem("frase-inclinacao", Math.random() > .8);
		localStorage.setItem("frase-angulo", pickOne(["346", "353", "7", "14"]));
		localStorage.setItem("frase-sombra", Math.random() > .8);
	}

	let bgcolor = localStorage.getItem("frase-bgcolor");
	let fontcolor = localStorage.getItem("frase-fontcolor");

	let atrmoldura = "padding:0px 34px; width:100vw; height:100vh; background-color:#" + bgcolor + "; display:flex; align-items:center; justify-content:center;";
	let atrFrame = "max-width:400px; color:#" + (fontcolor == "true" ? "222222" : "dddddd") + ";";

	let moldura="<div style='" + atrmoldura + "'>";
	moldura+="<div style=\"" + atrFrame;

	moldura += "border-radius:" + localStorage.getItem("frase-border-radius") + "px;";
	moldura += "font-family:'" + localStorage.getItem("frase-font-family") + "';";
	moldura += "font-size:" + localStorage.getItem("frase-font-size") + "px;";
	moldura += "padding:" + localStorage.getItem("frase-padding") + "px;";
	moldura += "text-align:" + localStorage.getItem("frase-text-align") + ";";
	moldura += "text-transform:" + localStorage.getItem("frase-text-transform") + ";";

	if(localStorage.getItem("frase-frame-preenchido") == "true") {
		moldura += "background-color:#" + ototom(bgcolor[0]) + bgcolor[1] + ototom(bgcolor[2]) + bgcolor[3] + ototom(bgcolor[4]) + bgcolor[5] + ";";

		if(fontcolor == "true" && localStorage.getItem("frase-sombra") == "true")
			moldura += " box-shadow: 8px 8px 0px 0px  #" + (fontcolor == "true" ? "222222" : "dddddd") + ";";
	}
	else {
		if(localStorage.getItem("frase-tracado-borda") == "true") {
			moldura += "border:2px " + localStorage.getItem("frase-estilo-borda") + " #" + (fontcolor=="true" ? "222222" : "dddddd") + ";";
		}
	}

	if(localStorage.getItem("frase-inclinacao") == "true") {
		moldura += "transform:rotate(" + localStorage.getItem("frase-angulo") + "deg);";
	}

	let botoes="<div id=botoes>";
	botoes+="<button style='position:fixed; bottom:69px; height:30px; right:128px; width:122px;' onclick=\"geraStilo(false, true, true, true);\">outro</button>";
	botoes+="<button style='position:fixed; bottom:69px; height:30px; right:4px; width:122px;' onclick=\"telaEdicao();\">editar</button>";

	botoes+="<button style='position:fixed; bottom:36px; height:30px; right:4px; width:80px;' onclick=\"geraStilo(false, false, false, true);\">frame</button>";
	botoes+="<button style='position:fixed; bottom:36px; height:30px; right:86px; width:82px;' onclick=\"geraStilo(false, false, true, false);\">text</button>";
	botoes+="<button style='position:fixed; bottom:36px; height:30px; right:170px; width:80px;' onclick=\"geraStilo(false, true, false, false);\">cor</button>";

	botoes+="<button style='position:fixed; bottom:3px; height:30px; right:4px; width:48px;' onclick=\"document.body.requestFullscreen();\">full</button>";
	botoes+="<button style='position:fixed; bottom:3px; height:30px; right:54px; width:48px;' onclick=\"location='logo.html';\">logo</button>";
	botoes+="<button style='position:fixed; bottom:3px; height:30px; right:104px; width:46px;' onclick=\"location='estilofrase.zip';\">app</button>";
	botoes+="<button style='position:fixed; bottom:3px; height:30px; right:152px; width:48px;' onclick=\"lngPtBr=false;geraStilo(true, false, false, false);\">en</button>";
	botoes+="<button style='position:fixed; bottom:3px; height:30px; right:202px; width:48px;' onclick=\"lngPtBr=true;geraStilo(true, false, false, false);\">pt</button></div>";

	document.body.innerHTML = moldura + "\">" + localStorage.getItem("frase-frase").replace(/\</g, '&lt;').replace(/\n/g, '<br>').replace(/  /g, ' &nbsp;')+"</div></div>" + botoes;
}

let hexas = "0123456789abcdef";
let hclara = "5567899abcddefff";
let hescura = "00012234566789aa";

function ototom(c) {
	for(let x = 0; x < 16; x++) {
		if(c == hexas[x]) {
			return localStorage.getItem("frase-fontcolor") == "true" ? hclara[x] : hescura[x];
		}
	}
}

document.body.onfullscreenchange = function() {
	document.getElementById('botoes').style.display = document.fullscreenElement ? 'none' : '';
}

if(localStorage.getItem("frase-frase")) {
	geraStilo(false, false, false, false);
}
else {
	localStorage.setItem("frase-userfrase", "");
	geraStilo(true, true, true, true);
}
