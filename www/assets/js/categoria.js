var listasondeos = new Array();
var idcat;

var Categoria = function(){
	this.dom = $("#categoria");
	this.cargar = function(key,padre){
		alert(key);
		alert(padre);
		this.data = data[key];
		analytics(this.data.nombre);
		$("#categoria .nombre").html(this.data.nombre);
		$("#categoria .banner").css("background-image","url("+ruta("files/"+this.data.imagen)+")");
		$("#categoria .banner .area").css("background-image","url("+ruta("files/o"+this.data.icono)+")");
		
	}
}
Categoria.prototype = new Seccion();




var Temas = function(keycat,padre){
	this.data = data[keycat].temas;

	this.listar = function(){
		$.each(this.data,function(key,val){
			if(val.padre==padre){
				var item = new ItemTema(keycat,val);
			}
		});
	}
	this.limpiar = function(){
		$("#categoria .lista").empty();
	}
}
var ItemTema = function(keycat,data){
	
	this.template = '<div class="item {class}" id="tem-{id}"><div class="txt">{titulo}</div></div>';

	var cl="";
	if(data.hijos==true) cl = "ani";
	
	var tit="";

	

	var ind = data.titulo.indexOf("<br");
	if(ind!=-1) tit = data.titulo.substr(0,ind);
	else tit = data.titulo;

	
	var html = this.template.replace("{titulo}",tit);
		html = html.replace("{class}",cl);
	this.dom = $(html);
	$("#categoria .lista").append(this.dom);

	var flagtouch=false;

	if(produccion){
		this.dom.on({
			"touchstart":function(){
				flagtouch=true;
				
			},
			"touchmove":function(){

				flagtouch=false;
			},
			"touchend":function(){
				if(flagtouch){
					$(this).addClass("over");
					setTimeout(function(){
						$(this).removeClass("over");
				
						if(data.hijos==true){
							getContent({page:"categoria",keycat:keycat,padre:data.id},true);			
						}else{
							getContent({page:"sondeo",tema:data},true);
							window.scrollTo(0,0);
						}
					},300);
					
				}
				
			}
		})
	}else{
		this.dom.bind({
			"mousedown":function(){
				$(this).addClass("over");
			},
			"mouseup":function(){
				$(this).removeClass("over");
				if(data.hijos==true){
					getContent({page:"categoria",keycat:keycat,padre:data.id},true);			
				}else{
					getContent({page:"sondeo",tema:data,categoria:$("#categoria .nombre").html()},true);
				}
			}
		})
	}


	
	


}