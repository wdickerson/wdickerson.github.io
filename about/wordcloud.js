


//////////////////////////
// Let's make a word cloud
//////////////////////////
             
var wordList = [{"text":"B.S. Mathematics","size":30},
{"text":"M.S. Computer Science","size":35},
{"text":"control systems","size":30},
{"text":"automotive","size":25},{"text":"JavaScript","size":40},
{"text":"leaflet","size":45},{"text":"d3.js","size":60},
{"text":"MATLAB","size":35},{"text":"Simulink","size":30},
{"text":"Stateflow","size":40},{"text":"algorithms","size":35},
{"text":"Java","size":20},{"text":"responsive","size":25}];    
                 
function makeWordCloud() {
    d3.layout.cloud().size([600, 300])
                .words(wordList)
                .rotate(0)
                .fontSize(function(d) { return d.size*1.2; })
                //.fontSize(18)
                .on("end", draw)
                .start();
                
    console.log("hi");
}
            

function draw(words,locations) {
    console.log("HELLOHELLOHELLOHELLOHELLOHELLO");
    console.log(words);
    console.log(locations);
    var wordcloud = d3.select("#glance-figure").append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox","0 0 600 300")
            .attr("preserveAspectRatio","none")
            .attr("id", "wordcloud");
            
    var wcg = wordcloud.append("g")
            // without the transform, words words would get cutoff to the left and top, they would
            // appear outside of the SVG area
            //.attr("transform", "translate(300,150)");
            
         wcg.append("g")
            //.attr("transform", "translate(320,200)")
            //.attr("transform", "translate("+locations[0].x+","+locations[0].y+")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size+"px"; })
            //.style("fill", "blue")
            .style("fill", function(d){return pickColor(d.size);} )
            .attr("transform", function(d) {console.log(d);
                return "translate(" + [d.x-(d.width/2), d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) {return d.text; });
            
    // vert grid lines
    wordcloud.selectAll("line.verticalGrid")
        .data([0,100,200,300,400,500,600]).enter()
        .append("line")
            .attr(
            {
                "class":"verticalGrid",
                "x1" : function(d){ return d;},
                "x2" : function(d){ return d;},
                "y1" : 0,
                "y2" : 300,
                "fill" : "none",
                "opacity" : "0.6",
                "stroke" : "black",
                "stroke-width" : ".5px"
            });
            
    // horiz grid lines
    wordcloud.selectAll("line.horizontalGrid")
        .data([0,50,100,150,200,250,300]).enter()
        .append("line")
            .attr(
            {
                "class":"horizontalGrid",
                "x1" : 0,
                "x2" : 600,
                "y1" : function(d){ return d;},
                "y2" : function(d){ return d;},
                "fill" : "none",
                "opacity" : "0.6",
                "stroke" : "black",
                "stroke-width" : ".5px"
            });
            
    var bbg = wcg.node().getBBox();
    console.log(bbg );
    
    wordcloud.attr("viewBox",
            "0 0 "+(bbg.width+30)+" "+(bbg.height+10));
            
    wcg.attr("transform","translate("+
            (-bbg.x+22)+","+(-bbg.y)+")");
}

function pickColor(bb) {
    var aa = (100-bb)/40;
    var cc = bb;
    var dd = bb/1.5;
    return "rgba(9, "+Math.floor(45+dd)+", "+Math.floor(102+cc)+", "+aa+")";
}

//window.addEventListener('load', makeFigure1 );
//window.addEventListener('load', makeFigure1Mobile );
//window.addEventListener('load', barClickLoad );
window.addEventListener('load', makeWordCloud );

