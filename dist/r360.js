/*
 Route360° JavaScript API 0.1-dev (8671da4), a JS library for leaflet maps. http://route360.net
 (c) 2014 Henning Hollburg and Daniel Gerber, (c) 2014 Motion Intelligence GmbH
*/
!function(t){function e(){var e=t.r360;o.noConflict=function(){return t.r360=e,this},t.r360=o}var o={version:"0.1-dev"};"object"==typeof module&&"object"==typeof module.exports?module.exports=o:"function"==typeof define&&define.amd?define(o):e(),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),o=this,n=function(){},i=function(){return o.apply(this instanceof n&&t?this:t,e.concat(Array.prototype.slice.call(arguments)))};return n.prototype=this.prototype,i.prototype=new n,i}),o.config={nominatimUrl:"http://geocode.route360.net/",serviceUrl:"http://localhost:8080/api/",serviceVersion:"v1",pathSerializer:"compact",maxRoutingTime:3600,defaultTravelTimeControlOptions:{travelTimes:[{time:600,color:"#006837"},{time:1200,color:"#39B54A"},{time:1800,color:"#8CC63F"},{time:2400,color:"#F7931E"},{time:3e3,color:"#F15A24"},{time:3600,color:"#C1272D"}],position:"topright",label:"travel time",initValue:1800},routeTypes:[{routeType:102,color:"#006837"},{routeType:400,color:"#156ab8"},{routeType:900,color:"red"},{routeType:700,color:"#A3007C"},{routeType:1e3,color:"blue"},{routeType:109,color:"#006F35"},{routeType:100,color:"red"},{routeType:1,color:"red"}],defaultPlaceAutoCompleteOptions:{serviceUrl:"http://geocode.route360.net:8983/solr/select?",position:"topleft",reset:!1,reverse:!1,placeholder:"Select source",maxRows:5,width:300},defaultRadioOptions:{position:"topright",icon:"../img/bike.png"},defaultButtonOptions:{position:"topright",icon:"ui-icon-info"},defaultTravelMode:{type:"bike",speed:15,uphill:20,downhill:-10},defaultPolygonLayerOptions:{opacity:.8,strokeWidth:5},i18n:{language:"de",departure:{en:"Departure",de:"Abfahrt"},line:{en:"Line",de:"Linie"},arrival:{en:"Arrival",de:"Ankunft"},from:{en:"From",de:"Von"},to:{en:"To",de:"Nach"},travelTime:{en:"Travel time",de:"Reisezeit"},totalTime:{en:"Total time",de:"Gesamtzeit"},distance:{en:"Distance",de:"Distanz"},wait:{en:"Please wait!",de:"Bitte warten!"},elevation:{en:"Elevation",de:"Höhenunterschied"},timeFormat:{en:"a.m.",de:"Uhr"},reset:{en:"Reset input",de:"Eingeben löschen"},reverse:{en:"Switch source and target",de:"Start und Ziel tauschen"},noRouteFound:{en:"No route found!",de:"Keine Route gefunden!"},monthNames:{de:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]},dayNames:{de:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]},dayNamesMin:{de:["So","Mo","Di","Mi","Do","Fr","Sa"]},get:function(t){var e;return _.each(_.keys(o.config.i18n),function(n){t==n&&(e=o.config.i18n[t][o.config.i18n.language])}),e}}},o.Util={getTimeInSeconds:function(){var t=new Date;return 3600*t.getHours()+60*t.getMinutes()+t.getSeconds()},getHoursAndMinutesInSeconds:function(){var t=new Date;return 3600*t.getHours()+60*t.getMinutes()},getCurrentDate:function(){var t=new Date,e=t.getFullYear(),o=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,n=t.getDate()<10?"0"+t.getDate():t.getDate();return e+""+o+n},getTimeFormat:function(t){var e=o.config.i18n;return"en"==e.language&&t>=43200?"p.m.":e.get("timeFormat")},secondsToHoursAndMinutes:function(t){var e=(t/60).toFixed(0),o=Math.floor(e/60);e-=60*o;var n="";return 0!=o&&(n+=o+"h "),n+=e+"min"},secondsToTimeOfDay:function(t){var e=Math.floor(t/3600),o=Math.floor(t/60)-60*e;return t=t-3600*e-60*o,e+":"+("0"+o).slice(-2)+":"+("0"+t).slice(-2)},generateId:function(t){var e="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";return _.each(_.range(t?t:10),function(){e+=o.charAt(Math.floor(Math.random()*o.length))}),e},parseLatLonArray:function(t){var e=new Array;return _.each(t,function(t){e.push(L.latLng(t[0],t[1]))}),e},routeToLeafletPolylines:function(t,e){var n=[];return _.each(t.getSegments(),function(i,a){var r={};r.color=i.getColor();var s={};s.weight=7,s.color="white",(0==a||a==t.getLength()-1)&&(r.dashArray="1, 8");var l=L.polyline(i.getPoints(),s),p=L.polyline(i.getPoints(),r),u=o.config.i18n,d=u.language,c="";"undefined"!=typeof i.getWarning()&&(c="<tr><td colspan='3'><b>"+i.getWarning()+"</b></td></tr>");var h=L.popup({autoPan:!1});if(h.setContent(i.isTransit()?"<table style='width:400px; color:#07456b'>                         <tr>                             <td>"+u.line[d]+": <b>"+i.routeShortName+"</b></td>                             <td>"+u.from[d]+": <b>"+i.getStartName()+"</b></td>                             <td>"+u.departure[d]+": <b>"+o.Util.secondsToTimeOfDay(i.getDepartureTime())+"</b></td>                             <td>"+u.to[d]+": <b>"+i.getEndName()+"</b></td>                         </tr>                         <tr>                             <td>"+u.arrival[d]+": <b>"+o.Util.secondsToTimeOfDay(i.getArrivalTime())+"</b></td>                             <td>"+u.travelTime[d]+": <b>"+o.Util.secondsToHoursAndMinutes(i.getTravelTime())+"</b></td>                             <td>"+u.totalTime[d]+": <b>"+o.Util.secondsToHoursAndMinutes(t.getTravelTime())+"</b></td>                         </tr>                         <div id='chart' style='width:250px; height:100px'></div>                         "+c+"                     </table>":"<table style='width:400px; color:#07456b'>                         <tr>                             <td>"+u.travelTime[d]+": <b>"+o.Util.secondsToHoursAndMinutes(i.getTravelTime())+"</b></td>                             <td>"+u.distance[d]+": <b>"+i.getLength()+"km</b></td>                             <td>"+u.elevation[d]+": <b>"+i.getElevationGain()+"m</b></td></tr>                             <td>"+u.totalTime[d]+": <b>"+o.Util.secondsToHoursAndMinutes(t.getTravelTime())+"</b></td>                         </tr>                         "+c+"                     </table>                     <div id='chart' style='width:250px; height:100px'></div>"),e.addPopup){var g=_.has(e,"popup")?e.popup:h;p.bindPopup(g),l.bindPopup(g)}n.push([l,p])}),n},parsePolygons:function(t){var e=new Array;return t.error?errorMessage:(_.each(t.polygons,function(t){var n=o.polygon();n.setTravelTime(t.travelTime),n.setColor(_.findWhere(o.config.defaultTravelTimeControlOptions.travelTimes,{time:n.getTravelTime()}).color),n.setOuterBoundary(o.Util.parseLatLonArray(t.outerBoundary)),n.setBoundingBox(),_.each(t.innerBoundary,function(t){n.addInnerBoundary(o.Util.parseLatLonArray(t))}),e.push(n)}),e)},parseRoutes:function(t){var e=new Array;return _.each(t.routes,function(t){var n=o.route(t.travelTime);_.each(t.segments,function(t){n.addRouteSegment(o.routeSegment(t))}),e.push(n)}),e}},o.PolygonService={getTravelTimePolygons:function(t,e){var n,i,a,r=15,s=20,l=-10,p=o.Util.getTimeInSeconds(),u=o.Util.getCurrentDate();"undefined"==typeof e&&alert("callback needs to be defined"),"undefined"!=typeof t?(_.has(t,"sources")?n=t.sources:alert("No sources for routing given!"),i=_.has(t,"travelTimes")?t.travelTimes:o.config.defaultTravelTimeControlOptions.travelTimes,a=_.has(t,"travelMode")?t.travelMode:o.config.defaultTravelMode,_.has(t,"speed")&&(t.speed<1?alert("Speed needs to larger then 0."):r=t.speed),"undefined"!=typeof t.uphill&&(s=t.uphill),"undefined"!=typeof t.downhill&&(l=t.downhill),(0>s||l>0||-l>s)&&alert("Uphill speed has to be larger then 0. Downhill speed has to be smaller then 0.                     Absolute value of downhill speed needs to be smaller then uphill speed."),_.has(t,"uphill")&&(s=t.uphill),_.has(t,"downhill")&&(l=t.downhill),_.has(t,"time")&&(p=t.time),_.has(t,"date")&&(u=t.date),_.has(t,"wait")&&t.wait.show()):alert("define travel options");var d={polygon:{values:i},sources:[]};_.each(n,function(t){var e={id:_.has(t,"id")?t.id:t.getLatLng().lat+";"+t.getLatLng().lng,lat:t.getLatLng().lat,lon:t.getLatLng().lng,tm:{}};e.tm[a.type]={},console.log(e),"transit"==a.type&&(e.tm.transit.frame={time:p,date:u}),"bike"==a.type&&(e.tm.bike={speed:r,uphill:s,downhill:l}),"walk"==a.type&&(e.tm.walk={speed:r,uphill:s,downhill:l}),d.sources.push(e)}),$.getJSON(o.config.serviceUrl+o.config.serviceVersion+"/polygon?cfg="+encodeURIComponent(JSON.stringify(d))+"&cb=?",function(n){_.has(t,"wait")&&t.wait.hide(),e(o.Util.parsePolygons(n))})}},o.RouteService={getRoutes:function(t,e){var n,i,a=15,r=20,s=-10,l=o.Util.getTimeInSeconds(),p=o.Util.getCurrentDate(),u="compact";if("undefined"==typeof e&&alert("callback needs to be defined"),"undefined"!=typeof t?(_.has(t,"pathSerializer")&&(u=t.pathSerializer),_.has(t,"sources")?n=t.sources:alert("No sources for routing given!"),_.has(t,"targets")?i=t.targets:alert("No targets for routing given!"),travelTimes=_.has(t,"travelTimes")?t.travelTimes:o.config.defaultTravelTimeControlOptions.travelTimes,travelMode=_.has(t,"travelMode")?t.travelMode:o.config.defaultTravelMode,_.has(t,"speed")&&(t.speed<1?alert("Speed needs to larger then 0."):a=t.speed),_.has(t,"uphill")&&(r=t.uphill),_.has(t,"downhill")&&(s=t.downhill),_.has(t,"time")&&(l=t.time),_.has(t,"date")&&(p=t.date),(0>r||s>0||-s>r)&&alert("Uphill speed has to be larger then 0. Downhill speed has to be smaller then 0.                     Absolute value of downhill speed needs to be smaller then uphill speed."),_.has(t,"wait")&&t.wait.show()):alert("Travel options not defined! Cannot call Route360° service!"),0!=n.length&&0!=i.length){var d={sources:[],targets:[],pathSerializer:u};_.each(n,function(t){var e={id:_.has(t,"id")?t.id:t.getLatLng().lat+";"+t.getLatLng().lng,lat:t.getLatLng().lat,lon:t.getLatLng().lng,tm:{}};e.tm[travelMode.type]={},"transit"==travelMode.type&&(e.tm.transit.frame={time:l,date:p}),"bike"==travelMode.type&&(e.tm.bike={speed:a,uphill:r,downhill:s}),"walk"==travelMode.type&&(e.tm.walk={speed:a,uphill:r,downhill:s}),d.sources.push(e)}),d.targets=[],_.each(i,function(t){var e={};e.id=_.has(t,"id")?t.id:t.getLatLng().lat+";"+t.getLatLng().lng,e.lat=t.getLatLng().lat,e.lon=t.getLatLng().lng,d.targets.push(e)}),$.getJSON(o.config.serviceUrl+o.config.serviceVersion+"/route?cfg="+encodeURIComponent(JSON.stringify(d))+"&cb=?",function(n){_.has(t,"wait")&&t.wait.hide(),e(o.Util.parseRoutes(n))})}}},o.TimeService={getRouteTime:function(t,e){var n,i,a=o.Util.getTimeInSeconds(),r=o.Util.getCurrentDate();"undefined"!=typeof t?(_.has(t,"sources")?n=t.sources:alert("No sources for routing given!"),_.has(t,"targets")?i=t.targets:alert("No targets for routing given!"),travelMode=_.has(t,"travelMode")?t.travelMode:o.config.defaultTravelMode):alert("Travel options not defined! Cannot call Route360° service!");var s={sources:[],targets:[],pathSerializer:_.has(t,"pathSerializer")?t.pathSerializer:o.config.pathSerializer,maxRoutingTime:_.has(t,"maxRoutingTime")?t.pathSerializer:o.config.maxRoutingTime};_.each(n,function(t){console.log(t);var e={id:_.has(t,"id")?t.id:t.getLatLng().lat+";"+t.getLatLng().lng,lat:t.getLatLng().lat,lon:t.getLatLng().lng,tm:{}};e.tm[travelMode.type]={},"transit"==travelMode.type&&(e.tm.transit.frame={time:a,date:r}),"bike"==travelMode.type&&(e.tm.bike={speed:speed,uphill:uphill,downhill:downhill}),"walk"==travelMode.type&&(e.tm.walk={speed:speed,uphill:uphill,downhill:downhill}),"car"==travelMode.type&&(e.tm.car={}),s.sources.push(e)}),_.each(i,function(t){var e={};e.id=_.has(t,"id")?t.id:t.getLatLng().lat+";"+t.getLatLng().lng,e.lat=t.getLatLng().lat,e.lon=t.getLatLng().lng,s.targets.push(e)}),$.ajax({url:o.config.serviceUrl+o.config.serviceVersion+"/time",type:"POST",data:JSON.stringify(s),contentType:"application/json",dataType:"json",success:function(t){e(t)},error:function(t,e,o){console.log(t.status),console.log(o)}})}},o.placeAutoCompleteControl=function(t){return new o.PlaceAutoCompleteControl(t)},o.PlaceAutoCompleteControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(o.config.defaultPlaceAutoCompleteOptions)),"undefined"!=typeof t&&(_.has(t,"position")&&(this.options.position=t.position),_.has(t,"label")&&(this.options.label=t.label),_.has(t,"country")&&(this.options.country=t.country),_.has(t,"reset")&&(this.options.reset=t.reset),_.has(t,"reverse")&&(this.options.reverse=t.reverse),_.has(t,"placeholder")&&(this.options.placeholder=t.placeholder),_.has(t,"width")&&(this.options.width=t.width),_.has(t,"maxRows")&&(this.options.maxRows=t.maxRows))},onAdd:function(t){var e=this,n="",i=L.DomUtil.create("div",this._container);e.options.map=t;var a=$(t._container).attr("id");t.on("resize",this.onResize.bind(this));var r=o.config.i18n,s=this.options.width;e.options.reset&&(s+=44),e.options.reverse&&(s+=37);var l='style="width:'+s+'px;"';return e.options.input='<div class="input-group autocomplete" '+l+'>                 <input id="autocomplete-'+a+'" style="color: black;width:'+s+'"                 type="text" class="form-control" placeholder="'+this.options.placeholder+'" onclick="this.select()">',e.options.reset&&(e.options.input+='<span class="input-group-btn">                     <button class="btn btn-autocomplete" onclick="this.onReset()" type="button" title="'+r.get("reset")+'"><i class="fa fa-times"></i></button>                 </span>'),e.options.reverse&&(this.options.input+='<span class="input-group-btn">                     <button class="btn btn-autocomplete" onclick="this.onReverse()" type="button" title="'+r.get("reverse")+'"><i class="fa fa-arrows-v"></i></button>                 </span>'),e.options.input+="</div>",$(i).append(e.options.input),L.DomEvent.disableClickPropagation(i),_.has(e.options,"country")&&(n+=" AND country:"+e.options.country),$(i).find("#autocomplete-"+a).autocomplete({source:function(t,o){e.source=this;for(var i=t.term.split(" "),a=new Array,r="",s="",l=0;l<i.length;l++)-1!=i[l].search(".*[0-9].*")?a.push(i[l]):r+=i[l]+" ";if(a.length>0){s+=" OR ";for(var p=0;p<a.length;p++){var u="(postcode : "+a[p]+" OR housenumber : "+a[p]+" OR street : "+a[p]+") ";s+=u}}$.ajax({url:e.options.serviceUrl,dataType:"jsonp",jsonp:"json.wrf",async:!1,data:{wt:"json",indent:!0,rows:e.options.maxRows,qt:"en",q:"("+r+s+")"+n},success:function(n){var i=new Array;o($.map(n.response.docs,function(o){if("boundary"!=o.osm_key){var n=o.coordinate.split(","),a={},r=[],s=[];return a.name=o.name,a.city=o.city,a.street=o.street,a.housenumber=o.housenumber,a.country=o.country,a.postalCode=o.postcode,a.name&&r.push(a.name),a.city&&r.push(a.city),a.street&&s.push(a.street),a.housenumber&&s.push(a.housenumber),a.postalCode&&s.push(a.postalCode),a.city&&s.push(a.city),!_.has(e.options,"country")&&a.country&&s.push(a.country),_.each(i,function(t){t==""+r.join()+s.join()}),i.push(""+r.join()+s.join()),{label:r.join(", "),value:r.join(", "),firstRow:r.join(", "),secondRow:s.join(" "),term:t.term,latlng:new L.LatLng(n[0],n[1])}}}))}})},minLength:2,select:function(t,o){e.options.value=o.item,e.options.onSelect(o.item)},open:function(){},close:function(){},create:function(){}}).data("ui-autocomplete")._renderItem=function(t,e){function o(t){return t.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}var n="<a><span class='address-row1'>"+e.firstRow+"</span><br/><span class='address-row2'>  "+e.secondRow+"</span></a>",i=e.term?(""+n).replace(new RegExp(o(e.term),"gi"),"<strong>$&</strong>"):n;return $("<li>").append(i).appendTo(t)},this.onResize(),i},onReset:function(t){var e=this;$(this.options.resetButton).click(t),$(this.options.resetButton).click(function(){$(e.options.input).val("")})},onReverse:function(t){$(this.options.reverseButton).click(t)},onResize:function(){var t=this;$(t.options.input).css(this.options.map.getSize().x<550?{width:"45px"}:{width:""})},onSelect:function(t){var e=this;e.options.onSelect=t},setFieldValue:function(t){$(this.options.input).val(t)},getFieldValue:function(){return $(this.options.input).val()},getValue:function(){return this.options.value}}),o.TravelStartDateControl=L.Control.extend({options:{position:"topright",dateFormat:"yy-mm-dd"},initialize:function(t){L.Util.setOptions(this,t)},onChange:function(t){this.options.onChange=t},onAdd:function(t){var e=this;e.options.map=t;var n=L.DomUtil.create("div","startDatePicker",this._container);e.datepicker=$("<div/>"),$(n).append(e.datepicker);var i={onSelect:function(){e.options.onChange(e.getValue())},firstDay:1},a=o.config.i18n;return"en"!=a.language&&(i.monthNames=a.monthNames[a.language],i.dayNames=a.dayNames[a.language],i.dayNamesMin=a.dayNamesMin[a.language]),$(e.datepicker).datepicker(i),L.DomEvent.disableClickPropagation(n),n},getValue:function(){var t=this,e=$(t.datepicker).datepicker({dateFormat:"dd-mm-yy"}).val(),o=e.split("/"),n=o[2]+""+o[0]+o[1];return n}}),o.travelStartDateControl=function(){return new o.TravelStartDateControl},o.TravelStartTimeControl=L.Control.extend({options:{position:"topright",range:!1,min:0,max:86400,step:600,initValue:28800,value:0},initialize:function(t){this.options.value=o.Util.getHoursAndMinutesInSeconds(),L.Util.setOptions(this,t)},onSlideStop:function(t){this.options.slideStop=t},minToString:function(t){t/=60;var e=Math.floor(t/60),o=t-60*e;return e>24&&(e-=24),10>e&&(e="0"+e),10>o&&(o="0"+o),0==o&&(o="00"),e+":"+o},onAdd:function(t){var e=this;e.options.map=t,e.options.mapId=$(t._container).attr("id"),t.on("resize",this.onResize.bind(this));var n=L.DomUtil.create("div","startTimeSlider",this._container);return e.miBox=$("<div/>",{"class":"mi-box"}),e.startTimeInfo=$("<div/>"),e.label=$("<span/>"),e.slider=$("<div/>"),$(n).append(e.miBox.append(e.startTimeInfo.append(e.label)).append(e.slider)),$(e.label).text(o.config.i18n.get("departure")+": "+e.minToString(this.options.value)+" "+o.Util.getTimeFormat(e.options.value)),$(e.slider).slider({range:e.options.range,value:e.options.value,min:e.options.min,max:e.options.max,step:e.options.step,slide:function(t,n){$(e.label).text(o.config.i18n.get("departure")+": "+e.minToString(n.value)+" "+o.Util.getTimeFormat(n.value)),e.options.value=n.value},stop:function(t,o){e.options.slideStop(o.value)}}),this.onResize(),L.DomEvent.disableClickPropagation(n),n},onResize:function(){this.options.map.getSize().x<550?(this.removeAndAddClass(this.miBox,"leaflet-traveltime-slider-container-max","leaflet-traveltime-slider-container-min"),this.removeAndAddClass(this.startTimeInfo,"travel-time-info-max","travel-time-info-min"),this.removeAndAddClass(this.slider,"leaflet-traveltime-slider-max","leaflet-traveltime-slider-min")):(this.removeAndAddClass(this.miBox,"leaflet-traveltime-slider-container-min","leaflet-traveltime-slider-container-max"),this.removeAndAddClass(this.startTimeInfo,"travel-time-info-min","travel-time-info-max"),this.removeAndAddClass(this.slider,"leaflet-traveltime-slider-min","leaflet-traveltime-slider-max"))},removeAndAddClass:function(t,e,o){$(t).addClass(o),$(t).removeClass(e)},getValue:function(){return this.options.value}}),o.travelStartTimeControl=function(){return new o.TravelStartTimeControl},o.TravelTimeControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(o.config.defaultTravelTimeControlOptions)),"undefined"!=typeof t&&(_.has(t,"position")&&(this.options.position=t.position),_.has(t,"initValue")&&(this.options.initValue=t.initValue),_.has(t,"label")&&(this.options.label=t.label),_.has(t,"travelTimes")&&(this.options.travelTimes=t.travelTimes),_.has(t,"icon")&&(this.options.icon=t.icon)),this.options.maxValue=_.max(this.options.travelTimes,function(t){return t.time}).time/60,this.options.step=(this.options.travelTimes[1].time-this.options.travelTimes[0].time)/60},onAdd:function(t){var e=this;this.options.map=t,t.on("resize",this.onResize.bind(this));for(var o="",n=100/this.options.travelTimes.length,i=0;i<this.options.travelTimes.length;i++)0==i?o+='<div style="position: absolute; top: 0; bottom: 0; left: '+i*n+"%; right: "+(100-(i+1)*n)+"%; background-color: "+this.options.travelTimes[i].color+'; -moz-border-top-left-radius: 8px;-webkit-border-radius-topleft: 8px; border-top-left-radius: 8px; -moz-border-bottom-left-radius: 8px;-webkit-border-radius-bottomleft: 8px; border-bottom-left-radius: 8px;"></div>':i<this.options.travelTimes.length-1?o+='<div style="position: absolute; top: 0; bottom: 0; left: '+i*n+"%; right: "+(100-(i+1)*n)+"%; background-color: "+this.options.travelTimes[i].color+';"></div>':i==this.options.travelTimes.length-1&&(o+='<div style="position: absolute; top: 0; bottom: 0; left: '+i*n+"%; right: "+(100-(i+1)*n)+"%; background-color: "+this.options.travelTimes[i].color+'; -moz-border-top-right-radius: 8px;-webkit-border-radius-topright: 8px; border-top-right-radius: 8px; -moz-border-bottom-right-radius: 8px;-webkit-border-radius-bottomright: 8px; border-bottom-right-radius: 8px;"></div>');this.options.sliderContainer=L.DomUtil.create("div",this._container),this.options.miBox=$("<div/>",{"class":"mi-box"}),this.options.travelTimeInfo=$("<div/>"),this.options.travelTimeSlider=$("<div/>",{"class":"no-border"}).append(o);var a=$("<div/>",{"class":"ui-slider-handle"});this.options.labelSpan=$("<span/>",{text:this.options.label+" "}),"undefined"!=this.options.icon&&(this.options.iconHTML=$("<img/>",{src:this.options.icon})),this.options.travelTimeSpan=$("<span/>",{text:this.options.initValue});var r=$("<span/>",{text:"min"});return $(this.options.sliderContainer).append(this.options.miBox),this.options.miBox.append(this.options.travelTimeInfo),this.options.miBox.append(this.options.travelTimeSlider),this.options.travelTimeSlider.append(a),this.options.travelTimeInfo.append(this.options.iconHTML).append(this.options.labelSpan).append(this.options.travelTimeSpan).append(r),$(this.options.travelTimeSlider).slider({range:!1,value:e.options.initValue,min:0,max:e.options.maxValue,step:e.options.step,slide:function(t,o){return 0==o.value?!1:void $(e.options.travelTimeSpan).text(o.value)},stop:function(t,o){for(var n=new Array,i=0;i<o.value;i+=e.options.step)n.push(e.options.travelTimes[i/e.options.step]);e.options.onSlideStop(n)}}),this.onResize(),L.DomEvent.disableClickPropagation(this.options.sliderContainer),this.options.sliderContainer},onResize:function(){this.options.map.getSize().x<550?(this.removeAndAddClass(this.options.miBox,"leaflet-traveltime-slider-container-max","leaflet-traveltime-slider-container-min"),this.removeAndAddClass(this.options.travelTimeInfo,"travel-time-info-max","travel-time-info-min"),this.removeAndAddClass(this.options.travelTimeSlider,"leaflet-traveltime-slider-max","leaflet-traveltime-slider-min")):(this.removeAndAddClass(this.options.miBox,"leaflet-traveltime-slider-container-min","leaflet-traveltime-slider-container-max"),this.removeAndAddClass(this.options.travelTimeInfo,"travel-time-info-min","travel-time-info-max"),this.removeAndAddClass(this.options.travelTimeSlider,"leaflet-traveltime-slider-min","leaflet-traveltime-slider-max"))},removeAndAddClass:function(t,e,o){$(t).addClass(o),$(t).removeClass(e)},onSlideStop:function(t){var e=this.options;e.onSlideStop=t},getValues:function(){for(var t=this.options,e=new Array,o=0;o<$(this.options.travelTimeSlider).slider("value");o+=t.step)e.push(t.travelTimes[o/t.step].time);return e}}),o.travelTimeControl=function(t){return new o.TravelTimeControl(t)},o.waitControl=function(t){return new L.Control.WaitControl(t)},L.Control.WaitControl=L.Control.extend({options:{position:"topleft"},initialize:function(t){L.Util.setOptions(this,t)},onAdd:function(t){this.options.map=t,this.options.mapId=$(t._container).attr("id"),console.log(this.options.mapId);var e=L.DomUtil.create("div","leaflet-control-wait");return $(e).append('<div id="wait-control-'+this.options.mapId+'" class="mi-box waitControl">                 <i class="fa fa-spinner fa-spin"></i> '+o.config.i18n.get("wait")+"            </div>"),e},show:function(){$("#wait-control-"+this.options.mapId).show()},hide:function(){$("#wait-control-"+this.options.mapId).hide()}}),o.RadioButtonControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(o.config.defaultRadioOptions)),"undefined"!=typeof t&&("undefined"!=typeof t.position&&(this.options.position=t.position),"undefined"!=typeof t.buttons?this.options.buttons=t.buttons:alert("No buttons supplied!"))},onAdd:function(t){var e=this;this.options.map=t;var o=L.DomUtil.create("div",this._container);return this.options.input=this.getRadioButtonHTML(),$(o).append(this.options.input),$(this.options.input).buttonset({}).change(function(){e.options.checked=$("input[name='r360_radiobuttongroup_"+e.options.buttonGroupId+"']:checked").attr("key"),e.options.onChange(e.options.checked)}),$(this.options.input).each(function(){$(this).tooltip({position:{my:"center top+10",at:"center bottom",using:function(t,e){$(this).css(t),$("<div>").addClass("arrow top").addClass(e.vertical).addClass(e.horizontal).appendTo(this)}}})}),L.DomEvent.addListener(o,"click",L.DomEvent.stopPropagation),o},onChange:function(t){this.options.onChange=t},getValue:function(){return this.options.checked},getRadioButtonHTML:function(){var t=this;t.options.buttonGroupId=o.Util.generateId(5);var e=$("<div/>",{id:t.options.buttonGroupId});return _.each(t.options.buttons,function(n){var i=o.Util.generateId(),a=$("<input/>",{type:"radio",id:"r360_"+i,value:n.key,key:n.key,name:"r360_radiobuttongroup_"+t.options.buttonGroupId}),r=$("<label/>",{"for":"r360_"+i,text:n.label});n.checked&&(t.options.checked=n.key,a.attr({checked:"checked"})),"undefined"!=typeof n.tooltip&&r.attr({title:n.tooltip}),e.append(a),e.append(r)}),e}}),o.radioButtonControl=function(t){return new o.RadioButtonControl(t)},o.Polygon=function(t,e){var o=this;o.topRight=new L.latLng(-90,-180),o.bottomLeft=new L.latLng(90,180),o.centerPoint=new L.latLng(0,0),o.travelTime=t,o.color,o.outerBoundary=e,o.innerBoundaries=new Array,o.setOuterBoundary=function(t){o.outerBoundary=t},o.addInnerBoundary=function(t){o.innerBoundaries.push(t)},o.getBoundingBox=function(){return new L.LatLngBounds(this._bottomLeft,this._topRight)},o.setBoundingBox=function(){_.each(this.outerBoundary,function(t){t.lat>o.topRight.lat&&(o.topRight.lat=t.lat),t.lat<o.bottomLeft.lat&&(o.bottomLeft.lat=t.lat),t.lng>o.topRight.lng&&(o.topRight.lng=t.lng),t.lng<o.bottomLeft.lng&&(o.bottomLeft.lng=t.lng)}),o.centerPoint.lat=o.topRight.lat-o.bottomLeft.lat,o.centerPoint.lon=o.topRight.lon-o.bottomLeft.lon},o.getCenterPoint=function(){return o.centerPoint},o.getColor=function(){return o.color},o.setTravelTime=function(t){o.travelTime=t},o.getTravelTime=function(){return o.travelTime},o.setColor=function(t){o.color=t}},o.polygon=function(t,e){return new o.Polygon(t,e)},o.MultiPolygon=function(){var t=this;t._topRight=new L.latLng(-90,-180),t._bottomLeft=new L.latLng(90,180),t.travelTime,t.color,t.polygons=new Array,t.addPolygon=function(e){t.polygons.push(e)},t.setColor=function(e){t.color=e},t.getColor=function(){return t.color},t.getTravelTime=function(){return t.travelTime},t.setTravelTime=function(e){t.travelTime=e},t.getBoundingBox=function(){return new L.LatLngBounds(t._bottomLeft,t._topRight)},t.setBoundingBox=function(){_.each(t.polygons,function(e){e._topRight.lat>t._topRight.lat&&(t._topRight.lat=e._topRight.lat),e._bottomLeft.lat<t._bottomLeft.lat&&(t._bottomLeft.lat=e._bottomLeft.lat),e._topRight.lng>t._topRight.lng&&(t._topRight.lng=e._topRight.lng),e._bottomLeft.lng<t._bottomLeft.lng&&(t._bottomLeft.lng=e._bottomLeft.lng)})}},o.multiPolygon=function(){return new o.MultiPolygon},o.RouteSegment=function(t){var e=this;e.polyLine=L.polyline([]),e.color="#07456b",e.points=t.points,e.routeType=t.routeType,e.travelTime=t.travelTime,e.length=t.length,e.warning=t.warning,e.elevationGain=t.elevationGain,e.errorMessage,e.transitSegment=!1,_.each(t.points,function(t){e.polyLine.addLatLng(t)}),t.isTransit&&(e.color=_.findWhere(o.config.routeTypes,{routeType:t.routeType}).color,e.transitSegment=!0,e.routeShortName=t.routeShortName,e.startname=t.startname,e.endname=t.endname,e.departureTime=t.departureTime,e.arrivalTime=t.arrivalTime,e.tripHeadSign=t.tripHeadSign),e.getPoints=function(){return e.points},e.getColor=function(){return e.color},e.getTravelTime=function(){return e.travelTime},e.getLength=function(){return e.length},e.getRouteShortName=function(){return e.routeShortName},e.getStartName=function(){return e.startname},e.getEndName=function(){return e.endname},e.getDepartureTime=function(){return e.departureTime},e.getArrivalTime=function(){return e.arrivalTime},e.getTripHeadSign=function(){return e.tripHeadSign},e.getWarning=function(){return e.warning},e.getElevationGain=function(){return e.elevationGain},e.isTransit=function(){return e.transitSegment}},o.routeSegment=function(t){return new o.RouteSegment(t)},o.Route=function(t){var e=this;e.travelTime=t,e.routeSegments=new Array,e.addRouteSegment=function(t){e.routeSegments.push(t)},e.setTravelTime=function(t){e.travelTime=t},e.getLength=function(){return e.routeSegments.length},e.getSegments=function(){return e.routeSegments},e.getTravelTime=function(){return e.travelTime}},o.route=function(t){return new o.Route(t)},o.Route360PolygonLayer=L.Class.extend({initialize:function(t){this.opacity=o.config.defaultPolygonLayerOptions.opacity,this.strokeWidth=o.config.defaultPolygonLayerOptions.strokeWidth,"undefined"!=typeof t&&("undefined"!=typeof t.opacity&&(this.opacity=t.opacity),"undefined"!=typeof t.strokeWidth&&(this.strokeWidth=t.strokeWidth)),this._multiPolygons=new Array},getBoundingBox:function(){return new L.LatLngBounds(this._bottomLeft,this._topRight)},onAdd:function(t){this._map=t,this._el=L.DomUtil.create("div","my-custom-layer-"+$(t._container).attr("id")+" leaflet-zoom-hide"),$(this._el).css({opacity:this.opacity}),$(this._el).attr("id","canvas"+$(this._map._container).attr("id")),this._map.getPanes().overlayPane.appendChild(this._el),this._map.on("viewreset",this._reset,this),this._reset()},addLayer:function(t){var e=this;e._resetBoundingBox(),e._multiPolygons=new Array,_.each(t,function(t){e._updateBoundingBox(t.outerBoundary),e._addPolygonToMultiPolygon(t)}),e._multiPolygons.sort(function(t,e){return e.getTravelTime()-t.getTravelTime()}),e._reset()},_addPolygonToMultiPolygon:function(t){_.each(this._multiPolygons,function(e){return e.getTravelTime()==t.travelTime?void e.addPolygon(t):void 0});var e=new o.multiPolygon;e.setTravelTime(t.travelTime),e.addPolygon(t),e.setColor(t.getColor()),this._multiPolygons.push(e)},_resetBoundingBox:function(){this._latlng=new L.LatLng(-180,90),this._topRight=new L.latLng(-90,-180),this._bottomLeft=new L.latLng(90,180)},_updateBoundingBox:function(t){var e=this;_.each(t,function(t){t.lat>e._topRight.lat?e._topRight.lat=t.lat:t.lat<e._bottomLeft.lat&&(e._bottomLeft.lat=t.lat),t.lng>e._topRight.lng?e._topRight.lng=t.lng:t.lng<e._bottomLeft.lng&&(e._bottomLeft.lng=t.lng)}),e._latlng.lat<e._topRight.lat&&(e._latlng.lat=e._topRight.lat),e._latlng.lng>e._bottomLeft.lng&&(e._latlng.lng=e._bottomLeft.lng)},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._el),t.off("viewreset",this._reset,this)},_buildString:function(t,e,o){return t+=o+e.x+" "+e.y},_createSVGData:function(t){var e=this;pathData="";var o=this._map.latLngToLayerPoint(t[0]);return pathData=this._buildString(pathData,o,"M"),_.each(t,function(t){t=e._map.latLngToLayerPoint(t),pathData=e._buildString(pathData,t,"L")}),pathData+="z "},clearLayers:function(){$("#canvas"+$(this._map._container).attr("id")).empty(),this.initialize()},_reset:function(){var t=this;if(this._multiPolygons.length>0){var e=this._map.latLngToLayerPoint(this._latlng),o=100;e.x-=o,e.y-=o,L.DomUtil.setPosition(this._el,e),-1!=navigator.appVersion.indexOf("MSIE 9.")&&$("#canvas"+$(this._map._container).attr("id")).css("transform","translate("+e.x+"px, "+e.y+"px)"),-1!=navigator.appVersion.indexOf("MSIE 8.")&&$("#canvas"+$(this._map._container).attr("id")).css({position:"absolute"}),$("#canvas"+$(this._map._container).attr("id")).empty();for(var n,i,a=this._map.latLngToLayerPoint(this._bottomLeft),r=this._map.latLngToLayerPoint(this._topRight),s=Raphael("canvas"+$(this._map._container).attr("id"),r.x-a.x+2*o,a.y-r.y+2*o),l=s.set(),p="",u=(new Array,0);u<this._multiPolygons.length;u++){n=this._multiPolygons[u],p="";
for(var d=0;d<n.polygons.length;d++){i=n.polygons[d],p+=this._createSVGData(i.outerBoundary);for(var c=0;c<i.innerBoundaries.length;c++)p+=this._createSVGData(i.innerBoundaries[c]);{this._map.latLngToLayerPoint(i.topRight),this._map.latLngToLayerPoint(i.bottomLeft)}}if(-1!=navigator.appVersion.indexOf("MSIE 8.")&&u<this._multiPolygons.length-1)for(var h=0;h<this._multiPolygons[u+1].polygons.length;h++){var g=this._multiPolygons[u+1].polygons[h];p+=this._createSVGData(g.outerBoundary)}var m=n.getColor(),f=s.path(p).attr({fill:m,stroke:m,"stroke-width":t.strokeWidth,"stroke-linejoin":"round","stroke-linecap":"round","fill-rule":"evenodd"}).attr({opacity:"0"}).animate({opacity:"1"},i.travelTime/3);f.translate(-1*(a.x-o),-1*(r.y-o)),l.push(f)}-1!=navigator.appVersion.indexOf("MSIE 8.")&&$("shape").each(function(){$(this).css({filter:"alpha(opacity="+100*t.opacity+")"})})}}}),o.route360PolygonLayer=function(){return new o.Route360PolygonLayer}}(window,document);