Ext.define('MOST.view.operation.hht.UpdatingDischargingOfROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.updatingdischargingofrorohhtctl',

	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	CARGO_DISCHARGING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/unitlisthht',

	RORO_SEQ: null,
	
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
     	var window = me.getView().up('window');
     	
		var unitItem = me.getView().recvData;
		var unitStore = me.getStore('unitItems');
     	
     	unitStore.load({
			params : {
				vslCallId : unitItem.get('vslCallId'),
				blNo : unitItem.get('blNo'),
				statCd: 'OD'
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length > 0) {
					}
				}
			}
		});
		me.getViewModel().setData({theUpdatingDischargingCheckHHT:unitItem});
	},
	
	
	onSearch:function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchConditionDischarging();
		var store = me.getStore('unitItems');
		
     	
		store.load({
			params : {
				vslCallId : params.vslCallId,
				blNo : params.blNo,
				statCd: 'OD'
			},
			
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	onSaveHHT_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		
	},
	
	onUpdate_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var unitItem = me.getViewModel().get('theUpdatingDischargingCheckHHT');
		
		//VALIDATE MANDATORY://VALIDATE MANDATORY:
		var validForm = refs.refFrmListforDSChkHHT.validate();
		if (!validForm) {
			MessageUtil.mandatoryFieldInValid();
			return;
		}
		
		var unitStore = me.getStore('unitItems');
		var grid = me.lookupReference('refUpdatingDischargingCheckHHTGrid');
//		var unitItem = me.getView().recvData;
//		var unitItem = grid.getSelection() == null ? null : grid.getSelection();
		if(unitItem == null) return;
			
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('opDelvTpCd', 'I');
		unitItem.set('blNo', refs.refCboSubBL.getValue());
		unitItem.set('brandCd', refs.refCboBrand.getValue());
		unitItem.set('unitNo', refs.refUpdatingDischargingCheckUnitNo.getValue());
		unitItem.set('dischargedDate', refs.refTxtDsTime.getValue());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		if(me.RORO_SEQ){
			unitItem.set('roroSeq', me.RORO_SEQ);
		}
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_DISCHARGING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus',WorkingStatus.UPDATE);
		updateParm.set('item', unitItem.data);
		
		updateParm.save({
			success : function(record, operation, success) {
				unitItem.commit();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
						if (button === 'ok') {
							me.onPopupHHTLoad();
						}
				});
			}
		});
	},
	
	onRemove_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('unitItems');
		var window = me.getView().up('window');

		var grid = me.lookupReference('refUpdatingDischargingCheckHHTGrid');
		var unitItem = grid.getSelection() == null ? null : grid.getSelection();
		if(unitItem == null) return;
		
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items', new Array());
		
		//delete Discharging Job
		if(!StringUtil.isNullorEmpty(unitItem.get('dischargedDate'))){
			unitItem.set('delvTpCd', null);
			unitItem.set('dischargedDate', null);
			unitItem.set('inDate', null);
			unitItem.set('outDate', null);
			unitItem.set('dischargingRmk', null);
			unitItem.set('stevedoreId', null);
			unitItem.set('newYn', null);
			unitItem.set('statCd', 'RS');
		}
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				unitStore.commitChanges();
				MessageUtil.saveSuccess();
				
				me.onPopupHHTLoad();
			}
		});
	},
	
	
	onSearchUnitNo: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'reftxtUnitNo';
		var title = 'Unit No';
		
		var unitItem = me.getView().recvData;
		unitItem.set('statCd', 'OD');
		unitItem.set('title', title);
		
		ViewUtil.openCodePopup(this, 'app-unitlisthhtpopup', targetCtl, unitItem);
	},
	
	onHHTDblClick: function(){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('unitItems');
		
		var grid = me.lookupReference('refUpdatingDischargingCheckHHTGrid');
		var unitItem = grid.getSelection();
		
		me.RORO_SEQ = unitItem.get('roroSeq');
		
		me.getViewModel().setData({theUpdatingDischargingCheckHHT:unitItem});
	},
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'reftxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				refs.refUpdatingDischargingCheckUnitNo.setValue(returnValue.code);
				refs.refTxtDsTime.setValue(returnValue.dischargedDate);
				me.RORO_SEQ = returnValue.item.get('roroSeq');
			}
		}
		
	},
	
	
	getSearchConditionDischarging: function () {
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getView().recvData;

		var vslCallId = searchParm.get('vslCallId');
		var blNo = searchParm.get('blNo');
		var statCd = 'OD';
		
		var params = {
			vslCallId: vslCallId,
			blNo: blNo,
			statCd: statCd,
		};
		
		return params;
	},
	/**
	 * =========================================================================================================================
	 * HHT TABLET END.
	 * 
	 */
});