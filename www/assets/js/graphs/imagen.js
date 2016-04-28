var Imagen = function(val){
	this.data = val;




	this.cargar = function(){
		var html = '<img src="'+this.data.imagen64+'" width="100%">';
		$("#sondeo .grafico.imagen .area").html(html);
	}

	this.share = function(){
		$("#sondeo").css("width",640);
		
		$("#sondeo img").css("width",640);
		$("#sondeo .info").addClass("share");
		$("#sondeo .creditos").show();
		$("#cubre").css("opacity",1);
		html2canvas($("#sondeo")).then(function(canvas) {
		    //console.log(canvas.toDataURL());
		    $("#sondeo").css("width","auto");
			$("#sondeo img").css("width","100%");
			$("#sondeo .info").removeClass("share");
			$("#sondeo .creditos").hide();
			$("#cubre").css("opacity",0.6);

			compartir($("#sondeo .titulo").html(),canvas.toDataURL());
		    //$(".seccion.resultado .canvas").append(canvas);
		});
	}
}