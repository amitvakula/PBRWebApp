$(document).ready( function first() {
  var G3 = new jsnx.Graph();

// patients are green
G3.addNodesFrom([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], {group:0, color: '#33FF33'});
// symptoms are red
G3.addNodesFrom(
[[21,	{name:"dry mouth"}],
[22,	{name:"dry lips "}],
[23,	{name:"dry nose"}],
[24,	{name:"dry skin"}],
[25,	{name:"brittle nails"}],
[26,	{name:"pruritus"}],
[27,	{name:"hair loss"}],
[28,	{name:"depression"}],
[29,	{name:"dry eyes"}],
[30,	{name:"fatigue"}],
[31,	{name:"hypertriglyceridemia"}],
[32,	{name:"vertigo"}],
[33,	{name:"GI upset"}],
[34,	{name:"facial redness"}],
[35,	{name:"weight loss"}]]
    , {group:1, color: '#FF2255'});


edges = [];
edges.push([[1,	23],
[1,	25],
[1,	21],
[1,	25],
[2,	30],
[2,	22],
[2,	21],
[3,	21],
[4,	21],
[4,	27],
[5,	31],
[5,	28],
[5,	32],
[5,	29],
[5,	22],
[5,	25],
[6,	24],
[6,	33],
[7,	22],
[7,	24],
[7,	26],
[8,	34],
[8,	35],
[9,	24],
[9,	22],
[9,	25],
[10,	26],
[11,	22],
[11,	25],
[12,	26],
[13,	27],
[13,	22],
[13,	23],
[13,	25],
[14,	27],
[14,	28],
[14,	23],
[15,	22],
[15,	27],
[16,	22],
[16,	26],
[17,	22],
[17,	27],
[17,	25],
[18,	22],
[18,	29],
[19,	22],
[20,	25],
[20,	22],
[20,	21]] );

G3.addEdgesFrom(edges[0]);

var color = d3.scale.category20();
jsnx.draw(G3, {
    element: '#canvas',
    withLabels: true,
    labels: "name",
    labelStyle: {
    		fill: "black",
        textAnchor: "middle",
        dominantBaseline: "central",
        cursor: "pointer",
       	"font-size": "9px",
        "font-weight": "bold",
    },
    nodeShape: "circle",
    layoutAttr: {
        charge: -300,
        linkDistance: 200,
        linkStrength: 3,
    },
    nodeAttr: {
        r: 50,
        title: function(d) { return d.label;},
        id: function(d) {
            return 'node-' + d.node;
        }
    },
    nodeStyle: {
        fill: function(d) {
            console.log(d.data.color);
            return d.data.color;
        },
        stroke: 'black'
    },
    edgeStyle: {
        stroke: '#999'
    }
}, true);

function highlight_nodes(nodes, on) {
    nodes.forEach(function(n) {
        d3.select('#node-' + n).style('fill', function(d) {
            return on ? '#EEE' : d.data.color;
        });
    });
}

function deleteTree(graph, nodes) {
		nodes.forEach(function(n) {
    		return graph.removeNode(n)
}
)}

function deleteNode(graph, node) {
		return graph.removeNode(node)
}

d3.selectAll('.node').on('mouseover', function(d) {
   highlight_nodes(d.G.neighbors(d.node).concat(d.node), true);
});

d3.selectAll('.node').on('mouseout', function(d) {
     highlight_nodes(d.G.neighbors(d.node).concat(d.node), false);
});

// Delete tree
d3.selectAll('.node').on('contextmenu', function(d) {
     deleteTree(d.G, d.G.neighbors(d.node).concat(d.node));
});

// Delete node only
d3.selectAll('.node').on('dblclick', function(d) {
     deleteNode(d.G, d.node);
     // Use 'contextmenu' for right click
     // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
});
});

$(document).ready( function second() {
  // This is a graph generator
  var G = new jsnx.Graph();
  // A simple way to color all nodes in the path:
  G.addNode(1, {name: "Module1"}, {fixed: true});
  G.addNode(2, {name: "Module2"}, {fixed: true});
  G.addEdge(1,2);

  var width = 50,
      height = 50;

  jsnx.draw(G, {
    withLabels: true,
    labels: "name",
    labelStyle: {
    		fill: "black",
        textAnchor: "middle",
        dominantBaseline: "central",
        cursor: "pointer",
       	"font-size": "9px",
        "font-weight": "bold",
    },
    nodeShape: "rect",
    layoutAttr: {
        charge: -300,
        linkDistance: 200,
        linkStrength: 3,
    },
    nodeAttr: {
        x: -width/2,
        y: -height/2,
        width: width,
        height: height,
        title: function(d) { return d.name;},
        id: function(d) {
            return 'node-' + d.node;
        }
    },
    nodeStyle: {
        fill: "black",
        stroke: 'blue'
    },
    edgeStyle: {
        stroke: '#999'
    },
    stickyDrag: true
    // weighted: true,
    // nodeShape: "image",
    // nodeAttr: {
    //     "xlink:href": "https://github.com/favicon.ico",
    //     width: 20,
    //     height: 20,
    //     x: -8,
    //     y: -8
    //     },
    // edgeStyle: {
    //     'stroke-width': 10
    //     }
    }, true);

    // function explicitlyPosition() {
    //     node.each(function(d) {
    //         d.x = 0;
    //         d.y = 0;
    //         d.fixed = true;
    //     });
    //     tick();
    //     node.each(function(d) {
    //         d.fixed = false;
    //     });
    //     force.resume();
    // }

    // function dragstarted(d) {
    //   d.fx = null;
    //   d.fy = null;
    // }
    //
    // function dragged(d) {
    //   d.x = d3.event.x;
    //   d.y = d3.event.y;
    // }
    //
    // function dragended(d) {
    //   d.fx = d3.event.x;
    //   d.fy = d3.event.y;
    // }



    // function tick(nodes) {
    //   nodes.forEach(function(n) {
    //     d3.select('#edge')
    //     .attr("x1", function(d) { return d.source.x; })
    //     .attr("y1", function(d) { return d.source.y; })
    //     .attr("x2", function(d) { return d.target.x; })
    //     .attr("y2", function(d) { return d.target.y; });
    //     d3.select('#node-' + n)
    //     .attr("cx", function(d) { return d.x; })
    //     .attr("cy", function(d) { return d.y; });
    //   });
    // }
    //
    // function position(nodes) {
    //   nodes.forEach(function(d) {
    //       d.x = 100;
    //       d.y = 100;
    //       d.fixed = true;
    //   });
    //   tick(nodes);
    //   nodes.forEach(function(d){
    //       d.fixed = false
    //   });
    // }
    //
    // d3.selectAll('.node').on('click', function(d) {
    //   position(d.G.neighbors(d.node).concat(d.node));
    // });

    function highlight_nodes(nodes, on) {
        nodes.forEach(function(n) {
            d3.select('#node-' + n).style('fill', function(d) {
                return on ? '#EEE' : d.data.color;
            });
        });
    }

    d3.select('g').on('dblclick', function(d) {
        var nodes = G.nodes();
        var last = nodes.reduce(function(a, b) {
            return Math.max(a, b);
        });
        var max = nodes.reduce(function(a, b) {
            return Math.max(a, b) + 1;
        });
        G.addNode(max, {name: "Module"});
        G.addEdge(last, max)
    });

    d3.selectAll('.node').on('mouseover', function(d) {
       highlight_nodes(d.G.neighbors(d.node).concat(d.node), true);
    });

    d3.selectAll('.node').on('mouseout', function(d) {
         highlight_nodes(d.G.neighbors(d.node).concat(d.node), false);
    });

});
