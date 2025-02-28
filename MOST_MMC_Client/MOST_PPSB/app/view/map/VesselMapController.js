Ext.define('MOST.view.map.VesselMapController', {
	/**
     * @memberOf TSB
     */
	extend: 'MOST.view.foundation.BaseViewController',

    requires: [
    ],
	
    alias: 'controller.vesselmapcontroller',
    
	loadMap: function(vesselStore, portStore, mapContainer, refShip, refPort, origin) {
		var me = this;
		var refs = me.getReferences();

		me.origin = origin;
		
		if (me.map == 'undefined' || me.map == null) {
			me.map = L.map(mapContainer.id, {
				zoomControl: true,
				attributionControl: true,
				zoomSnap: 1,
				zoomDelta: 1,
				trackResize: true,
				boxZoom: true,
				doubleClickZoom: true,
				dragging: true,
//				center: L.latLng(35.166668, 129.066666),
//				center: L.latLng(5.285153, 100.456238),//Penang			
				center: L.latLng(3, 101.456238), //North Poty of Klang
//				zoom: 3,
				zoom: 12,
				maxZoom: 18
//				worldCopyJump: true
			});	
			
			//TODO: Defaault Base Map
			//Default Base Map
			//var baseLayer = L.esri.basemapLayer('Oceans').addTo(me.map);
			var baseLayer = L.esri.basemapLayer('Imagery').addTo(me.map);
			//var layerLabels = L.esri.basemapLayer('OceansLabels');
			var layerLabels = L.esri.basemapLayer('ImageryLabels');
			me.map.addLayer(layerLabels);
		}
		
		if(vesselStore) me.onShowVesselMarker(vesselStore, refShip, origin);
		if(portStore) me.onShowPortMarker(portStore, refPort);
		//Area Reload
		var areaStore = MOST.getApplication().areaStore;	
		
		//areaStore.on('load', me.onAreaDataLoad, me);
		//var areaStore = me.getStore('areaStore');
		//areaStore.on('load', me.onAreaDataLoad, me);
		areaStore.load
		({
			callback: function(records, operation, success) {
				if (success) {
					areaStore.add(records);
					me.onAreaDataLoad(me);
				}
			}
		});
		//if(areaStore) me.onAreaDataLoad(areaStore, refArea);		
		
		
		//Add map to this for Global handling
		me.baseLayer = baseLayer;
		me.layerLabels = layerLabels;	//No need for 'Streets'
		me.onMapResize();
		
		//Router Layer
		if (me.routerLayerGrp) me.map.removeLayer(me.routerLayerGrp);
		me.routerLayerGrp = new L.layerGroup();
		me.routerLayerGrp.id = 'routers';
		me.map.addLayer(me.routerLayerGrp);
		
		//Area Layer
		if (me.areaLayerGrp) me.map.removeLayer(me.areaLayerGrp);
		me.areaLayerGrp = new L.layerGroup();
		me.areaLayerGrp.id = 'areas';
		me.map.addLayer(me.areaLayerGrp);
		
		//Area Handling
		me.onAreaRefresh();
		
		//Simulation Layer
		if (me.simulationLayerGrp) me.map.removeLayer(me.simulationLayerGrp);
		me.simulationLayerGrp = new L.layerGroup();
		me.simulationLayerGrp.id = 'simulations';
		me.map.addLayer(me.simulationLayerGrp);
		
//		//Legend Control
//		if(origin === 'BULK' || origin === 'CAR' || origin === 'VMS') {
//			var legend = L.control({position: 'bottomright'});
//			legend.onAdd = function () {
//				var div = L.DomUtil.create('div', 'info legend');
//				if(origin === 'BULK') {
//					div.innerHTML = '<img src=/resources/images/gis/icon_vessel_g_ballast.png width=14px height=18px>공선항해<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_g_laden.png width=14px height=18px>만선항해<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_g_waiting.png width=14px height=14px>작업대기<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_g_loading.png width=14px height=14px>선적 중<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_g_discharging.png width=14px height=14px>양하 중<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_r_ballast.png width=14px height=18px>공선 선속 저하<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_r_laden.png width=14px height=18px>만선 선속 저하<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_r_waiting.png width=14px height=14px>작업대기 체선 증가<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_r_loading.png width=14px height=14px>선적 체선 증가<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_r_discharging.png width=14px height=14px>양하 체선 증가'
//						;
//					
//				} else if(origin === 'CAR') {
//					div.innerHTML = '<img src=/resources/images/gis/icon_vessel_b_ballast.png width=14px height=18px>공선항해<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_b_laden.png width=14px height=18px>만선항해<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_b_waiting.png width=14px height=14px>작업대기<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_b_loading.png width=14px height=14px>선적 중<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_b_discharging.png width=14px height=14px>양하 중'
//						;
//					
//				} else if(origin === 'VMS') {
//					div.innerHTML = '연안해송<br><img src=/resources/images/gis/icon_vessel_g_ballast.png width=14px height=18px>공선항해<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_g_laden.png width=14px height=18px>만선항해<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_g_waiting.png width=14px height=14px>작업대기<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_g_loading.png width=14px height=14px>선적 중<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_g_discharging.png width=14px height=14px>양하 중<br>'
//						+ '벌크선<br><img src=/resources/images/gis/icon_vessel_o_ballast.png width=14px height=18px>공선항해<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_o_laden.png width=14px height=18px>만선항해<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_o_laden.png width=14px height=14px>작업대기<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_o_loading.png width=14px height=14px>선적 중<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_o_discharging.png width=14px height=14px>양하 중<br>'
//						+ '자동차선<br><img src=/resources/images/gis/icon_vessel_b_ballast.png width=14px height=18px>공선항해<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_b_laden.png width=14px height=14px>만선항해<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_b_laden.png width=14px height=14px>작업대기<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_b_loading.png width=14px height=14px>선적 중<br>'
//						+ '<img src=/resources/images/gis/icon_vessel_b_discharging.png width=14px height=14px>양하 중'
//						;
//				}
//				
//				return div;
//			};
//			legend.addTo(me.map);
//		}
		
	},
	
	onShowVesselMarker: function(vesselStore, refShip, origin) {
		var me = this;
		
		//Vessel
		if (me.shipLayerGrp) me.map.removeLayer(me.shipLayerGrp);
		me.shipLayerGrp = new L.layerGroup();	//init shipLayerGrp
		me.shipLayerGrp.id = 'vessels';

		if (me.shipLabelLayerGrp) me.map.removeLayer(me.shipLabelLayerGrp);
		me.shipLabelLayerGrp = new L.layerGroup();
		me.shipLabelLayerGrp.id = 'vesselsLabel';
		
		if(refShip && refShip.pressed) {
			me.map.addLayer(me.shipLayerGrp);
			me.map.addLayer(me.shipLabelLayerGrp);
		}
		
		for (var i = 0; i < vesselStore.getCount(); i++) {
			var rec = vesselStore.getAt(i);
			
			if(rec.data.latitude !== '' && rec.data.longitude !== '') {				
				var iconPrefix, iconName;
				
				if(origin === 'BULK') {
					if(rec.data.vesselStatus === 'LADEN' || rec.data.vesselStatus === 'BALLAST') {
						if(Number(rec.data.speedContract) > (Number(rec.data.speedPerf) + 0.5)) {
							iconPrefix = '_r_';
						} else {
							iconPrefix = '_g_';
						}
					} else {
						if(rec.data.vesselDelayDay > 0) {
							iconPrefix = '_r_';
						} else {
							iconPrefix = '_g_';
						}
					}
					
				} else if(origin === 'CAR') {
					iconPrefix = '_b_';
					
				} else {
					if(rec.data.vesselKind === 'BK') {
						iconPrefix = '_o_';
					} else if(rec.data.vesselKind === 'CR') {
						iconPrefix = '_b_';
					} else {
						iconPrefix = '_g_'; //Coast
					}
				}
				
				if(rec.data.vesselStatus === 'WAITING') {
					iconName = 'waiting';
				} else if(rec.data.vesselStatus === 'BUNKER') {
					iconName = 'bunkering';
				} else if(rec.data.vesselStatus === 'DISCHARGING') {
					iconName = 'discharging';
				} else if(rec.data.vesselStatus === 'LOADING') {
					iconName = 'loading';
				} else if(rec.data.vesselStatus === 'LADEN') {
					iconName = 'laden';
				} else if(rec.data.vesselStatus === 'BALLAST') {
					iconName = 'ballast';
				} else {
					iconName = 'laden';	//Default
				}
				
				var tempUrl = '';
				
				if(CONSTANTS.ENV == 'DEV'){ //DEV
					tempUrl = '/resources/images/gis/icon_vessel' + iconPrefix + iconName + '.png'
				} else { //PROD
					tempUrl = CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel' + iconPrefix + iconName + '.png'
				}
				
				var shipIcon = L.icon({
					iconUrl: tempUrl,
					iconAnchor: [9, 12]
				});
				
				var toolTipContent = '';
				
				if(origin === 'BULK') {
					var cargoQuentity = Ext.util.Format.number(rec.data.cargoQuantity, '0,000');
					var dwt = Ext.util.Format.number(rec.data.dwt, '0,000');
					
					var surfix = rec.data.vesselStatus === 'LADEN' ? '<br>' + cargoQuentity + ' MT ' + rec.data.cargoName : '';
					toolTipContent = rec.data.vesselName + ' ' + '(' + dwt + '/' + rec.data.buildYear +')'
									+ '<br>' + rec.data.statusTag + ' ' + rec.data.portName + ' ' + Ext.Date.format(rec.data.statusTagTime, 'Y-m-d H:i')
									+ surfix;					
				} else {
					toolTipContent = "Status: " + rec.data.vesselStatus
					+ "<br>Heading: " + rec.data.heading
					+ "<br>Lat&Lng: " + rec.data.latitude + ", " + rec.data.longitude;
				}
				
				var shipMarker = L.shipMarker(
						[
						 rec.data.latitude, 
						 me.getRevisedLongitude(Number(rec.data.longitude))
						 ], 
						 {
							icon: shipIcon, 
							routeCode: rec.data.routeCode,
							vesselCode: rec.data.vesselCode,
							vesselName: rec.data.vesselName,
							vesselStatus: rec.data.vesselStatus,
							callSign: rec.data.callSign,
							heading: (rec.data.vesselStatus === 'LADEN' || rec.data.vesselStatus === 'BALLAST') ? rec.data.heading : 0
						 }
				);
				shipMarker.on('click', me.onShipMarkerClick, me);
				shipMarker.bindTooltip(toolTipContent, {
					offset: L.point(0, -20)
				}).openTooltip();
				shipMarker.addTo(me.shipLayerGrp);
				
				//Ship Label
				var divIcon = L.divIcon({ 
					className: 'labelClass',
					html: rec.data.vesselName,
					iconAnchor: [20, -15]
				});
				
				var labelMarker = L.marker(new L.LatLng(rec.data.latitude, me.getRevisedLongitude(Number(rec.data.longitude))), {icon: divIcon });
				labelMarker.addTo(me.shipLabelLayerGrp);
			}
		}		
	},
	
	onImageSet: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(CONSTANTS.ENV == 'DEV'){
			refs.refCoastalBallestVsl.setIcon('/resources/images/gis/icon_vessel_g_ballast.png');
			refs.refCoastalLadenVsl.setIcon('/resources/images/gis/icon_vessel_g_laden.png');
			refs.refCoastalWaitingVsl.setIcon('/resources/images/gis/icon_vessel_g_waiting.png');
			refs.refCoastalLoadingVsl.setIcon('/resources/images/gis/icon_vessel_g_loading.png');
			refs.refCoastalDischargingVsl.setIcon('/resources/images/gis/icon_vessel_g_discharging.png');
			
			refs.refBulkBallestVsl.setIcon('/resources/images/gis/icon_vessel_o_ballast.png');
			refs.refBulkLadenVsl.setIcon('/resources/images/gis/icon_vessel_o_laden.png');
			refs.refBulkWaitingVsl.setIcon('/resources/images/gis/icon_vessel_o_waiting.png');
			refs.refBulkLoadingVsl.setIcon('/resources/images/gis/icon_vessel_o_loading.png');
			refs.refBulkDischargingVsl.setIcon('/resources/images/gis/icon_vessel_o_discharging.png');
			
			refs.refRoroBallestVsl.setIcon('/resources/images/gis/icon_vessel_b_ballast.png');
			refs.refRoroLadenVsl.setIcon('/resources/images/gis/icon_vessel_b_laden.png');
			refs.refRoroWaitingVsl.setIcon('/resources/images/gis/icon_vessel_b_waiting.png');
			refs.refRoroLoadingVsl.setIcon('/resources/images/gis/icon_vessel_b_loading.png');
			refs.refRoroDischargingVsl.setIcon('/resources/images/gis/icon_vessel_b_discharging.png');
		} else {
			refs.refCoastalBallestVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_g_ballast.png');
			refs.refCoastalLadenVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_g_laden.png');
			refs.refCoastalWaitingVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_g_waiting.png');
			refs.refCoastalLoadingVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_g_loading.png');
			refs.refCoastalDischargingVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_g_discharging.png');
			
			refs.refBulkBallestVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_o_ballast.png');
			refs.refBulkLadenVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_o_laden.png');
			refs.refBulkWaitingVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_o_waiting.png');
			refs.refBulkLoadingVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_o_loading.png');
			refs.refBulkDischargingVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_o_discharging.png');
			
			refs.refRoroBallestVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_b_ballast.png');
			refs.refRoroLadenVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_b_laden.png');
			refs.refRoroWaitingVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_b_waiting.png');
			refs.refRoroLoadingVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_b_loading.png');
			refs.refRoroDischargingVsl.setIcon(CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_vessel_b_discharging.png');
		}
	},
	
	onShowPortMarker: function(portStore, refPort) {
		var me = this;
		
		if (me.portLayerGrp) me.map.removeLayer(me.portLayerGrp);
		me.portLayerGrp = new L.layerGroup();	//init portLayerGrp
		me.portLayerGrp.id = 'ports';
		
		if(refPort && refPort.pressed) {
			me.map.addLayer(me.portLayerGrp);
		}
		
		for (var i = 0; i < portStore.getData().length; i++) {	
			var rec = portStore.getAt(i);
			if(rec.data.latitude !== '' && rec.data.longitude !== '') {	
				var iconName = '_touch';
				if(rec.data.portType === 'BK') {
					iconName = '_bunkering';
				} 
				
				var tempUrl = '';
				
				if(CONSTANTS.ENV == 'DEV'){ //DEV
					tempUrl = '/resources/images/gis/icon_port' + iconName + '.png';
				}else{ //PROD
					tempUrl = CONSTANTS.SERVER_CONTEXT + '/html/resources/images/gis/icon_port' + iconName + '.png';
				}

				var portIcon = L.icon({
					iconUrl: tempUrl,
					iconAnchor: [9, 12]
				});
				
				var toolTipContent = "Port: " + rec.data.portCode + ': ' + rec.data.portName
//				+ "<br>Route: " + rec.data.routeCode
				+ "<br>Lat&Lng: " + rec.data.latitude + ", " + rec.data.longitude;
				var portMarker = L.portMarker(
						[
						 rec.data.latitude, 
						 me.getRevisedLongitude(Number(rec.data.longitude))
						 ], 
						 {
							icon: portIcon, 
							routeCode : rec.data.routeCode,
							portSeq : rec.data.portSeq,
							portCode : rec.data.portCode,   // portUnloCd
							portName : rec.data.portName
						 }
				);
				portMarker.on('click', me.onPortMarkerClick, this);
				portMarker.bindTooltip(toolTipContent, {
					offset: L.point(0, 0)
				}).openTooltip();
				portMarker.addTo(me.portLayerGrp);
			}
		}	
	},
	
	getRevisedLongitude: function(longitude) {
		var me = this;
		
		if(longitude < 0) {
			return longitude + 360;
		}
		return longitude;
	},
	
	getRevisedLongitudeArea: function(longitude) {
		var me = this;
		
		if(longitude < -34) {
			return longitude + 360;
		}
		return longitude;
	},
	
	getReverseLongitude: function(longitude) {
		var me = this;
		
		if(longitude > 180) {
			return longitude - 360;
		}
		return longitude;
	},
	
	onBaseMapOptions: function(item) {
		var me = this;
		var baseMapValue, baseMapProvider, baseMapLabels;
		
		if(item.checked) {
			if(me.map && me.baseLayer) {
				me.map.removeLayer(me.baseLayer);
				
				if (me.layerLabels) {
					me.map.removeLayer(me.layerLabels);
			    }
			}
			
			if(item.inputValue === 'OSM') {
				baseMapProvider = 'OSM';
				baseMapValue = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
					zIndex: -2
				});
				
			} else if(item.inputValue === 'BING') {
				baseMapProvider = 'BING';
				var BING_KEY = 'AmxoHzBlzAQ2_BUmTpedwPxVEXHlv-08H9EuOVjrkAI3t7QE0RtXdNTdEMz16mCf';
				baseMapValue = L.tileLayer.bing({
					bingMapsKey: BING_KEY,
					imagerySet: 'AerialWithLabels',
					zIndex: -2
				});
				    
			} else if(item.inputValue === 'GOOGLE') {
				baseMapProvider = 'GOOGLE';
				baseMapValue = L.gridLayer.googleMutant({
				    type: 'hybrid', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
				    zIndex: -2
				});
				
			} else if(item.inputValue === 'ESRI_STREET') {
				baseMapProvider = 'ESLI';
				baseMapValue = 'Streets';
				
			} else if(item.inputValue === 'ESRI_OCEANS') {
				baseMapProvider = 'ESLI';
				baseMapValue = 'Oceans';
				baseMapLabels = baseMapValue + 'Labels';
				
			} else if(item.inputValue === 'ESRI_IMAGERY') {
				baseMapProvider = 'ESLI';
				baseMapValue = 'Imagery';
				baseMapLabels = baseMapValue + 'Labels';
				
			} else if(item.inputValue === 'MAPBOX_PIRATES') {
				var accessToken = 'pk.eyJ1IjoiY2hhZGxlZTR1IiwiYSI6ImNqM24wajZ1cTAwNXoyd2w3enQ0dWQ1cWYifQ.NOihluHa1nWGXSOco1a0Ow';
				baseMapValue = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.pirates/{z}/{x}/{y}.png?access_token=' + accessToken, {
				    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
				    accessToken: accessToken,
				    zIndex: -2
				});
				
			} else if(item.inputValue === 'MAPBOX_LIGHT') {
				var accessToken = 'pk.eyJ1IjoiY2hhZGxlZTR1IiwiYSI6ImNqM24wajZ1cTAwNXoyd2w3enQ0dWQ1cWYifQ.NOihluHa1nWGXSOco1a0Ow';
				baseMapValue = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=' + accessToken, {
					attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
					accessToken: accessToken,
					zIndex: -2
				});
			}
			
			if(baseMapProvider === 'ESLI') {
				me.baseLayer = L.esri.basemapLayer(baseMapValue, {
					zIndex: -2
				});
			    me.map.addLayer(me.baseLayer);
			    
			    if(baseMapLabels) {
			    	var layerLabels = L.esri.basemapLayer(baseMapLabels, {
			    		zIndex: -1
			    	});
			    	me.map.addLayer(layerLabels);
			    	me.layerLabels = layerLabels;
			    }
			} else {
				me.baseLayer = baseMapValue;
			    me.map.addLayer(me.baseLayer);
			}
		}
	},
	
	onDisplayVesselRoute: function(shipRec, isDisplay) {
		var me = this;
		var refs = me.getReferences();
    	var routeStore = MOST.getApplication().routeStore;
     	var routeRecord = routeStore.findRecord('shipCode', shipRec.data.callSign);

		me.map.eachLayer(function(layer){
			if(layer.id === "routers") {
				layer.remove();
				
				me.routerLayerGrp = new L.layerGroup();
				me.routerLayerGrp.id = 'routers';
			}
		});
	
		if(routeRecord && isDisplay) {
			var latlngs = new Array();
			var latlngs2 = new Array();
			var routePositions = new Array();
			for(var i=0;i<routeRecord.data.positionGroup.routePosition.length;i++) {
				routePositions.push(routeRecord.data.positionGroup.routePosition[i]);
				var latitude = routeRecord.data.positionGroup.routePosition[i].latitude;
			    var longitude = me.getRevisedLongitude(Number(routeRecord.data.positionGroup.routePosition[i].longitude));

			    if(latitude && longitude) {
			    	if(longitude <= 180) {
			    		latlngs.push([parseFloat(latitude), parseFloat(longitude)]);
			    	} else {
			    		latlngs2.push([parseFloat(latitude), parseFloat(longitude)]);
			    	}
			    }
			    
			}
			
			if(latlngs.length > 0) {
				var route = L.polyline([latlngs], {weight: 2, opacity: 1, color: '#ffff00'});
				route.addTo(me.routerLayerGrp);
			}
			
			if(latlngs2.length > 0) {
				var route2 = L.polyline([latlngs2], {weight: 2, opacity: 1, color: '#ffff00'});
				route2.addTo(me.routerLayerGrp);
			}
			
			for(var i=0;i<routePositions.length;i++) {
				var iconPrefix = '_y_';
				var iconName = 'ballast';
				
				var shipIcon = L.icon({
					iconUrl: '/resources/images/gis/icon_vessel' + iconPrefix + iconName + '.png',
					iconAnchor: [9, 12]
				});
				
				var toolTipContent = shipRec.data.vesselName + ' ' + routePositions[i].positionDate;
				var shipMarker = L.shipMarker(
						[
						 Number(routePositions[i].latitude), 
						 me.getRevisedLongitude(Number(routePositions[i].longitude))
						 ], 
						 {
							icon: shipIcon, 
							vesselCode: shipRec.data.vesselCode,
							vesselName: shipRec.data.vesselName,
							vesselStatus: shipRec.data.vesselStatus,
							callSign: shipRec.data.callSign,
							heading: routePositions[i].shipHead
						 }
				);
				shipMarker.bindTooltip(toolTipContent, {
					offset: L.point(0, -20)
				}).openTooltip();
				shipMarker.addTo(me.routerLayerGrp);
			}
			
			me.map.addLayer(me.routerLayerGrp);
		}
	},
	
	onDisplayVesselCoastMovement: function(shipRec, vesselMovementStore) {
		var me = this;
		var refs = me.getReferences();
		
		me.map.eachLayer(function(layer){
			if(layer.id === "routers") {
				layer.remove();
				
				me.routerLayerGrp = new L.layerGroup();
				me.routerLayerGrp.id = 'routers';
			}
		});
		
		if(vesselMovementStore.getCount() > 0) {
			var latlngs = new Array();
			var points = new Array();
			points = vesselMovementStore.getAt(0).data.routeCode.split('|');
			
			for(var j=0;j<points.length;j++) {
				var lat = Number(points[j].split(',')[0]);
				var lng = me.getRevisedLongitude(Number(points[j].split(',')[1]));
				
				if(lat && lng) {
					latlngs.push([lat, lng]);
				}
			}
			
			if(latlngs.length > 0) {
				var movement = L.polyline([latlngs], {weight: 1, opacity: 1, color: '#ff0000'});
				movement.addTo(me.routerLayerGrp);
			}
			
			me.map.addLayer(me.routerLayerGrp);
		}
	},
	
	onAreaOptions: function() {
		var me = this;
		var refs = me.getReferences();
		var areaStore = MOST.getApplication().areaStore;
		var checkedItems = refs.refAreaCheckGroup.getChecked();
		
		me.map.eachLayer(function(layer){
			if(layer.id === "areas") {
				layer.remove();
				
				me.areaLayerGrp = new L.layerGroup();
				me.areaLayerGrp.id = 'areas';
			}
		});
		
		for(var c = 0; c < checkedItems.length; c++){
			for(var i=0;i<areaStore.getCount();i++) {
				if(checkedItems[c].name === areaStore.getAt(i).data.zoneCode) {
					var latlngs = new Array();
					var points = new Array();
					points = areaStore.getAt(i).data.points.split('|');
					
					for(var j=0;j<points.length;j++) {
						var lat = Number(points[j].split(',')[0]);
						var lng = me.getRevisedLongitudeArea(Number(points[j].split(',')[1]));
						
						if(lat && lng) {
							latlngs.push([lat, lng]);
						}
					}
					
					if(latlngs.length > 0) {
						var area = L.polygon([latlngs], {weight: 1, opacity: 1, color: '#ff0000'});
						area.addTo(me.areaLayerGrp);
					}
					
					me.map.addLayer(me.areaLayerGrp);
				}
			}
		}
	},
	
	onAreaManage: function() {
		var me = this;
		var win = me.lookupReference('refVesselLocationModifyWin');
		
		if(!win) {
			win = Ext.create('Ext.window.Window', {
				reference: 'refAreaManagementWin',
				title: '권역 설정',
				width: 1000,
				height: 800,
				constrain: true,
    			layout: 'fit',
    			modal: true,
    			items: [{
    				xtype: 'app-areamanagement',
    				layout: 'fit'
    			}]
			});
		}
		
		win.show(); 
		win.toFront();
	},
	
	onAreaDelete: function() {
		var me = this;
		var refs = me.getReferences();
		var areaStore = MOST.getApplication().areaStore;
		var checkedItems = refs.refAreaCheckGroup.getChecked();
		
		Ext.Msg.show({
			title:'권역삭제',
			message: '체크된 권역을 정말 삭제하시겠습니까?',
		    buttons: Ext.Msg.OKCANCEL,
		    icon: Ext.Msg.QUESTION,
		    fn: function(button) {
		        if (button === 'ok') {
		        	for(var c = 0; c < checkedItems.length; c++){
		    			var record = areaStore.findRecord('zoneCode', checkedItems[c].name);
		    			areaStore.remove(record);
		    		}
		    		areaStore.sync();
		    		
		    		me.onAreaRefresh();
		        }
		    }
		});
	},
	
	onAreaSetting: function() {
		var me = this;
		var areaStore = MOST.getApplication().areaStore;
		var drawnItems = new L.FeatureGroup();
		
	    me.map.addLayer(drawnItems);
	    // Set the title to show on the polygon button
	    L.drawLocal.draw.toolbar.buttons.polygon = 'Draw Area in Map!';
	    var drawControl = new L.Control.Draw({
	        position: 'topleft',
	        draw: {
	            polyline: false,
	            circle: false,
	            marker: false,
	            circlemarker: false,
	            rectangle: false,
	            polygon: {
	            	allowIntersection: false,
	            	shapeOptions: {
	            		color: '#ff0000'
	            	}
	            }
	        },
//	        edit: {
//	            featureGroup: drawnItems,
//	            remove: true
//	        }
	    });
	    me.map.addControl(drawControl);
	    
	    me.map.on(L.Draw.Event.CREATED, function (e) {
	        var type = e.layerType,
	                layer = e.layer;
	        
	        var prompt = Ext.MessageBox.prompt('New Area', 'Please enter new area name:', function(btn, text) {
	        	if(btn === 'ok') {
	        		drawnItems.addLayer(layer);
	        		
	        		var points = '';
	        		var latlngs = layer.getLatLngs()[0];
	        		for(var i=0;i<latlngs.length;i++) {
	        			points += latlngs[i].lat + ',' + me.getReverseLongitude(latlngs[i].lng);
	        			if(i<latlngs.length-1) {
	        				points += '|';
	        			}
	        		}
	        		
	        		var record = Ext.create('MOST.model.map.common.Area', {
	        			zoneName: text,
	        			points: points
	        		});
	        		
	        		areaStore.add(record);
	        		areaStore.sync({
	        			callback: function(record, operation, success) {
	        				areaStore.load();
	        				me.getView().up().close();
	        			}
	    			});
	        	}
	        }, me);
	        setTimeout(function(){
	        	prompt.toFront();
			}, 500);
	        
	    });
	    
//	    me.map.on(L.Draw.Event.EDITED, function (e) {
//	        var layers = e.layers;
//	        var countOfEditedLayers = 0;
//	        layers.eachLayer(function (layer) {
//	            countOfEditedLayers++;
//	        });
//	        console.log("Edited " + countOfEditedLayers + " layers");
//	    });
	},
	
	onAreaDataLoad: function(store, records, successful, operation, eOpts) {
		var me = this;
		
		me.onAreaRefresh();
	},
	
	onAreaRefresh: function() {
		var me = this;
		var refs = me.getReferences();
		var areaStore = MOST.getApplication().areaStore;
		
		if(refs.refAreaCheckGroup) {
			refs.refAreaCheckGroup.removeAll();
			for(var i=0;i<areaStore.getCount();i++) {
				refs.refAreaCheckGroup.add({
					boxLabel: areaStore.getAt(i).data.zoneName,
					name: areaStore.getAt(i).data.zoneCode,
					checked: areaStore.getAt(i).data.checkAuto === 'Y' ? true : false
				});
			}
			
			me.onAreaOptions();
		}
	},
	
	onHighlightVessel: function(shipRec) {
		var me = this;
		
		me.map.eachLayer(function(layer){
			if(layer.id === "circleFeatureOfselectedVessel") {
				layer.remove();
			
			}
		});

		if(shipRec.data.longitude !== '' && shipRec.data.latitude !== '') {
			var lon = me.getRevisedLongitude(Number(shipRec.data.longitude));
			var lat = parseFloat(shipRec.data.latitude);
			var latlng = new L.LatLng(lat, lon);
			var clickCircle = L.circleMarker(latlng, {
				color: 'red',
				fillOpacity: 0
				//opacity: 0.5
			});
			
			clickCircle.id = 'circleFeatureOfselectedVessel';
			clickCircle.setRadius(13);
			clickCircle.addTo(me.map);
		}
	},
	
	onShipMarkerClick: function(evt) {
		this.fireEvent('onShipMarkerClick', evt, this);
	},		
	
	
	onPortMarkerClick: function(evt) {
		this.fireEvent('onPortMarkerClick', evt, this);
	},
	
	onMapResize: function() {
		var me = this;
		if(me.map) {
			me.map.invalidateSize();
		}
	},
	
	onMapOptions: function(btn) {
		var me = this;
		var flag = btn.pressed ? 1 : 0;
		
		if(me.map) {
			if(btn.value === 'seamap') 
			{
				if(me.seamapLayer) {
					me.map.removeLayer(me.seamapLayer);
					me.seamapLayer = null;
				} else {
					var seamapLayer = L.tileLayer('http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
						id: 'SEAMAP',
						maxZoom: 19,
						attribution: 'All maps &copy; <a href="http://www.openseamap.org/">OpenSeaMap</a>'
					}).addTo(me.map);
					me.seamapLayer = seamapLayer;
				}
				
			} else if (btn.value === 'ship') {
				if (flag === 1) {
					me.map.addLayer(me.shipLayerGrp);
					me.map.addLayer(me.shipLabelLayerGrp);
				} else {
					me.map.removeLayer(me.shipLayerGrp);
					me.map.removeLayer(me.shipLabelLayerGrp);
					me.map.eachLayer(function(layer){
						if(layer.id === "circleFeatureOfselectedVessel") {
							layer.remove();
						}
					});
				}
			} else if (btn.value === 'port') {
				if (flag === 1) {
					me.map.addLayer(me.portLayerGrp);
				} else {
					me.map.removeLayer(me.portLayerGrp);
				}				
			} else if (btn.value === 'router') {
				if (flag === 1) {
					me.map.addLayer(me.routerLayerGrp);
				} else {
					me.map.removeLayer(me.routerLayerGrp);
				}				
			} else if (btn.value === 'area') {
				if (flag === 1) {
					me.map.addLayer(me.areaLayerGrp);
				} else {
					me.map.removeLayer(me.areaLayerGrp);
				}				
			}
			
		}
	},
	
	onOpenWeatherMapOptions: function(item) {
		var me = this;
		var owmApiKey = '03d24b263bea5b96112384f9dea9a499';
		var checkedItems = item.up().getChecked();
		
		if (me.testOWMgrp) {
			me.map.removeLayer(me.testOWMgrp);
		}
		
		me.testOWMgrp = L.layerGroup();
		me.map.addLayer(me.testOWMgrp);

		for(var i = 0; i < checkedItems.length; i++){
			if(checkedItems[i].name === 'wind') {
				 L.tileLayer('http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid=' + owmApiKey, {
					opacity: 0.5,
					zIndex: 200
				}).addTo(me.testOWMgrp);
			}
			
			if(checkedItems[i].name === 'temp') {
				 L.tileLayer('http://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png?appid=' + owmApiKey, {
					opacity: 0.5,
					zIndex: 200
				}).addTo(me.testOWMgrp);
			}
			
			if(checkedItems[i].name === 'clouds') {
				 L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=' + owmApiKey, {
					opacity: 0.5,
					zIndex: 200
				}).addTo(me.testOWMgrp);
			}
			
			if(checkedItems[i].name === 'precipitation') {
				 L.tileLayer('http://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=' + owmApiKey, {
					opacity: 0.5,
					zIndex: 200
				}).addTo(me.testOWMgrp);
			}
			
			if(checkedItems[i].name === 'pressure') {
				 L.tileLayer('http://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png?appid=' + owmApiKey, {
					opacity: 0.5,
					zIndex: 200
				}).addTo(me.testOWMgrp);
			}
		}
	},
	
	onVesselImageDataLoad: function(store, records, successful, operation, eOpts) {
		var me = this;
		var refs = me.getReferences();
		
		if(refs.refVesselParticularImage) {
			refs.refVesselParticularImage.setSrc(null);
			if(records.length > 0) {
				//var imageSrc = CONSTANTS.REST_DEST_URL + '/file/vessels/images/' + records[0].data.maskedFileName;
				var imageSrc = MOST.config.Locale.getRestApiDestUrl() + '/file/vessels/images/' + records[0].data.maskedFileName;							
				refs.refVesselParticularImage.setSrc(imageSrc);
			}
			
		}
	},
	
	onVesselParticularAfterRender: function () {
		var me = this;
		var refs = me.getReferences();
		var vesselImageStore = me.getStore('vesselImageStore');
		
		if(refs.refVesselParticularImage && vesselImageStore.getCount() > 0) {
			refs.refVesselParticularImage.setSrc(null);
			var imageSrc = MOST.config.Locale.getRestApiDestUrl() + '/file/vessels/images/' + vesselImageStore.getAt(0).data.maskedFileName;
			refs.refVesselParticularImage.setSrc(imageSrc);
		}
	},
	
	onAddVesselImage: function(filefield, value) {
		var me = this;	
		var refs = me.getReferences();
		var frm = refs.refAddVesselImageForm.getForm();
		var fileType = Ext.util.Format.substr(value, value.length-3, value.length);	
		var file = filefield.fileInputEl.dom.files[0];
		var theVessel = me.getViewModel().get('theVessel');
		var formData = new FormData();										//*create FormData dynamically using FormData API
		
		formData.append(file.name, file);									//*Append vesselLibrary file into FormData Object
		var xhr = new XMLHttpRequest();										//*XMLHttpRequest instancing
		//add event handler
		xhr.addEventListener('loadend', function(){						//*Add event listner : "loadend" - finish request and waiting receive response
			if(xhr.status === 200){											//HTTP 200 OK					//*
				var objFromJsonXhrRespose = Ext.util.JSON.decode(xhr.responseText); 	//*Make json object from response string : here, the xhr.reponseText is same with action of SUCCESS callback's parameter.
				var maskedFileName = objFromJsonXhrRespose['fileName'];	
				var atchFileName = objFromJsonXhrRespose['atchFileName'];
				var fileSize = objFromJsonXhrRespose['fileSize'];
				
				if(refs.refVesselParticularImage) {
					refs.refVesselParticularImage.setSrc(null);
					var imageSrc = MOST.config.Locale.getRestApiDestUrl() + '/file/vessels/images/' + maskedFileName;
					refs.refVesselParticularImage.setSrc(imageSrc);
				}
				msgBox.close();
			}else{													//* Failed XMLHttpRequest with some error ...
				console.error(xhr.status+' '+xhr.statusText);
				msgBox.close();
			}
			frm.reset();		//You have to reset FileUploadField to upload again
		});
		//End of "add event handler"....
		
		xhr.open('POST', MOST.config.Locale.getRestApiDestUrl() + '/v1/coast/vesselimageupload?vesselCode=' + theVessel.data.vesselCode);
		xhr.setRequestHeader('Authorization', MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken());
		xhr.send(formData); 			// send formdata as multipart/form-data		
		
		var msgBox = Ext.MessageBox.show({
			msg: 'Uploading your data...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
	},
	
	onVesselLocationModifyWin: function(e, element) {
		var me = this;
		
		var win = me.lookupReference('refVesselLocationModifyWin');
		
		if(!win) {
			win = Ext.create('Ext.window.Window', {
				reference: 'refVesselLocationModifyWin',
				width: 345,
				header: true,
				bind: {
					title: 'Change Vessel Location : {theVessel.vesselName}'
				},
				height: 220,
				resizable: true,
    			resizeHandles: 'all',
    			closeAction: 'hide',
//				constrain: true,
				constrainHeader: true,
    			layout: 'fit',
    			items: [{
    				xtype: 'app-vessellocationmodify'
//    				layout: 'fit'
    			}]
			});
			me.getView().add(win);
		}
		
		win.show(); 
		win.toFront();
	},
	
	onVesselLocationModifyCrud: function() {
		var me = this;
		var refs = me.getReferences();
		var theVessel = me.getViewModel().get('theVessel');
		var vesselStore = me.getStore('vesselStore');
		var portStore = me.getStore('portStore');
		
		
		var proxy = theVessel.getProxy();
		proxy.type = 'rest';
		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/bulk/vessellocationmodify';
		
		theVessel.save({
			callback: function(record, operation, success) {
            	if(success) {
            		theVessel.set({
            			latitude: record.data.latitude,
            			longitude: record.data.longitude,
            			heading: record.data.heading
            		});
            		var success = MOST.getApplication().bundle.getMsg('success_msg');
					var msg = MOST.getApplication().bundle.getMsg('successsave_msg');
					Ext.Msg.alert(success, msg);
					
					if(refs.refVesselLocationModifyWin) {
						refs.refVesselLocationModifyWin.hide();
						me.onHighlightVessel(theVessel);
						me.loadMap(vesselStore, portStore, 
								me.lookupReference('refMapContainer'),
								me.lookupReference('refShip'),
								me.lookupReference('refPort'),
								me.origin);
					}
            	} else {
            		var faild = MOST.getApplication().bundle.getMsg('fail_msg');
					var msg = MOST.getApplication().bundle.getMsg('failupdateitem_msg');
					Ext.Msg.alert(faild, msg);
            	}
			}
		});
		
	},
	
	onSimulation: function() {
		var me = this;
		var win = me.lookupReference('refSimulationWin');
		
		if(!win) {
			win = Ext.create('Ext.window.Window', {
				reference: 'refSimulationWin',
				title: 'Simulatiom',
				width: 1000,
				height: 800,
				constrain: true,
    			layout: 'fit',
    			modal: true,
    			items: [{
    				xtype: 'app-simulation'
    			}]
			});
		}
		
		win.show(); 
		win.toFront();
	},
	
	simulationDefaultRowAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refSimulationGrid;
		var editor = grid.getPlugin('simulationEditor');
		var record = Ext.create('MOST.model.map.common.SimulationCondition');
		var simulationConditionStore = me.getStore('simulationConditionStore');
		var simulationResultStore = me.getStore('simulationResultStore');
		var netpasPortStore = me.getStore('netpasPortStore');
		
		//Load Netpas Port List
		netpasPortStore.load();
		
		me.onSimulationReset();
	},
	
	onSimulationDblClick: function() {
		var me = this;
		var refs = me.getReferences();
		var simulationConditionStore = me.getStore('simulationConditionStore');
		var selection = refs.refSimulationGrid.getSelection() == null ? null : refs.refSimulationGrid.getSelection()[0];
		
		refs.refSimulationGrid.getPlugin('simulationEditor').cancelEdit();
	},
	
	onSimulationReset: function() {
		var me = this;
		var refs = me.getReferences();
		var simulationConditionStore = me.getStore('simulationConditionStore');
		simulationConditionStore.removeAll();
		
		var record = Ext.create('MOST.model.map.common.SimulationCondition', {
			portCode: '',
			portName: '',
		});
		simulationConditionStore.add(record);
		
		var record = Ext.create('MOST.model.map.common.SimulationCondition', {
			portCode: '',
			portName: '',
			weather: '100',
			speed: '100',
			portDays: '0',
		});
		simulationConditionStore.add(record);
		
		simulationConditionStore.commitChanges();
	},
	
	onSimulationAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var simulationConditionStore = me.getStore('simulationConditionStore');
		
		var record = Ext.create('MOST.model.map.common.SimulationCondition', {
			portCode: '',
			portName: '',
			weather: '100',
			speed: '100',
			portDays: '0',
			departureDate: null
		});
		simulationConditionStore.add(record);
		refs.refSimulationGrid.getPlugin('simulationEditor').startEdit(record, 0);
	},
	
	onSimulationRun: function() {
		var me = this;
		var refs = me.getReferences();
		var simulationConditionStore = me.getStore('simulationConditionStore');
		var simulationResultStore = me.getStore('simulationResultStore');
		var portNames = new Array();
		var portCds = new Array();
		var weathers = new Array();
		var speeds = new Array();
		var portDays = new Array();
		var startDate = refs.refSimulationDepartureDate.getValue();
//		var startDate = new Date();
		
		simulationConditionStore.getAt(0).set({
			departureDate: Ext.Date.format(startDate, 'Y-m-d G')
		});
		
		for(var i=0;i<simulationConditionStore.getCount();i++) {
			var record = simulationConditionStore.getAt(i);
			
			portNames.push(record.data.portName);
			portCds.push(record.data.portCode);
			weathers.push(record.data.weather);
			speeds.push(record.data.speed);
			portDays.push(record.data.portDays);
		}
		
		simulationResultStore.load({
			params: {
				portNames: portNames,
				portCds: portCds,
				weathers: weathers,
				speeds: speeds,
				portDays: portDays,
				startDate: Ext.Date.format(startDate, 'Y-m-d G')
			},
			callback: function(records, operation, success) {
				if(records.length > 0) {
					me.onDisplaySimulationRoute();
				}
			}
		});
	},
	
	onNetpasPortCodeSelect: function(combo, record) {
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refSimulationGrid.getSelection() == null ? null : refs.refSimulationGrid.getSelection()[0];
		
		if(selection) selection.set('portCode', record.data.portCode);
	},
	
	onDisplaySimulationRoute: function() {
		var me = this;
		var refs = me.getReferences();
		var simulationConditionStore = me.getStore('simulationConditionStore');
		var simulationResultStore = me.getStore('simulationResultStore');
		
		me.map.eachLayer(function(layer){
			if(layer.id === "simulations") {
				layer.remove();
				
				me.simulationLayerGrp = new L.layerGroup();
				me.simulationLayerGrp.id = 'simulations';
			}
		});
		
		var latlngs = new Array();
		var latlngs2 = new Array();
		
		for(var i=0;i<simulationResultStore.getCount();i++) {
			
			var latLon = simulationResultStore.getAt(i).data.latLon;
			for(var j=0;j<latLon.length;j++) {
				var lat = Number(latLon[j].split(',')[0]);
				var lng = me.getRevisedLongitude(Number(latLon[j].split(',')[1]));
				
				if(lat && lng) {
					if(lng <= 326) {
						latlngs.push([lat, lng]);
					} else {
						latlngs2.push([lat, lng]);
					}
				}
			}
			
			if(latlngs.length > 0) {
				var route = L.polyline([latlngs], {weight: 2, opacity: 1, color: '#ffff00'});
				route.addTo(me.simulationLayerGrp);
			}
			
			if(latlngs2.length > 0) {
				var route2 = L.polyline([latlngs2], {weight: 2, opacity: 1, color: '#ffff00'});
				route2.addTo(me.simulationLayerGrp);
			}
			
			simulationConditionStore.getAt(i+1).set({
				distance: simulationResultStore.getAt(i).data.distance,
				arrivalDate: simulationResultStore.getAt(i).data.endDate,
				departureDate: simulationResultStore.getAt(i).data.startDate
			});
			
			//Total Value
			if(i===simulationResultStore.getCount()-1) {
				refs.refSimulationTotalDistance.setValue(simulationResultStore.getAt(i).data.totalDistance);
				refs.refSimulationTotalTime.setValue(Number(simulationResultStore.getAt(i).data.totalDay) * 24);
				refs.refSimulationTotalDay.setValue(simulationResultStore.getAt(i).data.totalDay);
			}
		}
		
		simulationConditionStore.commitChanges();
		me.map.addLayer(me.simulationLayerGrp);
	}
});
