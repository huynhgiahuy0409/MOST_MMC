Ext.define('MOST.view.operation.warehouse.WarehouseMovementController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		'MOST.view.common.warehouserenderer.WarehouseRendererBuilder'
	],

	alias: 'controller.warehousemovement',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	warehouseBuilder : new WarehouseRendererBuilder({
		selectable : true,
		allowMultiSelect : false,
		showRelatedCargo : true,
		renderMode : 'occupied',
		colorMode : 'vessel',
		minZoomRate : 20,
		maxZoomRate : 300
	}),

	selectedCell : new Object(),
	balMtGlb: 0,
	balM3Glb: 0,
	balQtyGlb: 0,
	flag: 0,

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
		
		if(recvData.$className === 'MOST.model.operation.CargoHandlingOut'){
			refs.refOccupied.disable();
			refs.refPlan.disable();
			refs.refPlannedInfo.setText('Occupied Info');
		}else{
			refs.refOccupied.enable();
			refs.refPlan.enable();			
			refs.refPlannedInfo.setText('Planned Info');
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
		var cellField = me.lookupReference('refCelltoMove');
		var recvData = me.getView().recvData;
		panel.body.on('click', function(e) {
			me.warehouseBuilder.onClick(e, function(builder, item, e){
				if(!item)
					return;
				
				var selectedCell = builder.getSelectedCells()[0];

				if(builder.getCellRental(selectedCell).length > 0){
					Ext.MessageBox.show({
				        title : 'Messsage',
					    msg : 'This cell can not be selected. Here is a rental area.',
					    width : 400,
					    buttons : Ext.MessageBox.OK,
					    icon : Ext.MessageBox.INFO
					});
					return;
				}
				
				var refs = me.getReferences();
				me.getViewModel().setData({targetWarhouseLocation:selectedCell});

				if(refs.btnAllocation.pressed){
					return;
				}
				
				cellField.setValue(selectedCell.data.locId);

				var cargoInfo = builder.getCellCargos(selectedCell.data.locId);
				me.getViewModel().setData({cargoInfo:cargoInfo});
				var store = me.getStore('cargoInfoInSelectedCell');
				
				store.removeAll();
				
				me.flag = 1;
				me.balMtGlb = 0;
				me.balM3Glb = 0;
				me.balQtyGlb = 0;
				
				Ext.Array.each(cargoInfo, function(rec) {
					if((rec.data.cgNo).indexOf('RTS') == -1){
						if(Number(rec.get('wgt')) > 0){							
							rec.data.eachM3 = recvData.data.eachM3;
							rec.data.eachMt = recvData.data.eachMt;
							store.add(rec.data);
						}
					}
					
					if(me.flag <= 1 || me.balMtGlb == 0){						
						me.balMtGlb += Number(rec.get('wgt'));
						me.balM3Glb += Number(rec.get('msrmt'));
						me.balQtyGlb += Number(rec.get('pkgQty'));
					}
				});
				store.commitChanges();
				refs.refAllocatedQty.setValue();
				refs.refAllocatedMT.setValue();
				refs.refAllocatedM3.setValue();

				//refs.refSelectedCell.setValue(builder.getSelectedCells()[0].data.locNm);
			});
		});
	},
	onClickAllocation:function(){
		var me = this;
		var btnAllocation = me.lookupReference('btnAllocation');
		var btnMovementInfoUpdate = me.lookupReference('btnMovementInfoUpdate');
		
		btnMovementInfoUpdate.setDisabled(!btnAllocation.pressed);
		me.warehouseBuilder.setAllocationMode(btnAllocation.pressed);
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
				if(selectedItem.data.cgTpCd == 'BBK') {
					refs.refAllocatedMT.setReadOnly(true);
					refs.refAllocatedM3.setReadOnly(true);
				}
				if(selectedItem.data.cgTpCd == 'DBK') {
					refs.refAllocatedMT.setReadOnly(false);
					refs.refAllocatedM3.setReadOnly(false);
				}

				var selectedItems = grid.getSelection();
				var totalPkgQty = 0;
				var totalWgt = 0;
				var totalMsrmt = 0;

				selectedItems.forEach(function(item) {
					totalPkgQty +=  Number(item.get('pkgQty'));
					totalWgt +=  Number(item.get('wgt'));
					totalMsrmt +=  Number(item.get('msrmt'));

					if (item.data.cgTpCd == 'BBK') {
						refs.refAllocatedMT.setReadOnly(true);
						refs.refAllocatedM3.setReadOnly(true);
					}
					if (item.data.cgTpCd == 'DBK') {
						refs.refAllocatedMT.setReadOnly(false);
						refs.refAllocatedM3.setReadOnly(false);
					}
				});

				refs.refAllocatedQty.setValue(totalPkgQty);
				refs.refAllocatedMT.setValue(Number(totalWgt.toFixed(3)));
				refs.refAllocatedM3.setValue(Number(totalMsrmt.toFixed(3)));
			}
		}
	},	

	onChangeM3MTQtyMovement: function(field, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refCargoInfoGrid;
		var qtyInfo = 0, mtInfo = 0, m3Info = 0;
		var cgTpCd = refs.refCargoInfoGrid.getStore().data.items[0].get('cgTpCd');
		var qty = refs.refAllocatedQty.getValue();
		
		var mtInfoDBN = 0;
		var m3InfoDBN = 0;
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			for(var i = 0; i < grid.getSelection().length; i++){
				var selectedItem = grid.getSelection()[i];
				qtyInfo += Number(selectedItem.get('pkgQty'));
				mtInfo += Number(selectedItem.get('wgt'));
				m3Info += Number(selectedItem.get('msrmt'));
			}
			if (qty > qtyInfo && selectedItem.data.cgTpCd != 'DBN') {
				MessageUtil.warning('warning_msg', 'qtyMustLessThanQtyInfo');
				return null;
			}
			if(cgTpCd == 'BBK') {
				if (field.reference == 'refAllocatedMT' || field.reference == 'refAllocatedM3') {
					return;
				} else {
					if (qtyInfo == qty) {
						refs.refAllocatedMT.setValue(mtInfo);
						refs.refAllocatedM3.setValue(m3Info);
					} else {
						var eachMt = (Number(selectedItem[0].get('wgt'))/Number(selectedItem[0].get('pkgQty'))).toFixed(10);
						var eachM3 = (Number(selectedItem[0].get('msrmt'))/Number(selectedItem[0].get('pkgQty'))).toFixed(10);
						var newMT = eachMt * qty;
						var newM3 = eachM3 * qty;
						refs.refAllocatedMT.setValue(newMT);
						refs.refAllocatedM3.setValue(newM3);
					}
				}
			}

			if(selectedItem.data.cgTpCd == 'DBN') {
				for(var i = 0; i < grid.getSelection().length; i++){
					var selectedItem = grid.getSelection()[i];
					mtInfoDBN += Number(selectedItem.get('wgt'));
					m3InfoDBN += Number(selectedItem.get('msrmt'));
				}
				
				var mt = refs.refAllocatedMT.getValue();
				var m3 = refs.refAllocatedM3.getValue();
				
				if (mt > mtInfoDBN ) {
					MessageUtil.warning('warning_msg', 'mtMustLessThanMTInfo');
					return null;
				}
				if (m3 > m3InfoDBN) {
					MessageUtil.warning('warning_msg', 'm3MustLessThanM3Info');
					return null;
				}
			}
		}
		
	},
	
	onMovementInfoUpdate:function(){
//		var me = this;
//		var refs = me.getReferences();
//		var store = me.getStore('allocatedCargoAmount');
//		
//		var grid = refs.refCargoInfoGrid;
//
//		var allocationCargoInfoGrid = refs.refAllocationCargoInfoGrid.getStore().data.items;
//		var sumQty = 0;
//		var sumMt = 0;
//		var sumM3 = 0;
//	
//		var selectedItem = grid.getSelection()[0];
//		if(grid.getSelection() && grid.getSelection().length>0) {
//			selectedItem = grid.getSelection()[0];
//		}
//		if(!selectedItem){
//			return;
//		}
//		
//		var Mt = refs.refAllocatedMT.getValue();
//		var M3 = refs.refAllocatedM3.getValue();
//		var Qty = refs.refAllocatedQty.getValue();
//		var qtyInfo = refs.refCargoInfoGrid.getStore().data.items[0].get('pkgQty');
//		var mtInfo = refs.refCargoInfoGrid.getStore().data.items[0].get('wgt');
//		var m3Info = refs.refCargoInfoGrid.getStore().data.items[0].get('msrmt');
//		for (var i = 0; i < allocationCargoInfoGrid.length; i++) {
//			var qty = allocationCargoInfoGrid[i].data.pkgQty;
//			var mt = allocationCargoInfoGrid[i].data.wgt;
//			var m3 = allocationCargoInfoGrid[i].data.msrmt;
//			sumQty += parseInt(qty);
//			sumMt += parseInt(mt);
//			sumM3 += parseInt(m3);
//		}
//		sumQty = sumQty + Qty;
//		sumMt = sumMt + Mt;
//		sumM3 = sumM3 + M3;
//
//		if ((Qty > qtyInfo || sumQty > qtyInfo) && selectedItem.data.cgTpCd != 'DBN') {
//			MessageUtil.warning('warning_msg', 'qtyMustLessThanQtyInfo');
//			return null;
//		}
//
//		if (Mt > mtInfo || sumMt > mtInfo) {
//			MessageUtil.warning('warning_msg', 'mtMustLessThanMTInfo');
//			return null;
//		}
//		if (M3 > m3Info || sumM3 > m3Info) {
//			MessageUtil.warning('warning_msg', 'm3MustLessThanM3Info');
//			return null;
//		}
		
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('allocatedCargoAmount');
		var theDetail = me.getViewModel().get('theDetail');
		var grid = refs.refCargoInfoGrid;
		var strCgNo = '';
		var sumMtInstore = 0;
		var sumM3Instore = 0;
		var sumQtyInstore = 0;
		
		var selectedItem = grid.getSelection()[0];
		
		// if(grid.getSelection().length < grid.getStore().data.length){
		// 	MessageUtil.warning('warning_msg', 'Please select all Cargo No in Location');
		// 	return;
		// }
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			selectedItem = grid.getSelection()[0];
		}
		if(!selectedItem){
			return;
		}
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			for(var i = 0; i < grid.getSelection().length>0; i++){				
				var selectedItem = grid.getSelection()[i];
				//strCgNo = strCgNo + selectedItem.get('cgNo') + ',';
				strCgNo = selectedItem.get('cgNo');
				sumMtInstore += Number(selectedItem.get('wgt'));
				sumM3Instore += Number(selectedItem.get('msrmt'));
				sumQtyInstore += Number(selectedItem.get('pkgQty'));
			}
		}
			
		var Mt = refs.refAllocatedMT.getValue();
		var M3 = refs.refAllocatedM3.getValue();
		var Qty = refs.refAllocatedQty.getValue();
		var qtyInfo = theDetail.get('rhdlPkgQty');
		var mtInfo = theDetail.get('rhdlWgt');
		var m3Info = theDetail.get('rhdlMsrmt');
		
		if(Qty > me.balQtyGlb && selectedItem.get('cgTpCd') == 'BBK'){
			MessageUtil.warning('warning_msg', 'Quantity of this location is less than inputed amount, please check');
			return;
		}
		
		if(Mt > me.balMtGlb){
			MessageUtil.warning('warning_msg', 'Weight of this location is less than inputed amount, please check');
			return;
		}
		
		if(M3 > me.balM3Glb){
			MessageUtil.warning('warning_msg', 'Measurement of this location is less than inputed amount, please check');
			return;
		}
		
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
		
		if(refs.refCelltoMove.getValue() === ''){
			Ext.MessageBox.show({
		        title : 'Messsage',
			    msg : 'Please select the location of wearehouse',
			    width : 300,
			    buttons : Ext.MessageBox.OK,
			    icon : Ext.MessageBox.INFO
			});	
			return;
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
		}		
			
		var targetLocation = null;
		if(me.getViewModel().getData().targetWarhouseLocation){
			targetLocation = me.getViewModel().getData().targetWarhouseLocation;
		}
		
		if(!targetLocation){
			return;
		}
		
		var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
			cgNo: strCgNo,
			refNo: selectedItem.data.refNo,
			vslCallId: recvData.data.vslCallId,
			scn: recvData.data.scn,
			opeClassCd:'',
			delvTpCd:'',
			spCaCoCd:'',
			workingStatus: WorkingStatus.INSERT,
			fmLocId : selectedItem.data.locId,
			toLocId : targetLocation.data.locId,
			whTpCd : recvData.data.whTpCd,
			fmPkgQty: Qty,
			fmWgt: Mt,
			fmMsrmt: M3,
			pkgQty : Qty,
			wgt : Mt,
			msrmt : M3,
			locTpCd: selectedItem.data.locTpCd,
			toLocTpCd: targetLocation.data.locTpCd
		});		
		store.add(handlingItem);
		store.commitChanges();
		
		refs.refAllocatedMT.setValue(0);
		refs.refAllocatedM3.setValue(0);
		refs.refAllocatedQty.setValue(0);
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

	onMovementInfoDelete:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refAllocationCargoInfoGrid;
		var store = me.getStore('allocatedCargoAmount');

		if(grid.getSelection() && grid.getSelection().length>0) {
			var selectedItem = grid.getSelection()[0];
			store.remove(selectedItem);
		}
	},
	
	onClickToolTip:function(){
		var me = this;
		var targetLocation = null;
		if(me.getViewModel().getData().targetWarhouseLocation){
			targetLocation = me.getViewModel().getData().targetWarhouseLocation;
		}	
		
		if(targetLocation){
			var win = me.lookupReference('refWarehouseOccipiedWin');
	    	if (!win) {	
	    		var subWin = Ext.widget('app-warehouseoccuipedinfo', {
	    			cargoInfo: me.getViewModel().getData().cargoInfo,
	    		});			

	    		win = Ext.create('Ext.window.Window', {
					reference: 'refWarehouseOccipiedWin',
					width: 800,
					height: 300,
					resizable: false,
					title: targetLocation.data.locId,
					modal: false,
					stateId: 'stateRefWarehouseOccipiedWin',
			        stateful: true,
	    		});
	    		win.add(subWin);
	    		me.getView().add(win);
	    	}
			win.show();
			win.toFront();
		}else{
			Ext.MessageBox.show({
		        title : 'Messsage',
			    msg : 'Please select the cell of warehouse first.',
			    width : 400,
			    buttons : Ext.MessageBox.OK,
			    icon : Ext.MessageBox.INFO
			});
		}
	},
	onLoadOccuipedInfo:function(){
		var me = this;
		
		var cargoInfo = me.getView().getCargoInfo();
		var store = me.getStore('occipiedInfo');
		store.removeAll();
		Ext.Array.each(cargoInfo, function(rec) {
			store.add(rec.data);
		});
		store.commitChanges();	
	},

	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
       	window.close();	
	},
	
	onClickOk:function(){
		var me = this;
		var vslCallId, scn, whTpCd, whTpCdNm, whId, whPreName,whToName;
		var cgNo = '';

		var recvData = me.getView().recvData;
		if(recvData){
			vslCallId = recvData.data.vslCallId;
			scn = recvData.data.scn;
			whTpCd = recvData.data.whTpCd;
			whTpCdNm = me.getWhTpCdNm(recvData.data.whTpCd);
			whId = recvData.data.whId;
		}

		var store = me.getStore('allocatedCargoAmount');
		var record = store.getAt(0);
		if(record){
			cgNo = record.data.cgNo;
			var res = record.data.fmLocId.split('-');
			whPreName = res[0] + '(' + res[1] + ',' + store.data.length + ')';

			var to = record.data.toLocId.split('-');
			whToName = to[0] + '(' + to[1] + ',' + store.data.length + ')';
		}
		
		var totalMt = 0, totalM3 = 0, totalQty = 0;
		var locTpCd, toLocTpCd;

		for(var i=0; i< store.data.length; i++){
			var item = store.data.items[i];
			totalMt += Number(item.data.wgt);
			totalM3 += Number(item.data.msrmt);
			totalQty += Number(item.data.pkgQty);
			
			locTpCd = record.data.locTpCd;
			toLocTpCd = record.data.toLocTpCd;
		}
		
		var returnItem = Ext.create('MOST.model.operation.CargoHandlingOut', {
			vslCallId : vslCallId,
			cgNo: cgNo,
			scn : scn,
			whId : whId,
			whTpCd : whTpCd,
			fmLocId : whPreName,
			toLocId : whToName,
			msrmt : totalM3,
			wgt : totalMt,
			pkgQty : totalQty,
			locTpCd: locTpCd,
			toLocTpCd: toLocTpCd
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
		
//		if (OP_MODE == this.OP_DEALLOC) {	//Handling out + loading
//			var xmlOccList:XMLList = new XMLList(grdSelectedCell.dataProvider) ;	
//			var  mtOcc:Number =new Number(0), m3Occ:Number=new Number(0), qtyOcc:int=new Number(0) ;
//			for (var index:int=0 ; index < xmlOccList.length() ; index++) {
//				var xmlObj:XML = xmlOccList[index];	
//				if ((cacheHandleMsg.spCaCoCd.toString() == 'S' || xmlObj.cgNo == txtCargoNo.Value.toString()) && xmlObj.locId == txtStLoc.Value.toString()) {
//					mtOcc = DataUtil.numberOperation(mtOcc, Number(xmlObj.wgt), '+') ;
//					m3Occ = DataUtil.numberOperation(m3Occ, Number(xmlObj.msrmt), '+') ;
//					qtyOcc = DataUtil.numberOperation(qtyOcc, Number(xmlObj.pkgQty), '+') ;
//				}
//			}	
//			//Check Occupied amount >= Planned amount 
//			if (mtOcc < mt ||  m3Occ < m3 || qtyOcc < qty) {
//				return false;
//			}
//		}		
		
//		Ext.Array.each(store, function(rec) {
//			var record = rec.data;
//			accMt += record.wgt; 
//			accM3 += record.msrmt; 
//			accQty += record.pkgQty; 
//			if (record.cgNo == txtCargoNo.Value.toString()) && xmlObj.locId == txtStLoc.Value.toString()) {
//				isUpdate = true;
//			}
//		});		
		
		// total sum test
//		for (var index:int=0 ; index < xmlList.length() ; index++) {
//			var xmlObj:XML = xmlList[index];	
//			if ((xmlObj.crud == 'R') ||(xmlObj.crud == 'U')||(xmlObj.crud == 'C') ) {
//				accMt = DataUtil.numberOperation(accMt, Number(xmlObj.wgt), '+') ;
//				accM3 = DataUtil.numberOperation(accM3, Number(xmlObj.msrmt), '+') ;
//				accQty = DataUtil.numberOperation(accQty, Number(xmlObj.pkgQty), '+') ;
//				if ((cacheHandleMsg.spCaCoCd.toString() == 'S' || xmlObj.cgNo == txtCargoNo.Value.toString()) && xmlObj.locId == txtStLoc.Value.toString()) {
//					isUpdate = true;
//				}
//			}
//		}	
		
//		if (!isUpdate) {
//			accMt = DataUtil.numberOperation(accMt, mt, '+');
//			accM3 = DataUtil.numberOperation(accM3, m3, '+');
//			accQty = DataUtil.numberOperation(accQty, qty, '+');
//		}
//		
//		if ((accMt > Number(txtTotalMt.Value)) || 
//			(accM3 > Number(txtTotalM3.Value)) ||
//			(accQty > Number(txtTotalQty.Value))) {
//			return false;		
//		}
		
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
	
	},
	
	onCount: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refCargoInfoGrid;
		var sumMt = 0;
		var sumM3 = 0;
		var sumQty = 0;		
		var recvData = me.getView().recvData;
		
		if(recvData.$className === 'MOST.model.operation.CargoHandlingOut'){
			if(grid.getSelection() && grid.getSelection().length>0) {
				var selectedItem = grid.getSelection()[0];
				if(selectedItem.data.cgTpCd == 'BBK') {
					refs.refAllocatedMT.setReadOnly(true);
					refs.refAllocatedM3.setReadOnly(true);
				}
				if(selectedItem.data.cgTpCd == 'DBK') {
					refs.refAllocatedMT.setReadOnly(false);
					refs.refAllocatedM3.setReadOnly(false);
				}
			}
		}				
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			// refs.refAllocatedMT.setValue(me.balMtGlb);
			// refs.refAllocatedM3.setValue(me.balM3Glb);
			// refs.refAllocatedQty.setValue(me.balQtyGlb);
		}else{			
			refs.refAllocatedMT.setValue(0);
			refs.refAllocatedM3.setValue(0);
			refs.refAllocatedQty.setValue(0);
		}	
		
		refs.refAllocatedQty.resumeEvents();
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