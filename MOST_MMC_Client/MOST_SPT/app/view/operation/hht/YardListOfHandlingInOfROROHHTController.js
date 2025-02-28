Ext.define('MOST.view.operation.hht.YardListOfHandlingInOfROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.yardlistofhandlinginofrorohhtctl',

	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	CARGO_HANDLING_IN_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlinginofroro/handlinginlistHHT',
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
     	
		var unitStore = me.getStore('handlingInItems');
     	var unitItem = me.getView().recvData;
     	
     	unitStore.load({
			params: {
				vslCallId: unitItem.data.vslCallId,
				shipgNoteNo: unitItem.data.shipgNoteNo,
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {

					}
				}
			}
		});
     	
		me.getViewModel().setData({theListYardCheckHI:unitItem});
		//refs.refTxtYardInDate.setValue(Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
	},
	
	onUpdate_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var unitStore = me.getStore('handlingInItems');
		
		var unitItem = me.getViewModel().get('theListYardCheckHI');
		if(unitItem == null) return;
			
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('inDate', refs.refTxtYardInDate.getValue());
		unitItem.set('delvTpCd', 'I');
		unitItem.set('statCd', 'ST');
		if(!StringUtil.isNullorEmpty(unitItem.get('correctionNo'))
				&& unitItem.get('correctionNo') != unitItem.get('unitNo')){
			unitItem.set('correctionUnitNoYN', 'Y');
		}
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		unitItem.set('roroSeq', me.RORO_SEQ);
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_HANDLING_IN_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus',WorkingStatus.UPDATE);
		updateParm.set('item', unitItem.data);
		
		updateParm.save({
			success : function(record, operation, success) {
				unitStore.commitChanges();
				
				me.onPopupHHTLoad();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							refs.refHITxtUnitNo.setValue('');
							me.onRetrieveHHT();
						}
				});
			}
		});
		
	},
	
	onDeleteYardHHT: function (){
		var me = this;
		var refs = me.getReferences();
		
		var unitStore = me.getStore('handlingInItems');
		
		var grid = me.lookupReference('refGrdYardCheckGateIn');
		var unitItem = grid.getSelection();
		if(unitItem == null) return;
		
//		if(!StringUtil.isNullorEmpty(unitItem.get('outDate'))
//				|| !StringUtil.isNullorEmpty(unitItem.get('rhdlNo'))){
//			//Msg_CT243001: This cargo has been loaded or rehandled  already. Please check it again!
//			return;
//		}
		
		unitItem.set('delvTpCd', null);
		unitItem.set('inDate', null);
		unitItem.set('yardLoc', null);
		unitItem.set('hiRemarks', null);
		//just for temporary for CUD without WB application. Originally it should be "IC"
		unitItem.set('statCd', 'RS');
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_HANDLING_IN_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('item', unitItem.data);
		updateParm.save({
			success : function(record, operation, success) {
				unitStore.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							refs.refHITxtUnitNo.setValue('');
							me.onRetrieveHHT();
							//window.close();
						}
				});
			}
		});	
	},
	
	onRetrieveHHT: function (){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('handlingInItems');
     	var unitItem = me.getView().recvData;
     	var unitNo = refs.refHITxtUnitNo.getValue();
     	
     	unitStore.load({
			params: {
				vslCallId: unitItem.get('vslCallId'),
				shipgNoteNo: unitItem.get('shipgNoteNo'),
				unitNo: unitNo,
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
		var targetCtl = 'reftxtUnitNo';
		
		var unitItem = me.getView().recvData;
		
		var params = {
			title : 'Unit No',
			vslCallId : unitItem.get('vslCallId'),
			brandCd: unitItem.get('brandCd'),
			shipgNoteNo: unitItem.get('shipgNoteNo'),
			statCd: 'ST',
			searchType: 'ListHI',
		};
		
		ViewUtil.openCodePopup(this, 'app-listofunitforhandlinginhhtpopup', targetCtl, params);
	},
	
	onSelectGridYardCheckGateInHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('gateInItems');
		var grid = me.lookupReference('refGrdYardCheckGateIn');
		var unitItem = grid.getSelection();
		if(unitItem == null) return;
		
		refs.refHITxtUnitNo.setValue(unitItem.get('unitNo'));
		refs.refYardCheckerLocId.setValue(unitItem.get('yardLoc'));
		refs.refTxtYardInDate.setValue(unitItem.get('inDate'));
		refs.refYardUpdateHIRemark.setValue(unitItem.get('hiRemarks'));
		
		refs.refTruckNo.setValue(unitItem.get('truckNo'));
		refs.refDriverId.setValue(unitItem.get('driverId'));
		refs.refDriverNm.setValue(unitItem.get('driverNm'));
		
		me.RORO_SEQ = unitItem.data.roroSeq;
	},
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'reftxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				refs.refHITxtUnitNo.setValue(returnValue.code);	// Unit No
				refs.refTxtYardInDate.setValue(returnValue.inDate);
				refs.refYardCheckerLocId.setValue(returnValue.yardLoc);
				
				refs.refTruckNo.setValue(returnValue.truckNo);
				refs.refDriverId.setValue(returnValue.driverId);
				refs.refDriverNm.setValue(returnValue.driverNm);
			}
		}
		
	},
	/**
	 * =========================================================================================================================
	 * HHT TABLET END.
	 * 
	 */
});