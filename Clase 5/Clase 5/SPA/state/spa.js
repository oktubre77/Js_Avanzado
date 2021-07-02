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
		ajaxRender(ev.target.href , main)

		const state = {
			url: ev.target.href ,
			title: `SPA - ${ev.target.innerText}`, 
			idLink: ev.target.id
		}

		history.pushState(state, null, ev.target.innerText.toLowerCase())

		claseLinks(ev.target)
	})
} )


//FUNCION PARA AGREGAR CLASE
const claseLinks = link => {
	//console.log("Han hecho click en el elemento", link)
	//console.dir(link.parentNode.children)
	const links = link.parentNode.children;

	for (let i = 0 ; i < links.length ; i++){
		links[i].classList.remove("activo")
	}

	link.classList.add("activo")
}

/*NECESITO SIMULAR UNA NAVEGACION para esto tengo dos Apis disponibles:

	History
		.state -> almacena un objeto el cual esta asociado a una URL particular

		.pushState(objState, title, urlPath)
*/

//El evento de popstate se desencadena cuando hay un cambio en la url debido a la interaccion con los BOTONES DE NAVEGACION, no tiene en cuenta los cambios de url hechos por pushState()
window.addEventListener("popstate", ev => {
	console.log("Hubo un cambio en el path de la url al usar botones de navegacion")
	ajaxRender( history.state.url, main );

	const idLink = history.state.idLink;
	const link = document.querySelector("#"+idLink)
	claseLinks(link)
})



//Generar una funcion que al presionar uno de los botones o basado en la url marque como activo el hipervinculo correspondiente