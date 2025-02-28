Ext.define('MOST.view.operation.warehouse.WarehouseOfROROController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		'MOST.view.common.warehouserenderer.WarehouseRendererBuilder'
	],

	alias: 'controller.warehouseofroro',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	warehouseBuilder : new WarehouseRendererBuilder({
		selectable : true,
		allowMultiSelect : false,
		showRelatedCargo : true,
		renderMode : 'occupied',
		colorMode : 'cargo',
		minZoomRate : 20,
		maxZoomRate : 300
	}),

	selectedCell : new Object(),

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
		
		refs.refWarehouseLayoutView.suspendEvents();
		
		me.loadWarehouseComboList();
	},
	
	loadWarehouseComboList : function(){
		var me = this;
		var warehouseComboListStore = me.getStore('warehouseList');
		warehouseComboListStore.load({
			params : {
				locDivCd : 'WHO',
				areaId : 'BBT',
				locUseYn : 'Y'
			},

			callback: function(records, operation, success) {
				if (success) {
					me.setHandlingCargoInformation();
				}
			}
		});
	},

	setHandlingCargoInformation : function(){
		var me = this;
		var refs = me.getReferences();

		var recvData = me.getView().recvData;
		if(recvData){
			refs.refCgNo.setValue(recvData.data.cgNo);
		}
		
		if(recvData.$className === 'MOST.model.operation.CargoHandlingOut'){
			refs.refOccupied.disable();
			refs.refPlan.disable();
			refs.refPlannedInfo.setText('Occupied Info');
			refs.refFrameCargoAmount.setTitle('De-Allocated Cargo Amount');
		}else{
			refs.refOccupied.enable();
			refs.refPlan.enable();			
			refs.refPlannedInfo.setText('Planned Info');
			refs.refFrameCargoAmount.setTitle('Yard Plan Setting');
		}

		var viewReference = me.lookupReference('refWarehouseLayoutView');
		me.warehouseBuilder.veiwPlanInfo(viewReference, refs, recvData);
		
    	var timer = setInterval (function() {
			if(me.warehouseBuilder && me.warehouseBuilder.getIsCompleted())
				clearInterval(timer);
			refs.refWarehouseLayoutView.resumeEvents();
		}, 200);
	},

	onLayoutViewRender : function(panel) {
		var me = this;
		var cellField = me.lookupReference('refSelectedCell');
		panel.body.on('click', function(e) {
			me.warehouseBuilder.onClick(e, function(builder, item, e){
				if(!item)
					return;

				var selectedCell = builder.getSelectedCells()[0];
				if(selectedCell){
					cellField.setValue(selectedCell.data.locId);
				}
				
				
				var carfoInfo = builder.getCellCargos(selectedCell.data.locId);
				var store = me.getStore('cargoInfoInSelectedCell');
				store.removeAll();
				Ext.Array.each(carfoInfo, function(rec) {
					store.add(rec.data);
				});
				store.commitChanges();

				var refs = me.getReferences();
				refs.refSelectedCell.setValue(builder.getSelectedCells()[0].data.locNm);
			});
		});
	},


    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onCargoInfoCellClick:function(gridview, tdEl, cellIndex, record, trEl, rowIndex, e){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refCargoInfoGrid;
		
		var recvData = me.getView().recvData;
		if(recvData.$className === 'MOST.model.operation.CargoHandlingOut'){
			if(grid.getSelection() && grid.getSelection().length>0) {
				var selectedItem = grid.getSelection()[0];
				
				refs.refAllocatedMT.setValue(selectedItem.get('wgt'));
				refs.refAllocatedM3.setValue(selectedItem.get('msrmt'));
				refs.refAllocatedQty.setValue(selectedItem.get('pkgQty'));
			}
		}
	},	
	
	getWhTpCdNm : function(cd){
		var cdNm = '';
		
		if (cd === 'G') {
			cdNm = 'NORMAL';
		} else if (cd === 'D'){
			cdNm = 'DAMAGE';
		} else if (cd === 'S') {
			cdNm == 'SHUT-OUT';
		}
		
		return cdNm;
	},

	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
       	window.close();	
	},
	
	onSave:function(){
		var me = this;
		var refs = me.getReferences();

		var recvData = me.getView().recvData;

		var vslCallId, whTpCd, whTpCdNm, whId, whPreName;

		var recvData = me.getView().recvData;
		if(recvData){
			vslCallId = recvData.data.vslCallId;
			whTpCd = recvData.data.whTpCd;
			whTpCdNm = me.getWhTpCdNm(recvData.data.whTpCd);
			whId = recvData.data.whId;
			whPreName =  recvData.data.whId;
		}

		var store = me.getStore('allocatedCargoAmount');
		
		var returnItem = Ext.create('MOST.model.operation.CargoHandlingIn', {
			vslCallId : vslCallId,
			whId : whId ? whId : refs.refWarehouse.getValue(),
			whTpCd : whTpCd,
			locId : refs.refSelectedCell.getValue()
		});		
		
		returnItem.set('whConfigurationMap', store);
		var window = me.getView().up('window');
    	window.returnValue = returnItem;
       	window.close();
	},
	
	onValidation:function(){
		var me = this;
		var refs = me.getReferences();
		var totalMT = refs.ctlTotalMT.getValue();
		var totalM3 = refs.ctlTotalM3.getValue();
		var totalQty = refs.ctlTotalQty.getValue();
		var store = me.getStore('allocatedCargoAmount');
		var accMt = 0, accM3 = 0, accQty = 0;

		for(var i = 0; i < store.data.length ; i++){
			var record = store.getAt(i);
			accMt += record.data.wgt; 
			accM3 += record.data.msrmt; 
			accQty += record.data.pkgQty; 
		}

		if(totalMT === accMt && totalM3 === accM3 && totalQty === accQty){
			return true;
		}else{
			return false;
		}
	},
	
	
	checkValidItem:function() {
		
		var me = this;
		var refs = me.getReferences();
		var mt = refs.refAllocatedMT.getValue();
		var m3 = refs.refAllocatedM3.getValue();
		var qty = refs.refAllocatedQty.getValue();
		var accMt, accM3, accQty;
		var isUpdate = false;
		var store = me.getStore('allocatedCargoAmount');

		return true ;
	},	
	
	
	onWarehouseSelect : function(combo, record, eOpts){
		var me = this;
		var ref = me.lookupReference('refWarehouseLayoutView');
		var recvData = me.getView().recvData;
		
		me.warehouseBuilder.build(ref, record, recvData);
		me.getReferences().refFit.setValue(false);
	},

	onWarehouseColorModeChange : function(btn, e, eOpts){
		var me = this;
		me.warehouseBuilder.changeColorMode(btn.value);
	},

	onZoomWarehouse : function(btn){
		var me = this;
		me.warehouseBuilder.onZoomWarehouse(btn.value);
		me.getReferences().refFit.setValue(false);
	},

	onFitToScreenWarehouse : function(tag){
		var me = this;
		me.warehouseBuilder.onFitToScreenWarehouse(tag.value);
	},

	onCargoAllocationRegister : function(){

	},

	onCargoAllocationDelete : function(){

	},

	onWarehouseAllocationRegister : function(){

	},

	onWarehouseAllocationCancel : function(){

	},

	onChangeWarehouseViewType : function(){

	},

	onChangeCellViewType : function(){

	},

	onChangeColorBy : function(btn){
		var me = this;
		me.warehouseBuilder.changeRenderMode(btn.value);
	},
	
	onDisplayLegend: function(btn){
		var me = this;
		var xtype = 'popup-warehouselegend';
		me.openCodePopup(xtype,me);
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */



	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});