function routingExample(){

    // add the map and set the initial center to berlin
    var map = L.map('map-routingExample').setView([52.51, 13.37], 13);

    // attribution to give credit to OSM map data and VBB for public transportation 
    var attribution ="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors | ÖPNV Daten © <a href='http://www.vbb.de/de/index.html' target='_blank'>VBB</a> | developed by <a href='http://www.route360.net/de/' target='_blank'>Route360°</a>";

    // initialising the base map. To change the base map just change following
    // lines as described by cloudmade, mapbox etc..
    // note that mapbox is a paided service
    L.tileLayer('http://a.tiles.mapbox.com/v3/mi.h220d1ec/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: attribution
    }).addTo(map);

    // set the service key, this is a demo key
    // please contact us and request your own key
    r360.config.serviceKey = 'iWJUcDfMWTzVDL69EWCG';

    // create a target marker icon to be able to distingush source and targets
    var redIcon = L.icon({iconUrl: 'lib/leaflet/images/marker-icon-red.png', 
        shadowUrl: 'lib/leaflet/images/marker-shadow.png', iconAnchor: [12,45], popupAnchor:  [0, -35] });

    // create a source and a two target markers and add them to the map
    var sourceMarker = L.marker([52.50086, 13.36581]).addTo(map);
    var targetMarker1 = L.marker([52.52562, 13.30195], {icon:redIcon}).addTo(map);
    var targetMarker2 = L.marker([52.51998, 13.41714], {icon:redIcon}).addTo(map);

    // add a layer in which we will paint the route
    var routeLayer = L.featureGroup().addTo(map);

    // you need to define some options for the polygon service
    // for more travel options check out the other tutorials
    var travelOptions = r360.travelOptions();
    // we only have one source which is the marker we just added
    travelOptions.addSource(sourceMarker);
    // add two targets to the options
    travelOptions.addTarget(targetMarker1);
    travelOptions.addTarget(targetMarker2);
    // set the travel type to transit
    travelOptions.setTravelType('transit');
    
    // start the service
    r360.RouteService.getRoutes(travelOptions, function(routes){

        // one route for each source and target combination
        _.each(routes, function(route){

            // console.log(route);

            // create one polyline for the route and a polyline for the polyline's halo
            _.each(r360.Util.routeToLeafletPolylines(route, { addPopup : false }), function(polylineSegment){

                // add halo and line
                _.each(polylineSegment, function(polylines){ polylines.addTo(routeLayer); });
            });

            // add marker if the route segment changes, indicates transfers
            _.each(route.getSegments(), function(segment, index) {
                
                // only add changing markers for öpnv switches 
                if ( segment.getType() == "TRANSFER" ) {

                    // create a small circlular marker to indicate the users have to switch trips
                    var marker = L.circleMarker(_.last(route.getSegments()[index - 1].getPoints()), { color: "white", 
                        fillColor: '#EF832F', fillOpacity: 1.0, stroke : true, radius : 7 }).addTo(routeLayer);
                }
            });
        });

        // fit the map perfectly or show an error message
        if ( routes.length > 0) { map.fitBounds(routeLayer.getBounds(), {padding : [25,25]}) }
        else alert(r360.config.i18n.noRouteFound[r360.config.i18n.language]);
    });
}