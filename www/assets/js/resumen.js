var Resumen = function(){
	this.titulo = "Resumen de Ficha Técnica";
	this.dom = $("#resumen");
	this.pulso = null;

	

	this.cargar = function(pulsoId){

		this.pulso = pulsoId;

		$("#resumen .carga").html("");
	
		$.each(pulsos,function(key,val){
			if(val.id==pulsoId){
				$("#resumen .carga").html(val.resumenficha);
			
				analytics("Resumen de Ficha Técnica "+val.anio+"-"+val.mes);
	
			}
		});


		if(produccion){
			$(".btcompleto").on({
				"touchstart":function(){
					$(this).addClass("over");
				},
				"touchend":function(){
					$(this).removeClass("over");
					
					getContent({page:"informe",pulso:pulsoId},true);
					
				}
			});
			

		}else{
			$(".btcompleto").bind({
				"mousedown":function(){
					$(this).addClass("over");
				},
				"mouseup":function(){

					$(this).removeClass("over");
					getContent({page:"informe",pulso:pulsoId},true);
				}
			});
			
		}
		

	}
}
Resumen.prototype = new Seccion();