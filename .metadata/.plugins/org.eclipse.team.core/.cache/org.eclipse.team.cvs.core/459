Ext.define('MOST.view.operation.hht.YardListOfLoadingOfROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.yardlistofloadingofrorohhtctl',

	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	CARGO_LOADING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/unititemsHHT',
	tabMode: '',
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
     	var window = me.getView().up('window');
     	
     	var unitItem = me.getView().recvData;
     	
     	refs.ctlOutDtm.setValue(Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		me.getViewModel().setData({theListofLoadingYardCheckHHT:unitItem});
		me.getUnitItemsList(unitItem);
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
					statCd: 'OL',
					shipgNoteNo:record.get('shipgNoteNo')
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
	
	// Tab Change Event
	onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var tabTitle = refs.refTabWHOutLD.getActiveItem().getTitle().trim();
		
		switch (tabTitle) {
			case 'Direct':
				me.tabMode = 'Direct';
				break;
			case 'Indirect':
				me.tabMode = 'Indirect';
				break;
		}
	},
	
	
	onSearchHHT : function(){
		var me = this;
     	var refs = me.getReferences();
     	var unitItem = me.getView().recvData;
     	
		var tabPanel = refs.refTabWHOutLD.getActiveItem().getTitle().trim();
		
		switch(tabPanel){
			case 'Direct':
				me.searchDirectTbl(unitItem);
				break;
			case 'Indirect':
				me.searchIndirectTbl(unitItem);
				break;
		}
	},
	
	
	onSaveHHT_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		
	},
	
	onUpdate_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		if(me.isTerminalHoldYardCheck()){
			MessageUtil.warning('warning_msg', 'terminal_hold_msg');
			return;
		};
		
		var unitItem;
		var inDirect = me.lookupReference('refYGridIndirectTab').getSelection();	// Grid	Indirect
		var direct = me.lookupReference('refGridDirectTab').getSelection();			// Grid	Direct
		if(inDirect) {
			unitItem = inDirect;
		}else {
			unitItem = direct;
		}
		if(unitItem == null) return;
			
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('action', 'YC');
		unitItem.set('statCd', 'OL');
		unitItem.set('outDate', refs.ctlOutDtm.getValue());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		if(unitItem.data.delvTpNm == 'INDIRECT') {
			unitItem.set('delvTpCd', 'I');
		}else if(unitItem.data.delvTpNm == 'DIRECT'){
			unitItem.set('delvTpCd', 'D');
		}
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_LOADING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus',WorkingStatus.UPDATE);
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
		var unitItem = me.getView().recvData;
		var window = me.getView().up('window');
		
		var selection = null;
		var inDirect = me.lookupReference('refYGridIndirectTab').getSelection();	// Grid	Indirect
		var direct = me.lookupReference('refGridDirectTab').getSelection();			// Grid	Direct
		if(inDirect) {
			selection = inDirect;
		}else {
			selection = direct;
		}
		if(selection == null) return;
		
		//delete Yard Job
		selection.set('userId', MOST.config.Token.getUserId());
		selection.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		selection.set('action', 'YC');
		selection.set('outDate', null);
		unitItem.set('stevedoreId', null);
		unitItem.set('ycRemarks', null);
		selection.set('statCd', 'ST');
		if(selection.data.delvTpNm == 'INDIRECT') {
			selection.set('delvTpCd', 'I');
		}else if(selection.data.delvTpNm == 'DIRECT'){
			selection.set('delvTpCd', 'D');
		}
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_LOADING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus',WorkingStatus.UPDATE);
		updateParm.set('item', selection.data);
		updateParm.save({
			success : function(record, operation, success) {
				selection.commit();
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
	
	searchDirectTbl:function(unitItem){
		var me = this;
		var refs = me.getReferences();
		var directStore = me.getStore('directUnitItemsList');
		var unitNo = refs.refTxtUnitNo.getValue();

     	directStore.load({
			params : {
				vslCallId : unitItem.get('vslCallId'),
				shipgNoteNo : unitItem.get('shipgNoteNo'),
				unitNo : unitNo,
				brandCd : unitItem.get('brandCd'),
				statCd : 'OL',
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
					}
				}
			}
		});
	},
	
	searchIndirectTbl:function(unitItem){
		var me = this;
		var refs = me.getReferences();
		var indirectStore = me.getStore('inDirectUnitItemsList');
		var unitNo = refs.refTxtUnitNo.getValue();

     	indirectStore.load({
			params : {
				vslCallId : unitItem.get('vslCallId'),
				shipgNoteNo : unitItem.get('shipgNoteNo'),
				unitNo: unitNo,
				brandCd: unitItem.get('brandCd'),
				statCd : 'OL',
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
					}
				}
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
	
	onTblUnitClick: function(){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		var statCd;
		var vslCallId = unitItem.data.vslCallId;
		
		var outTime = refs.ctlOutDtm.getValue();
		var unitNo = refs.refTxtUnitNo.getValue();
		var brandCd = refs.refCboBrand.getValue();
		var shipgNoteNo = refs.refCboSnNo.getValue();
		
		var params = {
			title : 'Unit No',
			vslCallId : vslCallId,
			unitNo : unitNo,
			brandCd : brandCd,
			shipgNoteNo: shipgNoteNo,
			statCd: 'OL'		// Will show unitNo have status is 'On Loading' 
		};
		
		ViewUtil.openCodePopup(me, 'app-listofunitforsnhhtpopup', 'reftxtUnitNo', params);
	},
	
	onDoubleClickGrid: function(){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('unitItems');
		
		var grid = me.lookupReference('refListofLoadingYardCheckHHTGrid');
		var unitItem = grid.getSelection();
		
		me.getViewModel().setData({theListofLoadingYardCheckHHT:unitItem});
	},
	
	onCgGridItemDirectClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refGridDirectTab');
		var unitItem = grid.getSelection();
		if(unitItem == null) return;
		
		refs.refTxtUnitNo.setValue(unitItem.get('unitNo'));
		refs.ctlOutDtm.setValue(unitItem.get('outDate'));	
		//me.getViewModel().setData({theListofLoadingYardCheckHHT:unitItem});
	},
	
	onCgGridItemIndirectClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refYGridIndirectTab');
		var unitItem = grid.getSelection();
		if(unitItem == null) return;
		
		refs.refTxtUnitNo.setValue(unitItem.get('unitNo'));
		refs.ctlOutDtm.setValue(unitItem.get('outDate'));
		//me.getViewModel().setData({theListofLoadingYardCheckHHT:unitItem});
	},
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'reftxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				refs.refTxtUnitNo.setValue(returnValue.code);
				refs.ctlOutDtm.setValue(returnValue.outDate);
			}
		}
		
	},
	
	isTerminalHoldYardCheck: function(){
		var me = this;
		var refs = me.getReferences();
		var terminalHoldYardCheckStore = me.getStore('terminalHoldYardCheckStore');
		var flag = false;
		if(terminalHoldYardCheckStore.data.length > 0){
			flag = true;
		}
		
		return flag;
		
	},
	/**
	 * =========================================================================================================================
	 * HHT TABLET END.
	 * 
	 */
});