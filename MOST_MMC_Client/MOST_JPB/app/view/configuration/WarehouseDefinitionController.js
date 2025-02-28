Ext.define('MOST.view.configuration.WarehouseDefinitionController', {
	extend: 'MOST.view.foundation.BaseViewController',

	alias: 'controller.warehouseDefinition',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refWarehousedefinitionlistGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'warehouseDefinitionGrid',            // Main Store Name
	WAREHOUSE_TYPE_COMBO_STORE_NAME : 'warehouseTypeCombo',
	WAREHOUSE_AREA_COMBO_STORE_NAME : 'warehouseAreaCombo',
	WAREHOUSE_YESNO_COMBO_STORE_NAME : 'warehouseUsedYn',
	
	//Detail Popup:
	DETAIL_WAREHOUSE_TYPE_COMBO_STORE_NAME : 'warehouseDtlTypeCombo',
	DETAIL_WAREHOUSE_AREA_COMBO_STORE_NAME : 'warehouseDtlAreaCombo',
	DETAIL_WAREHOUSE_YESNO_COMBO_STORE_NAME : 'warehouseDtlUsedYn',
	DETAIL_WAREHOUSE_LOC_DIV_COMBO_STORE_NAME : 'warehouseLocationDiv',
	DETAIL_WAREHOUSE_USE_TYPE_COMBO_STORE_NAME : 'warehouseMainUsage',
	
	MAX_DATE_PERIOD : 15,	// MAX PERIOD DATE
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
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.configuration.SearchWarehouseDefinitionParm');
		
		var warehouseTypeCombo = me.getStore(me.WAREHOUSE_TYPE_COMBO_STORE_NAME);
		var warehouseAreaCombo = me.getStore(me.WAREHOUSE_AREA_COMBO_STORE_NAME);
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		warehouseTypeCombo.load();
		warehouseAreaCombo.load();
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.WAREHOUSE_YESNO_COMBO_STORE_NAME);
		me.getStore(me.WAREHOUSE_YESNO_COMBO_STORE_NAME).insert(0, [{codeName: 'All',code: ''}]);
		
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch: function() {
		var me = this;
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	onAdd: function() {
		var me = this;
		
		me.openDetailPopup(null);
	},
	
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore('warehouseDefinitionGrid'); 
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		if(selection.data.locUseYn == 'Y'){
			MessageUtil.error('warning_msg','warehouse_using_message');
			return;
		}
		
		me.gridRemoveRow(grid, store, function(){
			MessageUtil.saveSuccess(); 
		});
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection, "Warehouse Detail Information", false);
	},

	onDetailLoad:function(){
		var me = this;
		var warehouseTypeCombo = me.getStore(me.DETAIL_WAREHOUSE_TYPE_COMBO_STORE_NAME);
		var warehouseAreaCombo = me.getStore(me.DETAIL_WAREHOUSE_AREA_COMBO_STORE_NAME);
		var detailView = me.getDetailBizView();
		
		var infoForm = detailView.down('form').getForm();
		
		infoForm.isValid();
		me.setDetailInitialize();
		
		warehouseTypeCombo.load();
		warehouseAreaCombo.load();
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.WH_LOC_DIV, me.DETAIL_WAREHOUSE_LOC_DIV_COMBO_STORE_NAME);
		me.setComboBoxWithLocalCache(CacheServiceConstants.WH_USE_TYPE, me.DETAIL_WAREHOUSE_USE_TYPE_COMBO_STORE_NAME);
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.DETAIL_WAREHOUSE_YESNO_COMBO_STORE_NAME);
		
		me.getStore(me.DETAIL_WAREHOUSE_YESNO_COMBO_STORE_NAME).insert(0, [{codeName: 'All',code: ''}]);

	},

	onWarehouseLocationDivChange:function(sm, selections){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var bayQty = refs.ctlBayQty;
		var rowQty = refs.ctlRowQty;
		var floorBearingCapacity = refs.ctlFloorBearingCapacity;
		var carParkingCapacity = refs.ctlCarParkingCapacity;
		var warehouseDtlArea = refs.ctlWarehouseDtlArea;
		var warehouseDtlType = refs.ctlWarehouseDtlType;
		var used = refs.ctlUsed;
		var mainUsage = refs.ctlMainUsage;
		var edible = refs.ctlEdible;
		var nonEdible = refs.ctlNonEdible;
		var dG = refs.ctlDG;

		if(recvData && recvData.data.isExistedCargo !== 'Y'){
			if(selections === 'ARE'){
				bayQty.setDisabled(true);
				rowQty.setDisabled(true);
				floorBearingCapacity.setDisabled(true);
				carParkingCapacity.setDisabled(true);
				warehouseDtlArea.setDisabled(true);
				warehouseDtlType.setDisabled(true);
				used.setDisabled(true);
				mainUsage.setDisabled(true);
				edible.setDisabled(true);
				nonEdible.setDisabled(true);
				dG.setDisabled(true);
				
				refs.ctlWarehouseDtlArea.setValue('');
				
				refs.ctlWarehouseDtlType.setValue('');
				refs.ctlUsed.setValue('');
			}else{
				bayQty.setDisabled(false);
				rowQty.setDisabled(false);
				floorBearingCapacity.setDisabled(false);
				carParkingCapacity.setDisabled(false);
				warehouseDtlArea.setDisabled(false);
				warehouseDtlType.setDisabled(false);
				used.setDisabled(false);
				mainUsage.setDisabled(false);
				edible.setDisabled(false);
				nonEdible.setDisabled(false);
				dG.setDisabled(false);
			}
		}
		
		refs.ctlWarehouseDtlArea.setDisabled(selections === 'ARE');
		refs.ctlWarehouseDtlType.setDisabled(selections === 'ARE');
		refs.ctlUsed.setDisabled(selections === 'ARE');
	},
	
	onGridComboRenderer: function(val, cell){
		return '';
	},

	onChange: function(picker) {
        console.log(picker.getId() + '.color: ' + picker.getValue());
    },
    
    onCheckDuplicationLocId: function(){
    	var me = this;
    	var refs = me.getReferences();
    	var locId = refs.ctlLocId.getValue();
    	
    	if(locId != ''){
    		var checkDupliLocId = me.getStore('checkDupliLocId');
    		checkDupliLocId.load({
    			params: {
    				locId: locId
    			},
    			callback: function(records, operation, success) {
    				if (success) {
    					if(records[0].data && records[0].data.cnt > 0){
    						MessageUtil.error('warning_msg','warehouse_duplicate_message');
    						refs.ctlLocId.focus(true);
    					}else{
    						MessageUtil.warning('warning_msg', 'warehouse_use_locid_message');
    					}
    				}
    			}
    		});
    	}else{
			MessageUtil.warning('warning_msg', 'warehouse_input_locid_message');
		}
    },
    
    onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				var refs = me.getReferences();
				var warehouseDivCode = refs.ctlWarehouseDivCode;
				var locId = refs.ctlLocId;
				
				if(warehouseDivCode.getValue() === 'WHO') {
					var bayQty = refs.ctlBayQty;
					var rowQty = refs.ctlRowQty;
					
					if (!(bayQty.getValue() > 0 && rowQty.getValue() >0 )) {
						MessageUtil.alert('Warning', 'who_definition_bay_row');
						return;
					}
				}
				
				detailItem.set('totDims', detailItem.data.len * detailItem.data.wth);
				detailItem.set('bayLen', detailItem.data.len / detailItem.data.bayQty);
				detailItem.set('rowwLen', detailItem.data.wth / detailItem.data.rowwQty);
				detailItem.set('areaPBlk', (detailItem.data.len / detailItem.data.bayQty) * (detailItem.data.wth / detailItem.data.rowwQty));
				detailItem.set('whId', detailItem.data.locId);
				if(detailItem.get(WorkingStatus.FIELD_NAME) === WorkingStatus.INSERT){
					var store = me.getStore('warehouseDefinitionGrid');
					var model = new MOST.model.configuration.SearchWarehouseDefinitionParm(infoForm.getValues());
					store.insert(0, model);
					me.saveProcess();
				}
				else {
					me.saveProcess();
				}

//				var overlapchecking = me.getStore('overlapchecking');
//				overlapchecking.load({
//					params: {
//						topWh : detailItem.data.topY,
//						leftWh : detailItem.data.leftX,
//						lenghtWh : detailItem.data.len,
//						widthWh : detailItem.data.wth,
//						locDivCd : warehouseDivCode.getValue(),
//						locId: locId.getValue()
//					},
//					callback: function(records, operation, success) {
//						if (success) {
//							
//							if(records[0].data.cnt > 0){
//								MessageUtil.error('warning_msg','warehouse_defined_message');
//							}else{
//								detailItem.set('totDims', detailItem.data.len * detailItem.data.wth);
//								detailItem.set('bayLen', detailItem.data.len / detailItem.data.bayQty);
//								detailItem.set('rowwLen', detailItem.data.wth / detailItem.data.rowwQty);
//								detailItem.set('areaPBlk', (detailItem.data.len / detailItem.data.bayQty) * (detailItem.data.wth / detailItem.data.rowwQty));
//								detailItem.set('whId', detailItem.data.locId);
//								
//								if(detailItem.get(WorkingStatus.FIELD_NAME) === WorkingStatus.INSERT){
//									var checkDupliLocId = me.getStore('checkDupliLocId');
//									checkDupliLocId.load({
//										params: {
//											locId: locId
//										},
//										callback: function(records, operation, success) {
//											if (success) {
//												if(records[0].data && records[0].data.cnt > 0){
//													MessageUtil.error('Warning','warehouse_duplicate_message');
//													refs.ctlLocId.focus(true);
//												}else{
//													var store = me.getStore('warehouseDefinitionGrid');
//													var model = new MOST.model.configuration.SearchWarehouseDefinitionParm(infoForm.getValues());
//													store.insert(0, model);
//													me.saveProcess();
//												}
//											}
//										}
//									});
//								} else { // UPDATE
//									me.saveProcess();
//								}
//							}
//						}
//					}
//				});
				
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	saveProcess:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var store = me.getStore('warehouseDefinitionGrid');
		var detailItem = me.getViewModel().get('theDetail');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		detailItem.set('userId', MOST.config.Token.getUserId());
		isCreated = detailItem.phantom;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.getProxy().url = store.getProxy().url;

		updateParm.save({
			success: function(record) {
				detailItem.set('version', record.get('newVersion'));
				detailItem.commit();
				
				MessageUtil.confirmation('success_msg', 'savesuccess_msg',null,
					function(button){
						if (button === 'ok') {
							detailView.close();
							me.onSearch();
						}
					}
				);
			}
		});
	},
	
	onDetailRemove:function(){
		var me = this;
		var store = me.getStore('warehouseDefinitionGrid');
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		
		MessageUtil.question('confirm', 'warehouse_delete_message',null, 
			function(button){
				if (button === 'ok') {
	    		   	store.remove(detailItem);
					store.sync({
						callback:function(records,success){
							if(success){
								detailView.close();
								MessageUtil.saveSuccess(); // Success Mesage
							}
						}
					});
				}
		});
	},
	
	onOpenWarehouseLayout: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getViewModel().getData().theDetail;
	   	
		if(!recvData.dirty){
			var win = refs.refWarehouseLayoutViewDialog;
		   	if (!win) {
		   		win = Ext.create('Ext.window.Window', {
		        	reference: 'refWarehouseLayoutViewDialog',
		        	title: 'Warehouse Layout - ' + recvData.data.locId,
		        	layout: 'fit',
		        	width: 1000,
		            height: 550,
		            resizable: true,
		            resizeHandles: 'all', 
		            closeAction: 'destroy',
		            constrain: false,
		            maximizable : false,
		            scrollable: true,
		            stateId: 'stateWarehouseLayoutViewDialogt',
		            stateful: true,
		            items: [{
		            	xtype: 'app-warehousedefinitionlayout',
		            	layout: 'fit'
		            }],
		            listeners: {
		                afterrender: function() {
		                    me.onDrawInitialize();
		                }
		            }
				});
		       
	       		me.getView().add(win);
	       }else{
	    	   me.onDrawInitialize();
	       }
	      
	       win.show();
	       win.toFront();		
		}else{
			me.getViewModel().set('reNew','Y');
			MessageUtil.error('warning_msg','The information of warehouse was changed. Please trying to save first.');
		}
	},
	
	onDrawInitialize: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getViewModel().getData().theDetail;
		var whId = recvData.data.locId;
		var bayQty = recvData.data.bayQty;
		var rowQty = recvData.data.rowwQty;
		var locTpCd = recvData.data.locTpCd;
		var metaStore = me.getStore('meta');
		var searchType = 'chkBayRow';
		var bayRowDesignInfoStore;
		
		if(!recvData.dirty){
			searchType = 'viewInfo';
			bayRowDesignInfoStore = me.getStore('WhViewList');
		}else{
			searchType = 'chkBayRow';
			bayRowDesignInfoStore = me.getStore('bayRowDesignInfo');
		}

		metaStore.load({
			callback: function(records, operation, success) {
				if (success) {
			    	bayRowDesignInfoStore.load({
			        	params: {
			        		searchType: searchType,
			        		whId: whId,
			    			bayQty: bayQty,
			    			rowQty: rowQty,
			    			locTpCd: locTpCd,
						},
						callback: function(records, operation, success) {
							if (success) {
								me.onDraw(records[0].data);
							}
						}
					});
				}
			}
		});
	},
	
	onDraw: function(bayRowDesignItem){
    	var me = this;
    	var refs = me.getReferences();
    	var canWarehouse;
		var metaStore = me.getStore('meta');
		var cellInfomation = me.getStore('cellInfomation');
		var bayInformation = me.getStore('bayInformation');
		var rowInformation = me.getStore('rowInformation');
		var unUsedInformation = me.getStore('unUsedInformation');
		var toggleButton = refs.refUnusedBlock;
		var recvData = me.getViewModel().getData().theDetail;
		
		cellInfomation.setData(bayRowDesignItem.cell);
		bayInformation.setData(bayRowDesignItem.bay);
		rowInformation.setData(bayRowDesignItem.row);
		unUsedInformation.setData(bayRowDesignItem.unused).commitChanges();
		
		canWarehouse = me.lookupReference('refWarehouseLayoutView');
		canWarehouse.removeAll(true);
		
    	var warehouseView = canWarehouse.add({
    		xtype: 'app-warehouserenderer',			//draw
    		reference: 'refWarehouseViewRenderer',
    		layout: {
    			type: 'absolute'
    		},
    		storeMeta: metaStore,
    		storeCell: cellInfomation,
    		storeBay: bayInformation,
    		storeRow: rowInformation,
    		storeUnused: unUsedInformation,
    		selectedItem: recvData,
    		x: 0,
    		y: 0,
    		width: 1,
        	height: 1
    	});
    	
    	warehouseView.on({
            element: 'element',
            click: function(e) {
            	if(toggleButton.publishedState.pressed === true){
	                var renderer = this.component;
	                var surface = renderer.getSurface();
	                    
	                var xy = surface.getEventXY(e),
	                    x = xy[0],
	                    y = xy[1];
	                
	                var selectedCellIndexes = renderer.getSelectedCellIndexes(x, y);
	                if(selectedCellIndexes) {
	                	if(selectedCellIndexes.length > 0) {
							renderer.selectWarehouseCell(selectedCellIndexes[0]);
							unUsedInformation.sync();
	                	}
	                }
            	}
            },
    	})
    	
    	var timer = setInterval (function() {
			if(warehouseView && warehouseView.isCompleted) {
				clearInterval(timer);
			}
		}, 100);
	},
	
	onZoomWarehouse: function(btn){
		var me = this;
		var store = me.getStore('meta');
		var baseUnit, baseUnitOrign;
		var currBaseUnit, currBaseHUnit, orgBaseUnit;
		var refs = me.getReferences();
		
		baseUnit = 'baseUnit';
		baseUnitOrign = 'baseUnitOrigin';

		var arrayBaseUnit = store.getAt(store.findExact('key',baseUnit)).data.value.split(',');
		var arrayBaseUnitOrign = store.getAt(store.findExact('key',baseUnitOrign)).data.value.split(',');
		
		if(btn.value === 100) {
			store.getAt(store.findExact('key', baseUnit)).set('value', [arrayBaseUnitOrign[0].toString(), arrayBaseUnitOrign[1].toString()]);
		} else {
			currBaseUnit = parseFloat(arrayBaseUnit[0]);
			currBaseHUnit = parseFloat(arrayBaseUnit[1]);
			orgBaseUnit = parseFloat(arrayBaseUnitOrign[0]);
			orgBaseHUnit = parseFloat(arrayBaseUnitOrign[1]);
			
			currBaseUnit = currBaseUnit + orgBaseUnit * btn.value / 100;
			currBaseHUnit = currBaseHUnit + orgBaseHUnit * btn.value / 100;
			store.getAt(store.findExact('key', baseUnit)).set('value', [currBaseUnit.toString(), currBaseHUnit.toString()]);
		}
		
		refs.refFit.setValue(false);
	},
	
	onFitWarehouseToWindow: function(tag) {
		var me = this;
		var store = me.getStore('meta');
		var baseUnit = 'baseUnit';
		
		if(tag.checked == true){
			var fitSize = null;
			var win = me.lookupReference('refWarehouseLayoutView');
			var view = me.lookupReference('refWarehouseViewRenderer');
			
			if(view){
				fitSize = view.getBaseYardUnit([win.getWidth(), win.getHeight()]);
			}
			
			if(fitSize){
				store.getAt(store.findExact('key', baseUnit)).set('value', fitSize);
			}
		}else{
			store.getAt(store.findExact('key', baseUnit)).set('value', store.getAt(store.findExact('key','baseUnitOrigin')).data.value);
		}
	},
	
	onScroll: function(scr, x, y, eOpts) {
		var me = this;
		
		if(me.getReferences().refWarehouseViewRenderer) {
			me.getReferences().refWarehouseViewRenderer.onScroll(x,y);
		}
	},
	
	onResize: function(element, eOpts ) {
		var me = this;
		
		task.delay(500, null, me, [element]);
	},
	
	onResizedTask: function(element) {
		var me = this;
		var store = me.getStore('meta');
		var view = me.lookupReference('refWarehouseLayoutView');
		var checkbox = me.lookupReference('refFit');
		
		if(view && checkbox.checked){
			me.onFitWarehouseToWindow();
		}
	},
	
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['locDivCd'] = 'WHO';
		params['locId'] = StringUtil.toUpperCase(searchParm.data.locId);
		params['locTpCd'] = StringUtil.toUpperCase(searchParm.data.locTpCd);
		params['areaId'] = StringUtil.toUpperCase(searchParm.data.areaId);
		params['locUseYn'] = StringUtil.toUpperCase(searchParm.data.locUseYn);
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;
	},
	
	// Detail Initialize
	setDetailInitialize:function(){
		 var me = this;
		 var refs = me.getReferences();
		 var detailView = me.getDetailBizView();
		 var recvData = detailView.items.get(0).recvData;
		
		 if(recvData == null){ // CREATE
		 	recvData = Ext.create('MOST.model.configuration.WarehouseDefinition');
		 	recvData.data.workingStatus = WorkingStatus.INSERT;
		 	recvData.data.isExistedCargo = 'N';
		 }
		
		 me.getViewModel().setData({theDetail:recvData});
		 me.getViewModel().set('reNew','N');
		 
		 if(refs.ctlLocId && refs.ctlLocId.getValue() != ''){
			 refs.ctlLocId.setEditable(false);
		 }
		 
		 if(recvData.data.isExistedCargo === 'Y'){
			 refs.ctlBayQty.setDisabled(true);
			 refs.ctlRowQty.setDisabled(true);
			 refs.ctlOpenLayoutButton.setDisabled(true);
			 refs.ctlWarehouseDivCode.setDisabled(true);
			 
		 }else{
			 refs.ctlBayQty.setDisabled(false);
			 refs.ctlRowQty.setDisabled(false);
			 refs.ctlOpenLayoutButton.setDisabled(false);
			 refs.ctlWarehouseDivCode.setDisabled(false);
		 }
		 
		 var layout = refs.refWarehouseLayoutViewDialog;
		 
		 if(layout){
			 layout.setTitle('Warehouse Layout - ' + recvData.data.locId);
			 me.onDrawInitialize();
		 }
	},	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});

var task = new Ext.util.DelayedTask(function() {
	var me = this;
    me.onResizedTask(arguments[0]);
});