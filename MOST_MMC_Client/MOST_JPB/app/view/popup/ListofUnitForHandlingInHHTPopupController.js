Ext.define('MOST.view.popup.ListofUnitForHandlingInHHTPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.listofunitforhandlinginhhtpopupctl',
	searchType: '',
	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	prevDate:{ startDt: null, endDt: null},
	prevDateHHT:{ startDt: null, endDt: null},
	prevData:null,
	prevHHTData:null,
	searchType: '',
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */	
	
	
	/**
	 * =========================================================================================================================
	 * HHT TABLET START.
	 * 
	 */
	
	
	/**
	 * =========================================================================================================================
	 * HHT TABLET END.
	 * 
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	
	/**
	 * EVENT POPUP HANDLER START
	 * =========================================================================================================================
	 */
	// Search Event Handler
	// When click button search then open popup Unit List
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
     	var unitStore = me.getStore('gateInItems');
     	var unitItem = me.getView().recvData;
     	var params = me.getSearchCondition();
     	
     	if(params.unitNo) {
			refs.refTxtUnitNo.setValue(params.unitNo);
		}
     	if(params.brandCd) {
			refs.refBrandCombo.setValue(params.brandCd);
		}
     	
    	unitStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {

					}
				}
			}
		});
     	
	},
	
	// Search Event Handler - Search Unit No
	onHHTUnitNoSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var params = me.getSearchCondition();
     	var unitStore = me.getStore('gateInItems');
     	
     	if(params.unitNo) {
			refs.refTxtUnitNo.setValue(params.unitNo);
		}
     	if(params.brandCd) {
			refs.refBrandCombo.setValue(params.brandCd);
		}
     	
    	unitStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {

					}
				}
			}
		});
	},
	
	// Grid Row Double
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnDataHHT();
       	window.close();
	},
	
	onSelectData : function(ref){
		var me = this; 
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		window.returnValue = me.getReturnDataHHT();

		if(window.returnValue != null){
			window.close();	
		}
	},
	
	getReturnDataHHT : function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var grid = me.lookupReference('refUnitListPopupHHTGrd');
		selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			yardPlanLoc: selection.data.yardPlanLoc,
			truckNo: selection.data.truckNo,
			driverNm: selection.data.driverNm,
			driverId: selection.data.driverId,
			yardCheckRmk: selection.data.yardCheckRmk,
			yardLoc: selection.data.yardLoc,
			driverLicense: selection.data.driverLicense,
			hiRemarks: selection.data.hiRemarks,
			inDate: selection.data.inDate,
			code: selection.data.unitNo,
			item : selection,
		}

    	window.returnValue = returnItem;
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	
	
	
	// Search Condition
	getSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();
     	var unitStore = me.getStore('gateInItems');
     	var unitItem = me.getView().recvData;
     	var title ='';
     	
     	if(me.getView().recvData.data) {
     		title = me.getView().recvData.data.title;
     		var brandCd = unitItem.data.brandCd;
         	var vslCallId =  unitItem.data.vslCallId;
         	var unitNo = unitItem.data.unitNo;
         	var statCd = unitItem.data.statCd;
         	var delvTpCd = unitItem.data.delvTpCd;
         	var shipgNoteNo = unitItem.data.shipgNoteNo;
         	var searchType = unitItem.data.searchType;
     	}else {
     		var brandCd = unitItem.brandCd;
         	var vslCallId =  unitItem.vslCallId;
         	var unitNo = unitItem.unitNo;
         	var statCd = unitItem.statCd;
         	var delvTpCd = unitItem.delvTpCd;
         	var shipgNoteNo = unitItem.shipgNoteNo;
         	var searchType = unitItem.searchType;
     	}
		
     	me.getView().up('window').setTitle(title);
     	var params = {
 			vslCallId 	: vslCallId,
 			brandCd 	: brandCd,
 			unitNo 		: unitNo,
 			statCd 		: statCd,
 			delvTpCd 	: delvTpCd,
 			shipgNoteNo	: shipgNoteNo,
 			searchType 	: searchType,
     	}
     	
    	return params;   	
	},
	
	
});