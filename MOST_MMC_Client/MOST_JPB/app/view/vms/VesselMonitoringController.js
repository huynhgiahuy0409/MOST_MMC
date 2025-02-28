Ext.define('MOST.view.vms.VesselMonitoringController', {
	/**
     * @memberOf TSB
     */
    extend: 'MOST.view.map.VesselMapController',

    requires: [
       'MOST.model.map.port.Port'
    ],

    alias: 'controller.vesselmonitoring',
    
	loadData: function() {
		var me = this;
		var refs = me.getReferences();
		var vesselStore = me.getStore('vesselStore');
		var vesselBulkStore = me.getStore('vesselBulkStore');
		var vesselCarStore = me.getStore('vesselCarStore');
		var vesselCoastStore = me.getStore('vesselCoastStore');
		var portStore = me.getStore('portListStore');
		var vesselImageStore = me.getStore('vesselImageStore');

		me.setComboBoxWithLocalCache(CacheServiceConstants.VESSEL_KIND_COMBO, 'vesselKindLocalStore');
		
		me.loadMap(vesselStore, portStore, 
				refs.refMapContainer,
				refs.refShip,
				refs.refPort,
				'VMS');
		
		// Ship 
		vesselCoastStore.load
		({
			callback: function(records, operation, success) {
				if (success) {
					vesselStore.add(records);
					me.onShowVesselMarker(vesselStore, refs.refShip, 'VMS');
				}
			}
		});
		
		vesselBulkStore.load({
			callback: function(records, operation, success) {
				if (success) {
					vesselStore.add(records);
					me.onShowVesselMarker(vesselStore, refs.refShip, 'VMS');
				}
			}
		});
		vesselCarStore.load({
			callback: function(records, operation, success) {
				if (success) {
					vesselStore.add(records);
					me.onShowVesselMarker(vesselStore, refs.refShip, 'VMS');
				}
			}
		});
		
		portStore.load({
			callback: function(records, operation, success) {
				if (success) {
					me.onShowPortMarker(portStore, refs.refPort);
				}
			}
		});
		
		vesselImageStore.on('load', me.onVesselImageDataLoad, me);
		
		//Auto Refresh for Coast Vessel
		refs.refAutoRotateAction.setPressed(true);
		me.onAutoRefreshAction(refs.refAutoRotateAction);
	},	
	
	onSetFilter: function(cbo, record, eOpts) {
		var me = this;
		var refs = me.getReferences();
        // Access the field using its "reference" property name.
	    var vesselStore = me.getStore('vesselStore');
        shipFilters = vesselStore.getFilters();
        
//        var aisFleetPortStore = me.getStore('portListStore');
//        portFilters = aisFleetPortStore.getFilters();
        
        var vslKindFilterOperator = null, vslKindFilterValue = null;
        for (var i = 0; i < vesselStore.getCount(); i++) {
	        if (cbo.reference === 'refVesselKindCbo') {
	        	if (!!record.data && record.data.code != '' && record.data.code != 'ALL') {
	        		vslKindFilterOperator = '=';
	        		vslKindFilterValue = record.data.code;
	        	} else {
	        		vslKindFilterOperator = '!=';
	        		vslKindFilterValue = 'xxxxxxxxxx';
	        	}
	        }
        }
			
		if (vslKindFilterOperator) {
			vesselStore.removeFilter('vesselKind');
			var filter = {
					id: 'vesselKind',
					property: 'vesselKind',
					operator: vslKindFilterOperator,
		            value: vslKindFilterValue,
			};
			vesselStore.addFilter(filter);
		}
		
		me.onShowVesselMarker(vesselStore, refs.refShip, 'VMS');
	       
	},
	
	onShipMarkerClick: function(evt) {
		var me = this;
		var refs = me.getReferences();
		var vesselStore = me.getStore('vesselStore');
		var vesselImageStore = me.getStore('vesselImageStore');
		var vesselMovementStore = me.getStore('vesselMovementStore');
		var shipRec = null;
		
		vesselStore.each(function(record,idx){
			if (record.data.vesselCode === evt.target.getVesselCode()) {
				shipRec = record;	//find target record in store
				return false;
			}
		});
		
		var shipRowIndex = vesselStore.find('vesselCode', evt.target.getVesselCode());	//find target row
		refs.refServiceVesselList.getSelectionModel().select(shipRec,true,false);				//select target row
		refs.refServiceVesselList.getView().scrollRowIntoView(shipRowIndex);					//scroll to the selected row
		
		me.getViewModel().set('theVessel', shipRec);
		refs.refWestPanel.expand();
		
		me.onHighlightVessel(shipRec);
		if(shipRec.data.vesselKind === 'CB') {
			if(refs.refRouter.pressed) {
				vesselMovementStore.load({
					params: {
						vesselCode: shipRec.data.vesselCode
					},
					callback: function(records, operation, success) {
						if (success) {
							me.onDisplayVesselCoastMovement(shipRec, vesselMovementStore);
						}
					}
				})
			}
		} else {
			me.onDisplayVesselRoute(shipRec, refs.refRouter.pressed);
		}
		
		vesselImageStore.load({
			params: {
				vesselCode: shipRec.data.vesselCode
			}
		});
		
		refs.refServiceVesselList.expand();		
	},		
	
	onPortMarkerClick: function(evt) {
		var me = this;
		var vesselScheduleOfPortStore = me.getStore('vesselScheduleOfPortStore');
		var vesselScheduleOfPortSumStore = me.getStore('vesselScheduleOfPortSumStore');
		
		vesselScheduleOfPortStore.load({
			params: {
				portCode:  evt.target.getPortCode()
			}
		});
		
		vesselScheduleOfPortSumStore.load({
			params: {
				portCode:  evt.target.getPortCode()
			}
		});
		
		var vesselScheduleOfPortWin = me.lookupReference('refVesselScheduleOfPortWin');
		if (!vesselScheduleOfPortWin) {
			vesselScheduleOfPortWin = Ext.create('Ext.window.Window', {
				title: evt.target.getPortCode() + ': ' + evt.target.getPortName(),
				reference: 'refVesselScheduleOfPortWin',
				layout: 'fit',
				width: 575,
				height: 450,
				closeAction: 'hide',
				constrain: true,
				maximizable: true,
				items: [{
					xtype: 'app-vesselscheduleofport',
					layout: 'fit'
				}]
			});
			me.getView().add(vesselScheduleOfPortWin);
		} else {
			vesselScheduleOfPortWin.setTitle(evt.target.getPortCode() + ': ' + evt.target.getPortName());
		}
		vesselScheduleOfPortWin.show();
		vesselScheduleOfPortWin.toFront();
	},		
	
	onCellClick: function(grid, td, cellIndex, record, tr, rowIndex, e) {
		var me = this;
		var refs = me.getReferences();
		var vesselImageStore = me.getStore('vesselImageStore');
		var vesselMovementStore = me.getStore('vesselMovementStore');
    	var lon = parseFloat(record.data.longitude);
    	var lat = parseFloat(record.data.latitude);
    	
		var latlng = new L.LatLng(lat, lon);

    	me.map.panTo(latlng);
		
		if (record) {
			me.getViewModel().set('theVessel', record);
			me.onHighlightVessel(record);
			if(record.data.vesselKind === 'CB') {
				if(refs.refRouter.pressed) {
					vesselMovementStore.load({
						params: {
							vesselCode: record.data.vesselCode
						},
						callback: function(records, operation, success) {
							if (success) {
								me.onDisplayVesselCoastMovement(record, vesselMovementStore);
							}
						}
					})
				}
			} else {
//				me.onDisplayVesselRoute(shipRec, refs.refRouter.pressed);
			}
			
			vesselImageStore.load({
				params: {
					vesselCode: record.data.vesselCode
				}
			});
		}
	},

	onOriginalLocationSet: function(){
		var me = this;
		var refs = me.getReferences();
		var lat = 5.285153;
		var lon = 100.456238;
		var latlng = new L.LatLng(lat, lon);

    	me.map.panTo(latlng);
	},
	
	onChageVessel: function() {
		var me = this;
		var refs = me.getReferences();
    	var lon = parseFloat(me.getView().getCfgLon());
    	var lat = parseFloat(me.getView().getCfgLat());
    	//var imoNo = me.getView().getCfgImoNo();
    	var vesselCode = me.getView().getCfgVesselCode();
    	var rec = null;
    	var aisFleetShipStore = me.getViewModel().get('vesselCoastStore');
    	
		me.map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
		
		if (me.getView().getCfgVesselCode().length > 0) {
			aisFleetShipStore.each(function(record,idx){
 				if (record.data.vesselCode === me.getView().getConfig().cfgVesselCode) {
					rec = record;	//find target record in store
 					return false;
 				}
			});			
		}

		var rowIndex = aisFleetShipStore.find('vesselCode', me.getView().getConfig().cfgVesselCode);	//find target row
		refs.refServiceVesselList.getSelectionModel().select(rec,true,false);				//select target row
		refs.refServiceVesselList.getView().scrollRowIntoView(rowIndex);					//scroll to the selected row
		
		if (rec) {
			me.getViewModel().setData({aisinfo: rec});
			if (refs.refAisShipProperty.collapsed) {
				refs.refAisShipProperty.expand();
			}
			
			me.onHighlightVessel(rec);
			//me.onLoadPortRotation(rec.data.serviceLaneCode);
		}
	},
	
//	onLoadPortRotation: function(serviceLaneCode) {
//		var me = this;
//		var store = this.getStore('portRotationStore');
//		
//		//prevent to reload with same service lane
//		var oldSvcLaneCode = store.getProxy().params.portCode;
//		if (oldSvcLaneCode != portCode) {
//			store.load({
//				params: {
//					'portCode': portCode
//				},
//				callback: function(records, operation, success) {
//					if (success) {
//						store.getProxy().params.portCode = portCode;
//						//success
//					} else {
//						//cancel changed
//					}
//				}
//			});	
//		}
//	},
	
	onVesselParticularClick: function(btn) {
		var me = this;
		var refs = me.getReferences();
		
		var win = me.lookupReference('refVesselParticularWin');
		if(!win) {
			win = Ext.create('Ext.window.Window', {
				reference: 'refVesselParticularWin',
				width: 700,
				height: 530,
//				constrain: true,
				constrainHeader: true,
				bind: {
					title: '{theVessel.vesselName}'
				},
				resizable: false,
    			closeAction: 'hide',
    			layout: 'fit',
				items: [{
					xtype: 'app-vmsvesselparticular'
				}],
				listeners: {
					afterrender: 'onVesselParticularAfterRender'
				}
			});
			me.getView().add(win);
		}
		win.show();
		win.toFront();
	},
	
	onVesselParticularAfterRender: function () {
		var me = this;
		var refs = me.getReferences();
		var vesselImageStore = me.getStore('vesselImageStore');
		
		if(refs.refVesselParticularImage && vesselImageStore.getCount() > 0) {
			refs.refVesselParticularImage.setSrc(null);
			//var imageSrc = CONSTANTS.REST_DEST_URL + '/file/vessels/images/' + vesselImageStore.getAt(0).data.maskedFileName;
			var imageSrc = MOST.config.Locale.getRestApiDestUrl() + '/file/vessels/images/' + vesselImageStore.getAt(0).data.maskedFileName;			
//			var imageSrc = 'resources/images/icon_lock.png';
			refs.refVesselParticularImage.setSrc(imageSrc);
		}
	},
	
	onAddVesselImage: function(field) {
		var me = this;
     	var refs = me.getReferences();
    	var reader = new FileReader();
    	var dom = Ext.getDom(field.fileInputEl);
		
    	reader.onload = function (e){  
			var imageFile = e.target.result;
			var saveImage = imageFile.split(',');
			
			me.getViewModel().set('imgData',imageFile); 
			me.imageSave();
		}
		
		reader.readAsDataURL(dom.files[0]);
	},
	
	onRemoveVesselImage: function(){
		var me = this;
		var refs = me.getReferences();
		
  		me.getViewModel().set('imgData','');
  		
  		me.imageSave();
	},
	
	imageSave: function(){
		var me = this;
		var refs = me.getReferences();
		var imgData = me.getViewModel().get('imgData');
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
	
	onAutoRefreshAction: function(item) {
		var me = this;
		var refs = me.getReferences();
		var interval = refs.refAutoRefreshInterval.getValue() * 1000;
		var vesselCoastStore = me.getStore('vesselCoastStore');
		var vesselStore = me.getStore('vesselStore');
		
		if(item.pressed) {
			item.setText('Stop...');
			item.setIconCls('x-fa fa-stop');
			
			me.refreshIndex = 0;
			me.refreshTask = Ext.TaskManager.start({
				run: function() {
					if(me.refreshIndex > 0) {
						
						for(var i=0;i<vesselCoastStore.getCount();i++) {
							vesselStore.remove(vesselCoastStore.getAt(i));
						}
						
						vesselCoastStore.load({
							callback: function(records, operation, success) {
								if (success) {
									vesselStore.add(records);
									me.onShowVesselMarker(vesselStore, refs.refShip, 'VMS');
								}
							}
						})
					}
					me.refreshIndex = 1;
				},
				interval: interval
			});
		} else {
			item.setText('Start');
			item.setIconCls('x-fa fa-play');
			me.refreshTask.stopped = true;
			me.refreshTask = null;
			me.refreshIndex = 0;
		}
	},
	
	onDestroy: function() {
		var me = this;
		
		if(me.refreshTask) {
			me.refreshTask.stopped = true;
			me.refreshTask = null;	
		}
	}
});
