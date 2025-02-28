Ext.define('MOST.view.planning.TerminalViewController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.terminalview',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    metaStore : new Object(),
    berthStore : new Object(), 
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
        var me = this;
        var terminalCombo = me.getStore("terminalCombo");
        var metaStore = me.getStore('meta');
        var berthStore = me.getStore('berths');
        var warehouseListCombo = me.getStore('warehouseListCombo');
        var searchParm = Ext.create('MOST.model.planning.TerminalView');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		terminalCombo.load();
		metaStore.load();
		warehouseListCombo.load();
		
		berthStore.load({
			callback : function(records, operation, success){
				me.onDraw();
			}
		});

		me.onSearch();
		
	},

	onFilteringLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		
		me.getCargoTypeCombo();
		me.getCmdtGrpCombo();
		
		if(searchParm.get('import') == 'Y')
			refs.refImport.setValue(true);
		else 
			refs.refImport.setValue(false);
		
		if(searchParm.get('export') == 'Y')
			refs.refExport.setValue(true);
		else
			refs.refExport.setValue(false);
		
		if(searchParm.get('transShipment') == 'Y')
			refs.refTranshipment.setValue(true);
		else
			refs.refTranshipment.setValue(false);
		
		if(searchParm.get('storage') == 'Y')
			refs.refStorage.setValue(true);
		else
			refs.refStorage.setValue(false);
		
		if(searchParm.get('dg') == 'Y')
			refs.refDg.setValue(true);
		else
			refs.refDg.setValue(false);
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */

	onTerminalComboSelect : function(combo){
		var warehouseList = me.getStore("warehouseList");
		var selectedLocation = combo.value;
		
		warehouseList.load({
			params : {
				locDivCd : CodeConstants.MT_LOCDIV1_WHO,
				areaId : selectedLocation
			}
		});
	},

    onSearch : function(){
		var me = this;
		var searchParm = me.getViewModel().get('theSearch');
		var berthStore = me.getStore('berths');
		var warehouseStore = me.getStore('warehouses');
		var refs = me.getReferences();
		
		if(refs.refIncPlannedStorage.checked)
			searchParm.set('plannedStorage', 'Y');
		else
			searchParm.set('plannedStorage', 'N');
			
		berthStore.load({
			params : {

			},
			callback(records, operation, success){
				if(success){
					warehouseStore.load({
						params : {
							locDivCd : CodeConstants.MT_LOCDIV1_WHO,
							areaId : CodeConstants.VC_TMNL_BBT,
						},
						callback(records, operation ,success){
							if(success){
								me.onDraw();
							}
						}
					});
				}
			}
		});
    },

    onClear: function(){
    	var me = this;
    	var refs = me.getReferences();
    	var parentRefs = me.getView().up('window').parentView.getReferences();
    	var searchParm = me.getViewModel().get('theSearch');
    	var masterBlStore = me.getViewModel().getStore('masterBlCombo');
    	var bookingNoStore = me.getViewModel().getStore('bookingNoCombo');
    	var subBlStore = me.getViewModel().getStore('subBlCombo');
		var shippingNoteStore = me.getViewModel().getStore('shippingNoteCombo');
		var cmdtStore = me.getViewModel().getStore('commodityCodeCombo');
    	
		searchParm.set('vslCallId', '');
		searchParm.set('masterBl', '');
		searchParm.set('subBl', '');
		searchParm.set('bookingNo', '');
		searchParm.set('shipgNoteNo', '');
		searchParm.set('cargoTp', '');
		searchParm.set('cmdtGrp', '');
		searchParm.set('cmdt', '');
		searchParm.set('agent', '');
		searchParm.set('pod', '');
		searchParm.set('import', '');
		searchParm.set('export', '');
		searchParm.set('transShipment', '');
		searchParm.set('storage', '');
		searchParm.set('dg', '');
		searchParm.set('plannedStorage', '');
		
		refs.refImport.setValue(false);
		refs.refExport.setValue(false);
		refs.refTranshipment.setValue(false);
		refs.refStorage.setValue(false);
		refs.refDg.setValue(false);
		parentRefs.refIncPlannedStorage.setValue(false);
		parentRefs.txtFilteringText.setValue('');
		
    	masterBlStore.removeAll();
    	bookingNoStore.removeAll();
    	subBlStore.removeAll();
    	shippingNoteStore.removeAll();
    	cmdtStore.removeAll();
    	
    	if(parentRefs.refWarehouseFilter){
    		parentRefs.refWarehouseFilter.setStyle({
    			'background-color' : '#f6f6f6'
    		});
    	}

    	var arr = me.getView().up('window').parentView.items.items.at(0).items.items.at(0).items.items;
    	var surface = '';
    	
    	for(var i = 0; i < arr.length; i++){
    		if(arr[i].type == 'plan'){
    			surface = arr[i];
    			
    			for(var j = 0; j < surface.getItems().length; j++){
    				surface.getItems()[j].setAttributes({
    					hidden: true
    				});
    			}
    			
    			surface.renderFrame();
    		}
    	}
    },
    
    onFilteringSearch: function(){
    	var me = this;
    	var searchParm = me.getViewModel().get('theSearch');
    	var refs = me.getReferences();
    	var parentRefs = me.getView().up('window').parentView.getReferences();
    	
    	if(refs.refImport.checked)
    		searchParm.set('import', 'Y');
    	else
    		searchParm.set('import', 'N');
    	
    	if(refs.refExport.checked)
    		searchParm.set('export', 'Y');
    	else
    		searchParm.set('export', 'N');
    	
    	if(refs.refTranshipment.checked)
    		searchParm.set('transShipment', 'Y');
    	else
    		searchParm.set('transShipment', 'N');
    	
    	if(refs.refStorage.checked)
    		searchParm.set('storage', 'Y');
    	else
    		searchParm.set('storage', 'N');
    	
    	if(refs.refDg.checked)
    		searchParm.set('dg', 'Y');
    	else
    		searchParm.set('dg', 'N');
    	
    	if(parentRefs.refWarehouseFilter){
    		parentRefs.refWarehouseFilter.setStyle({
    			'background-color' : '#45eb42'
    		});
    	}
    	
    	me.setFilterList();
    	me.getView().up('window').close();
    },
    
    onClose: function(){
    	var me = this;
    	
    	me.getView().up('window').close();
    },
    
	onDraw : function(){
		var me = this, canTerminal, terminalView;
    	var metaStore = me.getStore('meta');
    	var berthsStore = me.getStore('berths');
    	var warehouseStore = me.getStore('warehouses');
    	var renderer = this.component;
    	
    	if(me.getReferences().refIncPlannedStorage.checked){
    		warehouseStore.planChk = 'Y'
    	} else {
    		warehouseStore.planChk = 'N'
    	}

		canTerminal = me.lookupReference('refTerminalLayout');

		if(canTerminal != null)
			canTerminal.removeAll(true);

		terminalView = canTerminal.add({
			xtype : 'app-terminalrenderer',
			plugins: ['spriteevents'],
    		reference: 'refTerminalView',
    		layout: {
    			type: 'absolute'
    		},
    		storeMeta: metaStore,
			storeBerth: berthsStore,
			storeWarehouse: warehouseStore,
    		x: 0,
    		y: 0,
    		width: 1,
        	height: 1
		});

		terminalView.on({
			element : 'element',
			"dblClick" : function(event){
				var renderer = this.component;
				var surface = renderer.getSurface();
				var pos = surface.getEventXY(event);
				var warehouseData = renderer.getSelectedWarehouse(pos[0], pos[1]);
				var spaceMovementData = me.getView().recvData;
				
				if(spaceMovementData) {
					var theDetail = spaceMovementData.getViewModel().get('theDetail');
					theDetail.set('reqPos', warehouseData[0].get('locId'));
					me.getView().recvData = null;
					me.closeView();
				} else if(warehouseData.length > 0)
					me.openWarehouseView(warehouseData);
			},
			click : function(event){
				var renderer = this.component;
				var surface = renderer.getSurface();
				var pos = surface.getEventXY(event);
				var warehouseData = renderer.getSelectedWarehouse(pos[0], pos[1]);
				
				if(warehouseData.length > 0){
					if(me.getReferences().refIncPlannedStorage.checked){
						warehouseData.at(0).data.planChk = 'Y';
					} else {
						warehouseData.at(0).data.planChk = 'N';
					}
					
					renderer.selectWarehouseOccupied(warehouseData);
				} else {
					renderer.hideTooltipSprites();
				}
			},
			
			preventDefault:true
		});

		var timer = setInterval (function() {
			if(terminalView && terminalView.isCompleted){
				clearInterval(timer);
			}
		}, 100);

		me.onFitToScreenChecked(null, me.lookupReference('refFit').getValue());
	},

	openWarehouseView : function(warehouseData){
		var me = this;
		var prefix = 'menu';
		var menuId = 'MPCT113';
		var id = prefix + '_' + menuId;
		var mainView = me.getView().findParentByType('app-main');
		var tabs = mainView.lookupReference('ref-maintab');
		var tab = tabs.items.getByKey(id);
		
		if(!tab){
			me.loadMenuView('app-warehouseview', warehouseData[0]);
		} else {
			me.fireEvent('onRedirectWarehouseView', warehouseData[0]);
			tabs.setActiveTab(tab);
		}
	},
	
	onWarehouseColorModeChange: function(checkbox, newValue, oldValue, eOpts){
		var me = this;
		var view = me.lookupReference('refTerminalView');
		
		view.colorMode = checkbox.value;
		me.onDraw();
	},
	
	onZoomLayout : function(btn){
		var me = this;
		var zoomRate = 0;
		var curr = 0;
			
		if(me.lookupReference('refFit').getValue()){
			me.lookupReference('refFit').setValue(false);
			me.toOriginalRate();
		}

		var meta = me.getStore('meta');
		
		if(btn == undefined || btn == null){
			zoomRate = 20;
			curr = 1;
		}else{
			var zoomRate = parseInt(btn.value);
			var curr = parseFloat(meta.getAt(meta.findExact('key', 'baseUnit')).data.value);
		}
		
		if ((curr >= 2 && zoomRate > 0) || (curr <= 0.4 && zoomRate < 0)) {
			return;
		} else if(zoomRate == 100){
			me.toOriginalRate();
		} else if(zoomRate == 20 || zoomRate == -20){
			meta.getAt(meta.findExact('key', 'baseUnit')).set('value', curr+(zoomRate/100));
			meta.getAt(meta.findExact('key', 'baseBerthUnit')).set('value', curr+(zoomRate/100));
			meta.getAt(meta.findExact('key', 'baseDistanceUnit')).set('value', curr+(zoomRate/100));
		}
	},

	toOriginalRate : function(){
		var me = this;
		var meta = me.getStore('meta');
		var org = parseFloat(meta.getAt(meta.findExact('key', 'baseUnitOrigin')).data.value);
		
		meta.getAt(meta.findExact('key', 'baseUnit')).set('value', org);
		meta.getAt(meta.findExact('key', 'baseBerthUnit')).set('value', org);
		meta.getAt(meta.findExact('key', 'baseDistanceUnit')).set('value', org);
	},

	onFitToScreenChecked : function(checkbox, newValue, oldValue, eOpts){
		var me = this;
		
		if(newValue || newValue == undefined){
			me.onFitLayoutToScreen();
		} else {
			me.toOriginalRate();
		}
	},
	
	onFitLayoutToScreen : function(){
		var me = this;
		var store = me.getStore('meta');
		var win = me.lookupReference('refTerminalLayout');
		var view = me.lookupReference('refTerminalView');
		var fitWidth = view.getWindowsWidth(win.getWidth());
		var fitHeight = view.getWindowsHeight(win.getHeight());
		
		store.getAt(store.findExact('key', 'baseBerthUnit')).set('value', fitWidth);
		store.getAt(store.findExact('key', 'baseDistanceUnit')).set('value', fitHeight);
	},

	onScroll: function(scr, x, y, eOpts) {
		var me = this;

		if(me.getReferences().refTerminalView) {
			me.getReferences().refTerminalView.onScroll(x,y);
		}
	},

	onResize: function(element, eOpts ) {
		var me = this;
		task.delay(500, null, me, [element]);
	},

	onResizedTask: function(element) {
		var me = this;
		var store = me.getStore('meta');
		var view = me.lookupReference('refTerminalView');
	},
	
	onOpenFiltering: function(){
		var me = this;
		var title = 'Filtering Option';
		
		me.getView().detailViewAlias = 'app-terminalviewfiltering';
		me.openDetailPopup(null, title);
	},
	
	onSelectSnBlCombo:function(ownObj){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var subBlStore = me.getViewModel().getStore('subBlCombo');
		var shippingNoteStore = me.getViewModel().getStore('shippingNoteCombo');
		
		if(ownObj == refs.ctlMasterBL){
			if(refs.ctlBookingNo.getValue() != ""){
				refs.ctlBookingNo.setValue("");
			}
			if(refs.ctlSNNo.getValue() != ""){
				refs.ctlSNNo.clearValue();
				shippingNoteStore.removeAll();
			}
			
			me.getSubBlCombo();
		}else if(ownObj == refs.ctlBookingNo){
			if(refs.ctlMasterBL.getValue() != ""){
				refs.ctlMasterBL.setValue("");
			}
			
			if(refs.ctlSubBL.getValue() != ""){
				refs.ctlSubBL.clearValue();
				subBlStore.removeAll();
			}
			
			me.getShippingNoteCombo();
		}
	},
	
	onSelectCmdtCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var cmdtStore = me.getViewModel().getStore('commodityCodeCombo');
		var params = {
			cmdtGrp: searchParm.get('cmdtGrp')
		};
		
		cmdtStore.load({
			params: params
		});
	},
	
	onTxtPtnrCdTriggerClick:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var params = {
			searchModule: CodeConstants.LCD_MOST
		};
		
		me.openCodePopup('popup-partnercdtypepopup', refs.txtPartnerCode, params);
	},

	openPortPopup: function(btn, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var win = refs.refPortWin;
		
		if (!win) {
			win = Ext.create('Ext.window.Window', {
				reference: 'refPortWin',
				title : 'Port Code',
				layout: 'fit',
				iconCls: 'x-fa fa-ship',
				width: 700,
				height: 350,
				resizable: true,
				resizeHandles: 'all', 
				closeAction: 'destroy',
				constrain: false,
				maximizable : true,
				scrollable: true,
				modal : true,
				items: [{
					xtype: 'app-portpopupbl',
				layout: 'fit'
				}],
				listeners : {
					close:function(win){
						var returnValue = win.returnValue;
						if(returnValue != undefined){
							var returnItem = returnValue.item;
							if(btn.reference=="refBtnPOD"){	
								searchParm.set('pod', returnItem.get('portCd'));
							}
						}
					}
				}
			});
   
			me.getView().add(win);
		}
		
		win.show();
		win.toFront();
	},
	
	onPlannedCheck: function(){
		var me = this;
		
		me.onDraw();
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		
		if(targetControl == 'ctlJpvc'){
			var subBlStore = me.getViewModel().getStore('subBlCombo');
			var shippingNoteStore = me.getViewModel().getStore('shippingNoteCombo');
			
			refs.ctlMasterBL.clearValue();
			refs.ctlBookingNo.clearValue();
			refs.ctlSubBL.clearValue();
			refs.ctlSNNo.clearValue();
			
			subBlStore.removeAll();
			shippingNoteStore.removeAll();
			
			me.getMasterBlCombo();
			me.getBookingNoCombo();
		} else if(xtype == 'popup-partnercdtypepopup'){
			searchParm.set('agent', returnValue.code);
		}
	},
	
	getMasterBlCombo : function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var masterBlStore = me.getViewModel().getStore('masterBlCombo');
		
     	var params = {
     		vslCallId : searchParm.get("vslCallId")
     	};
     	
     	masterBlStore.load({
			params: params
		});
	},
	
	getBookingNoCombo: function(returnValue){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var bookingNoStore = me.getViewModel().getStore('bookingNoCombo');
		var params = {
     		vslCallId : searchParm.get("vslCallId")
     	};
	     	
		bookingNoStore.load({
			params: params
		});
	},
	
	getSubBlCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var subBlStore = me.getViewModel().getStore('subBlCombo');
		var params = {
     		vslCallId : searchParm.get("vslCallId"),
     		mfDocId : searchParm.get("masterBl")
     	};
	     	
		subBlStore.load({
			params: params
		});
	},
	
	getShippingNoteCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var shippingNoteStore = me.getViewModel().getStore('shippingNoteCombo');
		var params = {
     		vslCallId : searchParm.get("vslCallId"),
     		mfDocId : searchParm.get("bookingNo")
     	};
	     	
		shippingNoteStore.load({
			params: params
		});
	},
	
	getCargoTypeCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var cargoTypeStore = me.getViewModel().getStore('cargoTypeCombo');
		
		cargoTypeStore.load();
	},
	
	getCmdtGrpCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var cmdtGrpStore = me.getViewModel().getStore('commodityCodeGroupCombo');
		
		cmdtGrpStore.load();
	},
	
	setFilterList: function(){
		var me = this;
		var refs = me.getReferences();
		var parentRefs = me.getView().up('window').parentView.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var filterList = '';
		var arr = new Array();
		
		if(searchParm.get('vslCallId') != null && searchParm.get('vslCallId') != '')
			arr.push(searchParm.get('vslCallId'));
		
		if(searchParm.get('masterBl') != null && searchParm.get('masterBl') != '')
			arr.push(searchParm.get('masterBl'));
		
		if(searchParm.get('subBl') != null && searchParm.get('subBl') != '')
			arr.push(searchParm.get('subBl'));
		
		if(searchParm.get('bookingNo') != null && searchParm.get('bookingNo') != '')
			arr.push(searchParm.get('bookingNo'));
		
		if(searchParm.get('shipgNoteNo') != null && searchParm.get('shipgNoteNo') != '')
			arr.push(searchParm.get('shipgNoteNo'));
		
		if(searchParm.get('import') == 'Y')
			arr.push('import');
		
		if(searchParm.get('export') == 'Y')
			arr.push('export');
		
		if(searchParm.get('transShipment') == 'Y')
			arr.push('transShipment');
		
		if(searchParm.get('storage') == 'Y')
			arr.push('storage');
		
		if(searchParm.get('dg') == 'Y')
			arr.push('dg');
		
		if(searchParm.get('cargoTp') != null && searchParm.get('cargoTp') != '')
			arr.push(searchParm.get('cargoTp'));
		
		if(searchParm.get('cmdtGrp') != null && searchParm.get('cmdtGrp') != '')
			arr.push(searchParm.get('cmdtGrp'));
		
		if(searchParm.get('cmdt') != null && searchParm.get('cmdt') != '')
			arr.push(searchParm.get('cmdt'));
		
		if(searchParm.get('agent') != null && searchParm.get('agent') != '')
			arr.push(searchParm.get('agent'));
		
		if(searchParm.get('pod') != null && searchParm.get('pod') != '')
			arr.push(searchParm.get('pod'));
		
		for(var i = 0; i < arr.length; i++){
			if(i < arr.length - 1)
				filterList += arr[i] + ', ';
			else 
				filterList += arr[i]
		}
		
		parentRefs.txtFilteringText.setValue(filterList);
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});
