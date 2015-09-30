/*
 Route360° JavaScript API v0.2.1 (442ca8c), a JS library for leaflet maps. http://route360.net
 (c) 2014 Henning Hollburg and Daniel Gerber, (c) 2014 Motion Intelligence GmbH
*/
function GoogleMapsPolygonLayer(t,e){this.map=t,this.id=this.map.getDiv().id,this.inverse=!1,this.topRight={lat:-90,lng:-180},this.bottomLeft={lat:90,lng:180},this.opacity=r360.config.defaultPolygonLayerOptions.opacity,this.strokeWidth=r360.config.defaultPolygonLayerOptions.strokeWidth,this.backgroundColor=r360.config.defaultPolygonLayerOptions.backgroundColor,this.backgroundOpacity=r360.config.defaultPolygonLayerOptions.backgroundOpacity,this.tolerance=r360.config.defaultPolygonLayerOptions.tolerance,this.extendWidthX=r360.config.defaultPolygonLayerOptions.strokeWidth/2,this.extendWidthY=r360.config.defaultPolygonLayerOptions.strokeWidth/2,"undefined"!=typeof e&&("undefined"!=typeof e.opacity&&(this.opacity=e.opacity),"undefined"!=typeof e.strokeWidth&&(this.strokeWidth=e.strokeWidth),"undefined"!=typeof e.inverse&&(this.inverse=e.inverse),"undefined"!=typeof e.tolerance&&(this.tolerance=e.tolerance),"undefined"!=typeof e.extendWidthX&&(this.extendWidthX=e.extendWidthX),"undefined"!=typeof e.extendWidthY&&(this.extendWidthY=e.extendWidthY)),this.element=null,this.setMap(this.map),this.addListener()}window.google&&(GoogleMapsPolygonLayer.prototype=new google.maps.OverlayView,GoogleMapsPolygonLayer.prototype.onAdd=function(){this.element=document.createElement("div"),this.element.id="r360-googlemaps-polygon-layer-canvas-in-"+this.id,this.getPanes().overlayLayer.appendChild(this.element)},GoogleMapsPolygonLayer.prototype.getMapPixelBounds=function(){var t=r360.GoogleMapsUtil.googleLatlngToPoint(this.map,this.map.getBounds().getSouthWest(),this.map.getZoom()),e=r360.GoogleMapsUtil.googleLatlngToPoint(this.map,this.map.getBounds().getNorthEast(),this.map.getZoom());return{max:{x:e.x,y:t.y},min:{x:t.x,y:e.y}}},GoogleMapsPolygonLayer.prototype.getPixelOrigin=function(){var t=r360.PolygonUtil.divide({x:this.map.getDiv().offsetWidth,y:this.map.getDiv().offsetHeight},2),e=r360.GoogleMapsUtil.googleLatlngToPoint(this.map,this.map.getCenter(),this.map.getZoom());return r360.PolygonUtil.roundPoint(r360.PolygonUtil.subtract(e,t.x,t.y))},GoogleMapsPolygonLayer.prototype.getBoundingBox3857=function(){return this.multiPolygons[0].getBoundingBox3857()},GoogleMapsPolygonLayer.prototype.getBoundingBox4326=function(){return this.multiPolygons[0].getBoundingBox4326()},GoogleMapsPolygonLayer.prototype.setInverse=function(t){this.inverse!=t&&(this.inverse=t,this.draw())},GoogleMapsPolygonLayer.prototype.createSvgData=function(t){var e=r360.SvgUtil.createSvgData(t,{bounds:r360.PolygonUtil.extendBounds(this.getMapPixelBounds(),this.extendWidthX,this.extendWidthY),scale:256*Math.pow(2,this.map.getZoom()),tolerance:this.tolerance,pixelOrigin:this.getPixelOrigin(),offset:{x:0,y:0}});return e},GoogleMapsPolygonLayer.prototype.fitMap=function(){var t=this.getBoundingBox4326(),e=t.getSouthWest(),o=t.getNorthEast(),i=new google.maps.LatLngBounds(new google.maps.LatLng(e.lat,e.lng),new google.maps.LatLng(o.lat,o.lng));this.map.fitBounds(i)},GoogleMapsPolygonLayer.prototype.draw=function(t){if("undefined"!=typeof this.multiPolygons&&null!=this.element){this.svgWidth=this.map.getDiv().offsetWidth,this.svgHeight=this.map.getDiv().offsetHeight;var e=$("#svg_"+this.id).offset(),o=$(this.map.getDiv()).offset();"undefined"==typeof this.offset&&(this.offset={x:0,y:0}),"undefined"!=typeof e&&(this.offset.x+=o.left-e.left,this.offset.y+=o.top-e.top),$("#"+this.element.id).empty();for(var i=[],n=0;n<this.multiPolygons.length;n++){for(var s=this.multiPolygons[n],g=[],a=0;a<s.polygons.length;a++)g.push(this.createSvgData(s.polygons[a]));0!=g.length&&i.push(r360.SvgUtil.getGElement(g,{color:this.inverse?"black":s.getColor(),opacity:this.inverse?s.getOpacity():1,strokeWidth:this.strokeWidth}))}var r={id:this.id,offset:this.offset,svgHeight:this.svgHeight,svgWidth:this.svgWidth,backgroundColor:this.backgroundColor,backgroundOpacity:this.backgroundOpacity,opacity:this.opacity,strokeWidth:this.strokeWidth};$("#"+this.element.id).append(this.inverse?r360.SvgUtil.getInverseSvgElement(i,r):r360.SvgUtil.getNormalSvgElement(i,r))}},GoogleMapsPolygonLayer.prototype.update=function(t){this.multiPolygons=t,this.draw()},GoogleMapsPolygonLayer.prototype.addListener=function(){var t=this.map,e=this;google.maps.event.addListener(t,"zoom_changed",function(){e.onRemove(),google.maps.event.addListenerOnce(t,"idle",function(){e.draw()})}),google.maps.event.addListener(t,"dragend",function(){google.maps.event.addListenerOnce(t,"idle",function(){e.draw()})}),google.maps.event.addDomListener(window,"resize",function(){google.maps.event.trigger(t,"resize"),e.draw()})},GoogleMapsPolygonLayer.prototype.onRemove=function(){$("#"+this.element.id).empty()}),r360.GoogleMapsUtil={googleLatlngToPoint:function(t,e,o){var i=t.getProjection().fromLatLngToPoint(e),n=Math.pow(2,o);return new google.maps.Point(i.x*n,i.y*n)},googlePointToLatlng:function(t,e,o){var i=Math.pow(2,o),n=new google.maps.Point(e.x/i,e.y/i),s=t.getProjection().fromPointToLatLng(n);return s}};