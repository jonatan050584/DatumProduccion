var categorias = new Array();

var Bar = function(val){

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
       
        categorias = new Array();
        

        var csv = $.csv.toArrays(val.data);

        
        var cantSeries=csv[0].length-1;
        
        console.log(cantSeries);

        var seriesOptions = [],
            seriesCounter = 0;

        for(var j=0;j<csv[0].length;j++){
            if(j>0){
                //console.log(j);
                seriesOptions[j-1]={
                    name:csv[0][j],
                    data:[]
                }
            }
        }

        


        $.each(csv,function(key,val){
            if(key>0){
                categorias.push(val[0]);
                for(var i=0;i<val.length;i++){
                    if(i>0){
                        seriesOptions[i-1].data.push(parseInt(val[i]));
                    }
                }
                
            }
        });
        


        
        console.log(seriesOptions);
        var seriesRev = [];
        var i=seriesOptions.length;
        $.each(seriesOptions,function(key,val){
            i--;
            seriesRev[i] = val;

        });
        console.log("-c--");
        console.log(this.data.alto);

        if(this.data.alto!=""){
            $("#sondeo .grafico.bar .area").css("height",this.data.alto);
        }else{
            $("#sondeo .grafico.bar .area").css("height",categorias.length*120);
        }
    

        $('#chart').highcharts({
            chart: {
                type: 'bar'
            },
            colors:this.colors,
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
           
            xAxis: {
                categories: categorias
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                }
            },
            legend:{
                verticalAlign:"top",
                align:"center",
                layout:"vertical",
                reversed:true
                
            },
            tooltip: {
                enabled:false
            },
            
            plotOptions: {
                series: {
                    borderWidth: 0,
                    
                    dataLabels: {
                        padding:0,
                        allowOverlap:true,
                        enabled: true,
                        format: '<span class="chart bar label">{point.y:.0f}%</span>',
                        rotation: 0,
                        defer: false,
                        style: {
                            fontWeight: 'normal',
                            fontSize: '10px'
                        }
                    }
                }
            },
            series: seriesRev,
            /*series: [{
                color:"#A6A6A6",
                name: 'Febrero 2014',
                data: [13.1,11.6,10.6,11.4,10.9,10.4,10.5,10.6,9.2,9.1]

            }, {
                color:"#00B0F0",
                name: 'Mayo 2015',
                data: [0,0,0,10.7,11,0,9.4,10.1,0,8.8]

            }, {
                color:"#0070C0",
                name: 'Agosto 2015',
                data: [13.2,11,10.9,10.6,10.4,10,9.6,9.2,8.4,8.4]

            }],*/
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



        if(this.data.alto!=""){
            var _alto = this.data.alto;
        }else{
            var _alto = categorias.length*120;
        }

        canvg(document.getElementById('canvas'), $("#chart").highcharts().getSVG({
            chart:{
                width:640,
                height:_alto,
                spacingBottom:count*14
            },
            title:{
                text: $("#sondeo .titulo").html()
            },
            subtitle:{
                text: $("#sondeo .subtitulo").html()
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
            },
            legend:{
                verticalAlign:"middle",
                align:"right",
                layout:"vertical"
                
            },
        }));
        console.log(canvas.toDataURL());
        //header.hideMenu();
        //canvg(document.getElementById('canvas'), graph.getSVG());
        compartir($("#sondeo .titulo").html(),canvas.toDataURL());
    }
}