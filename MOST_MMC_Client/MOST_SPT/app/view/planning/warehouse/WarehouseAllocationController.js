Ext.define('MOST.view.planning.warehouse.WareshouseAllocationController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		'MOST.view.common.warehouserenderer.WarehouseRendererBuilder'
	],

	alias: 'controller.warehouseallocation',
	
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

	whCheckExport : false,

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
		var recvData = me.getView().recvData;
		
		if(recvData.$className === 'MOST.model.operation.WarehouseCheckForExport'){
			whCheckExport = true;
		}

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

	onChangePkgQty: function(clt, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var cgTpCd = recvData.get('cgTpCd');
		
		//Auto Calculate with BBK:
		if(cgTpCd === 'BBK'){
			var eachMt = recvData.get('eachMt');
			var eachM3 = recvData.get('eachM3');
			var inputQty = Number(newValue);   
			
			refs.refAllocatedMT.setValue(eachMt * inputQty);
			refs.refAllocatedM3.setValue(eachM3 * inputQty);
		}
	},

	setHandlingCargoInformation : function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		
		if(recvData){
			refs.refCgNo.setValue(recvData.data.cgNo);
			refs.ctlTotalMT.setValue(recvData.data.grMt);
			refs.ctlTotalM3.setValue(recvData.data.grM3);
			refs.ctlTotalQty.setValue(recvData.data.grQty);
			
			refs.refAllocatedMT.setValue(recvData.data.grMt);
			refs.refAllocatedM3.setValue(recvData.data.grM3);
			refs.refAllocatedQty.setValue(recvData.data.grQty);
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
			refs.refFrameCargoAmount.setTitle('Allocated Cargo Amount');
		}

		var viewReference = me.lookupReference('refWarehouseLayoutView');
		me.warehouseBuilder.veiwPlanInfo(viewReference, refs, recvData);
		
    	var timer = setInterval (function() {
			if(me.warehouseBuilder && me.warehouseBuilder.getIsCompleted())
				clearInterval(timer);
			refs.refWarehouseLayoutView.resumeEvents();
		}, 200);


		var cgTpCd = recvData.get('cgTpCd');

		var isDBK = (cgTpCd === 'DBN' || cgTpCd === 'DBE' || cgTpCd === 'DBK');
		refs.refAllocatedMT.setEditable(isDBK);
		refs.refAllocatedM3.setEditable(isDBK);
	},

	onLayoutViewRender : function(panel) {
		var me = this;
		var cellField = me.lookupReference('refSelectedCell');
		panel.body.on('click', function(e) {
			me.warehouseBuilder.onClick(e, function(builder, item, e){
				if(!item)
					return;

				var refs = me.getReferences();
				var selectedCell = builder.getSelectedCells()[0];
				var carfoInfo = builder.getCellCargos(selectedCell.data.locId);
				var store = me.getStore('cargoInfoInSelectedCell');
				
				cellField.setValue(selectedCell.data.locId);
				
				store.removeAll();
				
				Ext.Array.each(carfoInfo, function(rec) {
					if(me.getView().recvData.get('blSn') == rec.get('shipgNoteNo') || 
						me.getView().recvData.get('blSn') == rec.get('blNo'))
					store.add(rec.data);
				});
				
				store.commitChanges();

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
		var allocGrid = refs.refAllocationCargoInfoGrid;
		var recvData = me.getView().recvData;
		
		if(recvData.$className === 'MOST.model.operation.CargoHandlingOut'||
		    recvData.$className === 'MOST.model.operation.WarehouseCheckForExport'){
			
				if(allocGrid.getSelection()){
					allocGrid.setSelection(null);
				}

				if(grid.getSelection() && grid.getSelection().length>0) {
					var selectedItem = grid.getSelection()[0];
					
					refs.refAllocatedMT.setValue(selectedItem.get('wgt'));
					refs.refAllocatedM3.setValue(selectedItem.get('msrmt'));
					refs.refAllocatedQty.setValue(selectedItem.get('pkgQty'));
				}
		}
	},	
	
	onUpdate:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('allocatedCargoAmount');
		var totalMT = refs.ctlTotalMT.getValue();
		var totalM3 = refs.ctlTotalM3.getValue();
		var totalQty = refs.ctlTotalQty.getValue();
		var Mt = refs.refAllocatedMT.getValue();
		var M3 = refs.refAllocatedM3.getValue();
		var Qty = refs.refAllocatedQty.getValue();
		var accMt = 0, accM3 = 0, accQty = 0;		
		
		if(Mt === 0 && M3 ===0 && Qty ===0){
			Ext.MessageBox.show({
		        title : 'Messsage',
			    msg : 'Please check the inputed value',
			    width : 300,
			    buttons : Ext.MessageBox.OK,
			    icon : Ext.MessageBox.INFO
			});	
			return;
		}
		
		if(refs.refSelectedCell.getValue() === ''){
			Ext.MessageBox.show({
		        title : 'Messsage',
			    msg : 'Please select the location of wearehouse',
			    width : 300,
			    buttons : Ext.MessageBox.OK,
			    icon : Ext.MessageBox.INFO
			});	
			return;
		}

		var selecedWh = new Object();
		
		if(refs.refWarehouse.getSelection()){
			selecedWh = refs.refWarehouse.getSelection().data;
		}
		
		// in case of De-Allocation
		var recvData = me.getView().recvData;
		
		if(recvData.$className === 'MOST.model.operation.CargoHandlingOut'){
			var grid = refs.refCargoInfoGrid;
			if(!(grid.getSelection() && grid.getSelection().length>0)) {
				Ext.MessageBox.show({
			        title : 'Messsage',
				    msg : 'Please select one item in cargo info selected cell',
				    width : 400,
				    buttons : Ext.MessageBox.OK,
				    icon : Ext.MessageBox.INFO
				});
				return;
			}

			var locId = refs.refSelectedCell.getValue();
			var cgNo = refs.refCgNo.getValue();
			
			var selectedRecord = grid.getSelection()[0].data;
			if ((recvData.data.spCaCoCd === 'S' || selectedRecord.cgNo === cgNo) && selectedRecord.locId === locId) {
				accMt = selectedRecord.wgt; 
				accM3 = selectedRecord.msrmt; 
				accQty = Number(selectedRecord.pkgQty); 					
			} 
			
			if (accMt < refs.refAllocatedMT.getValue() || accM3 < refs.refAllocatedM3.getValue() || accQty < refs.refAllocatedQty.getValue()) {
				Ext.MessageBox.show({
			        title : 'Messsage',
				    msg : 'There are more values inputed than stored.',
				    width : 350,
				    buttons : Ext.MessageBox.OK,
				    icon : Ext.MessageBox.ERROR
				});
				
				return;
			}
		}		
		
		//In case of Warehouse check for Export (loading)
		if(recvData.$className === 'MOST.model.operation.WarehouseCheckForExport'){
			var grid = refs.refCargoInfoGrid;
			if(!(grid.getSelection() && grid.getSelection().length>0)) {
				Ext.MessageBox.show({
			        title : 'Messsage',
				    msg : 'Please select one item in cargo info selected cell',
				    width : 400,
				    buttons : Ext.MessageBox.OK,
				    icon : Ext.MessageBox.INFO
				});
				return;
			}

			var locId = refs.refSelectedCell.getValue();
			var cgNo = refs.refCgNo.getValue();
			var selectedRecord = grid.getSelection()[0].data;

			accMt = selectedRecord.wgt; 
			accM3 = selectedRecord.msrmt; 
			accQty = Number(selectedRecord.pkgQty); 
			
			if (accMt < refs.refAllocatedMT.getValue() || accM3 < refs.refAllocatedM3.getValue() || accQty < refs.refAllocatedQty.getValue()) {
				Ext.MessageBox.show({
			        title : 'Messsage',
				    msg : 'There are more values inputed than stored.',
				    width : 350,
				    buttons : Ext.MessageBox.OK,
				    icon : Ext.MessageBox.ERROR
				});
				
				return;
			}
		}

		accMt = 0, accM3 = 0, accQty = 0;
		
		for(var i = 0; i < store.data.length ; i++){
			var record = store.getAt(i);
			
			if(record.data.locId !== refs.refSelectedCell.getValue()){
				accMt += record.data.wgt; 
				accM3 += record.data.msrmt; 
				accQty += record.data.pkgQty;
			}
		}

		accMt += Mt;
		accM3 += M3;
		accQty += Qty;

		if(totalMT >= accMt && totalM3 >= accM3 && totalQty >= accQty){
			var vslCallId, whTpCd, whTpCdNm;
			var recvData = me.getView().recvData;
			
			if(recvData){
				vslCallId = recvData.data.vslCallId;
				whTpCd = recvData.data.whTpCd;
				whTpCdNm = me.getWhTpCdNm(recvData.data.whTpCd);
				recvData.set('whId', refs.refWarehouse.getValue());
			}
			
			var bExist = false;
			var gridCargoInfo = refs.refCargoInfoGrid;
			var selectedCargoInfo = gridCargoInfo.getSelection()[0];
			var selectedCgNo = "";
			
			if(selectedCargoInfo){
			    selectedCgNo = selectedCargoInfo.get('cgNo')	
			}			
						
			for(var i = 0; i < store.data.length ; i++){
				var record = store.getAt(i);
				if(record.data.locId === refs.refSelectedCell.getValue() &&
				    record.data.cgNo === selectedCgNo){
						
					record.set('wgt', refs.refAllocatedMT.getValue());
					record.set('msrmt', refs.refAllocatedM3.getValue());
					record.set('pkgQty', refs.refAllocatedQty.getValue());
					bExist = true;
				}
			}
			
			if(!bExist){
				var handlingItem = Ext.create('MOST.model.operation.CargoHandlingIn', {
					locTpCd: selecedWh.locTpCd,
					whId: refs.refWarehouse.getValue(),
					locId : refs.refSelectedCell.getValue(),
					vslCallId : vslCallId,
					cgNo : selectedCgNo, //refs.refCgNo.getValue(),
					wgt: refs.refAllocatedMT.getValue(),
					msrmt: refs.refAllocatedM3.getValue(),
					pkgQty: refs.refAllocatedQty.getValue(),
					spCaCoCd : recvData.data.spCaCoCd,
					whTpCd : whTpCd,
					whTpCdNm : whTpCdNm
				});
				
				store.add(handlingItem);
			}	
			store.commitChanges();
			
			refs.refAllocatedMT.setValue(0);
			refs.refAllocatedM3.setValue(0);
			refs.refAllocatedQty.setValue(0);
		}else{
			Ext.MessageBox.show({
		        title : 'Messsage',
			    msg : 'The entered values do not match.  Please check it again',
			    width : 400,
			    buttons : Ext.MessageBox.OK,
			    icon : Ext.MessageBox.ERROR
			});		
		}
	},
	
	onAllocationGridCellClick:function(gridview, tdEl, cellIndex, record, trEl, rowIndex, e){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refAllocationCargoInfoGrid;
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			var selectedItem = grid.getSelection()[0];
			
			refs.refSelectedCell.setValue(selectedItem.get('locId'));
			refs.refAllocatedMT.setValue(selectedItem.get('wgt'));
			refs.refAllocatedM3.setValue(selectedItem.get('msrmt'));
			refs.refAllocatedQty.setValue(selectedItem.get('pkgQty'));
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

	onDelete:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refAllocationCargoInfoGrid;
		var store = me.getStore('allocatedCargoAmount');

		if(grid.getSelection() && grid.getSelection().length>0) {
			var selectedItem = grid.getSelection()[0];
			store.remove(selectedItem);
		}
	},
	
	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
		
       	window.close();	
	},
	
	onSave:function(){
		var me = this;
		
		if(!me.onValidation()){
			Ext.MessageBox.show({
		        title : 'Messsage',
			    msg : 'Inputted amount is different with Tot amount, please re-check',
			    width : 400,
			    buttons : Ext.MessageBox.OK,
			    icon : Ext.MessageBox.INFO
			});
			
			return;
		}
		
		var recvData = me.getView().recvData;
		if(recvData.$className === 'MOST.model.operation.CargoHandlingOut'){
			var refs = me.getReferences();
			var grid = refs.refCargoInfoGrid;
			
			if(!(grid.getSelection() && grid.getSelection().length>0)) {
				Ext.MessageBox.show({
			        title : 'Messsage',
				    msg : 'Please select one item in cargo info selected cell',
				    width : 400,
				    buttons : Ext.MessageBox.OK,
				    icon : Ext.MessageBox.INFO
				});
				
				return;
			}
		}
		
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
		var record = store.getAt(0);
		
		if(record){
			var res = record.data.locId.split('-');
			whPreName += '(' + res[1] + ',' + store.data.length + ')';
		}
		
		var returnItem = Ext.create('MOST.model.operation.CargoHandlingIn', {
			vslCallId : vslCallId,
			whId : whId ? whId : refs.refWarehouse.getValue(),
			whTpCd : whTpCd,
			locId : whPreName
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
	
	onDisplayPlannedOccupyInfor: function(btn){
		var me = this;
		var ref = me.lookupReference('refWarehouseLayoutView');
		var recvData = me.getView().recvData;
		var title='Planned Info';
		var msg='';
		var info='Planned Location Info';
		var locId = '';
			
		if(btn.text == 'Occupied Info'){
			title='Occupied Info';
			info='Occupied Location Info';
			locId = ref.items.items[0].cell.data.items[0].get('locId') + '[NORMAL]';
		}else{
			if(me.getReferences().refWarehouse.getValue() == null || me.getReferences().refWarehouse.getValue() == ''){
				locId ='[No planned location]';
			}else{
				locId = ref.items.items[0].cell.data.items[0].get('locId') + '[NORMAL]';
			}
		}
		msg= ViewUtil.getLabel('vslschCallId') + ':  '+ recvData.get('vslCallId') + '<br/>' 
			+ 'BL/SN:  ' + recvData.get('blSn') + '<br/>'
			+'Stored Date:  ' + Ext.Date.format(recvData.get('hdlInDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()) + '<br/>'
			+ info + '<br/>' + locId ;
		Ext.MessageBox.show({
	        title : title,
		    msg : msg,
		    width : 350,
		    buttons : Ext.MessageBox.OK
		});
	}

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