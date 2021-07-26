# PBRWebApp

Notes:

jsnetworkx uses d3.v3

Need django package (For Mac - pip install django)

To run, go to PBRWebApp directory, type "python manage.py runserver"

Test changes in rangographs.js and graph.html by visiting localhost:8000/polls/1/graphs

_Test new "run" functionality in the "workflow view" by visiting localhost:8000/polls/1/workflow_


For easier debugging, use developer tools in Google Chrome to read console

Current Functionality:

1. Mouseover module to highlight itself and its connected modules

2. Click module to fix highlight of single module

3. Double click background to add module

4. Click two non-connected nodes to create connection

5. Right-click to delete a node and its connected edges

6. Added input validation

_7. Added run Nodes functionality _

Bugs:

1. Click events only work after second click

2. Dragging a node activates click events


Plans:

1. Sidebar or dropdown of modules that can be dragged onto the body of the graph

2. Delete edges by clicking two connected nodes

Extras:

1. Different shapes for different types of modules
