Ext.define('MOST.view.popup.ListofUnitForDamageCheckHHTPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.listofunitfordamagecheckhhtpopupctl',
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
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
     	var params = me.getSearchCondition();
     	var unitStore = me.getStore('unitItems');
     	if(!params) return;
     	
		refs.refSearchUnitNo.setValue(params.unitNo);
		refs.refBrandComboDamage.setValue(params.brandCd);
		refs.refTxtBlSnNo.setValue(params.cgNo);
		
    	unitStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
					}
				}
			}
		});
    	
    	me.getBrandComboItems(params);
	},
	
	getBrandComboItems: function (params) {
		var me = this;
		var refs = me.getReferences();
		var brCombo = me.getStore('brCombo');
		
		brCombo.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						brCombo.insert(0, [{ cdNm: 'Select', cd: '' }]);
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
     	var unitStore = me.getStore('unitItems');
		var brandCd = refs.refBrandComboDamage.getValue();
		var unitNo = refs.refSearchUnitNo.getValue();
     	
    	unitStore.load({
			params: {
				vslCallId : params.vslCallId,
				unitNo: unitNo,
//				brandCd: brandCd,
//				catgCd: params.catgCd,
				statCd: params.statCd,
				cgNo: params.cgNo,
			},
			callback: function(records, operation, success) {
				if (success) {
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
	
//	onHHTDblClickCgGrd: function () {
//		var me = this;
//		var refs = me.getReferences();
//		
//		var unitItem = me.getView().recvData;
//		var vslCallId = unitItem.data.vslCallId;
//		var catgCd = unitItem.data.catgCd;
//		
//		var grid = me.lookupReference('refCgListDamageCheckPopupHHTGrd');
//		var selection = grid.getSelection() == null ? null : grid.getSelection();
//		var cgNo = selection.data.cgNo;
//		
//		
//		var store = this.getStore('unitItems');
//		store.load({
//			params: {
//				vslCallId: vslCallId,
//				cgNo: cgNo
//			},
//			callback: function (records, operation, success) {
//				if (success) {
//				}
//			}
//		});
//	},
	
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
		
		var grid = me.lookupReference('refUnitListDamageCheckPopupHHTGrd');
		selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
//			inDate: selection.data.inDate,
//			dischargedDate: selection.data.dischargedDate,
			cgNo: selection.data.cgNo,
			snNo: selection.data.cgNo,
			blNo: selection.data.cgNo,
			bookingNo: selection.data.bookingNo,
			modelCd: selection.data.modelCd,
			brandCd: selection.data.brandCd,
			brandNm: selection.data.brandNm,
			delvTpNm: selection.data.delvTpNm,
			yardCheckRmk: selection.data.yardCheckRmk,
			nosOfUnit: selection.data.nosOfUnit,
			remainUnit: selection.data.remainUnit,
			remark: selection.data.remark,
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
     	var recvData = me.getView().recvData;
     	
     	if(!recvData.cgNo){
     		if(recvData.blNo) {
    			recvData.cgNo = recvData.blNo;
    		}else {
    			recvData.cgNo = recvData.shipgNoteNo;
    		}
     	}
     	
     	var params = {
			vslCallId 	: recvData.vslCallId,
			vslCd 		: recvData.vslCd,
			callSeq 	: recvData.callSeq,
			callYear 	: recvData.callYear,
			searchType	: recvData.searchType,
			grNo 		: recvData.grNo,
			cgNo 		: recvData.cgNo,
			shipgNoteNo : recvData.shipgNoteNo,
			blNo 		: recvData.blNo,
			unitNo 		: recvData.unitNo,
			brandCd		: recvData.brandCd,
			modelCd		: recvData.modelCd,
			cgTpCd 		: recvData.cgTpCd,
			catgCd 		: recvData.catgCd,
			shftDt 		: recvData.shftDt,
			shftId	 	: recvData.shftId,
			ixCd		: recvData.ixCd,
			gateTxnNo	: recvData.gateTxnNo,
			remark		: recvData.remark,
		};
    	
    	return params;
	},
});