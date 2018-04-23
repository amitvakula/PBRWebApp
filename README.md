# PBRWebApp

Notes:

jsnetworkx uses d3.v3

Need django package (For Mac - pip install django)

To run, go to PBRWebApp directory, type "python manage.py runserver"

Test changes in rangographs.js and graph.html by visiting localhost:8000/polls/1/graphs

For easier debugging, use developer tools in Google Chrome to read console

Current Functionality:

1. Mouseover module to highlight itself and its connected modules

2. Click module to fix highlight of single module

3. Double click background to add module

4. Click two non-connected nodes to create connection

Bugs:

1. Click events only work after second click

Plans:

1. Sidebar or dropdown of modules that can be dragged onto the body of the graph

Extras:

1. Different shapes for different types of modules
