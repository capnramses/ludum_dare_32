//var global_graph;

var node_radius = 4;

var svg_border = 2;
var control_panel_height = 250;
//var t_div;
//limits of positions of nodes in the graph


////var view_transform = { x_transorm;

function cityViewer(nodes,links){
	
var svg = d3.select("#cityView");
var width = parseInt(svg.attr("width")),
    height = parseInt(svg.attr("height") );

var color = d3.scale.category20();

// calulate the edge cities as node=s
vis = this;

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) {
    	  return d.weight;
    	  });

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 3)
      .style("fill", function(d) { 
    	  if(d.status == "alive") {
    		  return color(d.colorIndex);
    	  }else if(d.status == "immune") {
    		  return "pink";
    	  }
    	  return "black" ; 	  
      });
      //set node and edge positions
      node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
      
      link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
    
//
//  node.append("title")
//      .text(function(d) { return d.id + "_"+d.status; });

	vis.upateColors =  function() {
		svg.selectAll(".node")
			.data(nodes)
            .style("fill", function(d) { 
			  	  if(d.status == "alive") {
			  		  return color(d.colorIndex);
			  	  } else if(d.status == "immune") {
		    		  return "pink";
		    	  }
			  	  return "black";    	  
        });
	};
	
  return vis;
}

function positionCityNodes(cityName, gameGraph) {
	var svg = d3.select("#cityView");
	var cityNodes = gameGraph.getCityNodes(cityName);
	var cityEdges = gameGraph.getCityEdges(cityName);
	if(!cityNodes) {
		console.log("Error in visualiseCity  no city nodes found for " +  cityName);
		return null;
	}
	
	
		var width = parseInt(svg.attr("width")),
		    height = parseInt(svg.attr("height")) ;		    
	    var force = d3.layout.force()
	      .charge(-30)
	      .linkDistance(10)
	      .size([width, height]);	
	    var layoutIterations = 200;
	   
	    force.nodes(cityNodes)
	      .links(cityEdges);	   
	    force.start();
	    for (var i = layoutIterations; i > 0; --i) force.tick();
	    force.stop();
	
};

function  visualiseCity(cityName, gameGraph) {
	console.log("visualising city: " + cityName);
	var svg = d3.select("#cityView");
	svg.selectAll(".node").remove();
	svg.selectAll(".link").remove();
	
	if(cityName != "none") {
		
	
	
	var cityNodes = gameGraph.getCityNodes(cityName);
	var cityEdges = gameGraph.getCityEdges(cityName);
	if(!cityNodes) {
		console.log("Error in visualiseCity  no city nodes found for " +  cityName);
		return null;
	}
	
	if(cityNodes[0].x == null) {
		positionCityNodes(cityName, gameGraph)
		
	}
	var vis = cityViewer(cityNodes, cityEdges);
	
	return vis;
	} 
	return null;
	
}


