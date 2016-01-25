var numCats = 0;

var Line = function(val){

    var line = this;
    
    
    this.data = val;

    if(this.data.alto!=""){
        $("#sondeo .grafico.line .area").css("height",this.data.alto);
    }else{
        $("#sondeo .grafico.line .area").css("height",290);
    }

    this.colors = new Array();

    if(this.data.colores!=""){

        this.colors = this.data.colores.split(",");

    }
   
    this.colors = this.colors.concat(shuffle(colors));

   
    var arrcolores =  this.colors;
   
  

    
    var meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    
    $("#sondeo .graficos").prepend('<div class="btzoom">Expandir</div>');

    
    $("#sondeo .btzoom").html("Expandir");

    if(produccion){
        $(".btzoom").on({
            "touchstart":function(){
                $(this).addClass("over");
            },
            "touchend":function(){
                $(this).removeClass("over");
                
                
                if($(this).html()=="Expandir"){
                    line.zoomIn();
                    $(this).html("Reducir");
                }else{
                    line.zoomOut();
                    $(this).html("Expandir");
                }
                
                
            }
        });
        

    }else{
        $(".btzoom").bind({
            "mousedown":function(){
                $(this).addClass("over");
            },
            "mouseup":function(){
                $(this).removeClass("over");
                
                if($(this).html()=="Expandir"){

                    line.zoomIn();
                    $(this).html("Reducir");
                }else{
                    line.zoomOut();
                    $(this).html("Expandir");
                }
            }
        });
       
    }

    this.share = function(){
        val.info=val.info+'<br><br><br><b>Datum Internacional</b><br><b>www.datum.com.pe</b>';
        var lx = val.info.split("\r");
        var count = lx.length+4;
       
        //console.log($("#chart").highcharts().getSVG());
        canvg(document.getElementById('canvas'), $("#chart").highcharts().getSVG({
            chart:{
                width:960,
                height:550,
                spacingBottom:count*14
            },
            title:{
                text: $("#sondeo .titulo").html()
            },
            subtitle:{
                text: $("#sondeo .subtitulo").html()
            },
            xAxis: {
                tickInterval:1
            },
            plotOptions:{
                series:{
                    dataLabels:{
                        format:'<span style="color:{point.color}">{y}%</span>'
                    }
                }
            },
            legend:{
                enabled:true,
                align:"center",
                layout:"vertical",
                verticalAlign:"bottom"
            },
            credits:{
                style:{
                    color:"#8C006C",
                    fontSize:'11px',
                    textAlign:'center'
                },
                enabled:true,
                text:val.info,
                position:{
                    y: -1*count*13
                }
            }
        }));
        console.log(canvas.toDataURL());
        //header.hideMenu();
        //canvg(document.getElementById('canvas'), graph.getSVG());
        compartir($("#sondeo .titulo").html(),canvas.toDataURL());
    }



	this.cargar = function(){
      

        

        var categorias = new Array();

        var csv = $.csv.toArrays(val.data);
        
        
        var cantSeries=csv[0].length-1;
        
        

        var seriesOptions = [],
            seriesCounter = 0;

        for(var j=0;j<csv[0].length;j++){
            if(j>0){
                
                seriesOptions[j-1]={
                    name:csv[0][j],
                    data:[],
                    id:"serie"+j
                }
            }
        }

        


        $.each(csv,function(key,val){
            
            if(key>0){
                var fecha = val[0].split("-");
                var anio = fecha[0].substr(2);
                var mes = meses[parseInt(fecha[1])-1];
                categorias.push(mes+" '"+anio);

                for(var i=0;i<val.length;i++){
                    if(i>0){
                       
                        seriesOptions[i-1].data.push(parseInt(val[i]));
                    }
                }
                
            }
        });

        numCats = categorias.length;
        
        
        
        
        var plotlines = new Array();

        $.each(categorias,function(key,val){
            if(key==0 || key==(categorias.length-1) || (key+1)%Math.ceil(categorias.length/3)==0){
                var pl = {
                    color: '#cccccc',
                    value: key,
                    dashStyle:'dash',
                    width:1
                };
                plotlines.push(pl);
            }
        })


        // $("#sondeo .grafico.line .area").css("height",this.data.alto);
        //$("#sondeo .grafico.line .area").css("width",categorias.length*60);
        $("#sondeo .grafico.line .area").css("width","100%");
        
        var tickInt = 1;


        if(categorias.length<=7){
            $(".btzoom").hide();
        }else{
            tickInt = categorias.length-1;
            $(".btzoom").show();
        }
		
        $('#chart').highcharts({
            chart: {
                type: 'spline'
            },
            colors: this.colors,
            title: {
                text: null
            },
            xAxis: {
                tickInterval:tickInt,
                categories: categorias,
                plotLines:plotlines,
                
                showLastLabel: true,
                endOnTick: true
            },
            
            yAxis:{
                floor: 0,
                ceiling:100,
                labels:{
                    enabled:false
                },
                title:{
                    text:null
                }
            },
            legend: {
                enabled:false,
                layout:"vertical",
                itemMarginBottom:10


            },
            plotOptions: {
                spline:{
                    lineWidth:1,
                    marker:{
                        radius:3,
                        symbol:"circle"
                    },
                    events:{
                        legendItemClick:function(){
                            alert(1);
                        }
                    }
                },
                series: {
                    borderWidth: 0,
                    pointWidth: 50,
                    dataLabels: {
                        enabled: true,
                        allowOverlap:true,
                        formatter : function(){
                            var color = this.point.color;
                            if(categorias.length>7){

                                
                                
                                
                                if(this.point.index==0 || this.point.index==(this.series.data.length-1) || (this.point.index+1)%Math.ceil(this.series.data.length/3)==0){


                                    
                                    return '<span style="color: ' + color + '; font-size:10px; font-weight:normal">'+this.y+'%</span>'; 
                                }

                            }else{
                                return '<span style="color: '+color+';font-size:10px; font-weight:normal">'+this.y+'%</span>'; 
                            }


                            
                        
                            
                        }
                        //format: '{point.y:.f}%'
                    },
                    enableMouseTracking: false
                }
            },  
            series: seriesOptions,
            credits:{
                enabled:false
            },
            exporting:{
                enabled:false
            }
        },function(chart){


            
            $.each(seriesOptions,function(key,val){
                var col = arrcolores[key];
                var nom = val.name;
                var html = '<div class="item" data-id="serie'+(key+1)+'"><div class="color" style="background-color:'+col+'"></div><div class="name">'+nom+'</div><div class="clear"></div></div>';
                $("#sondeo .leyenda").append(html);
            });

            if(produccion){
                $("#sondeo .leyenda .item").on({
                    "touchend":function(){
                        if($(this).hasClass("hide")) $(this).removeClass("hide");
                        else $(this).addClass("hide");

                        var id = $(this).data("id");
                        var series = chart.get(id);
                        console.log(chart);
                        series.setVisible(!series.visible);
                    }
                });
                

            }else{
                $("#sondeo .leyenda .item").bind({
                    "mouseup":function(){

                        if($(this).hasClass("hide")) $(this).removeClass("hide");
                        else $(this).addClass("hide");

                        var id = $(this).data("id");
                        var series = chart.get(id);
                        console.log(chart);
                        series.setVisible(!series.visible);
                    }
                });
               
            }

            window.scrollTo(0,0);
        });


	};

    this.zoomIn = function(){
        


        $("#sondeo .grafico.line .area").css("width",numCats*60);
        

        $.each($("#chart").highcharts().series,function(key,serie){
            serie.options.dataLabels.formatter = function(){
                 var color = this.point.color;
                return '<span style="color: ' + color + '; font-size:10px; font-weight:normal">'+this.y+'%</span>';
            }
        });

        //$("#chart").highcharts().xAxis[0].tickInterval=10;
        
        $("#chart").highcharts().xAxis[0].options.tickInterval = 1;
        

        $("#chart").highcharts().reflow();

    }
    this.zoomOut = function(){
        $("#sondeo .grafico.line .area").css("width","100%");

        $.each($("#chart").highcharts().series,function(key,serie){
            serie.options.dataLabels.formatter = function(){
                 var color = this.point.color;
                            
                if(this.point.index==0 || this.point.index==(this.series.data.length-1) || (this.point.index+1)%Math.ceil(this.series.data.length/3)==0){


                    
                    return '<span style="color: ' + color + '; font-size:10px; font-weight:normal">'+this.y+'%</span>'; 
                }
            }
        });
        
        
        
        $("#chart").highcharts().xAxis[0].options.tickInterval = numCats-1;

        $("#chart").highcharts().reflow();
    }

    

}


