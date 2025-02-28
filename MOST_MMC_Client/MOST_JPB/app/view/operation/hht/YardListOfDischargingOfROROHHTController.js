Ext.define('MOST.view.operation.hht.YardListOfDischargingOfROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.yardlistofdischargingofrorohhtctl',

	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	CARGO_DISCHARGING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/unitlist',

	strTp : '',
	
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */	
	
	
	/**
	 * =========================================================================================================================
	 * HHT TABLET START.
	 * 
	 */
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
     	var unitItem = me.getView().recvData;
     	
		me.onRetrieveHHT();
		me.getViewModel().setData({theListofDischargingYardCheckHHT:unitItem});
		//refs.ctlInDtm.setValue(Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
	},
	
	onSaveHHT_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		
	},
	
	onUpdate_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var unitStore = me.getStore('unitItems');
		
		//VALIDATE MANDATORY://VALIDATE MANDATORY:
		var validForm = refs.refFrmTheListofWHChkImHHT.validate();
		if (!validForm) {
			MessageUtil.mandatoryFieldInValid();
			return;
		}
		
		var unitItem = me.getViewModel().get('theListofDischargingYardCheckHHT');
		if(unitItem == null) return;

		unitItem.set('action', 'YARD_CHECK');
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('inDate', refs.ctlInDtm.getValue());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_DISCHARGING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus',WorkingStatus.UPDATE);
		updateParm.set('item', unitItem.data);
		
		updateParm.save({
			success : function(record, operation, success) {
				unitStore.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							refs.refTxtUnitNo.setValue('');
							me.onRetrieveHHT();
						}
				});
			}
		});
		
	},
	
	onRemove_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('unitItems');
		var window = me.getView().up('window');

		var grid = me.lookupReference('refListofDischargingYardCheckHHTGrid');
		var unitItem = grid.getSelection() == null ? null : grid.getSelection();
		if(unitItem == null) return;
		
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		
		//delete Discharging Job
		if(!StringUtil.isNullorEmpty(unitItem.get('dischargedDate'))
				&& !StringUtil.isNullorEmpty(unitItem.get('inDate'))
				&& StringUtil.isNullorEmpty(unitItem.get('outDate'))){
			unitItem.set('inDate', null);
			unitItem.set('outDate', null);
			unitItem.set('yardCheckRmk', null);
			unitItem.set('unitYardLoc', null);
			unitItem.set('statCd', 'OD');
		}else {
			MessageUtil.warning('warning_msg', 'Out Date is not null!');
			return;
		}
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('item', unitItem.data);
		
		updateParm.save({
			success : function(record, operation) {
				unitStore.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							refs.refTxtUnitNo.setValue('');
							me.onRetrieveHHT();
						}
				});
			}
		});
	},
	
	onActivateTabHHT: function(ref){
		var me = this;
		var tab = ref.reference;
		me.setButtonByTab(tab);
	},
	
	setButtonByTab: function(tab){
		var me = this;
		var strTp;
		var refs = me.getReferences();
		
		if (tab == 'refPnlDirect'){
			me.strTp = 'DIRECT';
		}else if(tab == 'refPnlIndirect'){
			me.strTp = 'INDIRECT';
		}
		
		
	},
	
	onRetrieveHHT: function (){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('unitItems');
     	var unitItem = me.getView().recvData;
     	
     	unitStore.load({
			params: {
				vslCallId: unitItem.get('vslCallId'),
				blNo: unitItem.get('blNo'),
				unitNo:  refs.refTxtUnitNo.getValue(),
				statCd: 'ST',
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {

					}
				}
			}
		});
	},
	
	onSearchUnitNo: function(){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		var title = 'Unit No';
		
		var params = {
			title: title,
			vslCallId : unitItem.get('vslCallId'),
			brandCd : unitItem.get('brandCd'),
			blNo: unitItem.get('blNo'),
			unitNo : refs.refTxtUnitNo.getValue(),
			statCd: 'ST',
		};
		
		ViewUtil.openCodePopup(me, 'app-unitlisthhtpopup', 'refTxtUnitNo', params);
	},
	
	onDoubleClickGrid: function(){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('unitItems');
		
		var grid = me.lookupReference('refListofDischargingYardCheckHHTGrid');
		var unitItem = grid.getSelection();
		if(unitItem == null) return;
		
		me.getViewModel().setData({theListofDischargingYardCheckHHT:unitItem});
		refs.ctlInDtm.setValue(unitItem.get('inDate'));
		
		// Delivered >> ready for Stack in Yard
		if( StringUtil.isNullorEmpty(unitItem.get('dischargedDate'))
				&& StringUtil.isNullorEmpty(unitItem.get('inDate'))){
			refs.refBtnDelete.setDisabled(true);
		}
		if( !StringUtil.isNullorEmpty(unitItem.get('outDate'))){	//có
			refs.refBtnDelete.setDisabled(true);
		}
	},
	
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'reftxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				refs.refTxtUnitNo.setValue(returnValue.code);
				refs.ctlInDtm.setValue(returnValue.inDate);
			}
		}
		
	},
	/**
	 * =========================================================================================================================
	 * HHT TABLET END.
	 * 
	 */
});