$(document).ready( function() {
   // This is a graph generator
   var G = jsnx.cycleGraph(6);
   // Compute the shortest path between 0 and 4
   var path = jsnx.bidirectionalShortestPath(G, 0, 4);
   // A simple way to color all nodes in the path:
   G.addNodesFrom(path, {color: '#FFF'});
   // Color the start and end differently
   G.node.get(0).color = '#0F0'; // start is green
   G.node.get(4).color = '#F00'; // end is red

   jsnx.draw(G, {
     element: '#demo-canvas',
     withLabels: true,
     nodeStyle: {
       fill: function(d) {
         return d.data.color || '#AAA'; // any node without color is gray
       }
     }
 });

  // var G = new jsnx.Graph();
  //
  // G.addNodesFrom([1,2,3,4], {group:0});
  // G.addNodesFrom([5,6,7], {group:1});
  // G.addNodesFrom([8,9,10,11], {group:2});
  //
  // G.addPath([1,2,5,6,7,8,11]);
  // G.addEdgesFrom([[1,3],[1,4],[3,4],[2,3],[2,4],[8,9],[8,10],[9,10],[11,10],[11,9]]);
  //
  // var color = d3.scale.category20();
  // jsnx.draw(G, {
  //     element: '#canvas',
  //     layoutAttr: {
  //         charge: -120,
  //         linkDistance: 20
  //     },
  //     nodeAttr: {
  //         r: 5,
  //         title: function(d) { return d.label;}
  //     },
  //     nodeStyle: {
  //         fill: function(d) {
  //             return color(d.data.group);
  //         },
  //         stroke: 'none'
  //     },
  //     edgeStyle: {
  //         fill: '#999'
  //     }
  // }, true);

});
