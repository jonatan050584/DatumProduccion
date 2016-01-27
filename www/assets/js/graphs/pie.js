var Pie = function(val){
    this.data = val;
	
    this.colors = shuffle(colors);

    this.titulo = null;
    if(val.titulo!=null) this.titulo='<h2 class="chart titulo">'+val.titulo+'</h2>';

    this.subtitulo = null;
    if(val.subtitulo!=null) this.subtitulo='<div class="chart subtitulo">'+val.subtitulo+'</div>';

    this.colors = new Array();
   
    if(this.data.colores!=""){

        this.colors = this.data.colores.split(",");
        this.colors.reverse();
    }
   
    this.colors = this.colors.concat(shuffle(colors));


	this.cargar = function(){

        $('#chart').highcharts({


		
            chart: {
                
                plotBackgroundColor: 0,
                plotBorderWidth: 0,
                plotShadow: false,
                type: 'pie'
            },
            colors: this.colors,
            data:{
                csv:val.data
            },
            title: {
                text: this.titulo,
                useHTML:true
            },
            subtitle: {
                useHTML:true,
			    text: this.subtitulo
			},
            tooltip: {
                animation: false,
                enabled: false
            },
            legend:{
                layout:"vertical",
                symbolHeight:20,
                symbolWidth:24,
                symbolPadding:10,
                padding:0,
                itemMarginBottom:15,
                useHTML:true,
                labelFormat:'<div class="chart legend">{name}</div>'
               
            },
           
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    enableMouseTracking:false,
                    dataLabels: {

                        enabled: true,
	                    distance: -30,
                        useHTML:true,

	                    format: '<span class="chart pie label">{point.percentage:.0f} %</span>'
	                    
                    },
                    showInLegend: true,
                    point:{
                        events:{
                            legendItemClick:function(){
                                return false
                            },
                            mouseOver:function(){
                                return false
                            }
                        }
                    }
                }
            },
            series:{
               slicedOffset:0
            },
            credits:{
	        	enabled:false
	        },
	        exporting:{
	        	enabled:false
	        }
        },function(){
           window.scrollTo(0,0);
        });
	}

    this.share = function(){

       val.info=val.info+'<br><br><br><b>Datum Internacional</b><br><b>www.datum.com.pe</b>';
        var lx = val.info.split("\r");
        var count = lx.length+4;
        //console.log($("#chart").highcharts().getSVG());
        canvg(document.getElementById('canvas'), $("#chart").highcharts().getSVG({
            chart:{
                width:470,
                height:470,
                spacingBottom:count*14
            },
            title:{
                text: $("#sondeo .titulo").html(),
                align:"center",
                useHTML:false
            },
            subtitle:{
                text: $("#sondeo .subtitulo").html(),
                useHTML:false
            },
            legend:{
                verticalAlign:"middle",
                align:"right"
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

}
