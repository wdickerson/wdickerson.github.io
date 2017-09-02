var myA = [5,2,4,6,1,3];
insertionSort(myA);

function insertionSort(A){
makeVisual(A);
    for(var j=1;j<A.length;j++) {
        var key = A[j];
        var i = j - 1;
        while(i>=0 && A[i]>key) {
            A[i+1] = A[i];
            i = i - 1;
        }
        A[i+1]=key;
        setTimeout(makeVisual,j*1000,A.slice());
    }
}

function makeVisual(A) {      
    //Clear a div and prepare an SVG area for drawing
    document.getElementById("visual-div").innerHTML="";  
    var visualArea = d3.select("#visual-div")
                   .append("svg")
                   .attr("width","100%")
                   .attr("height","100%")
                   .attr("viewBox","0 0 600 600");
    
    //Determine bar width and make a height scale
    var barWidth = 500/A.length;
    var hScale = d3.scale.linear()
          .domain([0,d3.max(A)])
          .range([ 0, 250 ]);
    
    //Append some data
    var visualBars = 
        visualArea.append("g")
                  .selectAll("bars")
                  .data(A).enter();
     
    //Draw bars 
    visualBars.append("rect")
        .attr("x", function(d,i){return 60+(i*barWidth);} ) 
        .attr("y", function(d){return 250-hScale(d);} )
        .attr("height",function(d){return hScale(d);})
        .attr("width",barWidth-10)
        .attr("class","bar");
}
