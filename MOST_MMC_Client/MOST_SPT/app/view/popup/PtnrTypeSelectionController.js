Ext.define('MOST.view.popup.PtnrTypeSelectionController', {
	extend: 'MOST.view.foundation.BaseViewController',
    alias: 'controller.ptnrtypeselection',

    afterrender: function() {
    	var me = this;
		var refs = me.getReferences();
		var store  = me.getStore('ptnrTypeSelection');
    	var ptnrTypes = me.getView().recvData.ptnrTypes;
    	var ptnrTypeList = ptnrTypes.split(',');
    	for(var i = 0; i < ptnrTypeList.length; i++){
    		store.insert(i, [{scdNm: ptnrTypeList[i],scd: ptnrTypeList[i]}]);
    	}
	},
	
	onSelect: function(){
		var me = this;
		var refs = me.getReferences();
		var sel  = refs.txtPtnrType.getValue();
		var window = me.getView().up('window');
		window.returnValue = sel;
		window.close();
	}
	
});