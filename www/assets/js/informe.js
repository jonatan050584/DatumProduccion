var Informe = function(){
	this.titulo = "Informe Técnico";
	this.dom = $("#informe");
	this.pulso = null;

	this.cargar = function(pulsoId){

		
		this.pulso = pulsoId;

		$("#informe .carga").html("");
	
		$.each(pulsos,function(key,val){
			if(val.id==pulsoId){
				$("#informe .carga").html(val.fichatecnica);
				analytics("Informe Técnico "+val.anio+"-"+val.mes);
			}
		})
		

	}
}
Informe.prototype = new Seccion();