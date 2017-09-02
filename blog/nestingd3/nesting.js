var stations = [
    {
        "name": "Times Square",
        "x": 80,
        "y": 100,
        "colors":["red","yellow","purple"]
    },
    {
        "name": "Union Square",
        "x": 100,
        "y": 220,
        "colors":["green","yellow","gray"]
    },
    {
        "name": "Fulton Street",
        "x": 130,
        "y": 320,
        "colors":["blue","red","green","brown"]
    }
]
    
var plot = d3.select("body")
                .append("svg")
                .attr("width","70vh")
                .attr("height","100vh")
                .attr("viewBox","0 0 350 500");

// Bind the array of objects
var stationSymbols = plot.selectAll("stations")
                         .data(stations);

// Append an SVG element at the station location
stationSymbols.enter()
    .append("svg")
    .attr("x",function(d){return d.x;})
    .attr("y",function(d){return d.y;})

// Add a blue square for each station
stationSymbols.append("rect")
              .attr("width",30)
              .attr("height",30)
              .attr("fill","skyblue");

// Add an M over each blue square
stationSymbols.append("text")
              .text("M")
              .style("font-size","30px")
              .style("font-family","sans-serif")
              .attr("fill","white")
              .attr("dx",2)
              .attr("dy",26);

// Bind the "colors" array to each station's SVG.
var stationColors = 
        stationSymbols.selectAll("stationColors")
                      .data(function(d){return d.colors;});

// Append a square for each color
stationColors.enter()
             .append("rect")
             .attr("width",30)
             .attr("height",30)
             .attr("x",function(d,i){return 32*(i+1)})
             .attr("fill",function(d){console.log(d);return d;});
    
                
                
                
                
                
                
                
                
                
                