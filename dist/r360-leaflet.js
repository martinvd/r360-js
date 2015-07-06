/*
 Route360° JavaScript API v0.0.9 (9ec6272), a JS library for leaflet maps. http://route360.net
 (c) 2014 Henning Hollburg and Daniel Gerber, (c) 2014 Motion Intelligence GmbH
*/
r360.photonPlaceAutoCompleteControl=function(t){return new r360.PhotonPlaceAutoCompleteControl(t)},r360.PhotonPlaceAutoCompleteControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(r360.config.photonPlaceAutoCompleteOptions)),"undefined"!=typeof t&&(_.has(t,"position")&&(this.options.position=t.position),_.has(t,"label")&&(this.options.label=t.label),_.has(t,"country")&&(this.options.country=t.country),_.has(t,"reset")&&(this.options.reset=t.reset),_.has(t,"reverse")&&(this.options.reverse=t.reverse),_.has(t,"placeholder")&&(this.options.placeholder=t.placeholder),_.has(t,"width")&&(this.options.width=t.width),_.has(t,"maxRows")&&(this.options.maxRows=t.maxRows),_.has(t,"image")&&(this.options.image=t.image),_.has(t,"index")&&(this.options.index=t.index),_.has(t,"options")&&(this.options.options=t.options,this.options.travelType=_.has(this.options.options,"init")?this.options.options.init:"walk"))},onAdd:function(t){var o=this,n=r360.config.i18n,i="",e=L.DomUtil.create("div",o._container);o.options.map=t,o.options.id=$(t._container).attr("id")+r360.Util.generateId(10),t.on("resize",o.onResize.bind(o));var s=o.options.width,a='style="width:'+s+'px;"';o.options.input='<div class="input-group autocomplete" '+a+'>                 <input id="autocomplete-'+o.options.id+'" style="color: black;width:'+s+'"                 type="text" class="form-control r360-autocomplete" placeholder="'+o.options.placeholder+'" onclick="this.select()">',o.options.image&&(o.options.input+='<span id="'+o.options.id+'-image" class="input-group-addon btn-autocomplete-marker">                     <img style="height:22px;" src="'+o.options.image+'">                  </span>');var r=[];return o.options.input+='<span id="'+o.options.id+'-options-button" class="input-group-btn travel-type-buttons" '+(o.options.options?"":'style="display: none;"')+'>                     <button class="btn btn-autocomplete" type="button" title="'+n.get("settings")+'"><i class="fa fa-cog fa-fw"></i></button>                 </span>',r.push('<div id="'+o.options.id+'-options" class="text-center" style="color: black;width:'+s+'; display: none;">'),r.push('  <div class="btn-group text-center">'),o.options.options&&o.options.options.walk&&r.push('<button type="button" class="btn btn-default travel-type-button '+("walk"==this.options.travelType?"active":"")+'" travel-type="walk"><span class="map-icon-walking travel-type-icon"></span> <span lang="en">Walk</span><span lang="de">zu Fuß</span></button>'),o.options.options&&o.options.options.bike&&r.push('<button type="button" class="btn btn-default travel-type-button '+("bike"==this.options.travelType?"active":"")+'" travel-type="bike"><span class="map-icon-bicycling travel-type-icon"></span> <span lang="en">Bike</span><span lang="de">Fahrrad</span></button>'),o.options.options&&o.options.options.hirebike&&r.push('<button type="button" class="btn btn-default travel-type-button '+("hirebike"==this.options.travelType?"active":"")+'" travel-type="hirebike">                             <span class="map-icon-bicycling travel-type-icon"></span> <span lang="en">Hire Bike</span><span lang="de">Leihfahrrad</span>                        </button>'),o.options.options&&o.options.options.transit&&r.push('<button type="button" class="btn btn-default travel-type-button '+("transit"==this.options.travelType?"active":"")+'" travel-type="transit"><span class="map-icon-train-station travel-type-icon"></span> <span lang="en">Transit</span><span lang="de">ÖPNV</span></button>'),o.options.options&&o.options.options.car&&r.push('<button type="button" class="btn btn-default travel-type-button '+("car"==this.options.travelType?"active":"")+'" travel-type="car"><span class="fa fa-car"></span> <span lang="en">Car</span><span lang="de">Auto</span></button>'),r.push("  </div>"),r.push("</div>"),o.options.input+='<span id="'+o.options.id+'-reverse" '+(o.options.reverse?"":'style="display: none;"')+'" class="input-group-btn">                     <button class="btn btn-autocomplete" type="button" title="'+n.get("reverse")+'"><i class="fa fa-arrows-v fa-fw"></i></button>                 </span>',o.options.input+='<span id="'+o.options.id+'-reset" '+(o.options.reset?"":'style="display: none;"')+'" class="input-group-btn">                     <button class="btn btn-autocomplete" type="button" title="'+n.get("reset")+'"><i class="fa fa-times fa-fw"></i></button>                 </span>',o.options.input+="</div>",o.options.options&&(o.options.input+=r.join("")),$(e).append(o.options.input),$(e).find("#"+o.options.id+"-reset").click(function(){o.options.onReset()}),$(e).find("#"+o.options.id+"-reverse").click(function(){o.options.onReverse()}),$(e).find("#"+o.options.id+"-options-button").click(function(){$("#"+o.options.id+"-options").slideToggle()}),$(e).find(".travel-type-button").click(function(){$(e).find(".travel-type-button").removeClass("active"),$(this).addClass("active"),setTimeout(function(){$("#"+o.options.id+"-options").slideToggle()},300),o.options.travelType=$(this).attr("travel-type"),o.options.onTravelTypeChange()}),L.DomEvent.disableClickPropagation(e),_.has(o.options,"country")&&(i+=" AND country:"+o.options.country),$(e).find("#autocomplete-"+o.options.id).autocomplete({source:function(t,n){o.source=this;for(var i=t.term.split(" "),e=new Array,s="",a="",r=0;r<i.length;r++)-1!=i[r].search(".*[0-9].*")?e.push(i[r]):s+=i[r]+" ";if(e.length>0){a+=" OR ";for(var p=0;p<e.length;p++){var l="(postcode : "+e[p]+" OR housenumber : "+e[p]+" OR street : "+e[p]+") ";a+=l}}console.log(o.options.map.getCenter()),$.ajax({url:o.options.serviceUrl,async:!1,data:{q:s,limit:o.options.maxRows},success:function(i){var e=new Array;n($.map(i.features,function(n){if("boundary"!=n.osm_key){var i={},s=[],a=[];if(i.name=n.properties.name,i.city=n.properties.city,i.street=n.properties.street,i.housenumber=n.properties.housenumber,i.country=n.properties.country,i.postalCode=n.properties.postcode,i.name&&s.push(i.name),i.city&&s.push(i.city),i.street&&a.push(i.street),i.housenumber&&a.push(i.housenumber),i.postalCode&&a.push(i.postalCode),i.city&&a.push(i.city),a.push(i.country),!_.contains(e,s.join()+a.join()))return e.push(s.join()+a.join()),{label:s.join(", "),value:s.join(", "),firstRow:s.join(", "),secondRow:a.join(" "),term:t.term,index:o.options.index,latlng:new L.LatLng(n.geometry.coordinates[1],n.geometry.coordinates[0])}}}))}})},minLength:2,select:function(t,n){o.options.value=n.item,o.options.onSelect(n.item)}}).data("ui-autocomplete")._renderItem=function(t,o){function n(t){return t.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}var i=o.term?o.firstRow.replace(new RegExp(n(o.term),"gi"),"<strong>$&</strong>"):o.firstRow,e=o.term?o.secondRow.replace(new RegExp(n(o.term),"gi"),"<strong>$&</strong>"):o.secondRow,s="<a><span class='address-row1'>"+i+"</span><br/><span class='address-row2'>  "+e+"</span></a>";return $("<li>").append(s).appendTo(t)},this.onResize(),e},onSelect:function(t){this.options.onSelect=t},onReset:function(t){this.options.onReset=t},onReverse:function(t){this.options.onReverse=t},onTravelTypeChange:function(t){this.options.onTravelTypeChange=t},reset:function(){this.options.value={},this.setFieldValue("")},update:function(t,o){this.setLatLng(t),this.setFieldValue(o)},setLatLng:function(t){this.options.value.latlng=t},setFieldValue:function(t){var o=this;$("#autocomplete-"+o.options.id).val(t)},getFieldValue:function(){var t=this;return $("#autocomplete-"+t.options.id).val()},getTravelType:function(){return this.options.travelType},setValue:function(t){this.options.value=t},getValue:function(){return this.options.value},getIndex:function(){return this.options.index},onResize:function(){var t=this;$(t.options.input).css(this.options.map.getSize().x<550?{width:"45px"}:{width:""})}}),r360.placeAutoCompleteControl=function(t){return new r360.PlaceAutoCompleteControl(t)},r360.PlaceAutoCompleteControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(r360.config.defaultPlaceAutoCompleteOptions)),"undefined"!=typeof t&&(_.has(t,"position")&&(this.options.position=t.position),_.has(t,"label")&&(this.options.label=t.label),_.has(t,"country")&&(this.options.country=t.country),_.has(t,"reset")&&(this.options.reset=t.reset),_.has(t,"reverse")&&(this.options.reverse=t.reverse),_.has(t,"placeholder")&&(this.options.placeholder=t.placeholder),_.has(t,"width")&&(this.options.width=t.width),_.has(t,"maxRows")&&(this.options.maxRows=t.maxRows),_.has(t,"showOnStartup")&&(this.options.showOnStartup=t.showOnStartup),_.has(t,"image")&&(this.options.image=t.image),_.has(t,"index")&&(this.options.index=t.index),_.has(t,"autoHide")&&(this.options.autoHide=t.autoHide),_.has(t,"options")&&(this.options.options=t.options,this.options.travelType=_.has(this.options.options,"init")?this.options.options.init:"walk"))},toggleOptions:function(t){var o=this;"undefined"==typeof t?$("#"+o.options.id+"-options").slideToggle():$(t).find("#"+o.options.id+"-options").slideToggle()},onAdd:function(t){var o=this,n=r360.config.i18n,i="",e=L.DomUtil.create("div",o._container);o.options.map=t,o.options.id=$(t._container).attr("id")+r360.Util.generateId(10),t.on("resize",o.onResize.bind(o));var s=o.options.width,a='style="width:'+s+'px;"';o.options.input='<div class="input-group autocomplete r360-box-shadow" '+a+'>                 <input id="autocomplete-'+o.options.id+'" style="color: black;widthe:'+s+'"                 type="text" class="form-control r360-autocomplete" placeholder="'+o.options.placeholder+'" onclick="this.select()">',o.options.image&&(o.options.input+='<span id="'+o.options.id+'-image" class="input-group-addon btn-autocomplete-marker">                     <img style="height:22px;" src="'+o.options.image+'">                  </span>');var r=[];return o.options.input+='<span id="'+o.options.id+'-options-button" class="input-group-btn travel-type-buttons" '+(o.options.options?"":'style="display: none;"')+'>                     <button id="'+o.options.id+'-options-btn" class="btn btn-autocomplete" type="button" title="'+n.get("settings")+'"><i class="fa fa-cog fa-fw"></i></button>                 </span>',r.push('<div id="'+o.options.id+'-options" class="text-center r360-box-shadoww" style="color: black;widtth:'+s+"; display: "+(this.options.showOnStartup?"block":"none")+';">'),r.push('  <div class="btn-group text-center">'),o.options.options&&o.options.options.walk&&r.push('<button type="button" class="btn btn-default travel-type-button '+("walk"==this.options.travelType?"active":"")+'" travel-type="walk"><span class="fa fa-male travel-type-icon"></span> <span lang="en">Walk</span><span lang="no">Gå</span><span lang="de">zu Fuß</span></button>'),o.options.options&&o.options.options.bike&&r.push('<button type="button" class="btn btn-default travel-type-button '+("bike"==this.options.travelType?"active":"")+'" travel-type="bike"><span class="fa fa-bicycle travel-type-icon"></span> <span lang="en">Bike</span><span lang="no">Sykle</span><span lang="de">Fahrrad</span></button>'),o.options.options&&o.options.options.rentbike&&r.push('<button type="button" class="btn btn-default travel-type-button '+("rentbike"==this.options.travelType?"active":"")+'" travel-type="rentbike">                             <span class="fa fa-bicycle travel-type-icon"></span> <span lang="en">Hire Bike</span><span lang="no">Bysykkel</span><span lang="de">Leihfahrrad</span>                        </button>'),o.options.options&&o.options.options.rentandreturnbike&&r.push('<button type="button" class="btn btn-default travel-type-button '+("rentandreturnbike"==this.options.travelType?"active":"")+'" travel-type="rentandreturnbike">                             <span class="fa fa-bicycle travel-type-icon"></span> <span lang="en">Hire & Return Bike</span><span lang="no">Bysykkel</span><span lang="de">Leihfahrrad</span>                        </button>'),o.options.options&&o.options.options.ebike&&r.push('<button type="button" class="btn btn-default travel-type-button '+("ebike"==this.options.travelType?"active":"")+'" travel-type="ebike"><span class="fa fa-bicycle travel-type-icon"></span> <span lang="en">E-Bike</span><span lang="no">Elsykkel</span><span lang="de">E-Fahrrad</span></button>'),o.options.options&&o.options.options.transit&&r.push('<button type="button" class="btn btn-default travel-type-button '+("transit"==this.options.travelType?"active":"")+'" travel-type="transit"><span class="fa fa-bus travel-type-icon"></span> <span lang="en">Transit</span><span lang="no">TODO</span><span lang="de">ÖPNV</span></button>'),o.options.options&&o.options.options.car&&r.push('<button type="button" class="btn btn-default travel-type-button '+("car"==this.options.travelType?"active":"")+'" travel-type="car"><span class="fa fa-car"></span> <span lang="en">Car</span><span lang="no">TODO</span><span lang="de">Auto</span></button>'),r.push("  </div>"),r.push("</div>"),o.options.input+='<span id="'+o.options.id+'-reverse" '+(o.options.reverse?"":'style="display: none;"')+'" class="input-group-btn">                     <button id="'+o.options.id+'-reverse-button" class="btn btn-autocomplete" type="button" title="'+n.get("reverse")+'"><i class="fa fa-arrows-v fa-fw"></i></button>                 </span>',o.options.input+='<span id="'+o.options.id+'-reset" '+(o.options.reset?"":'style="display: none;"')+'" class="input-group-btn">                     <button id="'+o.options.id+'-reset-button" class="btn btn-autocomplete" type="button" title="'+n.get("reset")+'"><i class="fa fa-times fa-fw"></i></button>                 </span>',o.options.input+="</div>",o.options.options&&(o.options.input+=r.join("")),$(e).append(o.options.input),$(e).find("#"+o.options.id+"-reset").click(function(){o.options.onReset()}),$(e).find("#"+o.options.id+"-reverse").click(function(){o.options.onReverse()}),$(e).find("#"+o.options.id+"-options-button").click(function(){$("#"+o.options.id+"-options").slideToggle()}),$(e).find(".travel-type-button").click(function(){$(e).find(".travel-type-button").removeClass("active"),$(this).addClass("active"),o.options.autoHide&&setTimeout(function(){$("#"+o.options.id+"-options").slideToggle()},300),o.options.travelType=$(this).attr("travel-type"),o.options.onTravelTypeChange()}),L.DomEvent.disableClickPropagation(e),_.has(o.options,"country")&&(i+=" AND country:"+o.options.country),$(e).find("#autocomplete-"+o.options.id).autocomplete({source:function(t,n){o.source=this;for(var e=t.term.split(" "),s=new Array,a="",r="",p=0;p<e.length;p++)-1!=e[p].search(".*[0-9].*")?s.push(e[p]):a+=e[p]+" ";if(s.length>0){r+=" OR ";for(var l=0;l<s.length;l++){var d="(postcode : "+s[l]+" OR housenumber : "+s[l]+" OR street : "+s[l]+") ";r+=d}}$.ajax({url:o.options.serviceUrl,dataType:"jsonp",jsonp:"json.wrf",async:!1,data:{wt:"json",indent:!0,rows:o.options.maxRows,qt:"en",q:"("+a+r+")"+i},success:function(i){var e=new Array;n($.map(i.response.docs,function(n){if("boundary"!=n.osm_key){var i=n.coordinate.split(","),s={},a=[],r=[];if(s.name=n.name,s.city=n.city,s.street=n.street,s.housenumber=n.housenumber,s.country=n.country,s.postalCode=n.postcode,s.name&&a.push(s.name),s.city&&a.push(s.city),s.street&&r.push(s.street),s.housenumber&&r.push(s.housenumber),s.postalCode&&r.push(s.postalCode),s.city&&r.push(s.city),!_.has(o.options,"country")&&s.country&&r.push(s.country),!_.contains(e,a.join()+r.join()))return e.push(a.join()+r.join()),{label:a.join(", "),value:a.join(", "),firstRow:a.join(", "),secondRow:r.join(" "),term:t.term,index:o.options.index,latlng:new L.LatLng(i[0],i[1])}}}))}})},minLength:2,select:function(t,n){o.options.value=n.item,o.options.onSelect(n.item)}}).data("ui-autocomplete")._renderItem=function(t,o){function n(t){return t.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}var i=o.term?o.firstRow.replace(new RegExp(n(o.term),"gi"),"<strong>$&</strong>"):o.firstRow,e=o.term?o.secondRow.replace(new RegExp(n(o.term),"gi"),"<strong>$&</strong>"):o.secondRow,s="<a><span class='address-row1'>"+i+"</span><br/><span class='address-row2'>  "+e+"</span></a>";return $("<li>").append(s).appendTo(t)},this.onResize(),e},onSelect:function(t){this.options.onSelect=t},onReset:function(t){this.options.onReset=t},onReverse:function(t){this.options.onReverse=t},onTravelTypeChange:function(t){this.options.onTravelTypeChange=t},updateI18n:function(t){var o=this;$("#autocomplete-"+o.options.id).attr("placeholder",r360.config.i18n.get(t?"placeholderSrc":"placeholderTrg")),$("#"+o.options.id+"-reverse-button").attr("title",r360.config.i18n.get("reverse")),$("#"+o.options.id+"-reset-button").attr("title",r360.config.i18n.get("reset")),$("#"+o.options.id+"-options-btn").attr("title",r360.config.i18n.get("settings"))},reset:function(){this.options.value={},this.setFieldValue("")},update:function(t,o){this.setLatLng(t),this.setFieldValue(o)},setLatLng:function(t){this.options.value.latlng=t},setFieldValue:function(t){var o=this;$("#autocomplete-"+o.options.id).val(t)},getFieldValue:function(){var t=this;return $("#autocomplete-"+t.options.id).val()},getTravelType:function(){return this.options.travelType},setValue:function(t){this.options.value=t},getValue:function(){return this.options.value},getIndex:function(){return this.options.index},onResize:function(){var t=this;$(t.options.input).css(this.options.map.getSize().x<550?{width:"45px"}:{width:""})}}),r360.TravelStartDateControl=L.Control.extend({options:{position:"topright",dateFormat:"yy-mm-dd",minDate:0},initialize:function(t){L.Util.setOptions(this,t)},onChange:function(t){this.options.onChange=t},onAdd:function(t){var o=this;o.options.map=t;var n=L.DomUtil.create("div","startDatePicker",this._container);o.datepicker=$("<div/>"),$(n).append(o.datepicker);var i={onSelect:function(){o.options.onChange(o.getValue())},firstDay:1},e=r360.config.i18n;return"en"!=e.language&&(i.monthNames=e.monthNames[e.language],i.dayNames=e.dayNames[e.language],i.dayNamesMin=e.dayNamesMin[e.language]),$(o.datepicker).datepicker(i),L.DomEvent.disableClickPropagation(n),n},getValue:function(){var t=this,o=$(t.datepicker).datepicker({dateFormat:"dd-mm-yy"}).val(),n=o.split("/"),i=n[2]+""+n[0]+n[1];return i}}),r360.travelStartDateControl=function(){return new r360.TravelStartDateControl},r360.TravelStartTimeControl=L.Control.extend({options:{position:"topright",range:!1,min:0,max:86400,step:600,initValue:28800,value:0},initialize:function(t){this.options.value=r360.Util.getHoursAndMinutesInSeconds(),L.Util.setOptions(this,t)},onSlideStop:function(t){this.options.slideStop=t},minToString:function(t){t/=60;var o=Math.floor(t/60),n=t-60*o;return o>24&&(o-=24),10>o&&(o="0"+o),10>n&&(n="0"+n),0==n&&(n="00"),o+":"+n},onAdd:function(t){var o=this;o.options.map=t,o.options.mapId=$(t._container).attr("id"),t.on("resize",this.onResize.bind(this));var n=L.DomUtil.create("div","startTimeSlider",this._container);return o.miBox=$("<div/>",{"class":"mi-box"}),o.startTimeInfo=$("<div/>"),o.label=$("<span/>"),o.slider=$("<div/>"),$(n).append(o.miBox.append(o.startTimeInfo.append(o.label)).append(o.slider)),$(o.label).text(r360.config.i18n.get("departure")+": "+o.minToString(this.options.value)+" "+r360.Util.getTimeFormat(o.options.value)),$(o.slider).slider({range:o.options.range,value:o.options.value,min:o.options.min,max:o.options.max,step:o.options.step,slide:function(t,n){$(o.label).text(r360.config.i18n.get("departure")+": "+o.minToString(n.value)+" "+r360.Util.getTimeFormat(n.value)),o.options.value=n.value},stop:function(t,n){o.options.slideStop(n.value)}}),this.onResize(),L.DomEvent.disableClickPropagation(n),n},onResize:function(){this.options.map.getSize().x<550?(this.removeAndAddClass(this.miBox,"leaflet-traveltime-slider-container-max","leaflet-traveltime-slider-container-min"),this.removeAndAddClass(this.startTimeInfo,"travel-time-info-max","travel-time-info-min"),this.removeAndAddClass(this.slider,"leaflet-traveltime-slider-max","leaflet-traveltime-slider-min")):(this.removeAndAddClass(this.miBox,"leaflet-traveltime-slider-container-min","leaflet-traveltime-slider-container-max"),this.removeAndAddClass(this.startTimeInfo,"travel-time-info-min","travel-time-info-max"),this.removeAndAddClass(this.slider,"leaflet-traveltime-slider-min","leaflet-traveltime-slider-max"))},removeAndAddClass:function(t,o,n){$(t).addClass(n),$(t).removeClass(o)},getValue:function(){return this.options.value}}),r360.travelStartTimeControl=function(){return new r360.TravelStartTimeControl},r360.TravelTimeControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(r360.config.defaultTravelTimeControlOptions)),"undefined"!=typeof t&&(_.has(t,"position")&&(this.options.position=t.position),_.has(t,"unit")&&(this.options.unit=t.unit),_.has(t,"initValue")&&(this.options.initValue=t.initValue),_.has(t,"label")&&(this.options.label=t.label),_.has(t,"travelTimes")&&(this.options.travelTimes=t.travelTimes),_.has(t,"icon")&&(this.options.icon=t.icon)),this.options.maxValue=_.max(this.options.travelTimes,function(t){return t.time}).time/60,this.options.step=(this.options.travelTimes[1].time-this.options.travelTimes[0].time)/60},onAdd:function(t){var o=this;this.options.map=t,t.on("resize",this.onResize.bind(this));for(var n="",i=100/this.options.travelTimes.length,e=0;e<this.options.travelTimes.length;e++)0==e?n+='<div style="position: absolute; top: 0; bottom: 0; left: '+e*i+"%; right: "+(100-(e+1)*i)+"%; background-color: "+this.options.travelTimes[e].color+'; -moz-border-top-left-radius: 8px;-webkit-border-radius-topleft: 8px; border-top-left-radius: 8px; -moz-border-bottom-left-radius: 8px;-webkit-border-radius-bottomleft: 8px; border-bottom-left-radius: 8px;"></div>':e<this.options.travelTimes.length-1?n+='<div style="position: absolute; top: 0; bottom: 0; left: '+e*i+"%; right: "+(100-(e+1)*i)+"%; background-color: "+this.options.travelTimes[e].color+';"></div>':e==this.options.travelTimes.length-1&&(n+='<div style="position: absolute; top: 0; bottom: 0; left: '+e*i+"%; right: "+(100-(e+1)*i)+"%; background-color: "+this.options.travelTimes[e].color+'; -moz-border-top-right-radius: 8px;-webkit-border-radius-topright: 8px; border-top-right-radius: 8px; -moz-border-bottom-right-radius: 8px;-webkit-border-radius-bottomright: 8px; border-bottom-right-radius: 8px;"></div>');this.options.sliderContainer=L.DomUtil.create("div",this._container),this.options.miBox=$("<div/>",{"class":"mi-box"}),this.options.travelTimeInfo=$("<div/>"),this.options.travelTimeSlider=$("<div/>",{"class":"no-border"}).append(n);var s=$("<div/>",{"class":"ui-slider-handle"});this.options.labelSpan=this.options.label,console.log(this.options),_.has(this.options,"icon")&&"undefined"!==this.options.icon&&(this.options.iconHTML=$("<img/>",{src:this.options.icon})),this.options.travelTimeSpan=$("<span/>",{text:this.options.initValue});var a=$("<span/>",{text:this.options.unit});return $(this.options.sliderContainer).append(this.options.miBox),this.options.miBox.append(this.options.travelTimeInfo),this.options.miBox.append(this.options.travelTimeSlider),this.options.travelTimeSlider.append(s),this.options.travelTimeInfo.append(this.options.iconHTML).append(this.options.labelSpan).append(": ").append(this.options.travelTimeSpan).append(a),$(this.options.travelTimeSlider).slider({range:!1,value:o.options.initValue,min:0,max:o.options.maxValue,step:o.options.step,slide:function(t,n){return 0==n.value?!1:void $(o.options.travelTimeSpan).text(n.value)},stop:function(t,n){for(var i=new Array,e=0;e<n.value;e+=o.options.step)i.push(o.options.travelTimes[e/o.options.step]);o.options.onSlideStop(i)}}),this.onResize(),L.DomEvent.disableClickPropagation(this.options.sliderContainer),this.options.sliderContainer},onResize:function(){this.options.map.getSize().x<550?(this.removeAndAddClass(this.options.miBox,"leaflet-traveltime-slider-container-max","leaflet-traveltime-slider-container-min"),this.removeAndAddClass(this.options.travelTimeInfo,"travel-time-info-max","travel-time-info-min"),this.removeAndAddClass(this.options.travelTimeSlider,"leaflet-traveltime-slider-max","leaflet-traveltime-slider-min")):(this.removeAndAddClass(this.options.miBox,"leaflet-traveltime-slider-container-min","leaflet-traveltime-slider-container-max"),this.removeAndAddClass(this.options.travelTimeInfo,"travel-time-info-min","travel-time-info-max"),this.removeAndAddClass(this.options.travelTimeSlider,"leaflet-traveltime-slider-min","leaflet-traveltime-slider-max"))},removeAndAddClass:function(t,o,n){$(t).addClass(n),$(t).removeClass(o)},onSlideStop:function(t){var o=this.options;o.onSlideStop=t},setValue:function(t){$(this.options.travelTimeSlider).slider("value",t),$(this.options.travelTimeSpan).text(t)},getValues:function(){for(var t=this.options,o=new Array,n=0;n<$(this.options.travelTimeSlider).slider("value");n+=t.step)o.push(t.travelTimes[n/t.step].time);return o},getMaxValue:function(){return _.max(this.getValues())}}),r360.travelTimeControl=function(t){return new r360.TravelTimeControl(t)},r360.waitControl=function(t){return new L.Control.WaitControl(t)},L.Control.WaitControl=L.Control.extend({options:{position:"topleft"},initialize:function(t){L.Util.setOptions(this,t)},onAdd:function(t){this.options.map=t,this.options.mapId=$(t._container).attr("id");var o=L.DomUtil.create("div","leaflet-control-wait");return $(o).append('<div id="wait-control-'+this.options.mapId+'" class="mi-box waitControl">                 <i class="fa fa-spinner fa-spin"></i> '+("undefined"!=typeof this.options.text?this.options.text:r360.config.i18n.get("wait"))+"            </div>"),o},updateText:function(t){$("#wait-control-"+this.options.mapId).html('<i class="fa fa-spinner fa-spin"></i> '+t),$("span[lang][lang!='"+r360.config.i18n.language+"']").hide()},show:function(){$("#wait-control-"+this.options.mapId).show()},hide:function(){$("#wait-control-"+this.options.mapId).hide()}}),r360.htmlControl=function(t){return new L.Control.HtmlControl(t)},L.Control.HtmlControl=L.Control.extend({options:{position:"topleft"},initialize:function(t){L.Util.setOptions(this,t)},onAdd:function(t){this.options.id=$(t._container).attr("id")+r360.Util.generateId();var o=L.DomUtil.create("div","leaflet-control-html");return $(o).append('<div id="html-control-'+this.options.id+'" class="html-control '+this.options.classes+'"></div>'),$(o).on("mouseover",function(){t.scrollWheelZoom.disable()}),$(o).on("mouseout",function(){t.scrollWheelZoom.enable()}),o},setHtml:function(t){$("#html-control-"+this.options.id).html(t)},show:function(){$("#html-control-"+this.options.id).show()},hide:function(){$("#html-control-"+this.options.id).hide()},toggle:function(){$("#html-control-"+this.options.id).toggle()}}),r360.RadioButtonControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(r360.config.defaultRadioOptions)),"undefined"!=typeof t?("undefined"!=typeof t.position&&(this.options.position=t.position),"undefined"!=typeof t.buttons&&(this.options.buttons=t.buttons),"undefined"!=typeof t.onChange&&(this.options.onChange=t.onChange)):alert("No buttons supplied!")},onAdd:function(t){var o=this;this.options.map=t;var n=L.DomUtil.create("div",this._container);return this.options.input=this.getRadioButtonHTML(),$(n).append(this.options.input),$(this.options.input).buttonset({}).change(function(){o.options.checked=$("input[name='r360_radiobuttongroup_"+o.options.buttonGroupId+"']:checked").attr("key"),o.options.onChange(o.options.checked)}),$(this.options.input).each(function(){$(this).tooltip({open:function(){$("[lang='de'], [lang='en'], [lang='no']").hide(),$("[lang='"+r360.config.i18n.language+"']").show()},content:function(){return $(this).attr("title")},position:{my:"center top+10",at:"center bottom",using:function(t,o){$(this).css(t),$("<div>").addClass("arrow top").addClass(o.vertical).addClass(o.horizontal).appendTo(this)}}})}),L.DomEvent.addListener(n,"click",L.DomEvent.stopPropagation),n},onChange:function(t){this.options.onChange=t},setValue:function(t){$("input[name='r360_radiobuttongroup_"+this.options.buttonGroupId+"']:checked").next().removeClass("ui-state-active");var o=$("input[name='r360_radiobuttongroup_"+this.options.buttonGroupId+"'][key='"+t+"']");o.attr("checked",!0),o.addClass("checked"),o.next().addClass("ui-state-active"),this.options.checked=t},getValue:function(){return this.options.checked},getRadioButtonHTML:function(){var t=this;t.options.buttonGroupId=r360.Util.generateId(5);var o=$("<div/>",{id:t.options.buttonGroupId});return o.addClass("r360-box-shadow"),_.each(t.options.buttons,function(n){var i=r360.Util.generateId(),e=$("<input/>",{type:"radio",id:"r360_"+i,value:n.key,key:n.key,name:"r360_radiobuttongroup_"+t.options.buttonGroupId}),s=$("<label/>",{"for":"r360_"+i,html:n.label});n.checked&&(t.options.checked=n.key,e.attr({checked:"checked"})),"undefined"!=typeof n.tooltip&&s.attr({title:n.tooltip}),o.append(e),o.append(s)}),o}}),r360.radioButtonControl=function(t){return new r360.RadioButtonControl(t)},r360.CheckboxButtonControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(r360.config.defaultRadioOptions)),this.options.checked={},"undefined"!=typeof t?("undefined"!=typeof t.position&&(this.options.position=t.position),"undefined"!=typeof t.buttons&&(this.options.buttons=t.buttons),"undefined"!=typeof t.onChange&&(this.options.onChange=t.onChange)):alert("No buttons supplied!")},onAdd:function(t){var o=this;this.options.map=t;var n=L.DomUtil.create("div",this._container);return this.options.input=this.getCheckboxButtonHTML(),$(n).append(this.options.input),$(this.options.input).buttonset({}).change(function(){$("input:checkbox[name='r360_checkboxbuttongroup_"+o.options.buttonGroupId+"']").each(function(){o.options.checked[$(this).attr("key")]=$(this).is(":checked")?!0:!1}),o.options.onChange(o.options.checked)}),$(this.options.input).each(function(){$(this).tooltip({open:function(){$("[lang='de'], [lang='en'], [lang='no']").hide(),$("[lang='"+r360.config.i18n.language+"']").show()},content:function(){return $(this).attr("title")},position:{my:"center top+10",at:"center bottom",using:function(t,o){$(this).css(t),$("<div>").addClass("arrow top").addClass(o.vertical).addClass(o.horizontal).appendTo(this)}}})}),L.DomEvent.addListener(n,"click",L.DomEvent.stopPropagation),n},onChange:function(t){this.options.onChange=t},getValue:function(){return this.options.checked},getId:function(){return this.id},getCheckboxButtonHTML:function(){var t=this;t.options.buttonGroupId=r360.Util.generateId(5),t.id=t.options.buttonGroupId;var o=$("<div/>",{id:t.options.buttonGroupId});return o.addClass("r360-box-shadow"),_.each(t.options.buttons,function(n){var i=r360.Util.generateId(),e=$("<input/>",{type:"checkbox",id:"r360_"+i,value:n.key,key:n.key,name:"r360_checkboxbuttongroup_"+t.options.buttonGroupId}),s=$("<label/>",{"for":"r360_"+i,html:_.isUndefined(n.icon)?""+n.label:n.icon+" "+n.label});n.checked&&(t.options.checked[n.key]=!0,e.attr({checked:"checked"})),"undefined"!=typeof n.tooltip&&s.attr({title:n.tooltip}),o.append(e),o.append(s)}),o}}),r360.checkboxButtonControl=function(t){return new r360.CheckboxButtonControl(t)},r360.Route360PolygonLayer=L.Class.extend({initialize:function(t){this.multiPolygons=[],this.opacity=r360.config.defaultPolygonLayerOptions.opacity,this.strokeWidth=r360.config.defaultPolygonLayerOptions.strokeWidth,this.tolerance=r360.config.defaultPolygonLayerOptions.tolerance,this.extendWidthX=r360.config.defaultPolygonLayerOptions.strokeWidth/2,this.extendWidthY=r360.config.defaultPolygonLayerOptions.strokeWidth/2,this.backgroundColor=r360.config.defaultPolygonLayerOptions.backgroundColor,this.backgroundOpacity=r360.config.defaultPolygonLayerOptions.backgroundOpacity,this.topRight={lat:-90,lng:-180},this.bottomLeft={lat:90,lng:180},"undefined"!=typeof t&&("undefined"!=typeof t.opacity&&(this.opacity=t.opacity),"undefined"!=typeof t.strokeWidth&&(this.strokeWidth=t.strokeWidth),"undefined"!=typeof t.inverse&&(this.inverse=t.inverse),"undefined"!=typeof t.tolerance&&(this.tolerance=t.tolerance),"undefined"!=typeof t.extendWidthX&&(this.extendWidthX=t.extendWidthX),"undefined"!=typeof t.extendWidthY&&(this.extendWidthY=t.extendWidthY))
},setInverse:function(t){this.inverse=t},getInverse:function(){return this.inverse},getBoundingBox:function(){return new L.LatLngBounds(this.bottomLeft,this.topRight)},onAdd:function(t){this.map=t,this.element=L.DomUtil.create("div","r360-leaflet-polygon-layer-"+$(t._container).attr("id")+" leaflet-zoom-hide"),$(this.element).attr("id","canvas"+$(this.map._container).attr("id")),this.map.getPanes().overlayPane.appendChild(this.element),this.map.on("moveend",this.draw,this),this.draw()},fitMap:function(){this.map.fitBounds(this.getBoundingBox())},clearAndAddLayers:function(t,o){return this.clearLayers(),this.addLayer(t),"undefined"!=typeof o&&this.fitMap(),this},addLayer:function(t){this.multiPolygons=r360.PolygonUtil.prepareMultipolygons(t,this.topRight,this.bottomLeft),this.draw()},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){t.getPanes().overlayPane.removeChild(this.element),t.off("viewreset",this.draw,this)},createSvgData:function(t){var o=r360.PolygonUtil.extendBounds(this.getMapPixelBounds(),this.extendWidthX,this.extendWidthY);return r360.SvgUtil.createSvgData(t,{bounds:o,scale:256*Math.pow(2,this.map._zoom),tolerance:this.tolerance,pixelOrigin:this.map.getPixelOrigin(),offset:this.offset})},getMapPixelBounds:function(){var t=this.map.getPixelBounds();return{max:{x:t.max.x,y:t.max.y},min:{x:t.min.x,y:t.min.y}}},clearLayers:function(){$("#canvas"+$(this.map._container).attr("id")).empty(),this.initialize()},draw:function(){if(this.multiPolygons.length>0){this.svgWidth=this.map.getSize().x,this.svgHeight=this.map.getSize().y,r360.DomUtil.setPosition(this.element,{x:0,y:0});var t=$("#svg_"+$(this.map._container).attr("id")).offset(),o=$(this.map._container).offset();"undefined"==typeof this.offset&&(this.offset={x:0,y:0}),"undefined"!=typeof t&&(this.offset.x+=o.left-t.left,this.offset.y+=o.top-t.top),$("#canvas"+$(this.map._container).attr("id")).empty();for(var n=[],i=0;i<this.multiPolygons.length;i++){for(var e=this.multiPolygons[i],s=[],a=0;a<e.polygons.length;a++)s.push(this.createSvgData(e.polygons[a]));0!=s.length&&n.push(r360.SvgUtil.getGElement(s,{color:this.inverse?"black":e.getColor(),opacity:this.inverse?e.getOpacity():1,strokeWidth:r360.config.defaultPolygonLayerOptions.strokeWidth}))}var r={id:$(this.map._container).attr("id"),offset:this.offset,svgHeight:this.svgHeight,svgWidth:this.svgWidth,backgroundColor:this.backgroundColor,backgroundOpacity:this.backgroundOpacity,opacity:this.opacity,strokeWidth:this.strokeWidth};$("#canvas"+$(this.map._container).attr("id")).append(this.inverse?r360.SvgUtil.getInverseSvgElement(n,r):r360.SvgUtil.getNormalSvgElement(n,r))}}}),r360.route360PolygonLayer=function(t){return new r360.Route360PolygonLayer(t)},r360.LeafletUtil={getMarker:function(t,o){var n=_.has(o,"color")?"-"+o.color:"-blue";return o.icon=L.icon({iconSize:[25,41],iconUrl:o.iconPath+"marker-icon"+n+".png",iconAnchor:[12,41],shadowSize:[41,41],shadowUrl:o.iconPath+"marker-shadow.png",shadowAnchor:[41/3,41],popupAnchor:[0,-35]}),L.marker(t,o)}};