Ext.define('MOST.view.sample.ControlSampleController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.controlsample',
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var comboStore = me.getStore('tagFieldCombo');
		var testSearchCombo = me.getStore('controlSampleTestTypeSearchCombo');
		var record = Ext.create('MOST.model.sample.SingleGrid');
		
		me.getViewModel().setData({theDetail:record});
		
		comboStore.load();
		testSearchCombo.load();
	},
	
	// Initialize Control
	onOpenDetailPopupSample:function(){
		var me = this;
		var refs = me.getReferences();
		
		var recvData = {
				colCombo: refs.ctlControlSampleColCombo.getValue()
		};
		
		me.loadMenuView('app-detailpopupsample', recvData);
	},	
	
	// IndependencyPopup
	onIndependencyPopup:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.getView().detailViewAlias = 'app-independencypopup';
		me.openDetailPopup(null);
	},
	
	// Receive Poup Data
	recevePopup:function(recvData){
		var me = this;
     	var refs = me.getReferences();
     	refs.ctlPopupString.setValue(recvData);
	},
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onChangeTagField: function(obj,newVal,oldVal, index){
		var me = this;
		var refs = me.getReferences();
		
		if (newVal=='' || newVal ==null) return;
		
		refs.ctlTagFieldValue.setValue(newVal);
	},
	
	// JPVC OPEN POPUP
	openJpvcPopup:function(){
		var me = this;
		var params = {
			title : 'Commodity',
			searchType : 'CMDT',
			SearchDivCd : 'CD'
		};
		
		me.openCodePopup('popup-vesselpopup', 'ctlJpvc', params);
	},
	
	onOpenButtonPopupSample:function(){
		var me = this;
		var params = {
//				searchPtyDivCd: 'TRK',  // CNS, FWD, TRK
				initSearch: true		// true, false
			};
		me.openCodePopup('popup-partnercdformultipopup', 'noneCtlPatnerPopup', params);
	},
	
	/**
	 * Popup is closed and receives return value.If you set it in record form
	 * The value is set in the Text Control in the <setCodePopupData ()> function in [BaseViewController].
	 * The following function can be implemented only in record object.
	 * If you set only one value, delete it.
	 */ 
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlJpvcfield'){ // JPVC Popup
			if(returnValue){
				me.getViewModel().setData({theVsl:returnValue.item});
			} else {
				me.getViewModel().setData({theVsl:null});
			}
		} else if (targetControl === 'noneCtlPatnerPopup'){ // None Control Patner Popup
			// returnValue.code
		}
	}
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});