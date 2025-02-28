Ext.define('MOST.view.popup.DelayCodePopupHHTController', {
    extend: 'Ext.app.ViewController',    	
    alias: 'controller.delaycodepopuphht',
    
    onLoad: function () {
		var me = this;

		me.getView().up('window').setTitle(me.getView().recvData.title);
	},

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
	
	onSelectDelayCodeHHT : function(){
		var me = this,
			window = me.getView().up('window');

		window.returnValue = me.getReturnDataHHT();

		if(window.returnValue != null){
			window.close();	
		}
	},

    getReturnDataHHT:function(){
		var me = this;
		var grid = me.lookupReference('refDelayCodeGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		var recvData = me.getView().recvData;

		if(selection == null){
			MessageUtil.warning('warning_msg', 'selectRecord');
			return null;
		}
		var returnItem = {
			rsnCd : selection.data.scd,
			rsnCdNm : selection.data.scdNm,
			acptYN : selection.data.acptYN,
			item : selection
		}
		
		return returnItem;
	},
	
});
