Ext.define('MOST.view.popup.FindUnitListRehandlingPopupHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.findunitlistrehandlingpopuphhtctl',
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

	// Search Event Handler
	// When click button search then open popup Unit List
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
     	var window = me.getView().up('window');
		window.setTitle('Unit List');
     	var params = me.getSearchCondition();
     	
     	var unitStore = me.getStore('unitItems');
     	
     	if(params.unitNo) {
			refs.refTxtUnitNo.setValue(params.unitNo);
		}
     	if(params.brandCd) {
			refs.refBrandCombo.setValue(params.brandCd);
		}
     	
     	if(params.searchType != '' && params.searchType == 'HOUNIT') {
			var store = me.getStore('stackedUnitItems');
			store.load({
				params : {
					vslCallId : params.vslCallId,
					shipgNoteNo : params.shipgNoteNo,
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if (records && records.length > 0) {
							//me.onStackedUnitGrid_ItemClick();
							refs.refStackedUnitListPopupHHTGrid.setHidden(false);
						}
					}
				}
			});
     	} else {
     		unitStore.load({
    			params: params,
    			callback: function(records, operation, success) {
    				if (success) {
    					if (records.length > 0) {
    						
    						refs.refUnitListPopupHHTGrid.setHidden(false);
    					}
    				}
    			}
    		});
     	}
	},
	
	// Search Event Handler - Search Unit No
	onHHTUnitNoSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var params = me.getSearchCondition();
     	var unitStore = me.getStore('unitItems');
    	
		var txtBrandCombo = refs.refBrandCombo.getValue();
		var txtUnitNo = refs.refTxtUnitNo.getValue();
		
		params.brandCd = txtBrandCombo;
		params.brandCd = txtUnitNo;
		
		if(params.searchType != '' && params.searchType == 'HOUNIT') {
			var store = me.getStore('stackedUnitItems');
			store.load({
				params : {
					vslCallId : params.vslCallId,
					shipgNoteNo : params.shipgNoteNo,
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if (records && records.length > 0) {
							//me.onStackedUnitGrid_ItemClick();
							refs.refStackedUnitListPopupHHTGrid.setHidden(false);
						}
					}
				}
			});
		} else {
			
			unitStore.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						refs.refUnitListPopupHHTGrid.setHidden(false);
					}
				}
			});
		}
	},
	
	// Grid Row Double
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnDataHHT();
       	window.close();
	},
	
	onHHTDblClickStackedUnit: function() {
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
		var params = me.getSearchCondition();
		
		if(params.searchType != '' && params.searchType == 'HOUNIT') {
			var grid = me.lookupReference('refStackedUnitListPopupHHTGrid');
		} else {
			var grid = me.lookupReference('refUnitListPopupHHTGrid');
		}
		
		selection = grid.getSelection() == null ? null : grid.getSelection();
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			inDate: selection.data.inDate,
			dischargedDate: selection.data.dischargedDate,
			modelCd: selection.data.modelCd,
			blNo: selection.data.blNo,
			brandCd: selection.data.brandCd,
			brandNm: selection.data.brandNm,
			delvTpNm: selection.data.delvTpNm,
			yardPlanLoc: selection.data.yardPlanLoc,
			yardCheckRmk: selection.data.yardCheckRmk,
			nosOfUnit: selection.data.nosOfUnit,
			remainUnit: selection.data.remainUnit,
			code: selection.data.unitNo,
			item : selection,
		}

    	window.returnValue = returnItem;
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var unitItem = me.getView().recvData;
     	
     	if(me.getView().recvData.data) {
     		var vslCallId =  unitItem.data.vslCallId;
     		var vslCd =  unitItem.data.vslCd;
     		var callSeq =  unitItem.data.callSeq;
     		var callYear =  unitItem.data.callYear;
     		var searchType = unitItem.data.searchType;
			var blNo = unitItem.data.blNo;
	     	var brandCd = unitItem.data.brandCd;
	     	var unitNo = unitItem.data.unitNo;
	     	var statCd = unitItem.data.statCd;
	     	var shipgNoteNo = unitItem.data.shipgNoteNo;
     	}else {
     		var vslCallId =  unitItem.vslCallId;
     		var vslCd =  unitItem.vslCd;
     		var callSeq =  unitItem.callSeq;
     		var callYear =  unitItem.callYear;
     		var searchType = unitItem.searchType;
			var blNo = unitItem.blNo;
	     	var brandCd = unitItem.brandCd;
	     	var unitNo = unitItem.unitNo;
	     	var statCd = unitItem.statCd;
	     	var shipgNoteNo = unitItem.shipgNoteNo;
     	}
     	
     	var params = {
			vslCallId 	: vslCallId,
			vslCd 		: vslCd,
			callSeq 	: callSeq,
			callYear 	: callYear,
			searchType	: searchType,
			shipgNoteNo : shipgNoteNo,
			blNo 		: blNo,
			unitNo 		: unitNo,
			brandCd		: brandCd,
			statCd		: statCd,
		};
    	
    	return params;
	},
});