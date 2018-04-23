// Ignore this first event handler - see the second one
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


});

var G = null;
var clicked = false;
var first = null;

$(document).ready( function second() {
  // This is a graph generator
  G = new jsnx.DiGraph();

  G.addNode(1, {name: "Base", highlighted: false, input: "Input A", output: "Output A"});
  G.addNode(2, {name: "Base 2", highlighted: false, input: "Input A", output: "Output B"});
  G.addEdge(1,2, {output: "Output A"});

  // Defines size of modules
  var width = 50,
      height = 50;

  // JSNX Draw function - see documentation and examples online
  jsnx.draw(G, {
    withLabels: true,
    labels: "name",
    labelStyle: {
    		fill: "black",
        textAnchor: "middle",
        dominantBaseline: "central",
        cursor: "pointer",
       	"font-size": "11px",
        "font-weight": "bold",
    },
    nodeShape: "rect",
    // nodeShape: "image", - For using image as background of node
    layoutAttr: {
        charge: -300,
        linkDistance: 200,
        linkStrength: 3,
    },
    nodeAttr: {
        // "xlink:href": "https://github.com/favicon.ico" - For using image as background of node
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
        fill: "#EEE", // color is gray - hex shorthand notation
        stroke: 'blue',
    },
    withEdgeLabels: true,
    edgeLabels: function(d) {console.log(d); return d.data.output},
    edgeLabelStyle: {
    		fill: "black",
        // textAnchor: "middle",
        // dominantBaseline: "central",
        "alignment-baseline": "text-after-edge",
        cursor: "pointer",
       	"font-size": "10px",
        "font-weight": "bold",
    },
    edgeStyle: {
        stroke: '#999',
        // fill: "#EEE",
        "stroke-width": "5",
        "stroke": "100",

    },
    edgeOffset: 25,
    stickyDrag: true // Fixes node in place after dragging
    }, true);

    $("g").on({
      mouseover:
      function() {
      d3.selectAll('.node').on('mouseenter', function(d) {
        clicked == false ?
          highlight_nodes(d.G.neighbors(d.node).concat(d.node), true): clicked;
          });
    },
      mouseout:
      function() {
      clicked == false ?
      d3.selectAll('.node').on('mouseleave', function(d) {
           highlight_nodes(d.G.neighbors(d.node).concat(d.node), false)
      }) :
      // Ensures that a highlighted node via mousedown is not unhighlighted by hovering over another node
      d3.selectAll('.node').on('mouseleave', function(d) {
        d.G.neighbors(d.node).forEach(function(n) {
            d.G.node.get(n).highlighted ? clicked : highlight_nodes(d.G.neighbors(d.node), false);
          });
      });
    },
    // Clicking a module highlights it
      click:
      function() {
        d3.selectAll('.node, .node.fixed').on('click', function(d) {
          clicked ^= true;
            if (clicked == true && first == null) {
              highlight_node(d.node, clicked);
              d.data.highlighted = true;
              first = d;

              console.log("First node = " + first.node);
              console.log("Clicked = " + clicked);
            }
            else if (first != null && first.node != d.node) {
              console.log(first.node + " and " + d.node);

              d.G.addEdge(first.node, d.node, {input: d.data.input, output: first.data.output}); // Connects clicked node to second node

              highlight_node(first.node, false); // Unhighlights original node
              first.data.highlighted = false;
              clicked = false;
              first = null; // Connection is complete, no more first node
            }
            else {
              d.data.highlighted = false; // Unhighlights originally clicked node
              highlight_node(d.node, false);
              first = null;

              console.log("First should be null = " + first);
              console.log("Clicked = " + clicked);
              }
        });
    },
  }, '.node');

    // Double clicking on the background creates a new module
    $('body').on('dblclick' , function() {
      add_node();
    });

    // Delete node only
    $("g").on('contextmenu', '.node', function() {
    d3.selectAll('.node').on('contextmenu', function(d) {
        console.log(d.node);
         deleteNode(d.G, d.node);
         // Use 'contextmenu' for right click
         // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
       });
   });
});

// Used on mouseover and mouseleave to highlight tree of nodes
function highlight_nodes(nodes, on) {
    nodes.forEach(function(n) {
        d3.select('#node-' + n).style('fill', function(d) {
            return on ? 'yellow' : '#EEE';
        });
    });
}

// Used on mousedown to highlight single node
function highlight_node(node, clicked) {
  d3.selectAll('#node-' + node).style('fill', function(d) {
      return clicked ? 'yellow' : '#EEE';
  });
}

// Function adds a node higher in number than the highest valued node
function add_node(name) {
    var last = G.nodes()[G.nodes().length - 1];
    var nodes = G.nodes();
    var max = nodes.reduce(function(a, b) {
        return Math.max(a, b) + 1;
        });
    console.log(name);
    if (typeof name == 'string') {
      G.addNode(max, {name: name, highlighted: false, input: "Input of " + name, output: "Output of " + name});
       if (clicked == true) {
          clicked ^= true;
          }
    }
    else {
      name = "Module " + max
      G.addNode(max, {name: name, highlighted: false, input: "Input of " + name, output: "Output of " + name});
       if (clicked == true) {
          clicked ^= true;
          }
    }
    // Unhighlights all nodes when new one is added
    G.nodes().forEach(function(n) {
        G.node.get(n).highlighted = false;
        highlight_node(n, false);
        });
    first = null;
}

function deleteNode(graph, node) {
		return graph.removeNode(node)
}
