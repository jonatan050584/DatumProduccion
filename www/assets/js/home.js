var Home = function(){
	this.titulo = "RESUMEN";
	this.dom = $("#home");


	if(produccion){
		$("#home .btempezar").on({
			'touchstart':function(){
				$(this).addClass("over");
			},
			'touchend':function(){
				getContent({page:"menu"},true);
				$(this).removeClass("over");
			}
			
		});
	}else{
		$("#home .btempezar").bind({
			'mousedown':function(){
				$(this).addClass("over");
			},
			'mouseup':function(){
				getContent({page:"menu"},true);
				$(this).removeClass("over");
			}
			
		});
	}

	

}
Home.prototype = new Seccion();