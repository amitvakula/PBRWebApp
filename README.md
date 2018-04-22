# PBRWebApp

Notes:

jsnetworkx uses d3.v3

Need django package (For Mac - pip install django)

To run, go to PBRWebApp directory, type "python manage.py runserver"

Test changes in rangographs.js and graph.html by visiting localhost:8000/polls/1/graphs

Current Functionality:

1. Mouseover module to highlight itself and its connected modules

2. Click module to fix highlight of single module

3. Double click background to add module

4. Click two non-connected nodes to create connection

Bugs:

1. Newly created nodes can't be highlighted (via click) in the same way as original set of nodes
