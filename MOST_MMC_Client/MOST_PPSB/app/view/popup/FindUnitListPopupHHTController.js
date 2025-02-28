Ext.define('MOST.view.popup.FindUnitListPopupHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.findunitlistpopuphhtctl',
	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	prevDate:{ startDt: null, endDt: null},
	prevDateHHT:{ startDt: null, endDt: null},
	prevData:null,
	prevHHTData:null,
	searchType: null,
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * EVENT POPUP HANDLER START
	 * =========================================================================================================================
	 */
	onActivateTabHHT: function(ref){
		var me = this;
		var tab = ref.reference;
		var refs = me.getReferences();

		me.setConstrolSetting(tab);

	},
	
	// Search Event Handler
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
     	var title ='';
		
     	var unitItem = me.getView().recvData;
     	var delvTpCd = unitItem.modified.delvTpCd;
     	var delvTpNm = unitItem.modified.delvTpNm;
     	
     	if(me.getView().recvData.data){
     		title = me.getView().recvData.data.title;
     		var brandCd = unitItem.data.brandCd;
	     	var vslCallId =  unitItem.data.vslCallId;
	     	var unitNo = unitItem.data.unitNo;
	     	var statCd = unitItem.data.statCd;
	     	var shipgNoteNo = unitItem.data.shipgNoteNo;
     	}else {
     		var brandCd = unitItem.brandCd;
	     	var vslCallId =  unitItem.vslCallId;
	     	var unitNo = unitItem.unitNo;
	     	var statCd = unitItem.statCd;
	     	var shipgNoteNo = unitItem.shipgNoteNo;
     	}
     	if(delvTpCd) {
     		unitItem.set('delvTpCd',delvTpCd);
         	unitItem.set('delvTpNm',delvTpNm);
     	}
     	
     	me.onUiChangeOriginalHHT(title);
     	
		refs.refTxtUnitNo.setValue(unitNo);
		refs.refBrandCombo.setValue(brandCd);
     	
     	me.getBrComboItems();
     	//Get unit list (both Direct and Indirect)
     	me.getUnitItemsList(unitItem);
	},
	
	onUiChangeOriginalHHT: function(title){
		var me = this;
		var refs = me.getReferences();
		
		me.getView().up('window').setTitle(title);
		
	},
	
	searchDirectTbl: function(record){
		var me = this;
		var refs = me.getReferences();
		
		var directStore = me.getStore('directUnitItemsList');
		directStore.removeAll();
		
		if(record){
			var store = me.getStore('unitItemsList');
			store.load({
				params : {
					vslCallId : record.get('vslCallId'),
					shipgNoteNo : record.get('shipgNoteNo'),
					unitNo : record.get('unitNo'),
					brandCd : record.get('brandNm'),
					statCd : record.get('statCd'),
					searchType: record.get('searchType'),
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							directStore.setData(records[0].data.directUnitItems);
							directStore.commitChanges();
						}
						
					}
				}
			});
		}
	},
	
	searchInDirectTbl: function(record){
		var me = this;
		var refs = me.getReferences();
		
		var indirectStore = me.getStore('inDirectUnitItemsList');
		indirectStore.removeAll();
		
		if(record){
			var store = me.getStore('unitItemsList');
			store.load({
				params : {
					vslCallId : record.get('vslCallId'),
					shipgNoteNo : record.get('shipgNoteNo'),
					unitNo : record.get('unitNo'),
					brandCd : record.get('brandNm'),
					statCd : record.get('statCd'),
					searchType: record.get('searchType'),
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							indirectStore.setData(records[0].data.indirectUnitItems);
							indirectStore.commitChanges();
						}
						
					}
				}
			});
		}
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
					vslCallId : record.get('vslCallId'),
					shipgNoteNo : record.get('shipgNoteNo'),
					unitNo : record.get('unitNo'),
					brandCd : record.get('brandNm'),
					statCd : record.get('statCd'),
					searchType: record.get('searchType'),
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
	
	getBrComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var brCombo = me.getStore('brandCombo');
		var unitItem = me.getView().recvData;
		var vslCallId = unitItem.data.vslCallId;
		
		if(vslCallId){
			brCombo.load({
				params : {
					vslCallId: vslCallId
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							brCombo.insert(0, [{scdNm: 'All', scd: ''}]);
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
     	var unitItem = me.getView().recvData;
		var txtBrandCombo = refs.refBrandCombo.getValue();
		var txtUnitNo = refs.refTxtUnitNo.getValue();
     	
		unitItem.set('brandNm', txtBrandCombo);
		unitItem.set('unitNo', txtUnitNo);
		
		//Get unit list (both Direct and Indirect)
		me.getUnitItemsList(unitItem);
	},
	
	// Grid Row Double
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnDataHHT();
       	window.close();
	},
	
	onIndirectTabClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
		var inDirectGrid = me.lookupReference('refConfirmLoadingOfROROIndirectGridHHT');
		var selection = inDirectGrid.getSelection() == null ? null : inDirectGrid.getSelection();
		if(selection == null) return;
		
    	window.returnValue = me.getReturnDataHHT();
       	//window.close();
	},
	
	onDirectTabClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
		var directGrid = me.lookupReference('refConfirmLoadingOfRORODirectGridHHT');
		var selection = directGrid.getSelection() == null ? null : directGrid.getSelection();
		if(selection == null) return;
		
    	window.returnValue = me.getReturnDataHHT();
       	//window.close();
	},
	
	
	onSelectData : function(ref){
		var me = this; 
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var inDirectGrid = me.lookupReference('refConfirmLoadingOfROROIndirectGridHHT');
		var directGrid = me.lookupReference('refConfirmLoadingOfRORODirectGridHHT');

		window.returnValue = me.getReturnDataHHT();

		if(window.returnValue != null){
			window.close();	
		}
	},
	
	getReturnDataHHT : function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var selection = null;
		
		var inDirectGrid = me.lookupReference('refConfirmLoadingOfROROIndirectGridHHT');
		var directGrid = me.lookupReference('refConfirmLoadingOfRORODirectGridHHT');
	
		if(inDirectGrid.getSelection() != null) {
			selection = inDirectGrid.getSelection();
		}else {
			selection = directGrid.getSelection() == null ? null : directGrid.getSelection();
		}
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			code: selection.data.unitNo,
			item : selection,
		}

    	window.returnValue = returnItem;
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	setConstrolSetting: function (tab) {
		var me = this;
		var refs = me.getReferences();
		var isLd = false,
			isLdD = false,
			isLdI = false;

		if(tab == 'refPnlDirect'){
			isLdD = true;
			//if (refs.refChkYardTruck.getChecked()) {
			//	isLdI = true;
			//} else {
			//	isLdD = true;
			//}
		} else if(tab == 'refPnlInDirect'){
			isLdI = true;
		}
		
	},
	
	// Tab Change Event
	onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var tabTitle = refs.refTabImExLDCtl.getActiveItem().getTitle().trim();
		
		switch (tabTitle) {
			case 'Direct':
				me.tabMode = 'Direct';
				break;
			case 'Indirect':
				me.tabMode = 'Indirect';
				break;
		}
	},
});