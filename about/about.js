
////////////////////////
//let's make a bar chart
////////////////////////

var topics = ["Designing","Coding","Integrating","Validating"];
var values = [1688,2227,2336,1942];
var barHeights = [50,50,50,50];

var gPC, gPCBars, gMobile, gMobileBars;
var marginPC = {top: 20, right: 20, bottom: 80, left: 86};
var marginM = {top: 84, right: 20, bottom: 20, left: 54};


var xPC = d3.scale.linear()
          .domain([0,3000])
          .clamp(true)
          .rangeRound([ 0, 300 ]); 
var yPC = d3.scale.ordinal()
          .domain(topics)
          .rangePoints([0,300],1);
          
var xMobile = d3.scale.ordinal()
          .domain(topics)
          .rangePoints([0,300],1);
var yMobile = d3.scale.linear()
          .domain([0,3000])
          .clamp(true)
          .rangeRound([ 0, 300 ]); 

var xAxisPC = d3.svg.axis()
               .scale(xPC)
               .orient("bottom");
var yAxisPC = d3.svg.axis()
              .scale(yPC)
              .orient("left");
              
var xAxisMobile = d3.svg.axis()
               .scale(xMobile)
               .orient("top");
var yAxisMobile = d3.svg.axis()
              .scale(yMobile)
              .orient("left");

function makeFigure1() {
    //console.log("im going to make a chart");
    // Clear the chart area
    document.getElementById("figure1").innerHTML="";
    document.getElementById("figure1").textContent="";

    // the chart svg
    var chart = d3.select("#figure1")
                .append("svg")
                .attr("id","figure1-pc")
                .attr("width", "100%")
                //.attr("height", "100%")
                .attr("viewBox","0 0 "+(300+marginPC.left+marginPC.right)+" "+
                                       (300+marginPC.top+marginPC.bottom) )
                .attr("preserveAspectRatio","xMaxYMid")
                .append("g")
                .attr("transform", "translate("+marginPC.left+","+marginPC.top+")");    
    
    chart.append("g")
        .attr("transform", "translate(0,"+300+")")
        .attr("class","xaxis-pc values-axis")
        .call(xAxisPC) // http://bl.ocks.org/mbostock/4403522
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        .style("text-anchor", "end");

    chart.append("g")
         .attr("class","yaxis-pc topics-axis")
         .call(yAxisPC)
         .selectAll("text")
         .attr("class","topics-label")
         .attr("onclick",function(d,i){return "barClick("+i+")"});

    //horiz grid lines
    chart.selectAll("line.verticalGrid").data(xPC.ticks(10)).enter()
        .append("line")
            .attr(
            {
                "class":"verticalGrid",
                "x1" : function(d){ return xPC(d);},
                "x2" : function(d){ return xPC(d);},
                "y1" : 0,
                "y2" : 300,
                "fill" : "none",
                "opacity" : "0.6",
                "stroke" : "black",
                "stroke-width" : ".5px"
            });

    // draw the graph object and add the bars
    gPC = chart.append("g"); 

    gPCBars = gPC.selectAll("bar-bars")
      .data(topics)  // entering the topics (y axis) data
      .enter().append("rect")  // create a new circle for each value
          .attr("x", 0 ) // find x position
          .attr("y",function (d,i) { return yPC(d) - barHeights[i]/2; })
          .attr("height",function (d,i) { return barHeights[i]; })
          .attr("width",function (d,i) { return xPC(values[i]); })
          .attr("class","bars bars-pc")
          .attr("id",function(d,i){return "pc-bar-"+i})
          .attr("onclick",function(d,i){return "barClick("+i+")";})
          .style("cursor","pointer")
          .style("opacity", 0.8); // opacity of bar
}

function makeFigure1Mobile() {
    //console.log("im going to make a chart");
    // Clear the chart area
    //document.getElementById("figure1").innerHTML="";
    //document.getElementById("figure1").textContent="";

    // the chart svg
    var chart = d3.select("#figure1")
                .append("svg")
                .attr("id","figure1-mobile")
                .attr("width", "100%")
                //.attr("height", "100%")
                .attr("viewBox","0 0 "+(300+marginM.left+marginM.right)+" "+
                                       (300+marginM.top+marginM.bottom) )
                .attr("preserveAspectRatio","xMaxYMid")
                .append("g")
                .attr("transform", "translate("+marginM.left+","+marginM.top+")");    
    
    chart.append("g")
        //.attr("transform", "translate(0,"+300+")")
        .attr("class","xaxis-mobile topics-axis")
        .call(xAxisMobile) // http://bl.ocks.org/mbostock/4403522
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65) translate(16,-2)")
        //.attr("translate")
        .attr("class","topics-label")
        .attr("onclick",function(d,i){return "barClick("+i+")"})
        .style("text-anchor", "start");

    chart.append("g")
         .attr("class","yaxis-mobile values-axis")
         .call(yAxisMobile);

    //vertical grid lines
    chart.selectAll("line.verticalGrid").data(yMobile.ticks(10)).enter()
        .append("line")
            .attr(
            {
                "class":"verticalGrid",
                "x1" : 0,
                "x2" : 300,
                "y1" : function(d){ return yMobile(d);},
                "y2" : function(d){ return yMobile(d);},
                "fill" : "none",
                "opacity" : "0.6",
                "stroke" : "black",
                "stroke-width" : ".5px"
            });

    // draw the graph object and add the bars
    gMobile = chart.append("g"); 

    gMobileBars = gMobile.selectAll("bar-bars")
      .data(topics)  // entering the topics (x axis) data
      .enter().append("rect")  // create a new circle for each value
          .attr("x", function (d,i) { return xMobile(d) - barHeights[i]/2; } ) // find x position
          .attr("y",0)
          .attr("height",function (d,i) { return yMobile(values[i]); })
          .attr("width",function (d,i) { return barHeights[i]; })
          .attr("class","bars bars-mobile")
          .attr("id",function(d,i){return "mobile-bar-"+i})
          .attr("onclick",function(d,i){return "barClick("+i+")";})
          .style("cursor","pointer")
          .style("opacity", 0.8); // opacity of bar
}

var gArrowPC;
var gArrowheadPC;
var gArrowM;
var gArrowheadM;

function barClickLoad() {
    barClick(1);
}

function barClick(k) {
    var div0 = document.getElementById("figure2-designing-div");
    var div1 = document.getElementById("figure2-coding-div");
    var div2 = document.getElementById("figure2-integrating-div");
    var div3 = document.getElementById("figure2-validating-div");
    var figure2Divs = [div0,div1,div2,div3];
    figure2Divs[0].style.display = "none";
    figure2Divs[1].style.display = "none";
    figure2Divs[2].style.display = "none";
    figure2Divs[3].style.display = "none";
    figure2Divs[k].style.display = "flex";
        
    //First for PC
    if(gArrowPC){gArrowPC.remove();}
    if(gArrowheadPC){gArrowheadPC.remove();}
    //console.log("coding");
    gArrowPC = gPC.append("rect")
     .attr("class","figure-arrow")
     .attr("x", xPC(values[k]) )
     .attr("y", yPC(topics[k])-barHeights[k]/6 )
     .attr("height", barHeights[k]/3)
     .attr("width", 300-xPC(values[k]) );
     
     gArrowheadPC = gPC.append("polygon")
        .attr("class","figure-arrow")
        .attr("points", (300+marginPC.right+2)+","+yPC(topics[k])+" "+
                        (300)+","
                            +( yPC(topics[k])-barHeights[k]/3 )+" "+
                        (300)+","
                            +( yPC(topics[k])+barHeights[k]/3 ) );
    
    gPCBars.classed("selected-bar",false);
    gPCBars.filter("#pc-bar-"+k)
           .classed("selected-bar",true);
    
    // Now for mobile
    if(gArrowM){gArrowM.remove();}
    if(gArrowheadM){gArrowheadM.remove();}
    //console.log("coding");
    gArrowM = gMobile.append("rect")
     .attr("class","figure-arrow")
     .attr("x", xMobile(topics[k])-barHeights[k]/6 )
     .attr("y", yMobile(values[k]) )
     .attr("width", barHeights[k]/3)
     .attr("height", 300-yMobile(values[k]) );
     
    gArrowheadM = gMobile.append("polygon")
    .attr("class","figure-arrow")
    .attr("points", xMobile(topics[k])+","+(300+marginM.bottom+2)+" "+
                    (xMobile(topics[k])-barHeights[k]/3)+","+(300)+" "+
                        (xMobile(topics[k])+barHeights[k]/3)+","+(300) );
                        
    gMobileBars.classed("selected-bar",false);
    gMobileBars.filter("#mobile-bar-"+k)
           .classed("selected-bar",true);
}

//////////////////////////
// Let's make a word cloud
//////////////////////////
             
var wordList = [{"text":"B.S. Mathematics","size":25},
{"text":"M.S. Computer Science","size":35},
{"text":"control systems","size":30},
{"text":"automotive","size":20},{"text":"JavaScript","size":40},
{"text":"leaflet","size":55},{"text":"d3.js","size":75},
{"text":"MATLAB","size":25},{"text":"Simulink","size":20},
{"text":"Stateflow","size":40},{"text":"algorithms","size":25},
{"text":"Java","size":20},{"text":"responsive","size":25}];    
                 
function makeWordCloud() {
    d3.layout.cloud().size([600, 300])
                .words(wordList)
                .rotate(0)
                .fontSize(function(d) { return d.size*1.2; })
                .on("end", draw)
                .start();
                
    //console.log("hi");
}
            

function draw(words,locations) {
    //console.log("HELLOHELLOHELLOHELLOHELLOHELLO");
    //console.log(words);
    //console.log(locations);
    var wordcloud = d3.select("#glance-figure").append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox","0 0 600 300")
            .attr("preserveAspectRatio","none")
            .attr("id", "wordcloud");
            
    var wcg = wordcloud.append("g"); 
         wcg.append("g")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size*1+"px"; })
            .style("font-weight",function(d){return Math.floor(10-d.size/10)*100})
            .style("fill", function(d){return pickColor(d.size);} )
            .attr("transform", function(d) {
                return "translate(" + [d.x-(d.width/2), d.y] + ")";
            })
            .text(function(d) {return d.text; });
      
    var bbg = wcg.node().getBBox();
    wordcloud.attr("viewBox",
            "0 0 "+(bbg.width+30)+" "+(bbg.height+10));       
    wcg.attr("transform","translate("+
            (-bbg.x+22)+","+(-bbg.y)+")");
}

function pickColor(bb) {
    var aa = (bb+25)/70;
    //console.log("aa="+aa);
    var colors = ["27,140,224","167,193,212","53,222,203",
                    "235,167,153","171,9,5"];
    //var colors = ["#FD591C","#29E33C","#FFFB65",
    //                "#0D4A7A","#969eb2"];
    var rr = Math.floor(Math.random()*5);
    
    return "rgba("+colors[rr]+","+aa+")";
    //return colors[rr];
}

////////////////////////////////
// Let's make the "coding" figure
////////////////////////////////

function makeCodingFigure() {

    document.getElementById("figure2-coding").innerHTML="";
    document.getElementById("figure2-coding").textContent="";
    
    var codingSvg = d3.select("#figure2-coding")
        .append("svg")
        .attr("id","figure2-coding-svg")
        .attr("width", "100%")
        .attr("viewBox","0 0 300 240");
        
    var mySlices = ["MATLAB/Simulink/Stateflow","JavaScript","Java","Other (C++,C,VBA)"];
    var myLabels = [["MATLAB/","Simulink/","Stateflow"],["JavaScript"],["Java"],["Other"]];
    var myValues = [45,35,10,10];
    var myColors = ["orange","blue","aqua","green"];
    var myColors = ["rgb(27,140,224)","rgb(167,193,212)",
        "rgb(53,222,203)","rgb(235,167,153)"];
    
    var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(110);
        
    var labelArc = d3.svg.arc()
        .innerRadius(60)
        .outerRadius(60);
        
    var pie = d3.layout.pie()
                .sort(null)
                .value(function(d,i) { return myValues[i]; });

    var arcs = codingSvg.selectAll("whatevs")    
            .data(pie(mySlices))                         
            .enter()                           
            .append("g")
            .attr("transform","translate(150,120)")
            .attr("class", "slice");  

    arcs.append("path")
        .attr("fill", function(d,i){ return myColors[i]; } ) 
        .attr("d", arc );
        
    arcs.append("text")
      .attr("class","pie-label")
      .attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")translate(-5,-20)"; })
      //.attr("dy",".35em")
      .each(function(d,i)
                {
                    d3.select(this)
                        .selectAll("flubber")
                        .data(myLabels[i]).enter()
                        //little trick to wrap svg text
                        .append("tspan")
                        .attr("x",0)
                        .attr("dy","1em")
                        .text(function(d){return d;});
                      
                }
                    );
}

////////////////////////////////
// Let's make the "designing" figure
// It's a line chart
////////////////////////////////

function makeDesigningFigure() {

    document.getElementById("figure2-designing").innerHTML="";
    document.getElementById("figure2-designing").textContent="";
    
    // set margins and scales
    var margin = {top: 30, right: 30, bottom: 80, left: 70};
    var xD = d3.scale.linear()
          .domain([0,62])
          .clamp(true)
          .rangeRound([ 0, 500 ]);       
    var yD = d3.scale.linear()
          .domain([0,100])
          .clamp(true)
          .rangeRound([ 400,0 ]);
    
    // add svg areas
    var designingSvg = d3.select("#figure2-designing")
        .append("svg")
        .attr("id","figure2-designing-svg")
        .attr("width", "100%")
        .attr("viewBox","0 0 "+(500+margin.left+margin.right)+" "+
                                       (400+margin.top+margin.bottom) )
    var chart = 
        designingSvg.append("g")
        .attr("transform", 
          "translate("+margin.left+","+margin.top+")"); 
    
    // add axes
    var xAxisD = d3.svg.axis()
               .scale(xD)
               .orient("bottom");
    var yAxisD = d3.svg.axis()
              .scale(yD)
              .orient("left");              
    chart.append("g")
        .attr("transform", "translate(0,"+400+")")
        .attr("class","xaxis-d values-axis-d")
        .call(xAxisD);
    chart.append("text")
        .attr("transform", "translate(250,"+450+")")
        .text("Vehicle Speed (mph)")
        .attr("text-anchor","middle")
        .style("font-size","150%");
    chart.append("g")
        .attr("class","yaxis-d values-axis-d")
        .call(yAxisD);
    chart.append("text")
        .attr("transform", "translate(-40,"+200+")rotate(270)")
        .text("Accelerator Position (%)")
        .attr("text-anchor","middle")
        .style("font-size","150%");
        
    //horiz grid lines
    chart.selectAll("line.horizontalGrid").data(xD.ticks(10)).enter()
        .append("line")
            .attr(
            {
                "class":"horizontalGrid",
                "x1" : function(d){ return xD(d);},
                "x2" : function(d){ return xD(d);},
                "y1" : 0,
                "y2" : 400,
                "fill" : "none",
                "opacity" : "0.4",
                "stroke" : "black",
                "stroke-width" : "1px"
            });
            
    //Vertical grid lines
    chart.selectAll("line.verticalGrid").data(yD.ticks(10)).enter()
        .append("line")
            .attr(
            {
                "class":"verticalGrid",
                "y1" : function(d){ return yD(d);},
                "y2" : function(d){ return yD(d);},
                "x1" : 0,
                "x2" : 500,
                "fill" : "none",
                "opacity" : "0.6",
                "stroke" : "black",
                "stroke-width" : "1px"
            });
        
    var down2 = [[4,0],[4,10],[7,40],[11,50],[16,90],[16,100]];
    var up1 = [[7,0],[7,10],[10,40],[14,50],[19,90],[19,100]];
    
    var down3 = [[14,0],[14,10],[22,40],[28,50],[39,90],[39,100]];
    var up2 = [[17,0],[17,10],[25,40],[31,50],[42,90],[42,100]];
    
    var down4 = [[26,0],[26,10],[34,40],[40,50],[51,90],[51,100]];
    var up3 = [[29,0],[29,10],[37,40],[43,50],[54,90],[54,100]];
    
    var line = d3.svg.line()
                .x(function(d) { return xD(d[0]); })
                .y(function(d) { return yD(d[1]); });
    
    // 1-2 shifts
    chart.append("path")
        .attr("class","down2-line down-shift-line")
        .datum(down2)
        .attr("d", line);
    chart.append("path")
        .attr("class","up1-line up-shift-line")
        .datum(up1)
        .attr("d", line);
     
    // 2-3 shifts 
    chart.append("path")
        .attr("class","down3-line down-shift-line")
        .datum(down3)
        .attr("d", line);   
    chart.append("path")
        .attr("class","up2-line up-shift-line")
        .datum(up2)
        .attr("d", line);
    
    // 3-4 shifts
    chart.append("path")
        .attr("class","down4-line down-shift-line")
        .datum(down4)
        .attr("d", line);     
    chart.append("path")
        .attr("class","up3-line up-shift-line")
        .datum(up3)
        .attr("d", line);

}
    

window.addEventListener('load', makeFigure1 );
window.addEventListener('load', makeFigure1Mobile );
window.addEventListener('load', makeCodingFigure );
window.addEventListener('load', makeDesigningFigure );
window.addEventListener('load', barClickLoad );
window.addEventListener('load', makeWordCloud );

