/* 
	Remind file CMMCdPopupController.js in case want to process HHT operation
	by LamLong
*/
Ext.define('MOST.view.popup.EqFieldPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.eqfieldpopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refEqFieldPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'eqFieldPopup',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function(){
		let me = this;
		let refs = me.getReferences();
		let eqCd = me.getView().recvData.eqCd;
		
		me.updateViewStyle(me.getView());
		
		if(eqCd === CodeConstants.MT_EQFCTPCD_FL){
			me.onUiChangeForklift();
		}else if(eqCd === CodeConstants.MT_EQFCTPCD_PM){
			me.onUiChangePrime();
		}
		
		refs.eqValue.setValue('');
	},
	
	onUiChangeForklift: function(){
		let me = this;
		let refs = me.getReferences();
		
		refs.refEqPrime.setHidden(true);
		refs.txtEqName.setValue(ViewUtil.getLabel('eqForklift'));
		refs.txtEqNameNo.setValue(ViewUtil.getLabel('eqForkliftNo'));
	},
	
	onUiChangePrime: function(){
		let me = this;
		let refs = me.getReferences();
		
		refs.refEqForklift.setHidden(true);
		refs.txtEqName.setValue(ViewUtil.getLabel('eqPrime'));
		refs.txtEqNameNo.setValue(ViewUtil.getLabel('eqPrimeNo'));
	},
	
	onSearch: function() {
		let me = this;
     	let store = me.getStore(me.MAIN_STORE_NAME);
    	let eqCd = me.getView().recvData.eqCd;
    	let params = null;
		
    	if(eqCd === CodeConstants.MT_EQFCTPCD_FL){
    		params = me.getSearchForkliftCondition();
		}else if(eqCd === CodeConstants.MT_EQFCTPCD_PM){
			params = me.getSearchPrimeCondition();
		}
		
    	if(params == null){
    		return;
    	}
    	
		store.load({	
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	getSearchForkliftCondition : function(){
		let me = this;
     	let refs = me.getReferences();
		let eqCd = '';
     	let eqValue = refs.eqValue.getValue();
		
		if(me.getView().recvData) {
			eqCd = me.getView().recvData.eqCd;
		}
		
		let params = {
			eqValue: eqValue,
			eqCd: eqCd
		}
		
    	return params;
	},
	
	getSearchPrimeCondition : function(){
		let me = this;	
     	let refs = me.getReferences();
     	let eqValue = refs.eqValue.getValue();
		
		if(me.getView().recvData) {
			eqCd = me.getView().recvData.eqCd;
		}
		
		let params = {
			eqValue: eqValue,
			eqCd: eqCd
		}
		
    	return params;
	},
	
	onDblClick: function() {
		let me = this;
		let window = me.getView().up('window');
		
		window.returnValue = me.getReturnData();
		window.close();
	},
	
	getReturnData: function() {
		let me = this;
		let grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		let selection = null;
		
		if(grid) {
			selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		}
		
		if(selection == null) {
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		let returnItem = {
			code: selection.data.eqFacNo,
			item: selection
		}
		
		return returnItem;
	}
});
