///////// Start here
var G = null;
var clicked = false;
var first = null;

$(document).ready( function() {
  // This is a graph generator
  G = new jsnx.DiGraph();
//   G.addNode(1, {name: "New MRI", highlighted: false, input: "Base Input", output: "Processing"});
//   G.addNode(2, {name: "Send to UCSF PACs", highlighted: false, input:G.node.get(1).output, output: "Upload"});
//   G.addNode(3, {name: "Download to radiology cluster", highlighted: false, input: G.node.get(2).output, output: "Store"});
//   G.addNode(4, {name: "Archive to MSPACMAN", highlighted: false, input: G.node.get(3), output: "Upload"});
//   G.addNode(5, {name: "Download back to radiology cluster", highlighted: false, input: G.node.get(4), output: "Output A"});
//   G.addNode(6, {name: "MRI Database ", highlighted: false, input: G.node.get(5), output: "Store/Request MRIs"});
//   G.addNode(7, {name: "Upload to Google Cloud ", highlighted: false, input: G.node.get(6), output: "Upload"});
//   G.addNode(8, {name: "msID ", highlighted: false, input: G.node.get(7), output: "Get ID"});
//   G.addNode(9, {name: "Download data to Flywheel ", highlighted: false, input: G.node.get(8), output: "Uploading Data"});
//   G.addNode(10, {name: "run SIENA or Flywheel", highlighted: false, input: G.node.get(9), output: "Starting Program"});
//   G.addNode(11, {name: "Put Metric in Google Firestore", highlighted: false, input: G.node.get(10), output: "Store"});
//   G.addNode(12, {name: "Put files in GCS bucket DB", highlighted: false, input: G.node.get(11), output: "Store"});
  
    G.addNodesFrom([
        [1, {name:'New MRI',size: 50, shape: 'rect', color: 'lightblue'}], [2, {name:'Send to UCSF Pacs',shape: 'circle', color: 'lightgreen'}]
        ]);
    console.log(G.nodes(true));
//   G.addEdge(1,2, {output: G.node.get(1).output});
//   G.addEdge(2,3, {output: G.node.get(2).output});
//   G.addEdge(3,4, {output: G.node.get(3).output});
//   G.addEdge(4,5, {output: G.node.get(4).output});
//   G.addEdge(5,6, {output: G.node.get(5).ouput});
//   G.addEdge(6,8, {output: G.node.get(6).ouput});
//   G.addEdge(8,9, {output: G.node.get(9).output})
//   G.addEdge(5,7, {output: G.node.get(5).output});
//   G.addEdge(7,9, {output: G.node.get(8).output});
//   G.addEdge(9,10, {output: G.node.get(5).output});
//   G.addEdge(10,11, {output: G.node.get(5).output});
//   G.addEdge(10,12, {output: G.node.get(5).output});

  // Defines size of modules
//   var width = 50,
//       height = 50;

  // JSNX Draw function - see documentation and examples online
  jsnx.draw(G, {
    element: '#canvas',
    withLabels: true,
    labels: "name",
    labelStyle: {
    		fill: "black",
        textAnchor: "middle",
        dominantBaseline: "central",
        cursor: "pointer",
       	"font-size": "8px",
        "font-weight": "bold",
    },
    nodeStyle: {
        fill: function(d){
            return d.data.color || '#AAA'; // any node without color is gray
        },
        stroke: 'blue',
    },
   
    layoutAttr: {
        charge: -300,
        linkDistance: 200,
        linkStrength: 3,
    },
    nodeAttr: {

        r: function(d){
            return d.data.size || 30;
        },
        title: function(d) { return d.name;},
        id: function(d) {
            return 'node-' + d.node;
        }
    },
    
    withEdgeLabels: true,
    edgeLabels: function(d) {return d.data.output},
    edgeLabelStyle: {
    		fill: "black",
        // textAnchor: "middle",
        // dominantBaseline: "central",
        "alignment-baseline": "text-after-edge", // places text above edge
        cursor: "text",
       	"font-size": "10px",
        "font-weight": "bold",
    },
    edgeStyle: {
        stroke: '#999',
        // fill: "#EEE",
        "stroke-width": "5",
        "stroke": "100",
    },
    edgeOffset: 30, // Changes length of edge/connection
    stickyDrag: true // Fixes node in place after dragging
    }, true);


    //// Mouse Events
    $("g").on({
      // Hovering over a node highlights itself and its connected nodes until mouseout
      mouseover:
      function() {
      d3.selectAll('.node').on('mouseenter', function(d) {
        clicked == false ?
          highlight_nodes(d.G.neighbors(d.node).concat(d.node), true): clicked;
          });
    },
      // Unhighlights nodes after moving mouse out of node, unless node was clicked
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
    }, '.node');
    
});

// Used on mouseover and mouseleave to highlight tree of nodes
function highlight_nodes(nodes, on) {
    nodes.forEach(function(n) {
        d3.select('#node-' + n).style('fill', function(d) {
            return on ? 'blue' : '#EEE';
        });
    });
}


