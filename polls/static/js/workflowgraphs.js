///////// Start here
var G = null;
var clicked = false;
var first = null;

$(document).ready(function () {
  // This is a graph generator
  G = new jsnx.DiGraph();
  G.addNodesFrom([
    [1, { name: "New MRI", size: 50, color: "#FFFACD" }],
    [2, { name: "Send to UCSF Pacs", color: "lightgreen" }],
    [
      3,
      { name: "Download to radiology cluster", size: 50, color: "lightpink" },
    ],
    [4, { name: "Archive to MSPACMAN", color: "lightgrey" }],
    [5, { name: "Download back to radiology cluster", color: "lightpink" }],
    [6, { name: "MRI Database", color: "#FFFACD" }],
    [7, { name: "Upload to Google Cloud", color: "lightblue" }],
    [8, { name: "msID", color: "lavender" }],
    [9, { name: "Download data to Flywheel", color: "gold" }],
    [10, { name: "run SIENA or Flywheel", color: "gold" }],
    [11, { name: "Put Metric in Google Firestore", color: "lightblue" }],
    [12, { name: "Put files in GCS bucket DB", color: "lightblue" }],
  ]);

  G.addEdgesFrom([
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 12],
  ]);

  //   Defines size of modules
  var width = 50,
    height = 50;

  // JSNX Draw function - see documentation and examples online
  jsnx.draw(
    G,
    {
      element: "#canvas",
      d3: d3,
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
      nodeShape: "circle",
      nodeStyle: {
        fill: function (d) {
          return d.data.color || "#AAA";
        },
        stroke: "blue",
      },
      layoutAttr: {
        charge: -1000,
        linkDistance: 100,
        linkStrength: 1,
      },
      nodeAttr: {
        x: function (d) {
          return -d.data.size / 2 || -width / 2;
        },
        y: function (d) {
          return -d.data.size / 2 || -height / 2;
        },
        width: function (d) {
          return d.data.size || width;
        },
        height: function (d) {
          return d.data.size || height;
        },
        r: function (d) {
          return d.data.size || 30;
        },
        title: function (d) {
          return d.name;
        },
        id: function (d) {
          return "node-" + d.node;
        },
      },
      withEdgeLabels: true,
      edgeLabels: function (d) {
        return d.data.output;
      },
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
        stroke: "#999",
        // fill: "#EEE",
        "stroke-width": "5",
        stroke: "100",
      },
      edgeOffset: 30, // Changes length of edge/connection
      stickyDrag: true, // Fixes node in place after dragging
    },
    true
  );

  //// Mouse Events
  $("g").on(
    {
      // Hovering over a node highlights itself and its connected nodes until mouseout
      mouseover: function () {
        d3.selectAll(".node").on("mouseenter", function (d) {
          clicked == false
            ? highlight_nodes(d.G.neighbors(d.node).concat(d.node), true)
            : clicked;
        });
      },
      // Unhighlights nodes after moving mouse out of node, unless node was clicked
      mouseout: function () {
        clicked == false
          ? d3.selectAll(".node").on("mouseleave", function (d) {
            highlight_nodes(d.G.neighbors(d.node).concat(d.node), false);
          })
          : // Ensures that a highlighted node via mousedown is not unhighlighted by hovering over another node
          d3.selectAll(".node").on("mouseleave", function (d) {
            d.G.neighbors(d.node).forEach(function (n) {
              d.G.node.get(n).highlighted
                ? clicked
                : highlight_nodes(d.G.neighbors(d.node), false);
            });
          });
      },
    },
    ".node"
  );

  async function getNewMri() {
    return new Promise((resolve, reject) => {
      let validResponse = false;
      changeColor(1, "orange");
      window.setTimeout(() => {
        validResponse = true;
        if (validResponse) {
          resolve(validResponse);
          changeColor(1, "lightgreen");
        } else
          reject(() => {
            console.log("invalid New MRI response");
            validResponse = false;
          });
      }, 3000);
    });
  } 

  async function sendResultsPacs() {
    console.log("executing task");

    let result = await getNewMri();
    if (!result) {
      console.log("stopping chain. Error Occured");
    }

    changeColor(1, "lightgreen");
    return new Promise((resolve, reject) => {
      let validResponse = false;
      changeColor(2, "orange");
      window.setTimeout(() => {
        validResponse = true;
        if (validResponse) {
          resolve(validResponse);
          changeColor(2, "lightgreen");
        } else
          reject(() => {
            console.log("invalid New MRI response");
            validResponse = false;
          });
      }, 3000);
    });
  }

  async function runGraph() {
    let r = await sendResultsPacs();
  }

  let btn = document.getElementById("runBtn");
  btn.addEventListener("click", runGraph);

});

// Used on mouseover and mouseleave to highlight tree of nodes
function highlight_nodes(nodes, on) {
  nodes.forEach(function (n) {
    d3.select("#node-" + n).style("fill", function (d) {
      return on ? "aquamarine" : d.data.color;
    });
  });
}

//changes color of a node
function changeColor(number, color) {
  d3.select("#node-" + number)
    .transition()
    .duration(500)
    .delay(50)
    .style("fill", color)
    .style("stroke", color);
}

/*let promiseCount = 0;
  let check = true;
  let node = 1;
  function testPromise() {
    let thisPromiseCount = ++promiseCount;
    // begin
    console.log('beforeend', thisPromiseCount + ') Started<br>');
    // We make a new promise: we promise a numeric count of this promise, starting from 1 (after waiting 3s)
    let p1 = new Promise((resolve, reject) => {
      // The executor function is called with the ability to resolve or reject the promise
      console.log('beforeend', thisPromiseCount + ') Promise constructor<br>');

      // This is only an example to create asynchronism
      window.setTimeout(function() {
          // We fulfill the promise !
          resolve(thisPromiseCount);
      }, Math.random() * 9000 + 1000);
    });


    for (current in G.nodes()){
      p1.then(function(val) {
        // Log the fulfillment value
        console.log('beforeend', val + ') Promise fulfilled<br>');
        changeColor(node,'lightgreen');
        node += 1;
        console.log(node)
      }).catch((reason) => {
        // Log the rejection reason
        console.log(`Handle rejected promise (${reason}) here.`);
        check = false;
      });
      // end
      console.log( thisPromiseCount + ') Promise made<br>');
      changeColor(node,'orange');
    }


  }



  if ("Promise" in window) {
    let btn = document.getElementById("runBtn");
    btn.addEventListener("click",testPromise);
  } else {

    console.log("Live example not available as your browser doesn't support the <code>Promise<code> interface.");
  }*/
