D3-OpenLayers
==============

Getting started with D3 Geo and OpenLayers. This app draws the average latitude-longitude (this data is obtained in a csv format) using d3js.
The circles are drawn on an svg element, which is a layer on top of a Bing Map layer, using OpenLayers.

Setup
======

Prerequisites:
--------------
Have python and npm installed.
The openlayers lib is already included in vendor.

Steps:
------
You should have 'bower' installed. If not you can install it using 'npm install bower -g'.

Clone the repo and cd into the repo.

bower install

python -m SimpleHTTPServer 9988

And go to localhost:9988

Thanks
=======
data: http://dev.maxmind.com/static/csv/codes/country_latlon.csv

d3: d3js.org

OpenLayers: http://openlayers.org/
