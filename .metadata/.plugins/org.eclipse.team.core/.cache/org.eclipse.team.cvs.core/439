Ext.define('MOST.view.operation.hht.ListofDischargingCheckhhtPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.listofdischargingcheckhhtpopup',

	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	
	
	
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */	
	
	
	/**
	 * =========================================================================================================================
	 * HHT TABLET START.
	 * 
	 */
	onPopupHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		var unitStore = me.getStore('unitItems');
		var blStore = me.getStore('blCombo');
		var brandCombo = me.getStore('brandCombo');
		
		var vslCallId = unitItem.data.vslCallId;
		var unitNo = unitItem.data.unitNo;
     	var blNo = unitItem.data.blNo;
     	var brandCd = unitItem.data.brandCd;
     	
     	unitStore.load({
			params : {
				vslCallId : vslCallId,
				blNo : blNo
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length > 0) {
					}
				}
			}
		});
     	
		brandCombo.load({
			params : {
				vslCallId : vslCallId
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						brandCombo.insert(0, [{scdNm: 'Select', scd: ''}]);
						brandCombo.commitChanges();
					}
				}
			}
		});
		
		blStore.load({
			params : {
				vslCallId : vslCallId
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						blStore.each(function (record, index) {
							var blNm = record.get('blNo');
							record.set('blNm', blNm);
						});
						blStore.insert(0, [{blNo: '', blNm: 'Select'}]);
						blStore.commitChanges();
					}
				}
			}
		});
		
		me.getViewModel().setData({theListofDischargingCheckHHT:unitItem});
	},
	
	//Button Loading:
	onTblUnitClick: function(){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		
		var unitNo = refs.refTxtUnitNo.getValue();
		var brandCd = refs.refCboBrand.getValue();
		var blNo = refs.refCboSubBL.getValue();
		var vslCallId = unitItem.data.vslCallId;
		
		var params = {
				title : 'Unit No',
				vslCallId : vslCallId,
				unitNo : unitNo,
				brandCd : brandCd,
				blNo: blNo
		};
		
		ViewUtil.openCodePopup(me, 'app-unitlisthhtpopup', 'reftxtUnitNo', params);
	},
	
	onSearchUnitHHT_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		var unitStore = me.getStore('unitItems');
		
		var unitNo = refs.refTxtUnitNo.getValue();
		var brandCd = refs.refCboBrand.getValue();
		var blNo = refs.refCboSubBL.getValue();
		var vslCallId = unitItem.data.vslCallId;
		
		unitStore.load({
			params : {
				vslCallId : vslCallId,
				blNo : blNo,
				brandCd : brandCd,
				unitNo: unitNo,
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length > 0) {
					}
				}
			}
		});
	},
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'reftxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				refs.refTxtUnitNo.setValue(returnValue.code);
			}
		}
		
	},
	/**
	 * =========================================================================================================================
	 * HHT TABLET END.
	 * 
	 */
});