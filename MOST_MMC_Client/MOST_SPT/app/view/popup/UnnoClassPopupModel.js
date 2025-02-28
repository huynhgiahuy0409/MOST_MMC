Ext.define('MOST.view.popup.UnnoClassPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias : 'viewmodel.unnoclasspopup',

	requires : [ 'Ext.data.proxy.Rest'],
	
	stores: {
		unnoclassPopup : {
			model: 'MOST.model.popup.PopupService',
			storeId : 'unnoPopupStore',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/unnolist'
			}
		},
		
		unnoCodeNameCombo: {}
	}
});
