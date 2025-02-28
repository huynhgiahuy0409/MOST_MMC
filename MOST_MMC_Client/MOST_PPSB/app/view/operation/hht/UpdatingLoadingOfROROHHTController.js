Ext.define('MOST.view.operation.hht.UpdatingLoadingOfROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
		
	],

	alias: 'controller.updatingloadingofrorohhtctl',

	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	CARGO_LOADING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/unititemsHHT',
	
	cgIndex:0,
	strTp : '',
	RORO_SEQ: null,
	
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */	
	onPopupHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		window.setTitle('Update Loading Check of RORO');
		var unitItem = me.getView().recvData;
		
		me.getViewModel().setData({theUpdatingLoadingCheckHHT:unitItem});
		refs.refTxtLDTime.setValue(Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
     	//me.getBrComboItems();
		//me.onSearch();
     	me.getUnitItemsList(unitItem);
	},
	
	onUpdate_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var unitItem = null;
		var inDirect = me.lookupReference('refGridIndirectTab').getSelection();	// Grid	Indirect
		var direct = me.lookupReference('refGridDirectTab').getSelection();			// Grid	Direct
		if(inDirect) {
			unitItem = inDirect;
		}else {
			unitItem = direct;
		}
		if(unitItem == null) {
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('statCd', 'LD');
		unitItem.set('loadingTime', refs.refTxtLDTime.getValue());
		unitItem.set('workingStatus', WorkingStatus.DELETE);
		if(me.RORO_SEQ){
			unitItem.set('roroSeq', me.RORO_SEQ);
		}
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_LOADING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.DELETE);
		updateParm.set('item', unitItem.data);
		
		updateParm.save({
			success : function(record, operation, success) {
				unitItem.commit();
				me.onPopupHHTLoad();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
				function(button){
					if (button === 'ok') {
						//window.close();
					}
				});
			}
		});
		
	},
	
	onRemove_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('unitItemsList');
		
		var unitItem = null;
		var inDirect = me.lookupReference('refGridIndirectTab').getSelection();	// Grid	Indirect
		var direct = me.lookupReference('refGridDirectTab').getSelection();			// Grid	Direct
		if(inDirect) {
			unitItem = inDirect;
		}else {
			unitItem = direct;
		}
		if(unitItem == null) return;
		
		unitItem.set('userId',  MOST.config.Token.getUserId());
		unitItem.set('action', 'LC');
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		
		//delete Loading job
		if(unitItem.get('statCd') == 'LD'){
			unitItem.set('action', 'LC');
			unitItem.set('loadingTime', null);
			unitItem.set('crane', null);
			unitItem.set('ldRemarks', null);
			unitItem.set('vslLocation', null);
			
			if(unitItem.data.delvTpNm == 'INDIRECT') {
				unitItem.set('delvTpCd', 'I');
			}else if(unitItem.data.delvTpNm == 'DIRECT'){
				unitItem.set('delvTpCd', 'D');
			}
			
			if(StringUtil.isNullorEmpty(unitItem.get('outDate'))){
				unitItem.set('delvTpCd', null);
				unitItem.set('statCd', 'RS');
			} else {
				unitItem.set('statCd', 'OL');
			}
		}
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_LOADING_PROXY_URL;
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
							//window.close();
						}
				});
			}
		});
	},
	
	onCgGridItemDirectClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refGridDirectTab');
		var unitItem = grid.getSelection();
		
		if(unitItem == null) return;
		
		me.getViewModel().setData({theUpdatingLoadingCheckHHT:unitItem});
		
		refs.refTxtLDTime.setValue(unitItem.get('loadingTime'));
	},
	
	onCgGridItemIndirectClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refGridIndirectTab');
		var unitItem = grid.getSelection();
		
		if(unitItem == null) return;
		
		me.getViewModel().setData({theUpdatingLoadingCheckHHT:unitItem});
		
		refs.refTxtLDTime.setValue(unitItem.get('loadingTime'));
	},
	
//	getSnComboItems: function(){
//		var me = this;
//		var refs = me.getReferences();
//		var snCombo = me.getStore('snCombo');
//		var unitItem = me.getView().recvData;
//		var vslCallId = unitItem.data.vslCallId;
//		
//		if(vslCallId){
//			snCombo.load({
//				params : {
//					vslCallId: vslCallId
//				},
//				
//				callback: function(records, operation, success) {
//					if (success) {
//						if(records.length > 0){
//							snCombo.insert(0, [{cdNm: 'All',cd: ''}]);
//						}
//					}
//				}
//			});
//		}
//	},
//	
//	getBrComboItems: function(){
//		var me = this;
//		var refs = me.getReferences();
//		var brCombo = me.getStore('brandCombo');
//		var unitItem = me.getView().recvData;
//		var vslCallId = unitItem.data.vslCallId;
//		
//		if(vslCallId){
//			brCombo.load({
//				params : {
//					vslCallId: vslCallId
//				},
//				
//				callback: function(records, operation, success) {
//					if (success) {
//						if(records.length > 0){
//							brCombo.insert(0, [{scdNm: 'All', scd: ''}]);
//						}
//					}
//				}
//			});
//		}
//	},
	
	onSearch: function (){
		var me = this;
		var refs = me.getReferences();
		me.searchDirectTbl();
		me.searchIndirectTbl();
	},
	
	searchDirectTbl:function(){
		var me = this;
		var refs = me.getReferences();
		var directStore = me.getStore('directUnitItemsList');
		var unitItem = me.getView().recvData;
		var unitNo = refs.refTxtUnitNo.getValue();
		
     	directStore.load({
			params : {
				vslCallId : unitItem.data.vslCallId,
				shipgNoteNo : unitItem.data.shipgNoteNo,
				unitNo: unitNo,
				brandCd: unitItem.data.brandCd,
				statCd: 'LD',
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
					}
				}
			}
		});
	},
	
	searchIndirectTbl:function(){
		var me = this;
		var refs = me.getReferences();
		var indirectStore = me.getStore('inDirectUnitItemsList');
		var unitItem = me.getView().recvData;
		var unitNo = refs.refTxtUnitNo.getValue();
		
     	indirectStore.load({
			params : {
				vslCallId : unitItem.data.vslCallId,
				shipgNoteNo : unitItem.data.shipgNoteNo,
				unitNo: unitNo,
				brandCd: unitItem.data.brandCd,
				statCd: 'LD',
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
					}
				}
			}
		});
	},
	
	getUnitItemsList: function(record){
		var me = this;
		var refs = me.getReferences();
		
		var indirectStore = me.getStore('inDirectUnitItemsList');
		var directStore = me.getStore('directUnitItemsList');
		
		if(record){
			var store = me.getStore('unitItemsList');
			store.load({
				params : {
					vslCallId:record.get('vslCallId'),
					shipgNoteNo:record.get('shipgNoteNo'),
					statCd: 'LD',
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							indirectStore.setData(records[0].data.indirectUnitItems);
							directStore.setData(records[0].data.directUnitItems);
						}
						
					}
				}
			});
		}
	},
	
	// Direct refPnlDirect /Indirect refPnlIndirect Grid
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
	
	//Button Loading:
	onTblUnitClick: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'reftxtUnitNo';
		
		var unitItem = me.getView().recvData;
		var shipgNoteNo = refs.refCboSnNo.getValue();
		
		if(unitItem.data.delvTpNm = 'DIRECT') {
			unitItem.set('delvTpCd', 'D');
			unitItem.set('delvTpNm', 'DIRECT');
		}else {
			unitItem.set('delvTpCd', 'I');
			unitItem.set('delvTpNm', 'INDIRECT');
		}
		unitItem.set('statCd', 'LD');
		unitItem.set('cgNo', shipgNoteNo);
		unitItem.set('searchType', 'LD');
		
		ViewUtil.openCodePopup(me, 'app-unitlisthhtpopup', targetCtl, unitItem);
	},
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'reftxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				refs.refTxtUnitNo.setValue(returnValue.code);
				me.RORO_SEQ = returnValue.item.get('roroSeq');
			}
		}
		
	},
	
	/**
	 * =========================================================================================================================
	 * HHT TABLET START.
	 * 
	 */
	
});