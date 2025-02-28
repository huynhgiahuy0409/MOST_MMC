Ext.define('MOST.view.popup.DelayCodePopupController', {
    extend: 'Ext.app.ViewController',    	
    alias: 'controller.delaycodepopup',

	onSearch: function() {
		var me = this;
		var refs = me.getReferences();
		var store = this.getStore('delayCodePopup');
		
		var tpVal = this.lookupReference('refTypeCombo').getValue();
		var scdVal = this.lookupReference('txtScd').getValue();
		
		var lcd = '';
		if(me.getView().recvData){
			lcd = me.getView().recvData.lcd;
		}
		
		store.load({
			params: {
				tyCd: tpVal,
				scd: scdVal,
				lcd:lcd
			},
			callback: function(record, operation, success){
    			if(success){
    			}
    		}
		});
	},

	
	onSelectDelayCode: function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var selection = me.getView().getSelection() == null ? null :me.getView().getSelection()[0];
		
		var returnItem = {
				rsnCd : selection.data.scd,
				rsnCdNm : selection.data.scdNm,
				acptYN : selection.data.acptYN,
				item : selection
			}
		
    	window.returnValue = returnItem;
       	window.close();
	},	
});
