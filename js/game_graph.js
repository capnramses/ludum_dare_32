

function game_graph(){

	var graph = this;
	var nodes=[];
	var edges= [];
	var cities = {};
	var comedians = [];
	var hecklers = [];
	

	graph.addCity = function (name,size,edgeRatio, rewireCoefficient) {
		// name  = cirty name, used as kez in cities map
		// size = number of nodes in the city
		// connectivity = the number of edges each node should connect to
		// rewireCoefficient =  percentage chance of an edge being rewired (0.1 ~= small; world graph, 1.0 = fully random grpah)
		// once grpah is wired  average node degree  will be edge_ratio * 2
		
		if(!rewireCoefficient) {
			rewireCoefficient = 0.1;
		}else if (rewireCoefficient < 0.0) {
			rewireCoefficient = 0.0;
		}else if (rewireCoefficient > 1.0) {
			rewireCoefficient > 1.0;
		}	
		
		if(edgeRatio < 2) {
			console.log("ERROR dangerously low edge ratio");
			return null;
		}
		
		var cityIndex = 0;
		for( item in cities) {
			cityIndex++;
		}
		
		
		cities[name] =  [];
		for( var i = 0; i <  size; i++) {
			var node = {id: "n" +i , status:"alive" , index:i, neighbours: [], colorIndex:cityIndex, city:name};
			nodes.push(node),
			cities[name].push(node);
		}
		// edges are assigned at random
		// we want no disconnected compnents
		// assign 2 edges to each node  wiuth the other end being random
		// only a small chance of a disonnect
		var fully_connected =  false;
		// assign each node to the next two nodes in the node array, forming a lattics
		cities[name].forEach(function(n, index){
			for(var i = 0 ; i < edgeRatio; i= i+1) {
				var newEdge = {source: n, target:  cities[name][(index + i + 1) % size], type: "local", wieght: 1};
				edges.push(newEdge);
			}
		});
		// then randmly rewire the target withg 10% chance to form a small world grpah
		edges.forEach(function(e, index){
			//		get a radom number between 0 and 1 if the number is less 
			//		then the wiring coefficent rewire itherwise don''t
			
			if(e.source.city == name && e.target.city == name) {
				// Only rewire within the same cluster
				var randomNum = Math.random();
				if (randomNum < rewireCoefficient) {
					// reset the target of the edge at random
					
					// choose  another endnode arandom 
					// but not the source as we will have no edge loops
					var newTarget = e.source;
					while(newTarget == e.source) {
						// randomly select ne target
						newTarget = cities[name][Math.floor(Math.random() * cities[name].length )];
					}
					e.target = newTarget;
				}
			}
		});
		
		// nodes rewired..... now lets build the dajacency list for each node
		// to speed up future operations
		edges.forEach(function(e, index) {
			e.source.neighbours.push(e);
			e.target.neighbours.push(e);			
		});
		return graph;
	}
	
	graph.connectCities = function(city1,city2,numberOfConnections){
		// connect two cities via random nodes...
		if(!cities.hasOwnProperty(city1) || !cities.hasOwnProperty(city2) ) {
			console.log("Whoops invalid city name provided.... input names were " + city1 + " , " + city2);
		}
		for(var i = 0; i <numberOfConnections;i++) {
			var newSource = cities[city1][Math.floor(Math.random() * cities[city1].length )];
			var newTarget = cities[city2][Math.floor(Math.random() * cities[city2].length )]
			var newEdge = {source: newSource, target: newTarget, type: "intercity", weight : 3};
			edges.push(newEdge)
			
		}
			
		return graph;
	}
	graph.nodes = function () {
		return nodes;
		}
	graph.edges = function(){
		return edges;
		}
	
	

return graph;	

}





