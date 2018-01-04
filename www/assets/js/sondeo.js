var sondeoKey;

var Sondeo = function(){
	this.dom = $("#sondeo");
	this.pulso = null;
	this.flagswipe = true;

	this.dom.on("swipeleft",function(e){
		if(sondeo.flagswipe){
			var sigsondeo = sondeoKey+1;
			if(sigsondeo==listasondeos.length) sigsondeo=0;

			//$('#sondeo').animate({"-webkit-transform":"translate(-300px,0px)"});

			$("#sondeo").animate({ "opacity":0,whyNotToUseANonExistingProperty: 300 }, {
			    step: function(now,fx) {
			    	var valor = now*-1;
			    	console.log(valor);
			        $(this).css('-webkit-transform',"translate(" + valor + "px, 0px)");
			    },
			    duration:300,complete:function(){
			    	getContent({page:"sondeo",tema:listasondeos[sigsondeo]},false);
			    	
			    	$("#sondeo").css("-webkit-transform","translate(0px,0px)");

			    	$("#sondeo").animate({
			    		"opacity":1,
			    		whyNotToUseANonExistingProperty:0
			    	});

			    }
			},'linear');
		}
	});

	this.dom.on("swiperight",function(e){
		if(sondeo.flagswipe){

			var antsondeo = sondeoKey-1;
			if(antsondeo<0) antsondeo=listasondeos.length-1;


			$("#sondeo").animate({ "opacity":0,whyNotToUseANonExistingProperty: 300 }, {
			    step: function(now,fx) {
			    	var valor = now;
			    	console.log(valor);
			        $(this).css('-webkit-transform',"translate(" + valor + "px, 0px)");
			    },
			    duration:300,complete:function(){
			    	getContent({page:"sondeo",tema:listasondeos[antsondeo]},false);
			    	
			    	$("#sondeo").css("-webkit-transform","translate(0px,0px)");

			    	$("#sondeo").animate({
			    		"opacity":1,
			    		whyNotToUseANonExistingProperty:0
			    	});

			    }
			},'linear');

		}

		
	})

	this.cargar = function(data,categoria){

		this.pulso = data.pulso;

		
		$.each(listasondeos,function(key,val){
			if(data==val){
				sondeoKey = key;
			}
		})
		
		header.setTitulo(categoria);
		//analytics(data.titulo);
		$("#sondeo .titulo").html(data.titulo);
		
		$("#sondeo .btzoom").hide();
		
		if(data.subtitulo==null) $("#sondeo .subtitulo").html("").hide();
		else{
			
			$("#sondeo .subtitulo").html(data.subtitulo).show();
		}
		
		$("#sondeo .graficos").empty();

		$.each(data.sondeo,function(key,val){
			
			var grafico = new Grafico(val);

		
		});

		
	}
}
Sondeo.prototype = new Seccion();

var graph;

var Grafico = function(data){
	var html = $('<div class="grafico"><div class="area" id="chart"></div></div>');
	html.addClass(data.tipo);
	$("#sondeo .graficos").append(html);
	$("#sondeo .info").html(data.info);
	$("#sondeo .leyenda").empty();
	
	switch(data.tipo){
		case "pie":
			setTimeout(function(){
				graph = new Pie(data);
				graph.cargar();
			},1000);
			
			break;
		case "line":
			setTimeout(function(){
				graph = new Line(data);
				graph.cargar();
			},1000);
			break;
		case "bar":

			setTimeout(function(){
				graph = new Bar(data);
				graph.cargar();
			},1000);
			break;

		case "column":
		
			setTimeout(function(){
				graph = new Column(data);
				graph.cargar();
			},1000);
			
			break;
		case "barsolo":
			setTimeout(function(){
				graph = new BarSolo(data);
				graph.cargar();
			},1000);
			break;
		case "columnstacked":
			setTimeout(function(){
				graph = new ColumnStacked(data);
				graph.cargar();
			},1000);
			break;
		case "imagen":
			setTimeout(function(){
				graph = new Imagen(data);
				graph.cargar();
			},1000);
			break;
	}

}


var colors = new Array("#f02236","#019984","#e9ae30","#eb882a","#6fbcd6","#332e4c","#e4d5b8","#727391","#a72f30");

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}