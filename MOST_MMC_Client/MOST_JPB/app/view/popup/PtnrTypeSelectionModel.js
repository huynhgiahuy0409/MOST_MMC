Ext.define('MOST.view.popup.PtnrTypeSelectionModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
    alias: 'viewmodel.ptnrtypeselection',
    
    requires: [
       		'Ext.data.proxy.Rest'
    ],
       	
	stores: {
		
		ptnrTypeSelection: {
			fields: ['scdNm','scd']
		}
	}

});