var Header = function(dom){
	var dom = $("#nav");

	this.setTitulo = function(tit){
		dom.find(".titulo").html(tit);
	}
	this.showBack = function(){
		$("#nav .back").show();
	}
	this.hideBack = function(){
		$("#nav .back").hide();
	}

	

	if(produccion){
		$("#nav .back").on({
			"touchstart":function(){
				$(this).addClass("over");
			},
			"touchend":function(){
				$(this).removeClass("over");
				history.go(-1);
			}
		});

		$("#nav .actions").on({
			"touchstart":function(){
				$(this).addClass("over");
			},
			"touchend":function(){
				$(this).removeClass("over");
				if(seccion=="sondeo"){
					if(!$(this).hasClass("activo")){
						$("#nav .back").hide();
						$(this).addClass("activo");
						$("#menusondeo").show();
						$("#cubre").show();
					}else{
						$("#nav .back").show();
						$(this).removeClass("activo");
						$("#menusondeo").hide();
						$("#cubre").hide();
					}
				}
			}
		});


	}else{
		$("#nav .back").bind({
			"mousedown":function(){
				$(this).addClass("over");
			},
			"mouseup":function(){
				$(this).removeClass("over");
				history.go(-1);
				
			}
		});

		$("#nav .actions").bind({
			"mousedown":function(){
				$(this).addClass("over");
			},
			"mouseup":function(){
				$(this).removeClass("over");
					if(seccion=="sondeo"){
				if(!$(this).hasClass("activo")){
					$("#nav .back").hide();
					$(this).addClass("activo");
					$("#menusondeo").show();
					$("#cubre").show();
				}else{
					$("#nav .back").show();
					$(this).removeClass("activo");
					$("#menusondeo").hide();
					$("#cubre").hide();
				}
			}
			}
		})
	}

	this.showMenu = function(){
		
		$("#nav .actions").show();
	}
	this.hideMenu = function(){
		
		$("#nav .actions").hide();
		$("#nav .actions").removeClass("over");
		$("#menusondeo").hide();
		$("#cubre").hide();
		$("#nav .back").show();
	}
	if(produccion){
		$("#menusondeo .item").on({
			"touchstart":function(){
				$(this).addClass("over");
			},
			"touchend":function(){
				$(this).removeClass("over");
				
				if($(this).hasClass("share")){
					graph.share();
				}else if($(this).hasClass("resumen")){
					getContent({page:"resumen",pulso:sondeo.pulso},true);
				}else if($(this).hasClass("descarga")){
					var archivo;
					$.each(pulsos,function(key,val){
						if(val.id==sondeo.pulso){
							archivo = val.archivo;
						}
					})
					window.open("http://admin.datum.com.pe/datum/descarga/"+archivo, '_system');
				}
			}
		});
	}else{
		$("#menusondeo .item").bind({
			"mousedown":function(){
				$(this).addClass("over");
			},
			"mouseup":function(){
				$(this).removeClass("over");
				if($(this).hasClass("share")){
					graph.share();
					
					
				}else if($(this).hasClass("resumen")){

					getContent({page:"resumen",pulso:sondeo.pulso},true);
				}else if($(this).hasClass("descarga")){
					var archivo;
					$.each(pulsos,function(key,val){
						if(val.id==sondeo.pulso){
							archivo = val.archivo;
						}
					})
					window.open("http://admin.datum.com.pe/datum/descarga/"+archivo, '_system');
				}
				
			}
		});
	}



}

