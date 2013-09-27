var apiKey = '',
    ID = 'capitalsLayer',
    epsg_4326 = new OpenLayers.Projection('EPSG:4326'),
    epsg_900913 = new OpenLayers.Projection('EPSG:900913');
var extent = [
    -20037508.34, -20037508.34,
    20037508.34, 20037508.34
];

map = new OpenLayers.Map('map', {
    numZoomLevels: 20,
    projection: epsg_900913,
    //maxExtent: extent,
    //restrictedExtent: extent,
    controls: [
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.Zoom(),
        new OpenLayers.Control.ScaleLine(),
        new OpenLayers.Control.LayerSwitcher(),
        new OpenLayers.Control.MousePosition(),
        new OpenLayers.Control.KeyboardDefaults()
    ]
});

var hybrid = new OpenLayers.Layer.Bing({
    key: apiKey,
    type: "Road",
    name: "Bing Road"
});

map.addLayers([hybrid]);
map.zoomTo(3);

d3.csv("data/country_latlon.csv", function (data) {
    console.log(data);
    var overlay = new OpenLayers.Layer.Vector("capitals", {}, {layerId: ID});
    // Add the container when the overlay is added to the map.
    overlay.afterAdd = function () {
        overlay.div.id = ID;
        //get the vector layer div element
        var div = d3.selectAll("#" + overlay.div.id);

        //remove the existing svg element and create a new one
        div.selectAll("svg").remove();

        var svg = div.append("svg")
        svg.attr('width', 700)
            .attr('height', 500);

        function draw(){
            svg.selectAll('g').remove();
            var g = svg.append('g');
            var feature = g.selectAll('circle')
                .data(data)
                .enter().append("circle")
                .attr("r", function(d, i){
                    return 3;
                })
                .attr("cx", function(d, i){
                    console.log(d);
                    var y = d['latitude'];
                    var x = d['longitude'];
                    var p = project([x, y]);
                    return p[0];
                })
                .attr("cy", function(d, i){
                    var y = d['latitude'];
                    var x = d['longitude'];
                    var p = project([x, y]);
                    return p[1];
                })
                .style("fill", function(d, i){
                    return '#FE8C1C';
                })
                .style("stroke", "#000000")
                .on('click', function(d){
                    document.getElementById('countryCode').innerText = d['iso 3166 country'];
                });
        }

        map.events.register("moveend", map, draw);
        map.events.register("zoomend", map, draw);
        draw();

        function project(p) {
            var point = new OpenLayers.LonLat(p[0], p[1]);
            point = point.transform(epsg_4326, epsg_900913);
            var p = map.getViewPortPxFromLonLat(point);
            console.log("p = ", p);
            console.log("point = ", point);
            return [p.x, p.y];
        }
    }
    map.addLayer(overlay);
});