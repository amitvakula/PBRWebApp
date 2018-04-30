///////// Start here
var G = null;
var clicked = false;
var first = null;

$(document).ready( function() {
  // This is a graph generator
  G = new jsnx.DiGraph();

  G.addNode(1, {name: "Base", highlighted: false, input: "Base Input", output: "Output A"});
  G.addNode(2, {name: "Base 2", highlighted: false, input: G.node.get(1).output, output: 2});
  G.addEdge(1,2, {output: G.node.get(1).output});

  // Defines size of modules
  var width = 50,
      height = 50;

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
    // Clicking a module highlights it until it is clicked again or another node is clicked
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

              // Data Validation
              if (d.data.input(first.data.output)) {
                d.G.addEdge(first.node, d.node, {output: d.data.function(first.data.output)}); // Connects clicked node to second node
              }
              else {
                alert("Input is not valid!");
              }

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
    $('#canvas').on('dblclick' , function() {
      add_node();
    });

    // Delete node only
    $("g").on('contextmenu', '.node', function() {
    d3.selectAll('.node').on('contextmenu', function(d) {
        console.log(d.data.name + "has been deleted");
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
    // var last = G.nodes()[G.nodes().length - 1];
    var nodes = G.nodes();
    var max = nodes.reduce(function(a, b) {
        return Math.max(a, b) + 1;
        });
    if (typeof name == 'string') {
      if (name == "Dicomms") { // Dicomms multiplies by 10
        G.addNode(max, {
              name: name,
              highlighted: false,
              input: function(input) {
                if (typeof input == "number") {
                  return true;
                }
                else {
                  console.log(input + " is not a number");
                  return false;
                }
              },
              output: "Output of " + name,
              function: function(input) {
                var value = input * 10;
                G.node.get(max).output = value;
                console.log("Output " + G.node.get(max).output + " should = " + value);
                return value;
              }
        });
      }
      else if (name == "Align") {
        G.addNode(max, {
              name: name,
              highlighted: false,
              input: "Input of " + name,
              output: "Output of " + name,
              function: function() {
                var args = arguments;
                console.log("Args is = " + args)
                for (var a in args) {
                  console.log("Arg " + a);
                }
                G.node.get(max).output = args;
              }
        });
      }
      else if (name == "Nifti") { // Nifti combines array
        G.addNode(max, {
              name: name,
              highlighted: false,
              input: function(input) {
                if (Array.isArray(input)) {
                  return true;
                }
                else {
                  console.log(input + " is not an array");
                  return false;
                }
              },
              output: "Output of " + name,
              function: function(input) {
                var value = input.reduce(function(a, b) {return a + b;}, 0);
                G.node.get(max).output = value;
                console.log("Output " + G.node.get(max).output + " should = " + value);
                return value;
              }
        });
      }
      else if (name == "Sienna") { // Sienna creates array
        G.addNode(max, {
              name: name,
              highlighted: false,
              input: function(input) {
                if (typeof input == "number") {
                  return true;
                }
                else {
                  console.log(input + " is not a number");
                  return false;
                }
              },
              output: "Output of " + name,
              function: function(input) {
                var value = [input, input / 2];
                G.node.get(max).output = value;
                console.log("Output " + G.node.get(max).output + " should = " + value);
                return value;
              }
        });
      }
    }
    else {
      name = "Module " + max
      G.addNode(max, {
            name: name,
            highlighted: false,
            input: "Input of " + name,
            output: "Output of " + name,
            function: "fxn of " + name,
          });
    }
    if (clicked == true) {
       clicked ^= true;
       }
    // Unhighlights all nodes when new one is added
    G.nodes().forEach(function(n) {
        G.node.get(n).highlighted = false;
        highlight_node(n, false);
        });
    first = null;
}

function deleteNode(graph, node) {
		graph.removeNode(node)
    first = null;
    clicked = false;
}

$(document).on("click", '.runbtn', function() {
  // using jQuery
  function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');
  function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }

  $.ajaxSetup({
      beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
      }
  });

  $.ajax({
    // points to the url where your data will be posted
     url:'polls/1/graphs/run/',
     // post for security reason
     type: "POST",
     // data that you will like to return
     data: {number : 2},
     // what to do when the call is success
     success: function(response)
        {
          alert(response);
        },
     // what to do when the call is complete ( you can right your clean from code here)
     complete:function(){},
     // what to do when there is an error
     error:function (xhr, textStatus, thrownError){}

    // function print_graph() {
    //   console.log(G);
    //   console.log(G.nodes());
    //   console.log(G.node.get(1));
    //   console.log(G.edges());
    // }
  });
});
