var desserts = ["Cookies","Cupcakes","Ice Cream Cones","Muffins"];
var customers = [34,41,52,18];

var margin = {top: 10, right: 10, bottom: 120, left: 30};
var width = 300 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

//Non-responsive chart area
//var chart = d3.select("#chart-div")
//                .append("svg")
//                .attr("width",width+margin.left+margin.right)
//                .attr("height",height+margin.top+margin.bottom)
//                .append("g")
//                .attr("transform","translate("+
//                    margin.left+","+margin.top+")");
                    
//A responsive chart area
var chart = d3.select("#chart-div")
                .append("svg")
                .attr("width","100%")
                .attr("height","100%")
                .attr("viewBox","0 0 "+
                    (width+margin.left+margin.right)+
                    " "+
                    (height+margin.top+margin.bottom) )
                //.attr("preserveAspectRatio","none")
                .append("g")
                .attr("transform","translate("+
                    margin.left+","+margin.top+")");

//Define the x and y scales
var x = d3.scale.ordinal()
          .domain(desserts)
          .rangePoints([0,width],1);         
var y = d3.scale.linear()
          .domain([0,60])
          .range([height,0]); 

//Define the x and y axes
var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");
var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");

//Add the x axis, rotate the labels
chart.append("g")
     .attr("transform", "translate(0,"+height+")")
     .call(xAxis)
     .selectAll("text")
     .attr("transform", "rotate(-65)")
     .style("text-anchor", "end");
  
//Add the y axis
chart.append("g")
     .call(yAxis);

//Add the bars
chart.selectAll("bars")
     .data(desserts).enter()
     .append("rect")
     .attr("x",function (d) { return x(d)-20; })
     .attr("y",function (d,i) { return y(customers[i]); })
     .attr("height",function (d,i) { return height-y(customers[i]); })
     .attr("width",50);

