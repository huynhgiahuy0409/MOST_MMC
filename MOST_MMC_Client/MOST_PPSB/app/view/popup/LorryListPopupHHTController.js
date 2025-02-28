Ext.define('MOST.view.popup.LorryListPopupHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',
	alias: 'controller.lorrylistpopuphhtctl',	
	
	requires: [
	],

	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DATE_PERIOD : 7,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onJpvcLorryList: function() {
		var me = this;
		var refs = me.getReferences();
		//var store = me.getStore('lorryListPopupStoreDataSet');
		var store = me.getStore('lorryAssinedListPopup');
		var vslCallId = '';
		var searchBlNo = '';
		var blNo = '';
		var lorryNo = '';
		var tsptr = '';
		var flag = false;
		var shipgNoteNo = '';
		
		if(me.getView().recvData){
			vslCallId = me.getView().recvData.vslCallId;
			blNo = me.getView().recvData.blNo;
			lorryNo = me.getView().recvData.lorryNo;
			tsptr = me.getView().recvData.tsptr;
			flag = me.getView().recvData.flag;
			
		} else {
			return;
		}
		
		if(vslCallId === '' && blNo === '' && lorryNo === '' && tsptr === ''){
			return;
		}
		
		if(StringUtil.isNullorEmpty(blNo)){
			//blNo = 'NA';
		}
		
		if(flag){
			shipgNoteNo = blNo;
 			
 		} else {
 			searchBlNo = blNo;
 		}
		
		store.load({
			params: {
				searchType: 'jpvcLorry',
				vslCallId: vslCallId,
				blNo: searchBlNo,
				lorryNo: lorryNo,
				tsptr: tsptr,
				shipgNoteNo: shipgNoteNo
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						me.setComboStore(records[0].data);
						me.setDetailTabControl(records[0].data);
					}
				}
			}
		});
		
	},
	
	onSetComboBox: function(paramVslCallId) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('lorryAssinedListPopup');
		var vslCallId = '';
		var tsptr = '';
		
		if(!StringUtil.isNullorEmpty(paramVslCallId)){
			vslCallId = paramVslCallId;
		}
		
		store.load({
			params: {
				searchType: 'sn/bl',
				vslCallId: vslCallId,
				tsptr : tsptr
				
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						me.setComboStore(records[0].data);
					}
				}
			}
		});
		
	},
	
	onSearchList: function() {
		var me = this;
		var refs = me.getReferences();
//		var store = me.getStore('lorryListPopupStoreDataSet');
		var store = me.getStore('lorryAssinedListPopup');
		if(Ext.isClassic){
			var inputBlCombo = refs.ctlBlCdCombo.getValue();	
		}else{
			var inputBlCombo = refs.refBLCodeCombo.getValue();
		}
		
		
		if(!StringUtil.isNullorEmpty(inputBlCombo)){
			blNo = inputBlCombo;
			
		} else {
			blNo = 'NA';
		}
		
		store.load({
			params: {
				searchType: 'onlyLorry',
				blNo: inputBlCombo
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						me.setDetailTabControl(records[0].data);
					}
				}
			}
		});
	},
	
	setComboStore:function(records){
		var me = this;
		var refs = me.getReferences();
		var blslCombineItemsComboPopup = me.getStore('blslCombineItemsComboPopup');
		blslCombineItemsComboPopup.removeAll();
		var flag = false;
		var blNo = '';
		var store = me.getStore('lorryGateInListPopup');
		var params = me.getSearchCondition();
		
		if(me.getView().recvData){
			flag = me.getView().recvData.flag;
			blNo = me.getView().recvData.blNo;
		}

		if (records.length > 0) {
			if (me.getView().recvData.readOnlyCgNo) {
				blslCombineItemsComboPopup.insert(0, [{blNo: blNo, cdNm: blNo}]);
			}
			else {
				if (flag) {
					records.forEach(function(record, index){
						if(blslCombineItemsComboPopup.find('blNo', record.get('shipgNoteNo')) < 0){
							if(record.get('shipgNoteNo') != '' && record.get('shipgNoteNo') != null){
								blslCombineItemsComboPopup.insert(index, [{blNo: record.get('shipgNoteNo'), cdNm: record.get('shipgNoteNo')}]);
							}
						}
					});
				}
				else {
					records.forEach(function(record, index){
						if(blslCombineItemsComboPopup.find('blNo', record.get('blNo')) < 0){
							if(record.get('blNo') != '' && record.get('blNo') != null){
								blslCombineItemsComboPopup.insert(index, [{blNo: record.get('blNo'), cdNm: record.get('blNo')}]);
							}
						}
					});
				}
				
				blslCombineItemsComboPopup.insert(0, [{blNo: '', cdNm: 'All'}]);
			}
		}
		else {
			//blslCombineItemsComboPopup.insert(0, [{blNo: blNo, cdNm: blNo}]);
			blslCombineItemsComboPopup.insert(0, [{blNo: '', cdNm: 'All'}]);
		}

		if(blNo != '' && blNo != 'NA' && blNo != null){
			refs.refBLCodeCombo.setValue(blNo);
		} else {
			refs.refBLCodeCombo.setValue('All');
		}
		
	},
	
	setDetailTabControl:function(metaItem){
		var me = this;
		var refs = me.getReferences();
		var lorryListPopup = me.getStore('lorryListPopup');
		
		if(metaItem.lorryListPopup){
//			lorryListPopup.setData(metaItem.lorryListPopup);
			lorryListPopup.setData(metaItem);
		}	
		
	},

	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore('lorryGateInListPopup');
     	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
//
//	onDblClick: function() {
//		var me = this;
//		var window = me.getView().up('window');
//    	window.returnValue = me.getReturnData();
//       	window.close();
//	},
//
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
//	// Search Condition
	getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var inputVslCallId,inputLorryNoinputBlCombo;
		
		//inputVslCallId = refs.refJpvcText.getValue();
		inputVslCallId = me.getView().recvData.vslCallId;
     	inputLorryNo = refs.reflorryNo.getValue();
     	inputBlCombo = refs.refBLCodeCombo.getValue();
     	
     	var tsptr = '';
     	var shipgNoteNo = '';
     	var blNo = '';
		var grNo = '';
     	var flag = false;
     	var allTruck = '';
		var isMultiCargo = '';
		var docTp = '';
     	
     	if(inputBlCombo === 'All'){
     		inputBlCombo = '';
     	}
     	
     	if(me.getView().recvData){
     		flag = me.getView().recvData.flag;
			tsptr = me.getView().recvData.tsptr;
			blNo = me.getView().recvData.blNo;
			grNo = me.getView().recvData.grNo;
			shipgNoteNo = me.getView().recvData.shipgNoteNo;
			docTp = me.getView().recvData.docTp;
			isMultiCargo = me.getView().recvData.isMultiCargo;
		}
     	
     	if(inputVslCallId === '' && inputLorryNo === '' && inputBlCombo === '' && tsptr === ''){
     		return null;
     	} 
     		
 		if(flag){
 			shipgNoteNo = inputBlCombo ? inputBlCombo : shipgNoteNo;
 		} else {
 			blNo = inputBlCombo ? inputBlCombo : blNo;
 		}

// 		refs.ctlNewCarYn.setValue(unitItem.get('newYn') == 'Y'? true : false);
 		refs.chbAllTruckCargoManualHHT.getChecked() == true ? allTruck = 'Y' : allTruck = 'N';
 		
// 		if(refs.chbAllTruckCargoManualHHT.getChecked())
// 		    allTruck = 'Y';
// 		else
// 		    allTruck = 'N'; 		

		var params = {
			searchType: 'onlyLorry',
			vslCallId: inputVslCallId,
			blNo: blNo,
			grNo: grNo,
			lorryNo: inputLorryNo,
			allTruck: allTruck,
			//tsptr: tsptr,
			shipgNoteNo: shipgNoteNo,
			docTp: docTp,
			isMultiCargo: isMultiCargo
		}
 	    return params;
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refLorryPopupHHTGridHHT');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		var returnItem = {
			code : selection.data.lorryNo,
			item : selection
		}
		
		return returnItem;
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
//	openJPVCPopup:function(){
//		var me = this;
//		var refs = me.getReferences();
//		var params;
//		if(Ext.isClassic){
//			params = {
//				vslCallId: refs.ctlJpvc.getValue()
//			}
//			me.openCodePopup('popup-jpvcpopup', 'ctlJpvc', params);	
//		}else{
//			params = {
//				vslCallId: refs.refJpvcText.getValue()
//			}
//			me.openCodePopup('app-jpvcpopuphht', 'refJpvcText', params);	
//		}
//		
//	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var lorryListPopupStoreDataSet = me.getStore('lorryListPopupStoreDataSet');
		
		if(Ext.isClassic){
			if(targetControl === 'ctlJpvc'){ // GRID CONTROL POPUP
				if(!StringUtil.isNullorEmpty(returnValue.code)){
					me.onSetComboBox(returnValue.code);
					refs.txtLorryNo.setValue('');
				}
			}
		}
//		else{
//			if(targetControl === 'refJpvcText'){ // GRID CONTROL POPUP
//				if(returnValue != null){
//					if(!StringUtil.isNullorEmpty(returnValue.code)){
//						me.onSetComboBox(returnValue.code);
//						refs.reflorryNo.setValue('');
//					}
//				}
//			}
//		}
		
		
	},
	
	
	/**
	 * EVENT POPUP HANDLER START
	 * =========================================================================================================================
	 */
	
	
	onHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var vslCallId = '';
		var lorryNo = '';
		var docTp = '';
		var flag = false;
		var grid = me.lookupReference('refLorryPopupHHTGridHHT');
		
		if(me.getView().recvData){
			vslCallId = me.getView().recvData.vslCallId;
			lorryNo = me.getView().recvData.lorryNo;
			flag = me.getView().recvData.flag;
			docTp = me.getView().recvData.docTp;
			//refs.refJpvcText.setValue(vslCallId);
			refs.reflorryNo.setValue(lorryNo);
			if (me.getView().recvData.readOnlyCgNo) {
				refs.refBLCodeCombo.setReadOnly(true);
				refs.refBLCodeCombo.setEditable(false);
			}
		}
		
		
		if(vslCallId != '' && vslCallId != null){
			var store = me.getStore('lorryGateInListPopup');
			var params = me.getSearchCondition();
			
			if(params == null){
				return;
			}
			
			store.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						me.setComboStore(records);
					}
				}
			});
			
			//me.onJpvcLorryList();
			
		} else {
			me.onSetComboBox(null);
			//me.onSearchList();
		}
		
		if(flag){
			refs.refBLCodeCombo.setLabel('SN No');
		}else{
			refs.refBLCodeCombo.setLabel('BL No');
		}
//		refs.refJpvcText.setValue(vslCallId);
//		refs.reflorryNo.setValue(lorryNo);
	},
	
	// Grid Row Double
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},
	
	onSelectData : function(ref){
		var me = this; 
		var window = me.getView().up('window');
		if(ref.getReference() == 'refBtnSelectLorryHHT'){//Select from WorkingArea popup:
			window.returnValue = me.getReturnData();
		}
		if(window.returnValue != null){
			window.close();	
		}
	},
	
//	getReturnDataHHT : function() {
//		var me = this;
//		var refs = me.getReferences();
//		var window = me.getView().up('window');
//		
//		var grid = me.lookupReference('refLorryPopupHHTGrid');
//		selection = grid.getSelection() == null ? null : grid.getSelection();
//		
//		if(selection == null){
//			MessageUtil.warning('Warning', 'tbl_sts_select');
//			return null;
//		}
//		
//		var returnItem = {
//			code : selection.data.lorryNo,
//			item : selection
//		}
//
//    	window.returnValue = returnItem;
//		if(window.returnValue != null){
//			window.close();	
//		}
//	},
//	
	/**
	 * EVENT POPUP HANDLER END
	 * =========================================================================================================================
	 */
	
});