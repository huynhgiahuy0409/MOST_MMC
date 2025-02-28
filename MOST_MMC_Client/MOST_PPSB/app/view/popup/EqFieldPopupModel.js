Ext.define('MOST.view.popup.EqFieldPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias : 'viewmodel.eqfieldpopup',

	requires : ['Ext.data.proxy.Rest'],
	
	stores: {
		eqFieldPopup : {
			model: 'MOST.model.popup.EqFieldPopup',
			storeId : 'eqPopupStore',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/eqlist'
			}
		}
	}
});
