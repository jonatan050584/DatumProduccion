var Menu = function(){
	
	this.url;
	this.titulo = "DATUM - Pulso Perú";
	this.dom = $("#menu");

	var preHTML = this.dom.html();
	$("#menu").empty();

	$.each(data,function(key,val){
		var cat = new ItemCategoria(key);
	});

	$("#menu").append(preHTML);





	if(produccion){
		$("#menu .item.bottom").on({
			"touchstart":function(){
				$(this).addClass("over");
			},
			"touchend":function(){
				$(this).removeClass("over");



				if($(this).hasClass("contacto")) getContent({page:"contacto"},true);
				else if($(this).hasClass("datum")) getContent({page:"datum"},true);
			}
		});
		$("#menu .item.ficha").on({
			"touchstart":function(){
				$(this).addClass("over");
			},
			"touchend":function(){
				$(this).removeClass("over");
				getContent({page:"resumen",pulso:pulsos[0].id},true);
				
			}
		});

	}else{
		$("#menu .item.bottom").bind({
			"mousedown":function(){
				$(this).addClass("over");
			},
			"mouseup":function(){
				$(this).removeClass("over");
				if($(this).hasClass("contacto")) getContent({page:"contacto"},true);
				else if($(this).hasClass("datum")) getContent({page:"datum"},true);
			}
		});
		$("#menu .item.ficha").bind({
			"mousedown":function(){
				$(this).addClass("over");
			},
			"mouseup":function(){
				$(this).removeClass("over");
				
				getContent({page:"resumen",pulso:pulsos[0].id},true);
				
			}
		})
	}

}

Menu.prototype = new Seccion();

var ItemCategoria = function(key){
	var it = data[key];
	this.template = '<div class="item cat" id="cat-{id}" data-id="{id}">'+
		'<div class="bt">'+
			'<div class="con">'+
				'<div class="ico"></div>'+
				'<div class="nom"><div class="txt">{nombre}</div></div>'+
			'</div>'+
			
		'</div>'+
	'</div>'

	

	var html = this.template;
		html = html.replace("{nombre}",it.nombre);
		html = html.replace("{id}",it.id);
		html = html.replace("{id}",it.id);
		html = html.replace("{icono}",it.icono);
	
	this.dom = $(html);
	
	$("#menu").append(this.dom);


	this.dom.find(".ico").css("background-image","url("+ruta("files/iconos/"+it.icono)+")");
	

	if(produccion){
		this.dom.on({
			"touchstart":function(){
				$(this).addClass("over");
			},
			"touchend":function(){
				$(this).removeClass("over");
				getContent({page:"categoria",keycat:key,padre:null},true);
			}
		})
	}else{
		this.dom.bind({
			"mousedown":function(){
				$(this).addClass("over");
			},
			"mouseup":function(){
				$(this).removeClass("over");
				getContent({page:"categoria",keycat:key,padre:null},true);
			}
		})
	}
	

}