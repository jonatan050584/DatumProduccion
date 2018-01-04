var path = "";
var gaPlugin;
var header;
var home;
var menu;
var contacto;
var categoria;
var sondeo;
var datum;
var resumen;
var informe;

var data;
var pulsos;

var seccion = "home";

var produccion=false;
var gaPlugin;

function ruta(str){
	return path+str;
}
document.addEventListener('deviceready', function(){
	alert(1);
	window.ga.startTrackerWithId('UA-72808177-1', 10,success,fail); 
	//gaPlugin = window.plugins.gaPlugin;
    //gaPlugin.init(success, fail, "UA-72808177-1", 10);
}, false);
function success(){
	alert(2);
	analytics("Home");
}
function fail(msg){
	alert(3);
	console.log(msg);
}

$(document).ready(function(){


	
	var datos = new Datos();
	datos.iniciar();

	
});




function iniciar(){
	header = new Header();
	home = new Home();
	menu = new Menu();
	categoria = new Categoria();
	sondeo = new Sondeo();
	contacto = new Contacto();
	datum = new Datum();
	resumen = new Resumen();
	informe = new Informe();

	getContent({page:"home"},true);
}

window.onpopstate = function(event) {



	getContent(event.state,false);

};


function getContent(obj,addEntry){
	
	
	var antseccion = seccion;

	

	seccion=obj.page;


	switch(seccion){
		
		case "categoria":

			categoria.cargar(obj.keycat,obj.padre);
			break;
		case "sondeo":
			sondeo.cargar(obj.tema,obj.categoria);
			break;
		case "resumen":
			resumen.cargar(obj.pulso);
			break;
		case "informe":
			informe.cargar(obj.pulso);
			break;

	}
	if(seccion=="sondeo"){
		header.showMenu();
	}else{

		header.hideMenu();
	}
	if(seccion=="home") header.hideBack();
	else header.showBack();

	

	window[antseccion].ocultar();
	window[seccion].mostrar();

	if(addEntry == true) {
		history.pushState(obj,null); 
	}

	window.scrollTo(0,0);

	if(seccion=="menu"){
		analytics("Menú Principal");
	}
	if(seccion=="contacto"){
		analytics("Contacto");
	}
	if(seccion=="datum"){
		analytics("Historia y Experiencia");
	}
	


}



var Datos = function(){
	this.iniciar = function(){
		$.ajax({
			//crossDomain: true,
			//url:"assets/data3.json",
			//url:"http://181.177.230.181/datum/json.php",
			url:"http://admin.datum.com.pe/datum/json.php",
			//url:"http://localhost/datum/app/DatumTerminado/www/assets/json.php",
			dataType:'jsonp',
			jsonp: 'jsoncallback',
			success: function(res, status){
				$("#home .area .texto").html(res.variables.textohome);
				data = res.data;
				pulsos = res.pulsos;
				iniciar()
			},
			error: function(){
				alert("Error cargando data");
			}
		});
	}
};


var Seccion = function(){
	this.dom = null;
	this.url = "";
	this.mostrar = function(){
		//window.analytics.trackView(this.url);
		header.setTitulo(this.titulo);
		this.dom.show();
	}
	this.ocultar = function(){
		this.dom.hide();
	}
}

function compartir(titulo,image){
	var tit="";
	var ind = titulo.indexOf("<br");
	if(ind!=-1) tit = titulo.substr(0,ind);
	else tit = titulo;

	window.plugins.socialsharing.share("@DatumPeru #PulsoPerú "+tit, null, image, null);
}

function analytics(page){
	if(produccion){
		//gaPlugin.trackPage( nativePluginResultHandler, nativePluginErrorHandler, page);
		window.ga.trackView(page);
	}
}
function nativePluginResultHandler(){
	//alert("page");
}
function nativePluginErrorHandler(){
	//alert("error");
}