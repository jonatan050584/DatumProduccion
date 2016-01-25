var Contacto = function(){
	this.titulo = "CONTACTO";
	this.dom = $("#contacto");


	if(produccion){
		$("#contacto .lista .item").on({
			"touchstart":function(){
				$(this).addClass("over");
			},
			"touchend":function(){
				$(this).removeClass("over");
				
				if($(this).hasClass("dir")){
					window.open("https://www.google.es/maps/place/12%C2%B005'23.3%22S+77%C2%B002'22.7%22W/@-12.089802,-77.0401842,19z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0", '_system');
				}else if($(this).hasClass("web")){
					window.open("http://www.datum.com.pe", '_system');
					//var ref = cordova.InAppBrowser.open("http://www.datum.com.pe", "_system","location=yes");
				}else if($(this).hasClass("tel")){
					window.open("tel:+5112150600", '_system');
					//var ref = cordova.InAppBrowser.open("tel:+5112150600", "_system","location=yes");
				}else if($(this).hasClass("em")){
					window.open("mailto:datum@datum.com", '_system');
					//var ref = cordova.InAppBrowser.open("mailto:datum@datum.com", "_system","location=yes");
				}
			}
		})
	}else{
		$("#contacto .lista .item").bind({
			"mousedown":function(){
				$(this).addClass("over");
			},
			"mouseup":function(){
				$(this).removeClass("over");
				
				if($(this).hasClass("dir")){
					window.open("https://www.google.es/maps/place/12%C2%B005'23.3%22S+77%C2%B002'22.7%22W/@-12.089802,-77.0401842,19z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0", '_system');
				}else if($(this).hasClass("web")){
					window.open("http://www.datum.com.pe", '_system');
					//var ref = cordova.InAppBrowser.open("http://www.datum.com.pe", "_system","location=yes");
				}else if($(this).hasClass("tel")){
					window.open("tel:+5112150600", '_system');
					//var ref = cordova.InAppBrowser.open("tel:+5112150600", "_system","location=yes");
				}else if($(this).hasClass("em")){
					window.open("mailto:datum@datum.com", '_system');
					//var ref = cordova.InAppBrowser.open("mailto:datum@datum.com", "_system","location=yes");
				}

			}
		})
	}


};
Contacto.prototype = new Seccion();