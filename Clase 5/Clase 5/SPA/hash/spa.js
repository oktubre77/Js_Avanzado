//Func ajaxRender(url, objRender) -> busca un recurso por AJAX y lo renderiza en el elemento del DOM indicado 
const ajaxRender = (url, objRender) => {
	const peticion = new XMLHttpRequest();

	peticion.addEventListener("load", ev => {
		if (ev.currentTarget.status == 200){
			//console.log(ev.currentTarget);
			objRender.innerHTML = ev.currentTarget.response
		}
	})

	peticion.open("GET", url);
	peticion.send()
}

//Guardo en una constante una referencia al MAIN principal
const main = document.querySelector("main")
//Busco los LINKS y les añado el evento de click
const links = document.querySelectorAll("header nav a");

//console.log(links)
links.forEach( link => {
	//console.log(link)
	link.addEventListener("click", ev => {
		ev.preventDefault();
		ev.stopPropagation();

		//console.log("hiciste click en el link")
		//ajaxRender(ev.target.href , main)

		location.hash = ev.target.innerText.toLowerCase();
	})
} )

window.addEventListener("hashchange", ev => {
	console.log("Hubo un cambio en el HASH de la url")
	let url;
	switch (location.hash) {
		case "#home":
			url = "plantillas/home.html"
			break;
		case "#mensajes":
			url = "plantillas/mensajes.html"
			break;
		case "#muro":
			url = "plantillas/muro.html"
			break;
		default:
			url = "plantillas/home.html"
			break;
	}
	ajaxRender(url , main)
})



/*NECESITO SIMULAR UNA NAVEGACION para esto tengo dos Apis disponibles:

	Location
		.href -> url del archivo abierto
		.hash -> hash que figura en la URL

	History
*/