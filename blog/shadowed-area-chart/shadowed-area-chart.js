const dates = [
  '6/1', '6/2', '6/3', '6/4', '6/5', '6/6', '6/7',
  '6/8', '6/9', '6/10', '6/11', '6/12', '6/13', '6/14'
];
const desserts = [
  80, 76, 74, 75, 73, 64, 58,
  42, 43, 52, 55, 57, 61, 64
]
const scones = [
  21, 20, 17, 18, 15, 19, 21,
  22, 19, 19, 22, 24, 28, 30
]

const margin = { top: 30, bottom: 30, left: 30, right: 30 };
const width = 400;
const height = 400;

// No shadow
///////////////

//// Append an svg and g element
//const svg = d3.select("#vis")
//  .append("svg")
//  .attr("width","100%")
//  .attr("height","100%")
//  .attr("viewBox","0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom));
//  
//const vis = svg.append('g')
//  .attr('transform','translate(' + margin.left + ', ' + margin.top + ')');
//
//// Set up the scales
//const x = d3.scalePoint()
//  .domain(dates)
//  .range([0, width]);
//const y = d3.scaleLinear()
//  .domain([0, 85])
//  .range([height, 0]);
//
//// Describe the shapes to be drawn
//const area = d3.area()
//  .x(function(d, i) { return x(dates[i]); })
//  .y0(height)
//  .y1(function(d) { return y(d); });
//
//// Draw desserts 
//vis.append("path")
//  .datum(desserts)
//  .attr("fill", "deepskyblue")
//  .attr("d", area);
//      
//// Draw scones 
//vis.append("path")
//  .datum(scones)
//  .attr("fill", "royalblue")
//  .attr("d", area);
//
//// Draw the axes
//vis.append('g')
//  .attr('transform', 'translate(0,' + height + ')')
//  .call(d3.axisBottom(x));
//  
//vis.append('g')
//  .call(d3.axisLeft(y));
//
//// Add a legend
//vis.append('text')
//  .attr('transform','translate(' + (width - 130) + ',' + 30 + ')')
//  .attr('font-size','160%')
//  .attr('font-weight','bolder')
//  .html(
//    '<tspan fill="deepskyblue" x="0" dy="1em">&#9724; Desserts</tspan>' + 
//    '<tspan fill="royalblue" x="0" dy="1em">&#9724; Scones</tspan>' );

    
// With shadow
///////////////////

// Append an svg and g element
const visBg = d3.select("#vis")
  .append("svg")
  .style('position','absolute')
  .style('-webkit-filter','drop-shadow(1px -2px 2px gray)')
  .style('filter','none')
  .attr("width","100%")
  .attr("height","100%")
  .attr("viewBox","0 0 " + 
    (width + margin.left + margin.right) + " " + 
    (height + margin.top + margin.bottom))
  .append('g')
  .attr('transform','translate(' + margin.left + ', ' + margin.top + ')');
  
const visFg = d3.select("#vis")
  .append("svg")
  .style('position','absolute')
  .style('-webkit-filter','drop-shadow(1px -3px 3px gray)')
  .style('filter','none')
  .attr("width","100%")
  .attr("height","100%")
  .attr("viewBox","0 0 " + 
    (width + margin.left + margin.right) + " " + 
    (height + margin.top + margin.bottom))
  .append('g')
  .attr('transform','translate(' + margin.left + ', ' + margin.top + ')');
  
const visAxes = d3.select("#vis")
  .append("svg")
  .style('position','absolute')
  .attr("width","100%")
  .attr("height","100%")
  .attr("viewBox","0 0 " + 
    (width + margin.left + margin.right) + " " + 
    (height + margin.top + margin.bottom))
  .append('g')
  .attr('transform','translate(' + margin.left + ', ' + margin.top + ')');

// Set up the scales
const x = d3.scalePoint()
  .domain(dates)
  .range([0, width]);
const y = d3.scaleLinear()
  .domain([0, 85])
  .range([height, 0]);

// Describe the shapes to be drawn
const area = d3.area()
  .x(function(d, i) { return x(dates[i]); })
  .y0(height)
  .y1(function(d) { return y(d); });

// Draw desserts 
visBg.append("path")
  .datum(desserts)
  .attr("fill", "deepskyblue")
  .attr("d", area);
      
// Draw scones 
visFg.append("path")
  .datum(scones)
  .attr("fill", "royalblue")
  .attr("d", area);

// Draw the axes
visAxes.append('g')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(x));
  
visAxes.append('g')
  .call(d3.axisLeft(y));

// Add a legend
visAxes.append('text')
  .attr('transform','translate(' + (width - 130) + ',' + 30 + ')')
  .attr('font-size','160%')
  .attr('font-weight','bolder')
  .html(
    '<tspan fill="deepskyblue" x="0" dy="1em">&#9724; Desserts</tspan>' + 
    '<tspan fill="royalblue" x="0" dy="1em">&#9724; Scones</tspan>' );



  

    


